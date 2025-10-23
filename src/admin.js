// admin.js
import React, { useState, useEffect } from 'react';
import './admin.css';
import Header from './header';
import { getDatabase, ref, push, get, remove, update } from 'firebase/database';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [biletler, setBiletler] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    nereden: 'bur',
    nereye: 'bal',
    tarih: '',
    firma: '',
    saat: '',
    fiyat: '',
    koltukSayisi: ''
  });

  const [editingBilet, setEditingBilet] = useState(null);

  // Admin şifresi (gerçek uygulamada Firebase Authentication kullanın!)
  const ADMIN_PASSWORD = 'admin123'; // DEĞİŞTİRİN!

  // Admin girişi
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('biletcepte_admin', 'true');
      alert('✅ Admin girişi başarılı!');
      fetchBiletler();
    } else {
      alert('❌ Hatalı şifre!');
    }
  };

  // LocalStorage'dan admin kontrolü
  useEffect(() => {
    const adminStatus = localStorage.getItem('biletcepte_admin');
    if (adminStatus === 'true') {
      setIsAuthenticated(true);
      fetchBiletler();
    }
  }, []);

  // Firebase'den tüm biletleri çek
  const fetchBiletler = async () => {
    setLoading(true);
    try {
      const db = getDatabase();
      const biletlerRef = ref(db, 'biletler');
      const snapshot = await get(biletlerRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const biletlerArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setBiletler(biletlerArray);
        console.log('✅ Biletler yüklendi:', biletlerArray.length);
      } else {
        setBiletler([]);
        console.log('⚠️ Henüz bilet yok');
      }
    } catch (error) {
      console.error('❌ Bilet yükleme hatası:', error);
      alert('⚠️ Biletler yüklenirken hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Form değişiklikleri
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Yeni bilet ekle
  const handleAddBilet = async (e) => {
    e.preventDefault();
    
    // Validasyon
    if (!formData.nereden || !formData.nereye || !formData.tarih) {
      alert('⚠️ Lütfen zorunlu alanları doldurun (Nereden, Nereye, Tarih)');
      return;
    }

    if (formData.nereden === formData.nereye) {
      alert('⚠️ Başlangıç ve varış şehri aynı olamaz!');
      return;
    }

    setLoading(true);
    try {
      const db = getDatabase();
      const biletlerRef = ref(db, 'biletler');
      
      await push(biletlerRef, formData);
      
      alert('✅ Bilet başarıyla eklendi!');
      
      // Formu temizle
      setFormData({
        nereden: 'bur',
        nereye: 'bal',
        tarih: '',
        firma: '',
        saat: '',
        fiyat: '',
        koltukSayisi: ''
      });
      
      // Biletleri yeniden yükle
      await fetchBiletler();
      
    } catch (error) {
      console.error('❌ Bilet ekleme hatası:', error);
      alert('⚠️ Bilet eklenirken hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Bilet düzenle
  const handleEditBilet = (bilet) => {
    setEditingBilet(bilet.id);
    setFormData({
      nereden: bilet.nereden,
      nereye: bilet.nereye,
      tarih: bilet.tarih,
      firma: bilet.firma || '',
      saat: bilet.saat || '',
      fiyat: bilet.fiyat || '',
      koltukSayisi: bilet.koltukSayisi || ''
    });
    
    // Formu scroll et
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Güncelleme kaydet
  const handleUpdateBilet = async (e) => {
    e.preventDefault();
    
    if (!editingBilet) return;

    setLoading(true);
    try {
      const db = getDatabase();
      const biletRef = ref(db, `biletler/${editingBilet}`);
      
      await update(biletRef, formData);
      
      alert('✅ Bilet başarıyla güncellendi!');
      
      // Düzenleme modundan çık
      setEditingBilet(null);
      
      // Formu temizle
      setFormData({
        nereden: 'bur',
        nereye: 'bal',
        tarih: '',
        firma: '',
        saat: '',
        fiyat: '',
        koltukSayisi: ''
      });
      
      // Biletleri yeniden yükle
      await fetchBiletler();
      
    } catch (error) {
      console.error('❌ Bilet güncelleme hatası:', error);
      alert('⚠️ Bilet güncellenirken hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Düzenlemeyi iptal et
  const handleCancelEdit = () => {
    setEditingBilet(null);
    setFormData({
      nereden: 'bur',
      nereye: 'bal',
      tarih: '',
      firma: '',
      saat: '',
      fiyat: '',
      koltukSayisi: ''
    });
  };

  // Bilet sil
  const handleDeleteBilet = async (biletId) => {
    const onay = window.confirm('🗑️ Bu bileti silmek istediğinize emin misiniz?');
    
    if (!onay) return;

    setLoading(true);
    try {
      const db = getDatabase();
      const biletRef = ref(db, `biletler/${biletId}`);
      
      await remove(biletRef);
      
      alert('✅ Bilet başarıyla silindi!');
      
      // Biletleri yeniden yükle
      await fetchBiletler();
      
    } catch (error) {
      console.error('❌ Bilet silme hatası:', error);
      alert('⚠️ Bilet silinirken hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Çıkış yap
  const handleLogout = () => {
    const onay = window.confirm('🚪 Admin panelinden çıkmak istediğinize emin misiniz?');
    if (onay) {
      setIsAuthenticated(false);
      localStorage.removeItem('biletcepte_admin');
      setAdminPassword('');
      alert('👋 Başarıyla çıkış yaptınız!');
    }
  };

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

  // Admin giriş sayfası
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="admin-login">
          <div className="admin-login-box">
            <div className="admin-icon">🔐</div>
            <h1>Admin Paneli</h1>
            <p>Admin paneline erişmek için şifrenizi girin</p>
            
            <form onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label htmlFor="admin-password">
                  <span className="label-icon">🔑</span>
                  Admin Şifresi
                </label>
                <input
                  type="password"
                  id="admin-password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Şifrenizi girin"
                  required
                />
              </div>
              
              <button type="submit" className="login-btn">
                <span>Giriş Yap</span>
              </button>
            </form>
            
            <div className="admin-info">
              <p>💡 <strong>Test Şifresi:</strong> admin123</p>
              <p>⚠️ Güvenlik için şifreyi değiştirin!</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Admin ana paneli
  return (
    <>
      <Header />
      <div className="admin-panel">
        <div className="admin-header">
          <div className="admin-title">
            <h1>🎫 Admin Paneli</h1>
            <p>Bilet yönetim sistemi</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Çıkış Yap
          </button>
        </div>

        {/* Bilet Ekleme/Düzenleme Formu */}
        <div className="admin-form-container">
          <div className="form-header">
            <h2>{editingBilet ? '✏️ Bilet Düzenle' : '➕ Yeni Bilet Ekle'}</h2>
          </div>
          
          <form onSubmit={editingBilet ? handleUpdateBilet : handleAddBilet} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nereden">
                  📍 Nereden <span className="required">*</span>
                </label>
                <select
                  id="nereden"
                  name="nereden"
                  value={formData.nereden}
                  onChange={handleInputChange}
                  required
                >
                  <option value="bal">Balıkesir</option>
                  <option value="ist">İstanbul</option>
                  <option value="izmir">İzmir</option>
                  <option value="bur">Bursa</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="nereye">
                  🎯 Nereye <span className="required">*</span>
                </label>
                <select
                  id="nereye"
                  name="nereye"
                  value={formData.nereye}
                  onChange={handleInputChange}
                  required
                >
                  <option value="bal">Balıkesir</option>
                  <option value="ist">İstanbul</option>
                  <option value="izmir">İzmir</option>
                  <option value="bur">Bursa</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tarih">
                  📅 Tarih <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="tarih"
                  name="tarih"
                  value={formData.tarih}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firma">
                  🚌 Firma
                </label>
                <input
                  type="text"
                  id="firma"
                  name="firma"
                  value={formData.firma}
                  onChange={handleInputChange}
                  placeholder="Örn: Metro Turizm"
                />
              </div>

              <div className="form-group">
                <label htmlFor="saat">
                  ⏰ Kalkış Saati
                </label>
                <input
                  type="time"
                  id="saat"
                  name="saat"
                  value={formData.saat}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fiyat">
                  💰 Fiyat (TL)
                </label>
                <input
                  type="number"
                  id="fiyat"
                  name="fiyat"
                  value={formData.fiyat}
                  onChange={handleInputChange}
                  placeholder="Örn: 450"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="koltukSayisi">
                  🪑 Boş Koltuk
                </label>
                <input
                  type="number"
                  id="koltukSayisi"
                  name="koltukSayisi"
                  value={formData.koltukSayisi}
                  onChange={handleInputChange}
                  placeholder="Örn: 25"
                  min="0"
                />
              </div>
            </div>

            <div className="form-actions">
              {editingBilet ? (
                <>
                  <button type="submit" className="submit-btn update-btn" disabled={loading}>
                    {loading ? '⏳ Güncelleniyor...' : '✅ Güncelle'}
                  </button>
                  <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                    ❌ İptal
                  </button>
                </>
              ) : (
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? '⏳ Ekleniyor...' : '➕ Bilet Ekle'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Bilet Listesi */}
        <div className="admin-biletler">
          <div className="list-header">
            <h2>📋 Mevcut Biletler ({biletler.length})</h2>
            <button onClick={fetchBiletler} className="refresh-btn" disabled={loading}>
              🔄 Yenile
            </button>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : biletler.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>Henüz bilet yok</h3>
              <p>Yukarıdaki formu kullanarak yeni bilet ekleyin</p>
            </div>
          ) : (
            <div className="bilet-table-container">
              <table className="bilet-table">
                <thead>
                  <tr>
                    <th>Güzergah</th>
                    <th>Tarih</th>
                    <th>Firma</th>
                    <th>Saat</th>
                    <th>Fiyat</th>
                    <th>Koltuk</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {biletler.map((bilet) => (
                    <tr key={bilet.id}>
                      <td>
                        <strong>{getSehirAdi(bilet.nereden)}</strong>
                        <span className="arrow">→</span>
                        <strong>{getSehirAdi(bilet.nereye)}</strong>
                      </td>
                      <td>{formatTarih(bilet.tarih)}</td>
                      <td>{bilet.firma || '-'}</td>
                      <td>{bilet.saat || '-'}</td>
                      <td>{bilet.fiyat ? `${bilet.fiyat} TL` : '-'}</td>
                      <td>{bilet.koltukSayisi || '-'}</td>
                      <td className="action-buttons">
                        <button
                          onClick={() => handleEditBilet(bilet)}
                          className="edit-btn"
                          title="Düzenle"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteBilet(bilet.id)}
                          className="delete-btn"
                          title="Sil"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
