// biletler.js
import React, { useState, useEffect } from 'react';
import './yardim.css';
import './biletler.css';
import Header from './header';
import { getDatabase, ref, get, remove } from 'firebase/database';

const Biletler = () => {
  const [biletler, setBiletler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kullanici, setKullanici] = useState(null);

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

  // Biletleri Firebase'den çek
  const fetchBiletler = async (email) => {
    try {
      setLoading(true);
      const db = getDatabase();
      const emailKey = email.replace(/[.@]/g, '_');
      const biletlerRef = ref(db, `kullaniciBiletleri/${emailKey}`);
      
      const snapshot = await get(biletlerRef);
      
      if (snapshot.exists()) {
        const biletlerData = snapshot.val();
        const biletlerArray = Object.keys(biletlerData).map(key => ({
          id: key,
          ...biletlerData[key]
        }));
        
        // Tarihe göre sırala (en yeni önce)
        biletlerArray.sort((a, b) => 
          new Date(b.satinAlmaTarihi) - new Date(a.satinAlmaTarihi)
        );
        
        setBiletler(biletlerArray);
      } else {
        setBiletler([]);
      }
    } catch (error) {
      console.error('❌ Biletler yüklenirken hata:', error);
      alert('❌ Biletler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Bilet iptal et
  const handleIptal = async (bilet) => {
    const onay = window.confirm(
      `🚫 Bilet İptal Onayı\n\n` +
      `📍 ${getSehirAdi(bilet.nereden)} → ${getSehirAdi(bilet.nereye)}\n` +
      `📅 ${formatTarih(bilet.tarih)}\n` +
      `${bilet.firma ? `🚌 ${bilet.firma}\n` : ''}` +
      `${bilet.fiyat ? `💰 ${bilet.fiyat} TL\n` : ''}\n\n` +
      `Bu bileti iptal etmek istediğinizden emin misiniz?\n` +
      `⚠️ Bu işlem geri alınamaz!`
    );

    if (!onay) return;

    try {
      const db = getDatabase();
      const emailKey = kullanici.email.replace(/[.@]/g, '_');
      const biletRef = ref(db, `kullaniciBiletleri/${emailKey}/${bilet.id}`);
      
      await remove(biletRef);
      
      // Listeyi güncelle
      setBiletler(biletler.filter(b => b.id !== bilet.id));
      
      alert('✅ Bilet başarıyla iptal edildi!');
    } catch (error) {
      console.error('❌ Bilet iptal hatası:', error);
      alert('❌ Bilet iptal edilirken bir hata oluştu.');
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
          
          {biletler.map((bilet) => (
            <div key={bilet.id} className="bilet-karti-detayli">
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
                      <span className="detay-label">🚌 Firma</span>
                      <span className="detay-value">{bilet.firma}</span>
                    </div>
                  )}
                  {bilet.saat && (
                    <div className="detay-item">
                      <span className="detay-label">⏰ Kalkış Saati</span>
                      <span className="detay-value">{bilet.saat}</span>
                    </div>
                  )}
                  {bilet.fiyat && (
                    <div className="detay-item">
                      <span className="detay-label">💰 Fiyat</span>
                      <span className="detay-value">{bilet.fiyat} TL</span>
                    </div>
                  )}
                  {bilet.koltukSayisi && (
                    <div className="detay-item">
                      <span className="detay-label">🪑 Koltuk Sayısı</span>
                      <span className="detay-value">{bilet.koltukSayisi}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bilet-footer">
                <button className="iptal-btn" onClick={() => handleIptal(bilet)}>
                  🗑️ Bileti İptal Et
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
    </>
  );
}

export default Biletler;

