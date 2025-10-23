# 🎫 Admin Paneli Kullanım Kılavuzu

## 📋 Admin Paneli Nedir?

Admin paneli, BiletCepte sistemine bilet eklemek, düzenlemek ve silmek için kullanılan yönetim arayüzüdür. Firebase'e manuel JSON girişi yapmak yerine, kullanıcı dostu bir arayüz üzerinden tüm işlemleri yapabilirsiniz.

---

## 🔐 Admin Paneline Erişim

### 1. Admin Sayfasına Git
- URL: `http://localhost:3000/admin`
- Veya menüden **"⚙️ Admin"** linkine tıkla (giriş yapmış kullanıcılar için)

### 2. Giriş Yap
- **Test Şifresi:** `admin123`
- Şifre girdikten sonra **"Giriş Yap"** butonuna tıkla

⚠️ **GÜVENLİK UYARISI:** 
- Şifreyi mutlaka değiştirin! 
- `src/admin.js` dosyasında 27. satırda:
  ```javascript
  const ADMIN_PASSWORD = 'admin123'; // ← Bunu değiştir!
  ```

---

## ✅ Admin Paneli Özellikleri

### 📊 Dashboard
- **Toplam bilet sayısı** gösterimi
- **Hızlı erişim** butonları
- **Yenile** butonu ile liste güncelleme

### ➕ Yeni Bilet Ekleme

#### Zorunlu Alanlar:
1. **📍 Nereden:** Başlangıç şehri
   - Balıkesir
   - İstanbul
   - İzmir
   - Bursa

2. **🎯 Nereye:** Varış şehri
   - Balıkesir
   - İstanbul
   - İzmir
   - Bursa

3. **📅 Tarih:** Seyahat tarihi
   - Format: YYYY-MM-DD
   - Örnek: 2024-06-30

#### Opsiyonel Alanlar:
- **🚌 Firma:** Otobüs firması adı (örn: Metro Turizm)
- **⏰ Kalkış Saati:** HH:MM formatında (örn: 09:00)
- **💰 Fiyat:** TL cinsinden (örn: 450)
- **🪑 Boş Koltuk:** Sayı (örn: 25)

#### Bilet Ekleme Adımları:
1. Formu doldurun
2. **"➕ Bilet Ekle"** butonuna tıklayın
3. Başarı mesajını bekleyin
4. Liste otomatik güncellenecek

---

### ✏️ Bilet Düzenleme

1. Bilet listesinde düzenlemek istediğiniz biletin yanındaki **✏️** butonuna tıklayın
2. Form otomatik dolacak ve yukarı scroll yapacak
3. Değişiklikleri yapın
4. **"✅ Güncelle"** butonuna tıklayın
5. Veya **"❌ İptal"** ile düzenlemeyi iptal edin

---

### 🗑️ Bilet Silme

1. Bilet listesinde silmek istediğiniz biletin yanındaki **🗑️** butonuna tıklayın
2. Onay penceresinde **"Tamam"** deyin
3. Bilet kalıcı olarak silinecek

⚠️ **DİKKAT:** Silme işlemi geri alınamaz!

---

## 📋 Bilet Listesi

### Tablo Sütunları:
- **Güzergah:** Başlangıç → Varış
- **Tarih:** Seyahat tarihi (Türkçe format)
- **Firma:** Otobüs firması
- **Saat:** Kalkış saati
- **Fiyat:** Bilet fiyatı
- **Koltuk:** Boş koltuk sayısı
- **İşlemler:** Düzenle ve Sil butonları

### Özellikler:
- ✅ Responsive tasarım (mobil uyumlu)
- ✅ Hover efektleri
- ✅ Otomatik güncelleme
- ✅ Yükleme animasyonu

---

## 🔄 Yenileme

- **🔄 Yenile** butonu ile listeyi manuel yenileyebilirsiniz
- Her ekleme/düzenleme/silme işleminden sonra liste otomatik yenilenir

---

## 🚪 Çıkış Yapma

1. Sağ üstteki **"🚪 Çıkış Yap"** butonuna tıklayın
2. Onay penceresinde **"Tamam"** deyin
3. Giriş ekranına yönlendirileceksiniz

---

## 💡 İpuçları

### 1. Hızlı Bilet Ekleme
- **Tab** tuşu ile alanlar arası geçiş yapabilirsiniz
- Tarih seçimi için date picker kullanılır
- Saat seçimi için time picker kullanılır

### 2. Toplu İşlemler
- Birden fazla bilet eklemek için formu tekrar tekrar kullanın
- Her ekleme sonrası form otomatik temizlenir

