# 💳 BiletCepte Payment Backend

Modern ve güvenli ödeme işleme backend servisi.

---

## 🚀 Hızlı Başlangıç

1. **Backend klasörüne girin:**
```bash
cd backend
```

2. **Paketleri yükleyin:**
```bash
npm install
```

3. **Sunucuyu başlatın:**
```bash
npm start
```

Backend sunucusu `http://localhost:5000` adresinde çalışacak.

## 🧪 Test Kartları

### ✅ Başarılı Ödeme
- **Kart:** 4242 4242 4242 4242
- **Son Kullanma:** Herhangi (gelecek tarih)
- **CVV:** 123 veya herhangi 3 haneli

### ❌ Başarısız Ödeme (Test)
- **Kart:** 4000 0000 0000 0002
- **Son Kullanma:** Herhangi (gelecek tarih)
- **CVV:** 123 veya herhangi 3 haneli

## 📡 API Endpoints

### 1. Health Check
```
GET /
```

### 2. Ödeme Başlatma
```
POST /api/payment/initiate
Content-Type: application/json

{
  "email": "user@example.com",
  "amount": 450,
  "biletData": { ... },
  "userName": "Ahmet Yılmaz",
  "userPhone": "05XX XXX XX XX"
}
```

### 3. Ödeme İşleme
```
POST /api/payment/process
Content-Type: application/json

{
  "paymentId": "uuid",
  "cardNumber": "4242424242424242",
  "cardHolder": "AHMET YILMAZ",
  "expiryDate": "12/25",
  "cvv": "123"
}
```

### 4. Ödeme Durumu Sorgulama
```
GET /api/payment/status/:paymentId
```

## ⚙️ Ayarlar (.env)

```env
PORT=5000
NODE_ENV=development
PAYMENT_SECRET_KEY=biletcepte_super_secret_key_2024
PAYMENT_SUCCESS_RATE=0.9
```

**PAYMENT_SUCCESS_RATE:** Test ortamında ödeme başarı oranı (0.9 = %90 başarılı)

## 🔒 Güvenlik

- Production'da gerçek bir ödeme gateway'i (Stripe, PayTR, İyzico) kullanın
- API anahtarlarını `.env` dosyasında saklayın
- `.env` dosyasını `.gitignore`'a ekleyin
- HTTPS kullanın
- Rate limiting ekleyin
- Input validation yapın

## 📝 Notlar

- Bu backend **TEST AMAÇLI** bir simülasyondur
- Gerçek para işlemi yapmaz
- Production'da gerçek bir payment provider kullanılmalıdır
- Ödeme verisi in-memory'de saklanır (server restart'ta kaybolur)
- Production'da gerçek bir database kullanın (MongoDB, PostgreSQL, vb.)

## 🎯 Production İçin Yapılacaklar

1. Gerçek payment provider entegrasyonu (İyzico, PayTR, Stripe)
2. Database entegrasyonu (MongoDB, PostgreSQL)
3. Authentication & Authorization
4. Rate limiting
5. Logging & Monitoring
6. Error handling iyileştirmeleri
7. HTTPS/SSL sertifikası
8. Environment-based configuration
9. Unit & Integration tests
10. CI/CD pipeline
