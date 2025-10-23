# 🎫 Bilet Satın Alma ve İptal Sistemi

## ✅ Tamamlanan Özellikler

### 1. 🛒 Bilet Satın Alma (div.js)
- Ana sayfada bilet arama sonuçlarında **"🛒 Satın Al"** butonu eklendi
- Kullanıcı giriş kontrolü yapılıyor
- Satın alma öncesi detaylı onay penceresi
- Firebase'e `kullaniciBiletleri/{email}/` yoluna kayıt yapılıyor
- Satın alınan biletlere özel alanlar:
  - `satinAlmaTarihi`: ISO formatında tarih
  - `kullaniciEmail`: Kullanıcının email adresi
  - `durum`: 'aktif' veya 'iptal edildi'

### 2. 📋 Biletlerim Sayfası (biletler.js)
- Kullanıcının tüm biletleri listeleniyor
- Giriş yapılmamışsa uyarı ekranı gösteriliyor
- Biletler tarihe göre sıralanıyor (en yeni önce)
- Detaylı bilet kartları:
  - Güzergah bilgisi (Nereden → Nereye)
  - Seyahat tarihi
  - Satın alma tarihi
  - Firma, kalkış saati, fiyat, koltuk sayısı
  - Bilet ID
  - Durum badge'i (Aktif/İptal)

### 3. 🗑️ Bilet İptal (biletler.js)
- Her biletin altında **"🗑️ Bileti İptal Et"** butonu
- İptal öncesi detaylı onay penceresi
- Firebase'den bilet siliniyor
- Liste otomatik güncelleniyor
- Başarı/hata bildirimleri

### 4. 🎨 Yeni Stil Dosyası (biletler.css)
- Modern ve profesyonel bilet kartları
- Glassmorphism efektleri
- Hover animasyonları
- Responsive tasarım (mobil, tablet, desktop)
- Gradient arka planlar
- Status badge'leri (Aktif/İptal)

---

## 🔧 Firebase Veritabanı Yapısı

```json
{
  "biletler": {
    "bilet1": {
      "nereden": "bur",
      "nereye": "bal",
      "tarih": "2024-06-30",
      "firma": "Metro Turizm",
      "saat": "09:00",
      "fiyat": "450",
      "koltukSayisi": "25"
    }
  },
  "kullaniciBiletleri": {
    "user_email_com": {
      "-NxYz123abc": {
        "nereden": "bur",
        "nereye": "bal",
        "tarih": "2024-06-30",
        "firma": "Metro Turizm",
        "saat": "09:00",
        "fiyat": "450",
        "koltukSayisi": "25",
        "satinAlmaTarihi": "2024-10-23T10:30:00.000Z",
        "kullaniciEmail": "user@email.com",
        "durum": "aktif"
      }
    }
  },
  "kullanicilar": {
    "user1": {
      "email": "user@email.com",
      "sifre": "hashed_password"
    }
  }
}
```

### Email Key Formatı:
- Email: `user@email.com`
- Firebase Key: `user_email_com`
- Dönüşüm: `.` ve `@` karakterleri `_` ile değiştirilir

---

## 🔐 Firebase Kuralları

Firebase Console'da **Realtime Database → Rules** bölümüne gidin ve şu kuralları ekleyin:

```json
{
  "rules": {
    "kullanicilar": {
      ".read": true,
      ".write": true
    },
    "biletler": {
      ".read": true,
      ".write": true
    },
    "kullaniciBiletleri": {
      "$userId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

⚠️ **ÖNEMLİ:** Production'da bu kurallar daha güvenli olmalı:
```json
{
  "rules": {
    "kullaniciBiletleri": {
      "$userId": {
        ".read": "auth != null && auth.uid == $userId",
        ".write": "auth != null && auth.uid == $userId"
      }
    }
  }
}
```

---

## 🎯 Kullanım Senaryoları

### Senaryo 1: Bilet Satın Alma
```
1. Kullanıcı giriş yapar
2. Ana sayfada bilet arar (örn: Bursa → Balıkesir, 2024-06-30)
3. Arama sonuçlarında biletleri görür
4. "🛒 Satın Al" butonuna tıklar
5. Onay penceresinde bilgileri kontrol eder
6. "Tamam" derse bilet satın alınır
7. Firebase'e kaydedilir
8. "Biletlerim" sayfasından görüntüleyebilir
```

### Senaryo 2: Biletleri Görüntüleme
```
1. Kullanıcı "🎫 Biletlerim" linkine tıklar
2. Giriş yapmışsa tüm biletleri görür
3. Her bilet kartında detaylı bilgiler
4. Satın alma tarihi ve durum bilgisi
```

### Senaryo 3: Bilet İptal
```
1. "Biletlerim" sayfasına gider
2. İptal etmek istediği biletin "🗑️ Bileti İptal Et" butonuna tıklar
3. Onay penceresinde bilgileri kontrol eder
4. "Tamam" derse bilet iptal edilir
5. Firebase'den silınır
6. Liste otomatik güncellenir
```

---

## 📱 Kullanıcı Arayüzü Özellikleri

### Ana Sayfa (div.js)
- ✅ Bilet arama formu
- ✅ Arama sonuçları listesi
- ✅ **Satın Al** butonu her bilet kartında
- ✅ Loading spinner
- ✅ Boş sonuç ekranı

### Biletlerim Sayfası (biletler.js)
- ✅ Giriş kontrolü
- ✅ Loading spinner
- ✅ Detaylı bilet kartları
- ✅ Status badge (Aktif/İptal)
- ✅ **İptal Et** butonu
- ✅ Boş durum ekranı
- ✅ Toplam bilet sayısı

---

## 🎨 Tasarım Özellikleri

### Bilet Kartları (biletler.css)
- Gradient arka planlar
- 5px üst kenar çizgisi (yeşil gradient)
- Hover animasyonları (translateY, shadow)
- Grid layout (responsive)
- Status badge'leri (yeşil: aktif, kırmızı: iptal)
- Detay itemları (grid layout)
- İptal butonu (kırmızı gradient)

### Renkler:
- **Yeşil (Ana):** #0a5c0a, #0d7a0d
- **Kırmızı (İptal):** #e74c3c, #c0392b
- **Yeşil (Aktif):** #4caf50, #66bb6a
- **Gri (Arka Plan):** #f8f9fa, #e9ecef

---

## 🔄 Veri Akışı

### Satın Alma:
```
User Action → handleSatinAl() 
  → localStorage check 
  → Onay penceresi 
  → Firebase push() 
  → Başarı mesajı