### 3. Hata Durumları
- **"Başlangıç ve varış şehri aynı olamaz"** → Farklı şehirler seçin
- **"Lütfen zorunlu alanları doldurun"** → (*) işaretli alanları doldurun
- **"Permission denied"** → Firebase kurallarını kontrol edin

---

## 🔒 Güvenlik

### Admin Şifresini Değiştirme:

1. **Dosya:** `src/admin.js`
2. **Satır:** 27
3. **Kod:**
   ```javascript
   const ADMIN_PASSWORD = 'yeni_güçlü_şifre_123!@#';
   ```

### Önerilen Şifre Formatı:
- ✅ En az 12 karakter
- ✅ Büyük ve küçük harf
- ✅ Sayı ve özel karakter
- ✅ Tahmin edilemez
- ❌ "admin", "123456", "password" gibi kolay şifreler kullanmayın

### Gelişmiş Güvenlik:
Gerçek üretim ortamı için Firebase Authentication kullanın:
- Şifreler şifrelenerek saklanır
- Rol bazlı erişim kontrolü
- Oturum yönetimi
- 2FA (İki faktörlü doğrulama) desteği

---

## 🐛 Sorun Giderme

### Problem: Admin paneline giriş yapamıyorum
**Çözüm:**
- Şifreyi kontrol edin (varsayılan: `admin123`)
- Browser cache'i temizleyin
- Console'da hata kontrolü yapın (F12)

### Problem: Bilet eklenmiyor
**Çözüm:**
- Firebase kurallarını kontrol edin
- Console'da hata mesajını okuyun
- İnternet bağlantınızı kontrol edin
- Firebase Database URL'sini kontrol edin

### Problem: Biletler görünmüyor
**Çözüm:**
- **🔄 Yenile** butonuna tıklayın
- Firebase'de `biletler` node'u var mı kontrol edin
- Browser console'da hata var mı bakın

---

## 📊 Örnek Kullanım Senaryoları

### Senaryo 1: İlk Bilet Ekleme
```
1. Admin paneline giriş yap (admin123)
2. Form doldur:
   - Nereden: Bursa
   - Nereye: İstanbul
   - Tarih: 2024-12-25
   - Firma: Metro Turizm
   - Saat: 09:00
   - Fiyat: 450
   - Koltuk: 25
3. "➕ Bilet Ekle" tıkla
4. ✅ Başarı mesajı gelecek
5. Liste güncellenecek
```

### Senaryo 2: Bilet Güncelleme
```
1. Listeden güncellenecek bileti bul
2. ✏️ butonuna tıkla
3. Fiyatı 450'den 500'e değiştir
4. "✅ Güncelle" tıkla
5. ✅ Bilet güncellendi
```

### Senaryo 3: Eski Bilet Silme
```
1. Tarihi geçmiş bileti bul
2. 🗑️ butonuna tıkla
3. Onay ver
4. ✅ Bilet silindi
```

---

## 🎯 Keyboard Shortcuts

| Tuş | Aksiyon |
|-----|---------|
| `Tab` | Sonraki alana geç |
| `Shift + Tab` | Önceki alana geç |
| `Enter` | Form submit (bilet ekle/güncelle) |
| `Esc` | Modal kapat (gelecek özellik) |

---

## 📱 Mobil Kullanım

Admin paneli tamamen responsive'dir:

### Tablet (768px - 1024px):
- ✅ Grid layout 2 sütun
- ✅ Tüm özellikler çalışır
- ✅ Tablo scroll edilebilir

### Mobil (< 768px):
- ✅ Tek sütun layout
- ✅ Butonlar full-width
- ✅ Tablo horizontal scroll
- ✅ Touch friendly

---

## 🔮 Gelecek Özellikler

- [ ] Toplu bilet yükleme (CSV/Excel)
- [ ] Bilet arama ve filtreleme
- [ ] İstatistik dashboard
- [ ] Backup ve restore
- [ ] Bilet şablonları
- [ ] Kampanya yönetimi
- [ ] E-posta bildirimleri
- [ ] Audit log (değişiklik geçmişi)

---

## 📞 Destek

Sorun yaşıyorsanız:
1. `TROUBLESHOOTING.md` dosyasını kontrol edin
2. Browser console'daki hataları paylaşın
3. Firebase kurallarını gözden geçirin
4. GitHub Issues'a ticket açın

---

## ⚡ Hızlı Başlangıç

```bash
# 1. Uygulamayı başlat
npm start

# 2. Admin paneline git
http://localhost:3000/admin

# 3. Giriş yap
Şifre: admin123

# 4. İlk biletini ekle!
```

Başarılar! 🎉
