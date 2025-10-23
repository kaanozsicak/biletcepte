//div.js
import React, { useState } from 'react';
import './div.css'; // Stil dosyasını içe aktarın
import { getDatabase, ref, get, push, set } from 'firebase/database';
import PaymentModal from './PaymentModal';
import { useToast } from './useToast';
import Toast from './Toast';

const DivComponent = () => {
  const [basValue, setBasValue] = useState('bal'); // Başlangıç değeri "bal" olarak ayarlandı
  const [bitValue, setBitValue] = useState('bal'); // Bitiş değeri "bal" olarak ayarlandı
  const [tarih, setTarih] = useState('');
  const [biletler, setBiletler] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedBilet, setSelectedBilet] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const toast = useToast();

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

  // Bilet satın alma - Ödeme modalını aç
  const handleSatinAl = (bilet) => {
    // Kullanıcı giriş kontrolü
    const kullaniciStr = localStorage.getItem('biletcepte_kullanici');
    
    if (!kullaniciStr) {
      toast.warning('Bilet satın almak için lütfen giriş yapın!');
      return;
    }

    // Ödeme modalını aç
    setSelectedBilet(bilet);
    setShowPaymentModal(true);
  };

  // Ödeme başarılı - Firebase'e kaydet
  const handlePaymentSuccess = async (biletWithPayment) => {
    try {
      const kullaniciStr = localStorage.getItem('biletcepte_kullanici');
      const kullanici = JSON.parse(kullaniciStr);
      const db = getDatabase();
      
      // Kullanıcının biletlerini kaydet
      // UYARI: biletWithPayment içindeki 'id' field'ını SİLMELİYİZ!
      // Çünkü Firebase otomatik ID oluşturacak
      const { id, ...biletDataWithoutId } = biletWithPayment;
      
      const satinAlinanBilet = {
        ...biletDataWithoutId,  // id olmadan bilet datası
        satinAlmaTarihi: new Date().toISOString(),
        kullaniciEmail: kullanici.email,
        durum: 'aktif' // aktif, iptal edildi
      };

      const biletlerRef = ref(db, `kullaniciBiletleri/${kullanici.email.replace(/[.@]/g, '_')}`);
      const yeniBiletRef = push(biletlerRef);
      
      await set(yeniBiletRef, satinAlinanBilet);

      // Modal'ı kapat
      setShowPaymentModal(false);
      setSelectedBilet(null);
      
      toast.success('Bilet başarıyla satın alındı! Biletlerim sayfasından görüntüleyebilirsiniz.');
      
    } catch (error) {
      console.error('❌ Bilet kaydetme hatası:', error);
      toast.error('Bilet kaydedilirken bir hata oluştu. Lütfen müşteri hizmetleri ile iletişime geçin.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasyon
    if (!basValue || !bitValue || !tarih) {
      toast.warning('Lütfen tüm alanları doldurun!');
      return;
    }
    
    if (basValue === bitValue) {
      toast.warning('Başlangıç ve varış noktası aynı olamaz!');
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
          toast.info('Üzgünüz, aradığınız kriterlere uygun bilet bulunamadı.');
        } else {
          toast.success(`${filtrelenmisBiletler.length} adet bilet bulundu!`);
        }
      } else {
        console.log('❌ Veritabanında hiç bilet yok (snapshot.exists() = false)');
        console.log('⚠️ Firebase kurallarını kontrol edin!');
        setBiletler([]);
        toast.warning('Veritabanında hiç bilet bulunmuyor. Lütfen daha sonra tekrar deneyin.');
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
        toast.error('Firebase izin hatası: Veritabanı kuralları okuma izni vermiyor.');
      } else {
        toast.error('Bilet arama sırasında bir hata oluştu: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              🚌 Türkiye'nin En Hızlı<br/>
              <span className="gradient-text">Bilet Arama Platformu</span>
            </h1>
            <p className="hero-subtitle">
              Binlerce otobüs firması arasından en uygun fiyatlı biletleri anında bulun!
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500K+</span>
                <span className="stat-label">Mutlu Yolcu</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Otobüs Firması</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Güzergah</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bilet Arama Kutusu - Modern Design */}
      <div className='biletarabox'>
        <div className="biletarabox-header">
          <h2>🎫 Biletini Hemen Bul</h2>
          <p>Nereye gitmek istiyorsun? Hadi başlayalım! ✨</p>
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

      {/* Özellikler Bölümü */}
      {!searchPerformed && (
        <>
          <div className="features-section">
            <h2 className="section-title">✨ Neden BiletCepte?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Hızlı Arama</h3>
                <p>Binlerce sefer arasından saniyeler içinde en uygun bileti bul</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>En İyi Fiyat</h3>
                <p>Tüm firmaları karşılaştır, en uygun fiyatı garantile</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Güvenli Ödeme</h3>
                <p>256-bit SSL ile korunan güvenli ödeme altyapısı</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Mobil Uyumlu</h3>
                <p>Her cihazdan kolayca erişim ve bilet satın alma</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎫</div>
                <h3>Anında Bilet</h3>
                <p>Ödemeniz sonrası biletiniz hemen hazır</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>7/24 Destek</h3>
                <p>Her zaman yanınızdayız, yardıma hazırız</p>
              </div>
            </div>
          </div>

          {/* Popüler Güzergahlar */}
          <div className="popular-routes-section">
            <h2 className="section-title">🔥 Popüler Güzergahlar</h2>
            <div className="routes-grid">
              <div className="route-card">
                <div className="route-cities">
                  <span>İstanbul</span>
                  <span className="route-arrow">→</span>
                  <span>Ankara</span>
                </div>
                <p className="route-price">150 TL'den başlayan fiyatlarla</p>
              </div>
              <div className="route-card">
                <div className="route-cities">
                  <span>İzmir</span>
                  <span className="route-arrow">→</span>
                  <span>Antalya</span>
                </div>
                <p className="route-price">180 TL'den başlayan fiyatlarla</p>
              </div>
              <div className="route-card">
                <div className="route-cities">
                  <span>Ankara</span>
                  <span className="route-arrow">→</span>
                  <span>İzmir</span>
                </div>
                <p className="route-price">140 TL'den başlayan fiyatlarla</p>
              </div>
              <div className="route-card">
                <div className="route-cities">
                  <span>Bursa</span>
                  <span className="route-arrow">→</span>
                  <span>İstanbul</span>
                </div>
                <p className="route-price">80 TL'den başlayan fiyatlarla</p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="sorulanSorular">
        <h2>❓ Sıkça Sorulan Sorular</h2>
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

      {/* Payment Modal */}
      {showPaymentModal && selectedBilet && (
        <PaymentModal
          bilet={selectedBilet}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedBilet(null);
          }}
          onSuccess={handlePaymentSuccess}
        />
      )}

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
    </div>
  );
}

export default DivComponent;
