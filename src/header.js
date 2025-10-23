//header.js
import React, { useState, useEffect } from 'react';
import './header.css';
import { getDatabase, ref, push, child, get } from 'firebase/database';
import { Link } from 'react-router-dom';
import { useToast } from './useToast';
import Toast from './Toast';

const Header = () => {
  const [currentBaslik, setCurrentBaslik] = useState("Artık");
  const [slidingText, setSlidingText] = useState("Biletler Cepte!");
  const [isModalOpenGiris, setIsModalOpenGiris] = useState(false);
  const [isModalOpenKayit, setIsModalOpenKayit] = useState(false);
  const [kullanici, setKullanici] = useState(null); // Giriş yapmış kullanıcı
  const toast = useToast();
  
  // Sayfa yüklendiğinde localStorage'dan kullanıcıyı kontrol et
  useEffect(() => {
    const kaydedilmisKullanici = localStorage.getItem('biletcepte_kullanici');
    if (kaydedilmisKullanici) {
      setKullanici(JSON.parse(kaydedilmisKullanici));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (slidingText === "Biletler Cepte!") {
        setCurrentBaslik("Artık");
        setSlidingText("Kafa Rahat!");
      } else {
        setCurrentBaslik("Artık");
        setSlidingText("Biletler Cepte!");
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [slidingText]);

  const vt = getDatabase();
  const vtRef = ref(vt);
  
  function Kayit(){
    const email = document.getElementById("mail").value;
    const password = document.getElementById("sifre").value;
    
    // Boş alan kontrolü
    if (!email || !password) {
      toast.warning("Lütfen tüm alanları doldurun!");
      return;
    }
    
    // E-posta formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Geçerli bir e-posta adresi girin!");
      return;
    }
    
    // Şifre uzunluğu kontrolü
    if (password.length < 6) {
      toast.warning("Şifre en az 6 karakter olmalıdır!");
      return;
    }
    
    push(ref(vt,'kullanicilar/'), { email, password })
    .then(() => {
      console.log("✅ Kayıt başarılı!");
      toast.success("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      setIsModalOpenKayit(false);
    })
    .catch((error) => {
      console.error("Kayıt hatası:", error);
      
      // Firebase izin hatası kontrolü
      if (error.code === 'PERMISSION_DENIED') {
        toast.error("Veritabanı erişim hatası! Firebase kuralları ayarlanmalı.");
      } else {
        toast.error("Bir hata oluştu! Lütfen tekrar deneyin.");
      }
    });
    }

    function Giris(){
     const mail = document.getElementById("mailg").value;
     const sifre = document.getElementById("sifreg").value;
     
     // Boş alan kontrolü
     if (!mail || !sifre) {
       toast.warning("Lütfen e-posta ve şifre alanlarını doldurun!");
       return;
     }

     get(child(vtRef, `kullanicilar/`)).then((snapshot) => {
      let girisBasarili = false;
      
      if (snapshot.exists()) {
        snapshot.forEach((userSnapshot) => {
          const userData = userSnapshot.val();
          const email = userData.email;
          const password = userData.password;
    
          if (mail === email && sifre === password) {
            girisBasarili = true;
            
            // Kullanıcı bilgilerini kaydet
            const kullaniciBilgi = {
              email: email,
              girisZamani: new Date().toISOString()
            };
            
            // State'i güncelle
            setKullanici(kullaniciBilgi);
            
            // localStorage'a kaydet
            localStorage.setItem('biletcepte_kullanici', JSON.stringify(kullaniciBilgi));
            
            console.log("✅ Giriş Başarılı");
            toast.success(`Hoş geldiniz ${email}!`);
            setIsModalOpenGiris(false);
            return;
          }
        });
        
        if (!girisBasarili) {
          toast.error("E-posta veya şifre yanlış!");
        }
      } else {
        toast.warning("Sistemde kayıtlı kullanıcı bulunamadı. Lütfen önce kayıt olun.");
      }
    }).catch((error) => {
      console.error("Giriş hatası:", error);
      
      // Firebase izin hatası kontrolü
      if (error.code === 'PERMISSION_DENIED') {
        toast.error("Veritabanı erişim hatası! Firebase kuralları ayarlanmalı.");
      } else {
        toast.error("Bir hata oluştu! Lütfen internet bağlantınızı kontrol edin.");
      }
    });
}

  const handleGirisClick = () => {
    setIsModalOpenGiris(true);
  };

  const handleCloseModal = () => {
    setIsModalOpenGiris(false);
    setIsModalOpenKayit(false);
  };

  const handleKayitClick = () => {
    setIsModalOpenKayit(true);
  };

  const handleCikisClick = () => {
    // Toast ile bilgilendirme
    toast.warning("Çıkış yapılıyor...", 2000);
    
    // Kısa bir gecikme sonra çıkış yap
    setTimeout(() => {
      // State'i temizle
      setKullanici(null);
      // localStorage'ı temizle
      localStorage.removeItem('biletcepte_kullanici');
      toast.success("Başarıyla çıkış yaptınız! Tekrar görüşmek üzere.");
      
      // Eğer biletlerim sayfasındaysa ana sayfaya yönlendir
      setTimeout(() => {
        if (window.location.pathname === '/biletler') {
          window.location.href = '/';
        } else {
          // Diğer sayfalarda sadece sayfayı yenile
          window.location.reload();
        }
      }, 1000); // Toast'ın görünmesi için 1 saniye bekle
    }, 500);
  };



  return (
    <>
      <div className="header">
        <div className="header-container">
          <div className="logo">
            <img src="logowithoutback.png" alt="BiletCepte Logo" />
            <div className="brand-section">
              <h1 className="baslik">
                {currentBaslik} <span className="sliding-text">{slidingText}</span>
              </h1>
              <div className='basliklar'>
                <div className="feature-badge">
                  <img src="fast.png" alt="Hızlı" />
                  <span>Hızlı</span>
                </div>
                <div className="feature-badge">
                  <img src="safe.png" alt="Güvenilir" />
                  <span>Güvenilir</span>
                </div>
                <div className="feature-badge">
                  <img src="wallet.png" alt="Ekonomik" />
                  <span>Ekonomik</span>
                </div>
              </div>
            </div>
          </div>

          <div className="menu">
            {!kullanici ? (
              // Kullanıcı giriş yapmamışsa
              <>
                <Link to="/" className="menuItem">
                  <span className="menu-icon">🏠</span>
                  <span className="menu-text">Ana Sayfa</span>
                </Link>
                <div className="menuItem" onClick={handleGirisClick}>
                  <span className="menu-icon">🔐</span>
                  <span className="menu-text">Giriş Yap</span>
                </div>
                <div className="menuItem" onClick={handleKayitClick}>
                  <span className="menu-icon">✨</span>
                  <span className="menu-text">Kayıt Ol</span>
                </div>
                <Link to="/help" className="menuItem">
                  <span className="menu-icon">❓</span>
                  <span className="menu-text">Yardım</span>
                </Link>
                <Link to="/iletisim" className="menuItem">
                  <span className="menu-icon">📞</span>
                  <span className="menu-text">İletişim</span>
                </Link>
              </>
            ) : (
              // Kullanıcı giriş yapmışsa
              <>
                <Link to="/" className="menuItem">
                  <span className="menu-icon">🏠</span>
                  <span className="menu-text">Ana Sayfa</span>
                </Link>
                <Link to="/biletler" className="menuItem">
                  <span className="menu-icon">🎫</span>
                  <span className="menu-text">Biletlerim</span>
                </Link>
                <Link to="/help" className="menuItem">
                  <span className="menu-icon">❓</span>
                  <span className="menu-text">Yardım</span>
                </Link>
                <Link to="/iletisim" className="menuItem">
                  <span className="menu-icon">📞</span>
                  <span className="menu-text">İletişim</span>
                </Link>
                <Link to="/admin" className="menuItem">
                  <span className="menu-icon">⚙️</span>
                  <span className="menu-text">Admin</span>
                </Link>
                <div className="menuItem user-info">
                  <span className="menu-icon">👤</span>
                  <span className="menu-text">{kullanici.email.split('@')[0]}</span>
                </div>
                <div className="menuItem logout-item" onClick={handleCikisClick}>
                  <span className="menu-icon">🚪</span>
                  <span className="menu-text">Çıkış</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpenKayit && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Kayıt Ol</h2>
            <div className="modal-form">
              <input 
                className='modal-input' 
                type="email" 
                id="mail" 
                placeholder="E-Mail" 
                required 
                onKeyPress={(e) => e.key === 'Enter' && Kayit()}
              />
              <input 
                className='modal-input' 
                type="password" 
                id="sifre" 
                placeholder="Şifre" 
                required 
                onKeyPress={(e) => e.key === 'Enter' && Kayit()}
              />
              <button className='modal-submit' onClick={Kayit}>Kayıt Ol</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpenGiris && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Giriş Yap</h2>
            <div className="modal-form">
              <input 
                className='modal-input' 
                type="email" 
                id="mailg" 
                placeholder="E-Mail" 
                required 
                onKeyPress={(e) => e.key === 'Enter' && Giris()}
              />
              <input 
                className='modal-input' 
                type="password" 
                id="sifreg" 
                placeholder="Şifre" 
                required 
                onKeyPress={(e) => e.key === 'Enter' && Giris()}
              />
              <button className='modal-submit' onClick={Giris}>Giriş Yap</button>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default Header;
