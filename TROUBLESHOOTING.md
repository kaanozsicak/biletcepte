# 🔍 Bilet Arama Sorun Giderme

## 🐛 Sorun: "0 bilet bulundu" Hatası

Eğer Firebase'de bilet olmasına rağmen arama sonucunda `0 bilet bulundu` görüyorsanız, şu adımları takip edin:

---

## 📊 1. KONSOL KONTROLÜ

### Adım 1: Browser Console'u Aç
- **Chrome/Edge:** `F12` veya `Ctrl + Shift + J`
- **Firefox:** `F12` veya `Ctrl + Shift + K`

### Adım 2: Console Loglarını İncele

Bilet aradıktan sonra console'da şunları göreceksiniz:

#### ✅ BAŞARILI SENARYO:
```
📡 Firebase bağlantısı kuruluyor...
🔍 Arama kriterleri: {nereden: "bur", nereye: "bal", tarih: "2024-06-30"}
📊 Firebase snapshot: DataSnapshot {...}
✅ Snapshot exists? true
📦 Firebase'den gelen tüm biletler: {bilet1: {...}, bilet2: {...}}
📊 Toplam bilet sayısı: 5
🔍 Kontrol ediliyor [bilet1]: {nereden: "bur", nereye: "bal", ...}
   ➡️ nereden: "bur" === "bur" ? true
   ➡️ nereye: "bal" === "bal" ? true
   ➡️ tarih: "2024-06-30" === "2024-06-30" ? true
   ✅ Bilet eşleşti!
✅ 1 bilet bulundu [{...}]
```

#### ❌ BAŞARISIZ SENARYO 1: Firebase'de veri yok
```
📡 Firebase bağlantısı kuruluyor...
🔍 Arama kriterleri: {nereden: "bur", nereye: "bal", tarih: "2024-06-30"}
📊 Firebase snapshot: DataSnapshot {...}
❌ Snapshot exists? false
❌ Veritabanında hiç bilet yok (snapshot.exists() = false)
⚠️ Firebase kurallarını kontrol edin!
```

**ÇÖZÜM:** 
- `FIREBASE_BILET_ORNEGI.md` dosyasını aç
- "Yöntem 2: JSON Import" bölümünü takip et
- Örnek biletleri Firebase'e ekle

#### ❌ BAŞARISIZ SENARYO 2: Firebase kuralları izin vermiyor
```
📡 Firebase bağlantısı kuruluyor...
❌ Bilet arama hatası: FirebaseError: Permission denied
🚫 Firebase PERMISSION_DENIED hatası!
📝 Çözüm: Firebase Console > Realtime Database > Rules sekmesinden okuma izni verin
```

**ÇÖZÜM:**
- `FIREBASE_SETUP.md` dosyasını aç
- Firebase kurallarını güncelle (adım adım anlatım var)

#### ❌ BAŞARISIZ SENARYO 3: Veri var ama eşleşmiyor
```
📡 Firebase bağlantısı kuruluyor...
📦 Firebase'den gelen tüm biletler: {bilet1: {...}}
📊 Toplam bilet sayısı: 1
🔍 Kontrol ediliyor [bilet1]: {nereden: "ist", nereye: "izmir", ...}
   ➡️ nereden: "ist" === "bur" ? false
   ➡️ nereye: "izmir" === "bal" ? false
   ➡️ tarih: "2024-07-15" === "2024-06-30" ? false
   ❌ Bilet eşleşmedi
✅ 0 bilet bulundu []
```

**ÇÖZÜM:**
- Arama kriterlerini kontrol et
- Firebase'deki bilet verilerinin şehir kodları ve tarihlerini kontrol et
- Şehir kodları: `bur`, `ist`, `bal`, `izmir` (küçük harf!)

---

## 🔧 2. FİREBASE KONTROL LİSTESİ

### ✅ Yapılması Gerekenler:

#### 1. Firebase'de Bilet Var Mı?
- [ ] Firebase Console aç
- [ ] Realtime Database'e git
- [ ] `biletler` node'unu gör
- [ ] En az 1 bilet var (örnek: `bilet1`)

#### 2. Firebase Kuralları Doğru Mu?
- [ ] Realtime Database > Rules sekmesine git
- [ ] Şu kurallar var mı?
```json
{
  "rules": {
    "biletler": {
      ".read": true,
      ".write": true
    }
  }
}
```
- [ ] "Publish" butonu tıklandı mı?

#### 3. Veri Formatı Doğru Mu?
Bilet örneği:
```json
{
  "bilet1": {
    "nereden": "bur",      ← Küçük harf!
    "nereye": "bal",       ← Küçük harf!
    "tarih": "2024-06-30", ← YYYY-MM-DD formatı!
    "firma": "Metro Turizm",
    "saat": "09:00",
    "fiyat": "450",
    "koltukSayisi": "25"
  }
}
```

**Dikkat Edilmesi Gerekenler:**
- ❌ `"Bursa"` değil → ✅ `"bur"`
- ❌ `"Balıkesir"` değil → ✅ `"bal"`
- ❌ `"30/06/2024"` değil → ✅ `"2024-06-30"`

---

## 🎯 3. HIZLI TEST

### Test Bileti Ekle:
1. Firebase Console > Realtime Database
2. `biletler` node'una git
3. **"+"** tıkla, `bilet_test` adında node oluştur
4. İçine şunları ekle:
   - `nereden`: `bur`
   - `nereye`: `bal`
   - `tarih`: `2024-06-30`

### Test Et:
1. Ana sayfaya git
2. Nereden: **Bursa**
3. Nereye: **Balıkesir**
4. Tarih: **30 Haziran 2024**
5. **Bilet Ara** tıkla
6. Console'u kontrol et

---

## 📞 Hala Çalışmıyor?

Console'daki tüm logları kopyala ve paylaş:
```
🔍 Bilet aranıyor: ...
📡 Firebase bağlantısı kuruluyor...
... (tüm loglar)
```

---

## 🔑 Şehir Kodları Referansı

| Şehir | Kod |
|-------|-----|
| Balıkesir | `bal` |
| İstanbul | `ist` |
| İzmir | `izmir` |
| Bursa | `bur` |

---

## 📅 Tarih Formatı

Doğru format: `YYYY-MM-DD`

✅ Doğru örnekler:
- `2024-06-30`
- `2024-12-25`
- `2025-01-01`

❌ Yanlış örnekler:
- `30-06-2024`
- `30/06/2024`
- `2024.06.30`
- `30 Haziran 2024`
