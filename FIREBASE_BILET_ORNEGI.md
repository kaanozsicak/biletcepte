# 🎫 Firebase Bilet Verisi Ekleme Kılavuzu

## 📋 Bilet Arama Sistemi Nasıl Çalışır?

Bilet arama fonksiyonu artık Firebase Realtime Database'den veri çekiyor ve aşağıdaki kriterlere göre filtreleme yapıyor:
- **nereden** (başlangıç şehri)
- **nereye** (varış şehri)
- **tarih** (seyahat tarihi)

---

## 🔥 Firebase'e Bilet Verisi Ekleme

### Adım 1: Firebase Console'a Git
1. [Firebase Console](https://console.firebase.google.com/) adresine git
2. Projenizi seçin: **biletcepte-a5ec6**
3. Sol menüden **"Realtime Database"** seçeneğine tıkla

### Adım 2: Bilet Verisi Ekle

**Veri Yapısı:**
```
biletcepte-a5ec6-default-rtdb/
└── biletler/
    ├── bilet1/
    │   ├── nereden: "bur"
    │   ├── nereye: "bal"
    │   ├── tarih: "2024-06-30"
    │   ├── firma: "Metro Turizm"
    │   ├── saat: "09:00"
    │   ├── fiyat: "450"
    │   └── koltukSayisi: "25"
    ├── bilet2/
    │   ├── nereden: "ist"
    │   ├── nereye: "izmir"
    │   ├── tarih: "2024-07-15"
    │   ├── firma: "Pamukkale"
    │   ├── saat: "14:30"
    │   ├── fiyat: "650"
    │   └── koltukSayisi: "12"
    └── bilet3/
        ├── nereden: "bal"
        ├── nereye: "ist"
        ├── tarih: "2024-08-01"
        ├── firma: "Kamil Koç"
        ├── saat: "18:00"
        ├── fiyat: "380"
        └── koltukSayisi: "30"
```

---

## 📝 Şehir Kodları

Arama yaparken şu kodları kullanın:
- **bal** = Balıkesir
- **ist** = İstanbul
- **izmir** = İzmir
- **bur** = Bursa

---

## 🔧 Firebase'de Veri Ekleme (Manuel)

### Yöntem 1: Firebase Console UI Kullanarak (ÖNERİLEN)

#### Adım 1: Firebase Console'a Giriş
1. [Firebase Console](https://console.firebase.google.com/) adresine git
2. **biletcepte-a5ec6** projesine tıkla
3. Sol menüden **"Realtime Database"** seç
4. **"Data"** sekmesine git

#### Adım 2: Root Node Oluştur
1. Database root'una (en üstte, URL'in yanında) gel
2. **"+"** butonuna tıkla
3. Name: `biletler`
4. Value boş bırak (object olacak)
5. **"Add"** butonuna tıkla

#### Adım 3: İlk Bileti Ekle
1. `biletler` node'una tıkla
2. **"+"** butonuna tıkla
3. Name: `bilet1`
4. Value boş bırak
5. **"Add"** butonuna tıkla

#### Adım 4: Bilet Alanlarını Ekle
Şimdi `bilet1` içine her alanı tek tek ekle:

**1. nereden ekle:**
- `bilet1` üzerine tıkla, **"+"** butonuna tıkla
- Name: `nereden`
- Value: `bur` (tırnak işareti YOK!)
- **"Add"** tıkla

**2. nereye ekle:**
- `bilet1` üzerine tıkla, **"+"** butonuna tıkla
- Name: `nereye`
- Value: `bal`
- **"Add"** tıkla

**3. tarih ekle:**
- `bilet1` üzerine tıkla, **"+"** butonuna tıkla
- Name: `tarih`
- Value: `2024-06-30`
- **"Add"** tıkla

**4. firma ekle (opsiyonel):**
- `bilet1` üzerine tıkla, **"+"** butonuna tıkla
- Name: `firma`
- Value: `Metro Turizm`
- **"Add"** tıkla

**5. saat ekle (opsiyonel):**
- `bilet1` üzerine tıkla, **"+"** butonuna tıkla
- Name: `saat`
- Value: `09:00`
- **"Add"** tıkla

**6. fiyat ekle (opsiyonel):**
- `bilet1` üzerine tıkla, **"+"** butonuna tıkla
- Name: `fiyat`
- Value: `450`
- **"Add"** tıkla

**7. koltukSayisi ekle (opsiyonel):**
- `bilet1` üzerine tıkla, **"+"** butonuna tıkla
- Name: `koltukSayisi`
- Value: `25`
- **"Add"** tıkla

#### Adım 5: Sonuç Kontrolü
Şimdi database'iniz şöyle görünmeli:
```
biletler
  └── bilet1
      ├── nereden: "bur"
      ├── nereye: "bal"
      ├── tarih: "2024-06-30"
      ├── firma: "Metro Turizm"
      ├── saat: "09:00"
      ├── fiyat: "450"
      └── koltukSayisi: "25"
```

#### Adım 6: Test Et!
1. Ana sayfaya git
2. Nereden: **Bursa**
3. Nereye: **Balıkesir**
4. Tarih: **2024-06-30**
5. **"🔍 Bilet Ara"** butonuna tıkla

✅ **Başarılı!** 1 bilet bulunmalı

---

### Yöntem 2: JSON Import (DAHA HIZLI)

1. Firebase Console'da **"⋮"** (üç nokta) menüsüne tıkla
2. **"Import JSON"** seçeneğini seç
3. Aşağıdaki JSON'u yapıştır:

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
    },
    "bilet2": {
      "nereden": "ist",
      "nereye": "izmir",
      "tarih": "2024-07-15",
      "firma": "Pamukkale",
      "saat": "14:30",
      "fiyat": "650",
      "koltukSayisi": "12"
    },
    "bilet3": {
      "nereden": "bal",
      "nereye": "ist",
      "tarih": "2024-08-01",
      "firma": "Kamil Koç",
      "saat": "18:00",
      "fiyat": "380",
      "koltukSayisi": "30"
    },
    "bilet4": {
      "nereden": "izmir",
      "nereye": "bur",
      "tarih": "2024-06-25",
      "firma": "Ulusoy",
      "saat": "11:00",
      "fiyat": "520",
      "koltukSayisi": "18"
    },
    "bilet5": {
      "nereden": "bal",
      "nereye": "bur",
      "tarih": "2024-07-01",
      "firma": "Metro Turizm",
      "saat": "16:00",
      "fiyat": "400",
      "koltukSayisi": "22"
    }
  }
}
```

4. **"Import"** butonuna tıkla
5. Onay ver

✅ **Tamamlandı!** 5 test bileti eklendi

---

## ⚠️ ÖNEMLİ: Firebase Kurallarını Güncellemeyi Unutma!

Veri ekledikten sonra **mutlaka** Firebase kurallarını güncelle:

1. Firebase Console > Realtime Database
2. **"Rules"** sekmesine git
3. Şu kuralı ekle:

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
    }
  }
}
```

