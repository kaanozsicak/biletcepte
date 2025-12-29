// server.js - BiletCepte Payment Backend with iyzico Integration
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Iyzipay = require('iyzipay');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// iyzico Configuration
const iyzipay = new Iyzipay({
  apiKey: process.env.IYZIPAY_API_KEY || 'sandbox-afXhZPW0MQlE4dCUUlHcEopsVRGjX5MH',
  secretKey: process.env.IYZIPAY_SECRET_KEY || 'sandbox-wbwpzKIiplZxI3hh5ALI3BKSoLXrPCvP',
  uri: process.env.IYZIPAY_URI || 'https://sandbox-api.iyzipay.com'
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Trust proxy for getting real IP
app.set('trust proxy', true);

// Payment database (in-memory - production'da gerçek database kullanın)
const payments = new Map();

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'BiletCepte Payment Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Payment initiation endpoint
app.post('/api/payment/initiate', async (req, res) => {
  try {
    const { 
      email, 
      amount, 
      biletData, 
      userName, 
      userPhone 
    } = req.body;

    // Validation
    if (!email || !amount || !biletData) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Generate unique payment ID
    const paymentId = uuidv4();
    const orderId = `BILET-${Date.now()}`;

    // Store payment info
    const paymentInfo = {
      paymentId,
      orderId,
      email,
      amount,
      biletData,
      userName,
      userPhone,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 dakika
    };

    payments.set(paymentId, paymentInfo);

    // Return payment session
    res.json({
      success: true,
      paymentId,
      orderId,
      amount,
      expiresIn: 900 // 15 dakika (saniye)
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Payment initiation failed' 
    });
  }
});

// Process payment endpoint with iyzico integration
app.post('/api/payment/process', async (req, res) => {
  try {
    const { 
      paymentId, 
      cardNumber, 
      cardHolder, 
      expiryDate, 
      cvv 
    } = req.body;

    // Get payment info
    const paymentInfo = payments.get(paymentId);

    if (!paymentInfo) {
      return res.status(404).json({ 
        success: false, 
        error: 'Payment session not found or expired' 
      });
    }

    // Check if expired
    if (new Date() > new Date(paymentInfo.expiresAt)) {
      payments.delete(paymentId);
      return res.status(400).json({ 
        success: false, 
        error: 'Payment session expired' 
      });
    }

    // Validate card (ADVANCED VALIDATION)
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    
    if (!cleanCardNumber || cleanCardNumber.length !== 16) {
      return res.status(400).json({ 
        success: false, 
        error: 'Kart numarası 16 haneli olmalıdır!' 
      });
    }

    // Sadece rakam kontrolü
    if (!/^\d+$/.test(cleanCardNumber)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Kart numarası sadece rakamlardan oluşmalıdır!' 
      });
    }

    // CVV kontrolü
    if (!cvv || cvv.length < 3 || !/^\d+$/.test(cvv)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Geçersiz CVV!' 
      });
    }

    // Kart sahibi isim kontrolü
    if (!cardHolder || cardHolder.trim().length < 3) {
      return res.status(400).json({ 
        success: false, 
        error: 'Kart sahibi adı gerekli!' 
      });
    }

    // Son kullanma tarihi kontrolü (MM/YY formatı)
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Son kullanma tarihi MM/YY formatında olmalıdır!' 
      });
    }

    // Son kullanma tarihinin geçerli olup olmadığını kontrol et
    const [expMonth, expYear] = expiryDate.split('/');
    const expMonthNum = parseInt(expMonth);
    const expYearFull = '20' + expYear; // "25" -> "2025"
    const expYearNum = parseInt(expYearFull);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (expMonthNum < 1 || expMonthNum > 12) {
      return res.status(400).json({ 
        success: false, 
        error: 'Geçersiz ay (01-12 arası olmalı)!' 
      });
    }

    if (expYearNum < currentYear || (expYearNum === currentYear && expMonthNum < currentMonth)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Kartın süresi dolmuş!' 
      });
    }

    // Prepare buyer info
    const nameParts = (paymentInfo.userName || 'Misafir Kullanıcı').trim().split(' ');
    const buyerName = nameParts[0] || 'Misafir';
    const buyerSurname = nameParts.slice(1).join(' ') || '-';
    
    // Format phone number to +90XXXXXXXXXX
    let formattedPhone = (paymentInfo.userPhone || '').replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = formattedPhone.substring(1);
    }
    if (!formattedPhone.startsWith('90')) {
      formattedPhone = '90' + formattedPhone;
    }
    formattedPhone = '+' + formattedPhone;
    if (formattedPhone.length < 13) {
      formattedPhone = '+905350000000'; // Default sandbox phone
    }

    // Get client IP
    const clientIp = req.ip || req.headers['x-forwarded-for'] || '85.34.78.112';

    // Format date for iyzico
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toISOString().replace('T', ' ').substring(0, 19);
    };

    // Build iyzico payment request
    const iyzicoRequest = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: paymentInfo.orderId,
      price: paymentInfo.amount.toString(),
      paidPrice: paymentInfo.amount.toString(),
      currency: Iyzipay.CURRENCY.TRY,
      installment: '1',
      basketId: paymentInfo.orderId,
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      paymentCard: {
        cardHolderName: cardHolder.toUpperCase(),
        cardNumber: cleanCardNumber,
        expireMonth: expMonth,
        expireYear: expYearFull,
        cvc: cvv,
        registerCard: '0'
      },
      buyer: {
        id: paymentInfo.paymentId,
        name: buyerName,
        surname: buyerSurname,
        gsmNumber: formattedPhone,
        email: paymentInfo.email || 'guest@biletcepte.com',
        // TODO: Production'da gerçek TC Kimlik No alınmalı
        identityNumber: '74300864791', // Sandbox için geçici değer
        registrationAddress: 'BiletCepte Online Bilet Satış',
        ip: clientIp,
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34742',
        lastLoginDate: formatDate(new Date()),
        registrationDate: formatDate(new Date())
      },
      shippingAddress: {
        contactName: paymentInfo.userName || 'Misafir',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'BiletCepte Sanal Ürün - Kargo Gerekli Değil',
        zipCode: '34742'
      },
      billingAddress: {
        contactName: paymentInfo.userName || 'Misafir',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'BiletCepte Sanal Ürün - Fatura Adresi',
        zipCode: '34742'
      },
      basketItems: [
        {
          id: paymentInfo.biletData?.id || `BI-${paymentInfo.orderId}`,
          name: `${paymentInfo.biletData?.nereden || 'Kalkış'} -> ${paymentInfo.biletData?.nereye || 'Varış'} Bileti`,
          category1: 'Ticket',
          category2: paymentInfo.biletData?.firma || 'Otobüs',
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: paymentInfo.amount.toString()
        }
      ]
    };

    // Log request (without sensitive card data)
    console.log(`💳 iyzico Payment Request - ConversationId: ${iyzicoRequest.conversationId}, Amount: ${iyzicoRequest.price} TRY`);

    // Call iyzico payment API
    iyzipay.payment.create(iyzicoRequest, (err, result) => {
      if (err) {
        console.error('iyzico API Error:', err);
        paymentInfo.status = 'failed';
        paymentInfo.failedAt = new Date().toISOString();
        paymentInfo.errorCode = 'IYZICO_API_ERROR';
        paymentInfo.errorMessage = err.message;
        payments.set(paymentId, paymentInfo);

        return res.status(500).json({
          success: false,
          error: 'Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
          errorCode: 'IYZICO_API_ERROR'
        });
      }

      // Log response (without sensitive data)
      console.log(`📋 iyzico Response - Status: ${result.status}, ConversationId: ${result.conversationId}`);
      if (result.status !== 'success') {
        console.log(`⚠️ iyzico Error: ${result.errorCode} - ${result.errorMessage}`);
      }

      if (result.status === 'success') {
        // Payment successful
        paymentInfo.status = 'success';
        paymentInfo.completedAt = new Date().toISOString();
        paymentInfo.iyzicoPaymentId = result.paymentId;
        paymentInfo.transactionId = result.itemTransactions?.[0]?.paymentTransactionId || result.paymentId;
        paymentInfo.cardLast4 = result.lastFourDigits || cleanCardNumber.slice(-4);
        paymentInfo.cardAssociation = result.cardAssociation;
        paymentInfo.cardFamily = result.cardFamily;

        payments.set(paymentId, paymentInfo);

        return res.json({
          success: true,
          paymentId,
          transactionId: paymentInfo.transactionId,
          orderId: paymentInfo.orderId,
          amount: paymentInfo.amount,
          cardLast4: paymentInfo.cardLast4,
          message: 'Ödeme başarıyla tamamlandı!'
        });
      } else {
        // Payment failed
        paymentInfo.status = 'failed';
        paymentInfo.failedAt = new Date().toISOString();
        paymentInfo.errorCode = result.errorCode;
        paymentInfo.errorMessage = result.errorMessage;

        payments.set(paymentId, paymentInfo);

        // User-friendly error messages
        let userMessage = 'Ödeme başarısız! Lütfen kart bilgilerinizi kontrol edin.';
        
        // Map common iyzico error codes to user-friendly messages
        const errorMessages = {
          '10051': 'Kartınızda yeterli bakiye bulunmamaktadır.',
          '10005': 'İşlem onaylanmadı. Lütfen bankanızla iletişime geçin.',
          '10012': 'Geçersiz kart numarası.',
          '10054': 'Kartın süresi dolmuş.',
          '10057': 'Kart sahibi bu işlemi yapamaz.',
          '10058': 'Bu işlem terminalinize kapalıdır.',
          '10034': 'Sahte kart girişimi.',
          '12': 'Geçersiz işlem.',
        };

        if (result.errorCode && errorMessages[result.errorCode]) {
          userMessage = errorMessages[result.errorCode];
        }

        return res.status(400).json({
          success: false,
          error: userMessage,
          errorCode: result.errorCode
        });
      }
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Payment processing failed' 
    });
  }
});

