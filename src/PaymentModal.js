// PaymentModal.js
import React, { useState } from 'react';
import './PaymentModal.css';
import { useToast } from './useToast';
import Toast from './Toast';
import { CloseIcon, CreditCardIcon, TicketIcon, UserIcon, DocumentTextIcon, CalendarIcon, LockClosedIcon, LoadingSpinner, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, PhoneIcon } from './Icons';

const PaymentModal = ({ bilet, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Bilgiler, 2: Kart bilgileri
  const [paymentId, setPaymentId] = useState(null);
  const toast = useToast();

  // Form state
  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  // Input değişikliği
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Kart numarası formatla (16 haneli, 4'lü gruplar)
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.replace(/\s/g, '').length > 16) return;
    }

    // Son kullanma tarihi formatla (MM/YY)
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    // CVV sadece rakam, max 4 hane
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    // Telefon formatla
    if (name === 'userPhone') {
      formattedValue = value.replace(/\D/g, '').slice(0, 11);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Adım 1 validasyonu (Kullanıcı bilgileri)
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Ad Soyad gerekli';
    }

    if (!formData.userPhone.trim()) {
      newErrors.userPhone = 'Telefon numarası gerekli';
    } else if (formData.userPhone.replace(/\D/g, '').length < 10) {
      newErrors.userPhone = 'Geçerli bir telefon numarası girin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Adım 2 validasyonu (Kart bilgileri)
  const validateStep2 = () => {
    const newErrors = {};

    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberClean) {
      newErrors.cardNumber = 'Kart numarası gerekli';
    } else if (cardNumberClean.length !== 16) {
      newErrors.cardNumber = '16 haneli kart numarası girin';
    }

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = 'Kart üzerindeki isim gerekli';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Son kullanma tarihi gerekli';
    } else if (formData.expiryDate.length !== 5) {
      newErrors.expiryDate = 'MM/YY formatında girin';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV gerekli';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Geçerli CVV girin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // İleri git (Adım 1 -> Adım 2)
  const handleNext = async () => {
    if (!validateStep1()) return;

    setLoading(true);

    try {
      // Backend'e payment initiate isteği
      const kullaniciStr = localStorage.getItem('biletcepte_kullanici');
      const kullanici = kullaniciStr ? JSON.parse(kullaniciStr) : null;

      const response = await fetch('http://localhost:5000/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: kullanici?.email || 'guest@biletcepte.com',
          amount: parseFloat(bilet.fiyat),
          biletData: bilet,
          userName: formData.userName,
          userPhone: formData.userPhone
        })
      });

      const data = await response.json();

      if (data.success) {
        setPaymentId(data.paymentId);
        setPaymentStep(2);
      } else {
        toast.error('Ödeme başlatılamadı: ' + (data.error || 'Bilinmeyen hata'));
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Ödeme sunucusuna bağlanılamadı. Lütfen backend sunucusunun çalıştığından emin olun.');
    } finally {
      setLoading(false);
    }
  };

  // Ödemeyi tamamla
  const handlePayment = async () => {
    if (!validateStep2()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId,
          cardNumber: formData.cardNumber.replace(/\s/g, ''),
          cardHolder: formData.cardHolder,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        })
      });

      const data = await response.json();

      if (data.success) {
        // Başarılı ödeme
        toast.success(`Ödeme başarılı! İşlem No: ${data.transactionId} | Tutar: ${data.amount} TL`, 5000);
        onSuccess({
          ...bilet,
          paymentId: data.paymentId,
          transactionId: data.transactionId,
          orderId: data.orderId,
          paymentStatus: 'success',
          cardLast4: data.cardLast4
        });
      } else {
        // Ödeme başarısız
        toast.error(data.error || 'Ödeme başarısız!', 5000);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-modal-close" onClick={onClose}><CloseIcon size={20} /></button>

        {/* Header */}
        <div className="payment-modal-header">
          <h2><CreditCardIcon size={24} color="#0a5c0a" /> Ödeme Bilgileri</h2>
          <div className="payment-steps">
            <div className={`payment-step ${paymentStep >= 1 ? 'active' : ''}`}>1. Bilgiler</div>
            <div className={`payment-step ${paymentStep >= 2 ? 'active' : ''}`}>2. Kart</div>
          </div>
        </div>

        {/* Bilet Özeti */}
        <div className="payment-summary">
          <h3><TicketIcon size={20} color="#0a5c0a" /> Bilet Özeti</h3>
          <div className="summary-row">
            <span>Güzergah:</span>
            <strong>{bilet.nereden} → {bilet.nereye}</strong>
          </div>
          <div className="summary-row">
            <span>Tarih & Saat:</span>
            <strong>{bilet.tarih} - {bilet.saat}</strong>
          </div>
          <div className="summary-row">
            <span>Firma:</span>
            <strong>{bilet.firma}</strong>
          </div>
          <div className="summary-row total">
            <span>Toplam Tutar:</span>
            <strong className="price">{bilet.fiyat} TL</strong>
          </div>
        </div>

        {/* Adım 1: Kullanıcı Bilgileri */}
        {paymentStep === 1 && (
          <div className="payment-form">
            <div className="form-group">
              <label><UserIcon size={16} /> Ad Soyad *</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                placeholder="Ahmet Yılmaz"
                className={errors.userName ? 'error' : ''}
              />
              {errors.userName && <span className="error-message">{errors.userName}</span>}
            </div>

            <div className="form-group">
              <label><PhoneIcon size={16} /> Telefon Numarası *</label>
              <input
                type="tel"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                placeholder="05XX XXX XX XX"
                className={errors.userPhone ? 'error' : ''}
              />
              {errors.userPhone && <span className="error-message">{errors.userPhone}</span>}
            </div>

            <button 
              className="payment-btn primary" 
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? <><LoadingSpinner size={18} /> Yükleniyor...</> : 'İleri →'}
            </button>
          </div>
        )}

        {/* Adım 2: Kart Bilgileri */}
        {paymentStep === 2 && (
          <div className="payment-form">
            <div className="test-cards-info">
              <p><CreditCardIcon size={16} /> <strong>Test Kartları:</strong></p>
              <p><CheckCircleIcon size={14} color="#10b981" /> Başarılı: 5528 7900 0000 0008 | Expire: 12/30 | CVV: 123</p>
              <p><XCircleIcon size={14} color="#ef4444" /> Başarısız: 5406 6700 0000 0009 | Expire: 12/30 | CVV: 123</p>
              <p><ExclamationTriangleIcon size={14} color="#f59e0b" /> iyzico Sandbox - Gerçek ödeme yapılmaz</p>
            </div>

            <div className="form-group">
              <label><CreditCardIcon size={16} /> Kart Numarası *</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handlePayment()}
                placeholder="XXXX XXXX XXXX XXXX"
                className={errors.cardNumber ? 'error' : ''}
                maxLength="19"
              />
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>

            <div className="form-group">
              <label><DocumentTextIcon size={16} /> Kart Üzerindeki İsim *</label>
              <input
                type="text"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handlePayment()}
                placeholder="AHMET YILMAZ"
                className={errors.cardHolder ? 'error' : ''}
                style={{ textTransform: 'uppercase' }}
              />
              {errors.cardHolder && <span className="error-message">{errors.cardHolder}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><CalendarIcon size={16} /> Son Kullanma *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handlePayment()}
                  placeholder="MM/YY"
                  className={errors.expiryDate ? 'error' : ''}
                  maxLength="5"
                />
                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
              </div>

              <div className="form-group">
                <label><LockClosedIcon size={16} /> CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handlePayment()}
                  placeholder="XXX"
                  className={errors.cvv ? 'error' : ''}
                  maxLength="4"
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>

            <div className="payment-actions">
              <button 
                className="payment-btn secondary" 
                onClick={() => setPaymentStep(1)}
                disabled={loading}
              >
                ← Geri
              </button>
              <button 
                className="payment-btn success" 
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? <><LoadingSpinner size={18} /> İşleniyor...</> : `${bilet.fiyat} TL Öde`}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <div className="toast-container">
        {toast.toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            duration={t.duration}
            onClose={() => toast.removeToast(t.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentModal;