4. **"Publish"** tıkla

⚠️ **Bu olmadan veriler okunamaz!**

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
    },
    "bilet2": {
      "nereden": "ist",
      "nereye": "izmir",
      "tarih": "2024-07-15",
      "firma": "Pamukkale",
      "saat": "14:30",
      "fiyat": "650",
      "koltukSayisi": "12"
    },
    "bilet3": {
      "nereden": "bal",
      "nereye": "ist",
      "tarih": "2024-08-01",
      "firma": "Kamil Koç",
      "saat": "18:00",
      "fiyat": "380",
      "koltukSayisi": "30"
    },
    "bilet4": {
      "nereden": "izmir",
      "nereye": "bur",
      "tarih": "2024-06-25",
      "firma": "Ulusoy",
      "saat": "11:00",
      "fiyat": "520",
      "koltukSayisi": "18"
    },
    "bilet5": {
      "nereden": "bal",
      "nereye": "bur",
      "tarih": "2024-07-01",
      "firma": "Metro Turizm",
      "saat": "16:00",
      "fiyat": "400",
      "koltukSayisi": "22"
    }
  }
}
```

---

## ✅ Test Senaryoları

### Test 1: Bursa → Balıkesir (30 Haziran 2024)
- **Nereden:** Bursa (bur)
- **Nereye:** Balıkesir (bal)
- **Tarih:** 2024-06-30
- **Beklenen Sonuç:** 1 bilet bulunmalı (Metro Turizm, 450 TL)

### Test 2: İstanbul → İzmir (15 Temmuz 2024)
- **Nereden:** İstanbul (ist)
- **Nereye:** İzmir (izmir)
- **Tarih:** 2024-07-15
- **Beklenen Sonuç:** 1 bilet bulunmalı (Pamukkale, 650 TL)

### Test 3: Balıkesir → İstanbul (1 Ağustos 2024)
- **Nereden:** Balıkesir (bal)
- **Nereye:** İstanbul (ist)
- **Tarih:** 2024-08-01
- **Beklenen Sonuç:** 1 bilet bulunmalı (Kamil Koç, 380 TL)

---

## 🔍 Arama Fonksiyonu Özellikleri

✅ Firebase Realtime Database entegrasyonu
✅ Başlangıç, varış ve tarih filtreleme
✅ Loading (yükleniyor) durumu
✅ Sonuç bulunamadı mesajı
✅ Bilet kartları ile güzel görsel sunuş
✅ Responsive (mobil uyumlu) tasarım
✅ Detaylı konsol logları

---

## 🐛 Hata Ayıklama

### Console'da Şunları Göreceksiniz:

**Başarılı Arama:**
```
🔍 Bilet aranıyor: bur bal 2024-06-30
✅ 1 bilet bulundu [Array]
```

**Bilet Bulunamadı:**
```
🔍 Bilet aranıyor: ist bur 2024-12-31
✅ 0 bilet bulundu []
```

**Hata Durumu:**
```
❌ Bilet arama hatası: [Error details]
```

---

## 📊 Veri Formatı Notları

- **Tarih Formatı:** `YYYY-MM-DD` (örnek: 2024-06-30)
- **Şehir Kodları:** Küçük harf olmalı (bur, ist, bal, izmir)
- **Fiyat:** String olarak saklanıyor (örnek: "450")
- **Saat:** HH:MM formatında (örnek: "09:00")

---

## 🚀 Gelecek Geliştirmeler

- [ ] Tarih aralığı araması
- [ ] Fiyat filtreleme
- [ ] Firma filtreleme
- [ ] Koltuk seçimi sistemi
- [ ] Ödeme entegrasyonu
- [ ] Bilet satın alma fonksiyonu
- [ ] QR kod oluşturma
- [ ] E-posta ile bilet gönderme