// Get payment status
app.get('/api/payment/status/:paymentId', (req, res) => {
  try {
    const { paymentId } = req.params;
    const paymentInfo = payments.get(paymentId);

    if (!paymentInfo) {
      return res.status(404).json({ 
        success: false, 
        error: 'Payment not found' 
      });
    }

    res.json({
      success: true,
      payment: {
        paymentId: paymentInfo.paymentId,
        orderId: paymentInfo.orderId,
        status: paymentInfo.status,
        amount: paymentInfo.amount,
        createdAt: paymentInfo.createdAt,
        completedAt: paymentInfo.completedAt,
        transactionId: paymentInfo.transactionId
      }
    });

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Status check failed' 
    });
  }
});

// Cleanup expired payments (her 5 dakikada bir)
setInterval(() => {
  const now = new Date();
  let cleaned = 0;

  for (const [paymentId, paymentInfo] of payments.entries()) {
    if (now > new Date(paymentInfo.expiresAt) && paymentInfo.status === 'pending') {
      payments.delete(paymentId);
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`🧹 Cleaned ${cleaned} expired payment(s)`);
  }
}, 5 * 60 * 1000);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BiletCepte Payment Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💳 Payment Gateway: iyzico ${process.env.IYZIPAY_URI?.includes('sandbox') ? 'SANDBOX' : 'PRODUCTION'}`);
  console.log(`🔗 iyzico URI: ${process.env.IYZIPAY_URI || 'https://sandbox-api.iyzipay.com'}`);
  // TODO: 3DS veya CheckoutForm için ileriki aşamada callbackUrl HTTPS gerekir
  // Local'de HTTPS için ngrok veya cloudflare tunnel kullanılabilir
});
