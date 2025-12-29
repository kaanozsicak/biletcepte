// seed-biletler.js - Test biletleri eklemek için kullan
// Çalıştır: node backend/seed-biletler.js

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push, get } = require('firebase/database');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCVBtUrEWXXM91NWvnQ3GaOMp_vDxl7WWQ",
  authDomain: "biletcepte-a5ec6.firebaseapp.com",
  databaseURL: "https://biletcepte-a5ec6-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "biletcepte-a5ec6",
  storageBucket: "biletcepte-a5ec6.appspot.com",
  messagingSenderId: "1034963300927",
  appId: "1:1034963300927:web:f9e2c051ac6c3136cb3e8a"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Bugün ve gelecek tarihler
const today = new Date();
const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const addDays = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

// Test biletleri
const testBiletler = [
  // Bugün
  {
    nereden: 'bur',
    nereye: 'ist',
    tarih: addDays(0),
    firma: 'Metro Turizm',
    saat: '08:00',
    fiyat: '350',
    koltukSayisi: '45'
  },
  {
    nereden: 'bur',
    nereye: 'ist',
    tarih: addDays(0),
    firma: 'Kamil Koç',
    saat: '10:30',
    fiyat: '380',
    koltukSayisi: '40'
  },
  {
    nereden: 'bur',
    nereye: 'ank',
    tarih: addDays(0),
    firma: 'Ulusoy',
    saat: '09:00',
    fiyat: '420',
    koltukSayisi: '35'
  },
  // Yarın
  {
    nereden: 'ist',
    nereye: 'ank',
    tarih: addDays(1),
    firma: 'Pamukkale',
    saat: '07:00',
    fiyat: '450',
    koltukSayisi: '42'
  },
  {
    nereden: 'ist',
    nereye: 'izm',
    tarih: addDays(1),
    firma: 'Metro Turizm',
    saat: '14:00',
    fiyat: '320',
    koltukSayisi: '38'
  },
  {
    nereden: 'ank',
    nereye: 'bur',
    tarih: addDays(1),
    firma: 'Kamil Koç',
    saat: '16:30',
    fiyat: '400',
    koltukSayisi: '44'
  },
  // 2 gün sonra
  {
    nereden: 'izm',
    nereye: 'ist',
    tarih: addDays(2),
    firma: 'Varan',
    saat: '06:00',
    fiyat: '380',
    koltukSayisi: '40'
  },
  {
    nereden: 'bur',
    nereye: 'bal',
    tarih: addDays(2),
    firma: 'Nilüfer Turizm',
    saat: '11:00',
    fiyat: '150',
    koltukSayisi: '30'
  },
  {
    nereden: 'bal',
    nereye: 'bur',
    tarih: addDays(2),
    firma: 'Nilüfer Turizm',
    saat: '18:00',
    fiyat: '150',
    koltukSayisi: '28'
  },
  // 3 gün sonra
  {
    nereden: 'ist',
    nereye: 'bur',
    tarih: addDays(3),
    firma: 'Metro Turizm',
    saat: '09:30',
    fiyat: '360',
    koltukSayisi: '46'
  },
  {
    nereden: 'ank',
    nereye: 'ist',
    tarih: addDays(3),
    firma: 'Ulusoy',
    saat: '22:00',
    fiyat: '480',
    koltukSayisi: '42'
  },
  {
    nereden: 'izm',
    nereye: 'ank',
    tarih: addDays(3),
    firma: 'Pamukkale',
    saat: '20:00',
    fiyat: '520',
    koltukSayisi: '38'
  },
  // 5 gün sonra - Hafta sonu
  {
    nereden: 'bur',
    nereye: 'ist',
    tarih: addDays(5),
    firma: 'Kamil Koç',
    saat: '07:00',
    fiyat: '400',
    koltukSayisi: '44'
  },
  {
    nereden: 'bur',
    nereye: 'ist',
    tarih: addDays(5),
    firma: 'Metro Turizm',
    saat: '12:00',
    fiyat: '380',
    koltukSayisi: '40'
  },
  {
    nereden: 'ist',
    nereye: 'bur',
    tarih: addDays(5),
    firma: 'Varan',
    saat: '15:00',
    fiyat: '420',
    koltukSayisi: '36'
  }
];

async function seedBiletler() {
  console.log('🚌 BiletCepte - Test Biletleri Ekleniyor...\n');
  
  const biletlerRef = ref(db, 'biletler');
  
  // Önce mevcut biletleri kontrol et
  const snapshot = await get(biletlerRef);
  if (snapshot.exists()) {
    const mevcutSayi = Object.keys(snapshot.val()).length;
    console.log(`📊 Mevcut bilet sayısı: ${mevcutSayi}`);
  }
  
  let eklenen = 0;
  
  for (const bilet of testBiletler) {
    try {
      await push(biletlerRef, bilet);
      eklenen++;
      console.log(`✅ Eklendi: ${bilet.nereden.toUpperCase()} → ${bilet.nereye.toUpperCase()} | ${bilet.tarih} ${bilet.saat} | ${bilet.firma} | ${bilet.fiyat} TL`);
    } catch (error) {
      console.error(`❌ Hata: ${bilet.nereden} → ${bilet.nereye}`, error.message);
    }
  }
  
  console.log(`\n🎉 Toplam ${eklenen} bilet eklendi!`);
  console.log('🌐 Kontrol: http://localhost:3000/biletler');
  process.exit(0);
}

seedBiletler().catch(console.error);
