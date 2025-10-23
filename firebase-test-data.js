// Firebase Test Data - Konsola yapıştırın veya terminal'de çalıştırın
// Bu dosyayı kullanarak Firebase'e test biletleri ekleyebilirsiniz

import { getDatabase, ref, set } from 'firebase/database';

// Test biletleri ekle
async function addTestBiletler() {
  const db = getDatabase();
  
  const testBiletler = {
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
  };

  try {
    console.log('🔥 Firebase\'e test biletleri ekleniyor...');
    
    // Her bileti tek tek ekle
    for (const [biletId, biletData] of Object.entries(testBiletler)) {
      const biletRef = ref(db, `biletler/${biletId}`);
      await set(biletRef, biletData);
      console.log(`✅ ${biletId} eklendi:`, biletData);
    }
    
    console.log('🎉 Tüm test biletleri başarıyla eklendi!');
    alert('✅ Test biletleri Firebase\'e eklendi!');
  } catch (error) {
    console.error('❌ Hata:', error);
    alert('❌ Bilet ekleme hatası: ' + error.message);
  }
}

// Fonksiyonu çağır
// addTestBiletler();

export default addTestBiletler;
