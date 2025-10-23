// iletisim.js
import React from 'react';
import './yardim.css'; // Yardım sayfası stili ile aynı
import Header from './header';

const Iletisim = () => {
  return (
    <>
      <Header />
      <div className="yardim">
      <h1>İletişim</h1>
      
      <h3>📧 E-posta</h3>
      <p><strong>Genel Sorular:</strong> info@biletcepte.com</p>
      <p><strong>Müşteri Hizmetleri:</strong> destek@biletcepte.com</p>
      <p><strong>Kurumsal İşbirlikleri:</strong> kurumsal@biletcepte.com</p>

      <h3>📞 Telefon</h3>
      <p><strong>Müşteri Hizmetleri:</strong> 0850 XXX XX XX</p>
      <p><strong>Çağrı Merkezi Çalışma Saatleri:</strong> Hafta içi 09:00 - 18:00</p>

      <h3>📍 Adres</h3>
      <p>
        BiletCepte Online Bilet Satış ve Pazarlama A.Ş.<br />
        Örnek Mahallesi, Teknoloji Caddesi No: 123<br />
        Şişli / İstanbul<br />
        Türkiye
      </p>

      <h3>⏰ Çalışma Saatleri</h3>
      <p>
        <strong>Hafta İçi:</strong> 09:00 - 18:00<br />
        <strong>Cumartesi:</strong> 10:00 - 16:00<br />
        <strong>Pazar:</strong> Kapalı
      </p>

      <h3>🌐 Sosyal Medya</h3>
      <p>Bizi sosyal medyadan takip edin!</p>
      <div style={{ marginTop: '20px' }}>
        <p>📘 Facebook: /BiletCepte</p>
        <p>📸 Instagram: @biletcepte</p>
        <p>🐦 Twitter: @biletcepte</p>
        <p>💼 LinkedIn: BiletCepte</p>
      </div>

      <h3>💡 Öneri ve Şikayetler</h3>
      <p>
        Hizmet kalitemizi artırmak için öneri ve şikayetleriniz bizim için çok değerlidir. 
        Görüş ve önerilerinizi <strong>geri.bildirim@biletcepte.com</strong> adresine 
        iletebilirsiniz.
      </p>
    </div>
    </>
  );
}

export default Iletisim;
  