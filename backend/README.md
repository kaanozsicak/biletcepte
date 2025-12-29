# 💳 BiletCepte Payment Backend

iyzico Sandbox entegrasyonlu modern ödeme backend servisi.

---

## 🚀 Hızlı Başlangıt

1. **Ana dizinden paketleri yükleyin:**
```bash
npm install
```

2. **Environment dosyasını ayarlayın:**
```bash
cp backend/.env.example backend/.env
# .env dosyasını düzenleyerek kendi iyzico API anahtarlarınızı girin
```

3. **Backend sunucusunu başlatın:**
```bash
npm run server
```

Veya geliştirme modunda (hot-reload):
```bash
npm run server:dev
```

Backend sunucusu `http://localhost:5000` adresinde çalışacak.

## 🧪 iyzico Sandbox Test Kartları

### ✅ Başarılı Ödeme (Non-3DS)
| Kart Numarası | Tip | CVV | Son Kullanma |
|---------------|-----|-----|--------------|
| 5528 7900 0000 0008 | Mastercard | 123 | 12/30 |
| 5504 7200 0000 0003 | Mastercard | 123 | 12/30 |
| 4603 4500 0000 0000 | Visa | 123 | 12/30 |
| 4543 6000 0000 0001 | Visa (Debit) | 123 | 12/30 |

### ❌ Başarısız Ödeme (Yetersiz Bakiye)
| Kart Numarası | Tip | Beklenen Hata |
|---------------|-----|---------------|
| 5406 6700 0000 0009 | Mastercard | Yetersiz bakiye |
| 4111 1111 1111 1129 | Visa | Genel hata |

> **Not:** Tüm test kartları için CVV: `123`, Son Kullanma: gelecek bir tarih (örn: `12/30`)

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

### 3. Ödeme İşleme (iyzico)
```
POST /api/payment/process
Content-Type: application/json

{
  "paymentId": "uuid",
  "cardNumber": "5528790000000008",
  "cardHolder": "AHMET YILMAZ",
  "expiryDate": "12/30",
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

# iyzico Configuration
IYZIPAY_URI=https://sandbox-api.iyzipay.com
IYZIPAY_API_KEY=sandbox-afXhZPW0MQlE4dCUUlHcEopsVRGjX5MH
IYZIPAY_SECRET_KEY=sandbox-wbwpzKIiplZxI3hh5ALI3BKSoLXrPCvP
```

### iyzico API Anahtarları Alma

1. **Sandbox için:** [sandbox-merchant.iyzipay.com](https://sandbox-merchant.iyzipay.com) adresinden kayıt olun
2. **Production için:** [merchant.iyzipay.com](https://merchant.iyzipay.com) adresinden başvurun

## 🔒 Güvenlik

- `.env` dosyasını **asla git'e commit etmeyin**
- Kart bilgilerini **loglama** (sadece son 4 hane saklanır)
- Production'da **HTTPS** kullanın
- **Rate limiting** ekleyin
- **Input validation** aktif

## 📝 Mimari Notlar

### Mevcut Yapı (Non-3DS)
- Frontend kart bilgilerini alır → Backend'e gönderir → iyzico API'ye POST → Sonuç döner
- 3DS gerektirmez, sandbox'ta doğrudan çalışır

### TODO: 3DS / CheckoutForm Geçişi
- 3DS için `callbackUrl` HTTPS olmalı
- Local'de test için [ngrok](https://ngrok.com/) veya [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) kullanın
- CheckoutForm widget'ı daha güvenli PCI-DSS compliant akış sağlar

## 🎯 Production Checklist

- [ ] Gerçek iyzico API anahtarları (`IYZIPAY_URI=https://api.iyzipay.com`)
- [ ] HTTPS/SSL sertifikası
- [ ] Database entegrasyonu (ödeme logları için)
- [ ] Gerçek TC Kimlik No alanı (buyer.identityNumber)
- [ ] Rate limiting & DDoS koruması
- [ ] Error monitoring (Sentry vb.)
- [ ] 3DS/SecurePay entegrasyonu
- [ ] İptal/İade endpoint'leri

## 📚 Kaynaklar

- [iyzico API Dokümantasyonu](https://dev.iyzipay.com/)
- [iyzico Node.js SDK](https://github.com/iyzico/iyzipay-node)
- [Sandbox Merchant Panel](https://sandbox-merchant.iyzipay.com)
