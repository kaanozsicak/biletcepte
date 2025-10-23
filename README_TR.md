# BiletCepte 🎫

Otobüs bileti satış ve rezervasyon platformu - React Web Uygulaması

## 📋 Proje Hakkında

BiletCepte, kullanıcıların kolayca otobüs bileti arayıp satın alabileceği modern bir web uygulamasıdır.

### ✨ Özellikler

- ✅ Kullanıcı kayıt ve giriş sistemi (Firebase Authentication)
- 🔍 Şehirler arası bilet arama
- 📅 Tarih bazlı sorgulama
- 📱 Responsive (Mobil uyumlu) tasarım
- 🔥 Firebase Realtime Database entegrasyonu
- 🎨 Modern ve kullanıcı dostu arayüz

## 🚀 Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn

### Adım Adım Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/kaanozsicak/biletcepte.git
cd biletcepte
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Firebase Yapılandırması (Opsiyonel - Güvenlik İçin Önerilir)**

`.env` dosyası oluşturun (`.env.example` dosyasını kopyalayın):
```bash
copy .env.example .env
```

Firebase bilgilerinizi `.env` dosyasına ekleyin:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. **Uygulamayı başlatın**
```bash
npm start
```

Uygulama `http://localhost:3000` adresinde açılacaktır.

## 📦 Mevcut Komutlar

```bash
# Geliştirme sunucusunu başlat
npm start

# Production build oluştur
npm run build

# Testleri çalıştır
npm test

# Kod kalitesini kontrol et
npm run lint
```

## 🏗️ Proje Yapısı

```
biletcepte/
├── public/              # Statik dosyalar
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js          # Ana uygulama
│   ├── App.css         # Ana stil
│   ├── header.js       # Başlık bileşeni
│   ├── header.css      # Başlık stilleri
│   ├── div.js          # Ana içerik bileşeni
│   ├── div.css         # İçerik stilleri
│   ├── yardim.js       # Yardım sayfası
│   ├── iletisim.js     # İletişim sayfası
│   ├── biletler.js     # Biletlerim sayfası
│   └── index.js        # Giriş noktası
├── .env.example        # Örnek env dosyası
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Kullanım

1. **Ana Sayfa**: Başlangıç ve varış şehri seçip tarih belirleyin
2. **Kayıt Ol**: Yeni kullanıcı hesabı oluşturun
3. **Giriş Yap**: Mevcut hesabınızla giriş yapın
4. **Bilet Ara**: "Bul" butonuna basarak bilet arayın
5. **Yardım**: Kullanım kılavuzuna göz atın

## 🔧 Teknolojiler

- **React** (v18.3.1) - Frontend framework
- **React Router DOM** (v6.23.1) - Sayfa yönlendirmeleri
- **Firebase** (v10.12.0) - Backend ve veritabanı
- **Bootstrap** (v5.3.3) - CSS framework
- **CSS3** - Özel stiller ve animasyonlar

## ⚠️ Önemli Notlar

### Güvenlik
- Firebase API anahtarlarınızı `.env` dosyasına taşıyın
- `.gitignore` dosyasının `.env` dosyasını içerdiğinden emin olun
- Production'a geçmeden önce Firebase Security Rules'ı yapılandırın

### Eksik Dosyalar
Aşağıdaki görsel dosyaları `public/` klasörüne eklemeniz gerekir:
- `logowithoutback.png` - Logo
- `fast.png` - Hızlı ikonu
- `safe.png` - Güvenilir ikonu
- `wallet.png` - Ekonomik ikonu
- `reklam1.jpg` - Reklam görseli 1
- `reklam2.png` - Reklam görseli 2

## 🐛 Sorun Giderme

### Port zaten kullanılıyor hatası
```bash
# Windows için
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Node modülleri sorunları
```bash
# node_modules'u sil ve yeniden yükle
rmdir /s /q node_modules
del package-lock.json
npm install
```

## 📝 Gelecek Özellikler (TODO)

- [ ] Gerçek bilet arama API entegrasyonu
- [ ] Ödeme sistemi entegrasyonu
- [ ] Kullanıcı profil sayfası
- [ ] Bilet geçmişi ve iptal işlemleri
- [ ] E-posta doğrulama sistemi
- [ ] Şifre sıfırlama özelliği
- [ ] Firma paneli
- [ ] Admin paneli

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Kaan Özsıçak**
- GitHub: [@kaanozsicak](https://github.com/kaanozsicak)

## 📞 İletişim

Sorularınız için: info@biletcepte.com

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
