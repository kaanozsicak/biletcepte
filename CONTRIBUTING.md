# 🤝 Katkıda Bulunma Rehberi

BiletCepte projesine katkıda bulunmak istediğiniz için teşekkürler! Bu rehber, katkıda bulunma sürecini kolaylaştırmak için hazırlanmıştır.

## 📋 İçindekiler

- [Başlamadan Önce](#başlamadan-önce)
- [Geliştirme Ortamı Kurulumu](#geliştirme-ortamı-kurulumu)
- [Kod Standartları](#kod-standartları)
- [Commit Mesajları](#commit-mesajları)
- [Pull Request Süreci](#pull-request-süreci)
- [Bug Raporlama](#bug-raporlama)
- [Özellik İsteği](#özellik-i̇steği)

---

## Başlamadan Önce

### Katkıda Bulunabileceğiniz Alanlar

- 🐛 **Bug Fix**: Hataları düzeltme
- ✨ **Feature**: Yeni özellik ekleme
- 📝 **Documentation**: Dokümantasyon geliştirme
- 🎨 **Design**: UI/UX iyileştirmeleri
- 🧪 **Testing**: Test yazma
- ♿ **Accessibility**: Erişilebilirlik iyileştirmeleri
- 🌐 **i18n**: Çok dilli destek

### Davranış Kuralları

- Saygılı ve yapıcı olun
- Açık iletişim kurun
- Farklı görüşlere saygı gösterin
- Topluluk odaklı düşünün

---

## Geliştirme Ortamı Kurulumu

### 1. Repository'yi Fork Edin

GitHub üzerinden projeyi fork edin.

### 2. Lokal Olarak Klonlayın

```bash
git clone https://github.com/YOUR_USERNAME/biletcepte.git
cd biletcepte
```

### 3. Upstream'i Ekleyin

```bash
git remote add upstream https://github.com/kaanozsicak/biletcepte.git
```

### 4. Bağımlılıkları Yükleyin

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 5. Environment Değişkenlerini Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın ve gerekli bilgileri girin.

### 6. Projeyi Çalıştırın

```bash
# Terminal 1: Frontend
npm start

# Terminal 2: Backend
cd backend
npm start
```

---

## Kod Standartları

### JavaScript/React

- **ESLint** kurallarına uyun
- **Functional components** kullanın
- **React Hooks** kullanın
- **Prop types** tanımlayın (opsiyonel)
- **Meaningful variable names** kullanın

### CSS

- **BEM metodolojisi** kullanın (opsiyonel)
- **Responsive design** düşünün
- **CSS variables** kullanın
- **Mobile-first** yaklaşım benimseyin

### Dosya Yapısı

```
src/
├── components/          # React bileşenleri
├── styles/             # CSS dosyaları
├── utils/              # Yardımcı fonksiyonlar
└── hooks/              # Custom hooks
```

### Naming Conventions

- **Components**: PascalCase (örn: `PaymentModal.js`)
- **Files**: camelCase (örn: `useToast.js`)
- **CSS Classes**: kebab-case (örn: `.payment-modal`)
- **Functions**: camelCase (örn: `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (örn: `API_KEY`)

---

## Commit Mesajları

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipler

- `feat`: Yeni özellik
- `fix`: Bug düzeltmesi
- `docs`: Dokümantasyon
- `style`: Kod formatı (whitespace, formatting)
- `refactor`: Kod iyileştirme
- `test`: Test ekleme/düzenleme
- `chore`: Build/config değişiklikleri
- `perf`: Performance iyileştirme

### Örnekler

```bash
feat(payment): add credit card validation

- Implement LUHN algorithm
- Add expiry date validation
- Add CVV format check

Closes #123
```

```bash
fix(auth): resolve login redirect issue

Users were not redirected after successful login.
Fixed by updating the navigation logic in header.js.

Fixes #456
```

```bash
docs(readme): update installation instructions

- Add backend setup steps
- Include Firebase configuration guide
- Add troubleshooting section
```

---

## Pull Request Süreci

### 1. Yeni Branch Oluşturun

```bash
git checkout -b feature/your-feature-name
```

### Branch Naming

- `feature/`: Yeni özellikler için
- `fix/`: Bug düzeltmeleri için
- `docs/`: Dokümantasyon için
- `refactor/`: Refactoring için

Örnek:
```bash
git checkout -b feature/add-payment-history
git checkout -b fix/login-redirect-bug
git checkout -b docs/update-readme
```

### 2. Değişikliklerinizi Yapın

- Kod standartlarına uyun
- Anlamlı commit mesajları yazın
- Küçük, mantıklı commit'ler yapın

### 3. Test Edin

```bash
# Testleri çalıştırın
npm test

# Build yapın
npm run build
```

### 4. Push Edin

```bash
git push origin feature/your-feature-name
```

### 5. Pull Request Açın

GitHub'da repository'nize gidin ve "New Pull Request" butonuna tıklayın.

#### PR Template

```markdown
## Değişiklikler

- [x] Feature 1 eklendi
- [x] Bug #123 düzeltildi
- [ ] Documentation güncellendi

## Tanım

Bu PR, kullanıcıların ödeme geçmişini görebilmelerini sağlar.

## Test Edildi

- [x] Manuel test
- [x] Unit testler
- [ ] E2E testler

## Screenshots (opsiyonel)

![Screenshot](url)

## Checklist

- [x] Kod standartlarına uygun
- [x] Testler eklendi
- [x] Documentation güncellendi
- [x] Commits anlamlı

## Related Issues

Closes #123
```

---

## Bug Raporlama

### GitHub Issues Kullanın

Bug bulduğunuzda [GitHub Issues](https://github.com/kaanozsicak/biletcepte/issues) üzerinden rapor edin.

### Bug Report Template

```markdown
**Bug Tanımı**
Kısa ve açık bir açıklama.

**Adımlar**
1. '...' sayfasına git
2. '...' butonuna tıkla
3. '...' formunu doldur
4. Hatayı gör

**Beklenen Davranış**
Ne olması gerekiyordu?

**Gerçek Davranış**
Ne oldu?

**Screenshots**
Varsa ekran görüntüleri ekleyin.

**Ortam**
- OS: [örn: Windows 11]
- Browser: [örn: Chrome 120]
- Version: [örn: 1.0.0]

**Ek Bilgi**
Console logları, hata mesajları vs.
```

---

## Özellik İsteği

### Feature Request Template

```markdown
**Özellik Tanımı**
Hangi özelliği istiyorsunuz?

**Problem**
Hangi sorunu çözüyor?

**Çözüm Önerisi**
Nasıl çözülmesini öneriyorsunuz?

**Alternatifler**
Başka çözümler düşündünüz mü?

**Ek Bilgi**
Mockup, wireframe, referans linkler vs.
```

---

## Sorularınız için

- 📧 Email: [your-email@example.com]
- 💬 GitHub Discussions
- 🐛 GitHub Issues

---

## 🙏 Teşekkürler!

Projeye katkıda bulunduğunuz için teşekkür ederiz! Her katkı değerlidir. 🎉

---

<div align="center">

Made with ❤️ by the BiletCepte Community

</div>
