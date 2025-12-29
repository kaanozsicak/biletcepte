// biletler.js
import React, { useState, useEffect } from 'react';
import './yardim.css';
import './biletler.css';
import Header from './header';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { useToast } from './useToast';
import Toast from './Toast';
import { BusIcon, ClockIcon, TrashIcon, CreditCardIcon, TicketIcon } from './Icons';

const Biletler = () => {
  const [biletler, setBiletler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kullanici, setKullanici] = useState(null);
  const toast = useToast();

  // Şehir adı getir
  const getSehirAdi = (kod) => {
    const sehirler = {
      'bal': 'Balıkesir',
      'ist': 'İstanbul',
      'izmir': 'İzmir',
      'bur': 'Bursa'
    };
    return sehirler[kod] || kod;
  };

  // Tarih formatla
  const formatTarih = (tarihStr) => {
    if (!tarihStr) return '';
    const tarih = new Date(tarihStr);
    return tarih.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Kullanıcı bilgilerini al
  useEffect(() => {
    const kullaniciStr = localStorage.getItem('biletcepte_kullanici');
    if (kullaniciStr) {
      const kullaniciData = JSON.parse(kullaniciStr);
      setKullanici(kullaniciData);
      fetchBiletler(kullaniciData.email);
    } else {
      setLoading(false);
    }
  }, []);

  // Kullanıcı çıkış yaptığında localStorage değişikliğini dinle
  useEffect(() => {
    const checkAuth = () => {
      const kullaniciStr = localStorage.getItem('biletcepte_kullanici');
      if (!kullaniciStr && kullanici) {
        // Kullanıcı çıkış yapmış, state'i temizle
        setKullanici(null);
        setBiletler([]);
      }
    };

    // storage event'i sadece diğer tablardan gelir, aynı tab için interval kullan
    const interval = setInterval(checkAuth, 500);
    
    return () => clearInterval(interval);
  }, [kullanici]);

  // Biletleri Firebase'den çek
  const fetchBiletler = async (email) => {
    try {
      setLoading(true);
      const db = getDatabase();
      const emailKey = email.replace(/[.@]/g, '_');
      const biletlerRef = ref(db, `kullaniciBiletleri/${emailKey}`);
      
      console.log('📥 Biletler çekiliyor... Email:', email);
      console.log('📥 Firebase path:', `kullaniciBiletleri/${emailKey}`);
      
      const snapshot = await get(biletlerRef);
      
      if (snapshot.exists()) {
        const biletlerData = snapshot.val();
        console.log('📦 Firebase raw data:', biletlerData);
        console.log('📦 Firebase raw data (stringified):', JSON.stringify(biletlerData, null, 2));
        
        // ID'leri map'e çevir - DOĞRU SIRA: Önce spread, sonra ID override!
        const biletlerArray = Object.keys(biletlerData).map(key => ({
          ...biletlerData[key],  // ← Önce bilet datası
          id: key                 // ← Sonra Firebase key ile override et!
        }));
        
        console.log('📋 Tüm biletler (sıralama öncesi):', biletlerArray);
        console.log('📊 Toplam kayıt sayısı:', biletlerArray.length);
        console.log('📊 Unique key sayısı:', Object.keys(biletlerData).length);
        
        // DUPLICATE KONTROLÜ - Aynı ID'yi birden fazla kez görmememiz gerekiyor!
        const uniqueIds = new Set();
        const duplicates = [];
        
        biletlerArray.forEach(bilet => {
          if (uniqueIds.has(bilet.id)) {
            duplicates.push(bilet.id);
            console.warn('⚠️ DUPLICATE ID BULUNDU:', bilet.id);
          } else {
            uniqueIds.add(bilet.id);
          }
        });
        
        if (duplicates.length > 0) {
          console.error('❌ HATA: Tekrarlayan ID\'ler tespit edildi:', duplicates);
          console.error('❌ Bu bir Firebase veri tutarsızlığıdır!');
          console.log('🔧 Firebase\'den duplicate\'ler temizleniyor...');
          
          // FIREBASE'DEN DUPLICATE'LERİ SİL!
          try {
            // Unique ID'leri bul
            const seenIds = new Set();
            const duplicateIdsToDelete = [];
            
            biletlerArray.forEach(bilet => {
              if (seenIds.has(bilet.id)) {
                // Bu duplicate, sil!
                duplicateIdsToDelete.push(bilet.id);
              } else {
                seenIds.add(bilet.id);
              }
            });
            
            // Her duplicate ID'yi Firebase'den sil
            for (const duplicateId of duplicateIdsToDelete) {
              const duplicateRef = ref(db, `kullaniciBiletleri/${emailKey}/${duplicateId}`);
              await remove(duplicateRef);
              console.log(`🗑️ Duplicate silindi: ${duplicateId}`);
            }
            
            console.log(`✅ ${duplicateIdsToDelete.length} duplicate Firebase'den kalıcı olarak silindi!`);
          } catch (error) {
            console.error('❌ Duplicate temizleme hatası:', error);
          }
        }
        
        // Unique biletler - ID'ye göre deduplicate
        const uniqueBiletlerMap = new Map();
        biletlerArray.forEach(bilet => {
          // Son kaydı tut (en güncel veriyi al)
          uniqueBiletlerMap.set(bilet.id, bilet);
        });
        
        const uniqueBiletler = Array.from(uniqueBiletlerMap.values());
        console.log(`✅ Unique biletler: ${uniqueBiletler.length} adet (${biletlerArray.length - uniqueBiletler.length} duplicate silindi)`);
        
        // Tarihe göre sırala (en yeni önce)
        uniqueBiletler.sort((a, b) => 
          new Date(b.satinAlmaTarihi) - new Date(a.satinAlmaTarihi)
        );
        
        console.log('📋 Final biletler (sıralı + unique):', uniqueBiletler);
        setBiletler(uniqueBiletler);
      } else {
        console.log('📭 Hiç bilet bulunamadı');
        setBiletler([]);
      }
    } catch (error) {
      console.error('❌ Biletler yüklenirken hata:', error);
      toast.error('Biletler yüklenirken bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Bilet iptal et
  const handleIptal = async (bilet) => {
    console.log('🔍 İptal edilecek bilet:', bilet);
    console.log('🔍 Bilet ID:', bilet.id);
    console.log('🔍 Kullanıcı:', kullanici);
    
    // Modern confirmation ile değiştirilecek - şimdilik basit onay
    const detayMesaj = `${getSehirAdi(bilet.nereden)} → ${getSehirAdi(bilet.nereye)} | ${formatTarih(bilet.tarih)} | ${bilet.firma || ''} ${bilet.fiyat ? bilet.fiyat + ' TL' : ''}`;
    toast.warning(`Bilet iptal ediliyor: ${detayMesaj}`, 5000);
    
    // Kısa bir gecikme ekle - kullanıcı toast'u görsün
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const db = getDatabase();
      const emailKey = kullanici.email.replace(/[.@]/g, '_');
      const biletPath = `kullaniciBiletleri/${emailKey}/${bilet.id}`;
      
      console.log('🔍 Firebase path:', biletPath);
      
      // Firebase'den sil
      const biletRef = ref(db, biletPath);
      console.log('🗑️ Firebase silme işlemi başlıyor...');
      await remove(biletRef);
      console.log('✅ Firebase\'den silindi!');
      
      // State'i güncelle - KALICI silme
      const oncekiBiletSayisi = biletler.length;
      const yeniBiletListesi = biletler.filter(b => b.id !== bilet.id);
      console.log(`📊 Önceki bilet sayısı: ${oncekiBiletSayisi}`);
      console.log(`📊 Yeni bilet sayısı: ${yeniBiletListesi.length}`);
      console.log('🔄 State güncelleniyor...');
      
      setBiletler(yeniBiletListesi);
      console.log('✅ State güncellendi!');
      
      toast.success('Bilet başarıyla iptal edildi!');
    } catch (error) {
      console.error('❌ Bilet iptal hatası:', error);
      console.error('❌ Hata detayı:', error.message);
      console.error('❌ Stack trace:', error.stack);
      toast.error('Bilet iptal edilirken bir hata oluştu: ' + error.message);
    }
  };

  // Giriş yapılmamışsa
  if (!kullanici) {
    return (
      <>
        <Header />
        <div className="yardim">
          <h1>Biletlerim</h1>
          
          <div style={{ 
            padding: '40px', 
            background: 'linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%)',
            borderRadius: '15px',
            textAlign: 'center',
            marginTop: '30px',
            border: '2px solid #ffcccc'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔐</div>
            <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>Giriş Yapmanız Gerekiyor</h3>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
              Biletlerinizi görüntülemek için lütfen giriş yapın.
              <br />
              Üye değilseniz hemen kayıt olabilirsiniz!
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="yardim">
      <h1>🎫 Biletlerim</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div className="loading-spinner"></div>
          <p style={{ marginTop: '20px', color: '#666' }}>Biletler yükleniyor...</p>
        </div>
      ) : biletler.length > 0 ? (
        <div className="biletler-container">
          <p style={{ 
            textAlign: 'center', 
            color: '#0a5c0a', 
            fontSize: '18px', 
            fontWeight: '600',
            marginBottom: '30px'
          }}>
            Toplam {biletler.length} biletiniz bulunmaktadır
          </p>
          
          {biletler.map((bilet, index) => (
            <div key={`${bilet.id}-${index}`} className="bilet-karti-detayli">
              <div className="bilet-header">
                <div className="bilet-route">
                  <h3>{getSehirAdi(bilet.nereden)} → {getSehirAdi(bilet.nereye)}</h3>
                  <span className="bilet-status aktif">Aktif</span>
                </div>
                <div className="bilet-tarih-info">
                  <p>📅 Seyahat Tarihi: <strong>{formatTarih(bilet.tarih)}</strong></p>
                  <p style={{ fontSize: '13px', color: '#888' }}>
                    🛒 Satın Alma: {formatTarih(bilet.satinAlmaTarihi?.split('T')[0])}
                  </p>
                </div>
              </div>
              
              <div className="bilet-body">
                <div className="bilet-detaylar-grid">
                  {bilet.firma && (
                    <div className="detay-item">
                      <span className="detay-label"><BusIcon size={16} /> Firma</span>
                      <span className="detay-value">{bilet.firma}</span>
                    </div>
                  )}
                  {bilet.saat && (
                    <div className="detay-item">
                      <span className="detay-label"><ClockIcon size={16} /> Kalkış Saati</span>
                      <span className="detay-value">{bilet.saat}</span>
                    </div>
                  )}
                  {bilet.fiyat && (
                    <div className="detay-item">
                      <span className="detay-label"><CreditCardIcon size={16} /> Fiyat</span>
                      <span className="detay-value">{bilet.fiyat} TL</span>
                    </div>
                  )}
                  {bilet.koltukSayisi && (
                    <div className="detay-item">
                      <span className="detay-label"><TicketIcon size={16} /> Koltuk Sayısı</span>
                      <span className="detay-value">{bilet.koltukSayisi}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bilet-footer">
                <button className="iptal-btn" onClick={() => handleIptal(bilet)}>
                  <TrashIcon size={16} /> Bileti İptal Et
                </button>
                <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
                  Bilet ID: {bilet.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          padding: '40px', 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '15px',
          textAlign: 'center',
          marginTop: '30px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎫</div>
          <h3 style={{ color: '#0a5c0a', marginBottom: '15px' }}>Henüz Biletiniz Yok</h3>
          <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
            Bilet geçmişiniz ve aktif biletleriniz burada görünecek.
            <br />
            Bilet satın almak için ana sayfadan arama yapabilirsiniz.
          </p>
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'left' }}>
        <h3>Biletlerim Sayfası Özellikleri</h3>
        <ul style={{ lineHeight: '1.8', color: '#555' }}>
          <li>✅ Aktif biletlerinizi görüntüleme</li>
          <li>✅ Bilet iptal işlemleri</li>
          <li>✅ Bilet detaylarını görüntüleme</li>
          <li>✅ Satın alma geçmişi</li>
        </ul>
        <p style={{ marginTop: '20px', color: '#0a5c0a', fontWeight: '600' }}>
          💡 PDF indirme ve QR kod özellikleri yakında eklenecektir!
        </p>
      </div>
    </div>

    {/* Toast Container */}
    <div className="toast-container">
      {toast.toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          duration={t.duration}
          onClose={() => toast.removeToast(t.id)}
        />
      ))}
    </div>
    </>
  );
}

export default Biletler;

