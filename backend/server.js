// server.js - BiletCepte Payment Backend
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Process payment endpoint
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
    const expYearNum = parseInt('20' + expYear);
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

    // LUHN ALGORITHM - Kart numarası geçerlilik kontrolü
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanCardNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    if (sum % 10 !== 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Geçersiz kart numarası! Lütfen kontrol edin.' 
      });
    }

    // TEST KARTLARI - Sadece bunlar başarılı olacak
    const VALID_TEST_CARDS = [
      '4242424242424242', // Başarılı test kartı
      '5555555555554444', // Mastercard başarılı
      '378282246310005',  // Amex başarılı
    ];

    const FAILED_TEST_CARDS = [
      '4000000000000002', // Başarısız test kartı
      '4000000000000127', // CVV hatası test
      '4000000000000069', // Süresi dolmuş test
    ];

    // Simulate payment processing (0.5-2 saniye bekle)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));

    // Kart kontrolü - Test kartları
    let isSuccess;
    
    if (VALID_TEST_CARDS.includes(cleanCardNumber)) {
      // Başarılı test kartı
      isSuccess = true;
    } else if (FAILED_TEST_CARDS.includes(cleanCardNumber)) {
      // Başarısız test kartı
      isSuccess = false;
    } else {
      // Diğer kartlar için %90 başarı oranı
      const successRate = parseFloat(process.env.PAYMENT_SUCCESS_RATE) || 0.9;
      isSuccess = Math.random() < successRate;
    }

    if (isSuccess) {
      // Payment successful
      paymentInfo.status = 'success';
      paymentInfo.completedAt = new Date().toISOString();
      paymentInfo.transactionId = `TXN-${Date.now()}`;
      paymentInfo.cardLast4 = cardNumber.slice(-4);

      payments.set(paymentId, paymentInfo);

      res.json({
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
      paymentInfo.errorCode = 'INSUFFICIENT_FUNDS'; // Simulated error

      payments.set(paymentId, paymentInfo);

      res.status(400).json({
        success: false,
        error: 'Ödeme başarısız! Lütfen kart bilgilerinizi kontrol edin veya farklı bir kart deneyin.',
        errorCode: 'INSUFFICIENT_FUNDS'
      });
    }

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
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`💳 Payment success rate: ${(parseFloat(process.env.PAYMENT_SUCCESS_RATE) * 100).toFixed(0)}%`);
});
