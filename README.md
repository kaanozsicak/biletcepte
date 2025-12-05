# 🚌 BiletCepte - Otobüs Bileti Arama Platformu

<div align="center">

![BiletCepte Logo](https://img.shields.io/badge/BiletCepte-Artık%20Biletler%20Cepte-0a5c0a?style=for-the-badge)

**Türkiye'nin en hızlı ve güvenilir otobüs bileti arama ve satın alma platformu**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.12.0-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Demo](#) • [Özellikler](#-özellikler) • [Kurulum](#-kurulum) • [Kullanım](#-kullanım) • [Katkıda Bulunun](#-katkıda-bulunun)

</div>

---

## 📖 İçindekiler

- [Hakkında](#-hakkında)
- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Proje Yapısı](#-proje-yapısı)
- [Test Kartları](#-test-kartları)
- [Güvenlik](#-güvenlik)
- [Katkıda Bulunun](#-katkıda-bulunun)
- [Lisans](#-lisans)

---

## 🎯 Hakkında

**BiletCepte**, kullanıcıların otobüs biletlerini hızlı ve güvenli bir şekilde arayıp satın almalarını sağlayan modern bir web uygulamasıdır. Türkiye'nin önde gelen otobüs firmalarının biletlerini tek bir platformda toplayarak, en uygun fiyatlı ve en konforlu seyahat seçeneklerini sunar.

### ✨ Neden BiletCepte?

- 🚀 **Hızlı Arama**: Saniyeler içinde yüzlerce sefer arasından en uygununu bulun
- 💰 **En İyi Fiyat**: Tüm firmaların fiyatlarını karşılaştırın, en uygununu seçin
- 🔒 **Güvenli Ödeme**: Kart bilgileriniz güvenli ödeme sistemiyle korunur
- 📱 **Mobil Uyumlu**: Her cihazdan sorunsuz kullanım
- ⚡ **Anında İşlem**: Biletleriniz anında hesabınızda
- 📊 **Detaylı Takip**: Tüm biletlerinizi tek yerden yönetin

---

## 🚀 Özellikler

### 👤 Kullanıcı Özellikleri

- ✅ **Üyelik Sistemi**: Güvenli kayıt ve giriş
- 🔍 **Gelişmiş Arama**: Nereden-nereye, tarih ve firma filtreleme
- 🎫 **Bilet Satın Alma**: İki adımlı güvenli ödeme süreci
- 📋 **Biletlerim**: Tüm biletlerinizi görüntüleme ve yönetme
- 🗑️ **Bilet İptali**: Kolayca bilet iptal etme
- 💳 **Ödeme Geçmişi**: Detaylı işlem ID ve kart bilgileri
- 🔔 **Toast Bildirimleri**: Modern ve kullanıcı dostu bildirim sistemi

### 🛠️ Admin Özellikleri

- 📊 **Dashboard**: Tüm biletleri görüntüleme ve yönetme
- ➕ **Bilet Ekleme**: Yeni sefer ve firma ekleme
- ✏️ **Bilet Düzenleme**: Mevcut biletleri güncelleme
- 🗑️ **Bilet Silme**: Gereksiz biletleri kaldırma
- 🔐 **Güvenli Giriş**: Admin panel koruması

### 💳 Ödeme Sistemi

- 🏦 **Özel Payment Gateway**: Kendi ödeme backend'imiz
- 🔒 **Güvenli İşlemler**: Şifreli kart bilgileri
- ✅ **Kart Doğrulama**: LUHN algoritması ile gerçek kart kontrolü
- 🎲 **Test Modu**: Geliştirme için test kartları
- 📝 **İşlem Kayıtları**: Her ödemenin benzersiz ID'si

---

## 🛠️ Teknolojiler

### Frontend

- **React 18.3.1** - Modern UI framework
- **React Router DOM 6.23.1** - SPA routing
- **React Popup** - Modal ve popup yönetimi
- **CSS3** - Modern ve responsive tasarım
- **Custom Toast System** - Bildirim sistemi

### Backend

- **Node.js** - Server-side JavaScript
- **Express.js** - Web framework
- **UUID** - Benzersiz işlem ID'leri
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request parsing

### Database

- **Firebase Realtime Database** - NoSQL cloud database
- **Firebase Authentication** - (Opsiyonel)

### Tools & Libraries

- **dotenv** - Environment variables
- **Bootstrap 5.3.3** - (Opsiyonel UI components)
- **Web Vitals** - Performance monitoring

---

## 📦 Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Firebase hesabı

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/kaanozsicak/biletcepte.git
cd biletcepte
```

### 2. Frontend Kurulumu

```bash
# Ana dizinde
npm install
```

### 3. Backend Kurulumu

```bash
# Backend dizinine gidin
cd backend
npm install
```

### 4. Firebase Yapılandırması

1. [Firebase Console](https://console.firebase.google.com/) üzerinden yeni bir proje oluşturun
2. Realtime Database'i etkinleştirin
3. Web app kimlik bilgilerinizi alın
4. `.env.example` dosyasını `.env` olarak kopyalayın ve bilgilerinizi girin:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 5. Backend Yapılandırması

`backend/.env` dosyasını oluşturun:

```env
PORT=5000
NODE_ENV=development
PAYMENT_SECRET_KEY=your_secret_key_here
PAYMENT_SUCCESS_RATE=0.9
```

---

## 🎮 Kullanım

### Geliştirme Modunda Çalıştırma

#### Terminal 1: Frontend

```bash
npm start
```

Frontend http://localhost:3000 adresinde çalışacak.

#### Terminal 2: Backend

```bash
cd backend
npm start
```

Backend http://localhost:5000 adresinde çalışacak.

### Production Build

```bash
npm run build
```

Build dosyaları `build/` klasöründe oluşturulacak.

---

## 📁 Proje Yapısı

```
biletcepte/
├── backend/
│   ├── server.js              # Payment backend
│   ├── package.json
│   ├── .env
│   └── README.md
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── header.js          # Navigation header
│   │   ├── div.js             # Homepage & search
│   │   ├── biletler.js        # User tickets
│   │   ├── admin.js           # Admin panel
│   │   ├── yardim.js          # Help page
│   │   ├── iletisim.js        # Contact page
│   │   ├── PaymentModal.js    # Payment modal
│   │   ├── Toast.js           # Toast notifications
│   │   └── useToast.js        # Toast hook
│   ├── styles/
│   │   ├── App.css
│   │   ├── header.css
│   │   ├── div.css
│   │   ├── biletler.css
│   │   ├── admin.css
│   │   ├── yardim.css
│   │   ├── PaymentModal.css
│   │   └── Toast.css
│   ├── App.js                 # Main component
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── .env.example               # Environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 💳 Test Kartları

### ✅ Başarılı Ödeme

```
Kart Numarası: 4242 4242 4242 4242
Son Kullanma: 12/25 (veya gelecek herhangi bir tarih)
CVV: 123
Kart Sahibi: İstediğiniz isim
```

### ❌ Başarısız Ödeme (Test için)

```
Kart Numarası: 4000 0000 0000 0002
Son Kullanma: 12/25
CVV: 123
Kart Sahibi: Test User
```

### 🔐 Admin Girişi

```
Şifre: admin123
```

> ⚠️ **Önemli**: Production'a geçmeden önce admin şifresini değiştirin!

---

## 🔒 Güvenlik

### Öneriler

1. **Firebase Rules**: Database kurallarınızı güvenli yapılandırın
2. **Environment Variables**: `.env` dosyasını asla commit etmeyin
3. **Admin Şifresi**: Varsayılan şifreyi değiştirin
4. **HTTPS**: Production'da HTTPS kullanın
5. **Payment Gateway**: Gerçek ödeme sistemi entegrasyonu yapın (Stripe, PayTR, İyzico)

### Firebase Database Rules Örneği

```json
{
  "rules": {
    "biletler": {
      ".read": true,
      ".write": "auth != null"
    },
    "kullaniciBiletleri": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

---

## 🤝 Katkıda Bulunun

Katkılarınızı bekliyoruz! Projeye katkıda bulunmak için:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Commit Conventions

- `feat:` Yeni özellik
- `fix:` Bug düzeltmesi
- `docs:` Dokümantasyon
- `style:` Kod formatı
- `refactor:` Kod refactoring
- `test:` Test ekleme
- `chore:` Genel değişiklikler

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 👨‍💻 Geliştirici

**Kaan Özsıcak**

- GitHub: [@kaanozsicak](https://github.com/kaanozsicak)
- LinkedIn: [Kaan Özsıcak](https://linkedin.com/in/kaanozsicak)

---

## 🙏 Teşekkürler

- React ekibine harika framework için
- Firebase ekibine güçlü backend servisleri için
- Tüm katkıda bulunanlara

---

<div align="center">

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın! ⭐**

Made with ❤️ in Turkey 🇹🇷

</div>