```

### Biletleri Getirme:
```
Page Load → useEffect() 
  → localStorage check 
  → fetchBiletler() 
  → Firebase get() 
  → setState() 
  → Render
```

### İptal:
```
User Action → handleIptal() 
  → Onay penceresi 
  → Firebase remove() 
  → setState (filter) 
  → Başarı mesajı
```

---

## 🚀 Test Adımları

### 1. Bilet Satın Alma Testi:
```bash
1. npm start
2. Siteye giriş yap (veya kayıt ol)
3. Ana sayfada bilet ara (bur → bal, 2024-06-30)
4. "Satın Al" butonuna tıkla
5. Onaylayınca "Başarıyla satın alındı" mesajı görmeli
```

### 2. Biletleri Görüntüleme Testi:
```bash
1. Header'dan "Biletlerim" linkine tıkla
2. Satın aldığın biletleri görmelisin
3. Tüm detaylar (firma, saat, fiyat, vs.) görünmeli
4. "Aktif" badge'i yeşil olmalı
```

### 3. İptal Testi:
```bash
1. Biletlerim sayfasında bir bilet seç
2. "Bileti İptal Et" butonuna tıkla
3. Onaylayınca bilet listeden kaybolmalı
4. Firebase'de de silinmiş olmalı
```

---

## 💡 Gelecek Özellikler

### Yakında Eklenecek:
- [ ] PDF bilet indirme
- [ ] QR kod oluşturma
- [ ] Email ile bilet gönderme
- [ ] Bilet geçmişi (iptal edilmiş biletler)
- [ ] Filtreleme ve sıralama
- [ ] Toplam harcama raporu
- [ ] Favori güzergahlar
- [ ] Bilet hatırlatıcıları
- [ ] İndirim kuponu sistemi
- [ ] Puan sistemi

### Güvenlik İyileştirmeleri:
- [ ] Firebase Authentication entegrasyonu
- [ ] Güvenli kurallar (auth.uid kontrolü)
- [ ] Şifreli email saklama
- [ ] Rate limiting
- [ ] CAPTCHA entegrasyonu

---

## ⚠️ Önemli Notlar

1. **Firebase Kuralları:** Mutlaka `kullaniciBiletleri` node'u için okuma/yazma izni verin
2. **LocalStorage:** Kullanıcı bilgileri `biletcepte_kullanici` key'inde saklanıyor
3. **Email Format:** Firebase key'leri için `.` ve `@` karakterleri `_` ile değiştiriliyor
4. **Bilet ID:** Firebase otomatik ID (`push()`) kullanılıyor
5. **Tarih Format:** ISO 8601 formatında (`YYYY-MM-DDTHH:mm:ss.sssZ`)

---

## 🐛 Bilinen Sorunlar ve Çözümler

### Sorun 1: "Giriş yapmanız gerekiyor" uyarısı
**Çözüm:** localStorage'da `biletcepte_kullanici` var mı kontrol edin

### Sorun 2: Biletler yüklenmiyor
**Çözüm:** Firebase kurallarını kontrol edin, console'da hata var mı bakın

### Sorun 3: İptal çalışmıyor
**Çözüm:** Firebase'de write izni var mı kontrol edin

### Sorun 4: Satın alma sonrası bilet görünmüyor
**Çözüm:** Biletlerim sayfasını yenileyin (F5)

---

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Browser console'u açın (F12)
2. Hataları kontrol edin
3. Firebase kurallarını gözden geçirin
4. localStorage'ı temizleyip tekrar deneyin

---

**🎉 Tebrikler! Bilet satın alma ve iptal sisteminiz hazır!**
