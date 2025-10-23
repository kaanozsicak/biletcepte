//div.js
import React, { useState } from 'react';
import './div.css'; // Stil dosyasını içe aktarın
import { getDatabase, ref, get, push, set } from 'firebase/database';

const DivComponent = () => {
  const [basValue, setBasValue] = useState('bal'); // Başlangıç değeri "bal" olarak ayarlandı
  const [bitValue, setBitValue] = useState('bal'); // Bitiş değeri "bal" olarak ayarlandı
  const [tarih, setTarih] = useState('');
  const [biletler, setBiletler] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Şehir kodunu tam adına çevir
  const getSehirAdi = (kod) => {
    const sehirler = {
      'bal': 'Balıkesir',
      'ist': 'İstanbul',
      'izmir': 'İzmir',
      'bur': 'Bursa'
    };
    return sehirler[kod] || kod;
  };

  // Tarihi formatla
  const formatTarih = (tarihStr) => {
    if (!tarihStr) return '';
    const tarih = new Date(tarihStr);
    return tarih.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Bilet satın alma
  const handleSatinAl = async (bilet) => {
    // Kullanıcı giriş kontrolü
    const kullaniciStr = localStorage.getItem('biletcepte_kullanici');
    
    if (!kullaniciStr) {
      alert('⚠️ Bilet satın almak için lütfen giriş yapın!');
      return;
    }

    try {
      const kullanici = JSON.parse(kullaniciStr);
      const db = getDatabase();
      
      // Onay penceresi
      const onay = window.confirm(
        `🎫 Bilet Satın Alma Onayı\n\n` +
        `📍 ${getSehirAdi(bilet.nereden)} → ${getSehirAdi(bilet.nereye)}\n` +
        `📅 ${formatTarih(bilet.tarih)}\n` +
        `${bilet.firma ? `🚌 ${bilet.firma}\n` : ''}` +
        `${bilet.saat ? `⏰ ${bilet.saat}\n` : ''}` +
        `${bilet.fiyat ? `💰 ${bilet.fiyat} TL\n` : ''}\n\n` +
        `Bu bileti satın almak istiyor musunuz?`
      );

      if (!onay) return;

      // Kullanıcının biletlerini kaydet
      const satinAlinanBilet = {
        ...bilet,
        satinAlmaTarihi: new Date().toISOString(),
        kullaniciEmail: kullanici.email,
        durum: 'aktif' // aktif, iptal edildi
      };

      const biletlerRef = ref(db, `kullaniciBiletleri/${kullanici.email.replace(/[.@]/g, '_')}`);
      const yeniBiletRef = push(biletlerRef);
      
      await set(yeniBiletRef, satinAlinanBilet);

      alert('✅ Bilet başarıyla satın alındı!\n\n📱 "Biletlerim" sayfasından biletinizi görüntüleyebilirsiniz.');
      
    } catch (error) {
      console.error('❌ Bilet satın alma hatası:', error);
      alert('❌ Bilet satın alınırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasyon
    if (!basValue || !bitValue || !tarih) {
      alert('⚠️ Lütfen tüm alanları doldurun!');
      return;
    }
    
    if (basValue === bitValue) {
      alert('⚠️ Başlangıç ve varış noktası aynı olamaz!');
      return;
    }
    
    console.log('🔍 Bilet aranıyor:', basValue, bitValue, tarih);
    setLoading(true);
    setSearchPerformed(true);
    
    try {
      const db = getDatabase();
      const biletlerRef = ref(db, 'biletler');
      
      console.log('📡 Firebase bağlantısı kuruluyor...');
      console.log('🔍 Arama kriterleri:', { 
        nereden: basValue, 
        nereye: bitValue, 
        tarih: tarih 
      });
      
      // Firebase'den tüm biletleri çek
      const snapshot = await get(biletlerRef);
      
      console.log('📊 Firebase snapshot:', snapshot);
      console.log('✅ Snapshot exists?', snapshot.exists());
      
      if (snapshot.exists()) {
        const tumBiletler = snapshot.val();
        console.log('📦 Firebase\'den gelen tüm biletler:', tumBiletler);
        console.log('📊 Toplam bilet sayısı:', Object.keys(tumBiletler).length);
        
        const filtrelenmisBiletler = [];
        
        // Manuel filtreleme
        Object.keys(tumBiletler).forEach((key) => {
          const bilet = tumBiletler[key];
          console.log(`🔍 Kontrol ediliyor [${key}]:`, bilet);
          console.log(`   ➡️ nereden: "${bilet.nereden}" === "${basValue}" ?`, bilet.nereden === basValue);
          console.log(`   ➡️ nereye: "${bilet.nereye}" === "${bitValue}" ?`, bilet.nereye === bitValue);
          console.log(`   ➡️ tarih: "${bilet.tarih}" === "${tarih}" ?`, bilet.tarih === tarih);
          
          // Başlangıç, bitiş ve tarihe göre filtrele
          if (
            bilet.nereden === basValue && 
            bilet.nereye === bitValue && 
            bilet.tarih === tarih
          ) {
            console.log('   ✅ Bilet eşleşti!');
            filtrelenmisBiletler.push({
              id: key,
              ...bilet
            });
          } else {
            console.log('   ❌ Bilet eşleşmedi');
          }
        });
        
        setBiletler(filtrelenmisBiletler);
        console.log(`✅ ${filtrelenmisBiletler.length} bilet bulundu`, filtrelenmisBiletler);
        
        if (filtrelenmisBiletler.length === 0) {
          alert('😕 Üzgünüz, aradığınız kriterlere uygun bilet bulunamadı.');
        } else {
          alert(`✅ ${filtrelenmisBiletler.length} adet bilet bulundu!`);
        }
      } else {
        console.log('❌ Veritabanında hiç bilet yok (snapshot.exists() = false)');
        console.log('⚠️ Firebase kurallarını kontrol edin!');
        setBiletler([]);
        alert('😕 Veritabanında hiç bilet bulunmuyor veya Firebase kuralları okuma izni vermiyor. Console\'u kontrol edin.');
      }
    } catch (error) {
      console.error('❌ Bilet arama hatası:', error);
      console.error('🔥 Error name:', error.name);
      console.error('🔥 Error code:', error.code);
      console.error('🔥 Error message:', error.message);
      console.error('🔥 Full error:', JSON.stringify(error, null, 2));
      
      if (error.code === 'PERMISSION_DENIED') {
        console.error('🚫 Firebase PERMISSION_DENIED hatası!');
        console.error('📝 Çözüm: Firebase Console > Realtime Database > Rules sekmesinden okuma izni verin');
        alert('🚫 Firebase izin hatası: Veritabanı kuralları okuma izni vermiyor.\n\nFIREBASE_SETUP.md dosyasını kontrol edin!');
      } else {
        alert('⚠️ Bilet arama sırasında bir hata oluştu: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='biletarabox'>
        <div className="biletarabox-header">
          <h2>🚌 Otobüs Bileti Ara</h2>
          <p>Türkiye'nin her yerine uygun fiyatlı biletler</p>
        </div>
        <form className='biletara' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="baslangic" className='baslabel'>Nereden</label>
            <select 
              id="baslangic"
              className="baslangic" 
              name="location1" 
              value={basValue} 
              onChange={(e) => setBasValue(e.target.value)}
              required
            >
              <option value="">Şehir Seçin</option>
              <option value="bal">Balıkesir</option>
              <option value="ist">İstanbul</option>
              <option value="izmir">İzmir</option>
              <option value="bur">Bursa</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bitis" className='bitislabel'>Nereye</label>
            <select 
              id="bitis"
              name="location2" 
              className="bitis" 
              value={bitValue} 
              onChange={(e) => setBitValue(e.target.value)}
              required
            >
              <option value="">Şehir Seçin</option>
              <option value="bal">Balıkesir</option>
              <option value="ist">İstanbul</option>
              <option value="izmir">İzmir</option>
              <option value="bur">Bursa</option>
            </select>
          </div>

          <div className="form-group">
            <label className="tarihlabel" htmlFor="tarih">Tarih</label>
            <input 
              type="date" 
              id="tarih"
              className="tarihinput" 
              name="tarih" 
              value={tarih}
              onChange={(e) => setTarih(e.target.value)}
              required
            />
          </div>

          <button className="submit" type="submit" disabled={loading}>
            <span>{loading ? '⏳ Aranıyor...' : '🔍 Bilet Ara'}</span>
          </button>
        </form>
      </div>

      {/* Bilet Sonuçları */}
      {searchPerformed && (
        <div className="bilet-sonuclari">
          <h2>🎫 Bilet Sonuçları</h2>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Biletler aranıyor...</p>
            </div>
          ) : biletler.length > 0 ? (
            <div className="bilet-listesi">
              {biletler.map((bilet) => (
                <div key={bilet.id} className="bilet-karti">
                  <div className="bilet-baslik">
                    <h3>🚌 {getSehirAdi(bilet.nereden)} → {getSehirAdi(bilet.nereye)}</h3>
                    <span className="bilet-tarih">📅 {formatTarih(bilet.tarih)}</span>
                  </div>
                  <div className="bilet-detaylar">
                    {bilet.firma && <p><strong>Firma:</strong> {bilet.firma}</p>}
                    {bilet.saat && <p><strong>Kalkış Saati:</strong> ⏰ {bilet.saat}</p>}
                    {bilet.fiyat && <p><strong>Fiyat:</strong> 💰 {bilet.fiyat} TL</p>}
                    {bilet.koltukSayisi && <p><strong>Boş Koltuk:</strong> 🪑 {bilet.koltukSayisi}</p>}
                  </div>
                  <button className="satin-al-btn" onClick={() => handleSatinAl(bilet)}>
                    🛒 Satın Al
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bos-sonuc">
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>😕</div>
              <h3>Üzgünüz, bilet bulunamadı</h3>
              <p>Bu güzergah ve tarih için uygun bilet bulunmamaktadır.</p>
              <p>Lütfen farklı bir tarih veya güzergah deneyin.</p>
            </div>
          )}
        </div>
      )}

      <div className="reklamlar">
        <div className="reklam">
          <img src="reklam1.jpg" alt="Kampanya 1" />
          <img src="reklam2.png" alt="Kampanya 2" />
        </div>
      </div>

      <div className="sorulanSorular">
        <h2>Sıkça Sorulan Sorular</h2>
        <div className="soru">
          <h3>BiletCepte'de hangi otobüs firmalarının biletlerini bulabilirim?</h3>
          <p>BiletCepte, Türkiye'nin önde gelen tüm otobüs firmalarının biletlerini tek bir platformda sunmaktadır. Metro Turizm, Pamukkale, Kamil Koç, Ulusoy ve daha birçok güvenilir firma ile çalışıyoruz.</p>
        </div>
        <div className="soru">
          <h3>Bilet iptali nasıl yapılır?</h3>
          <p>Biletinizi "Biletlerim" sayfasından kolayca iptal edebilirsiniz. İptal koşulları ve iade süresi seçtiğiniz firmaya göre değişiklik gösterebilir. Detaylı bilgi için müşteri hizmetlerimizle iletişime geçebilirsiniz.</p>
        </div>
        <div className="soru">
          <h3>Ödeme yöntemleri nelerdir?</h3>
          <p>Kredi kartı, banka kartı ve online ödeme sistemleri ile güvenli bir şekilde ödeme yapabilirsiniz. Tüm ödemeleriniz 256-bit SSL sertifikası ile korunmaktadır.</p>
        </div>
      </div>
    </div>
  );
}

export default DivComponent;
