// iletisim.js
import React from 'react';
import './yardim.css'; // Yardım sayfası stili ile aynı
import Header from './header';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon, GlobeIcon, LightBulbIcon, FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon } from './Icons';

const Iletisim = () => {
  return (
    <>
      <Header />
      <div className="yardim">
      <h1>İletişim</h1>
      
      <h3><EnvelopeIcon size={20} color="#0a5c0a" /> E-posta</h3>
      <p><strong>Genel Sorular:</strong> info@biletcepte.com</p>
      <p><strong>Müşteri Hizmetleri:</strong> destek@biletcepte.com</p>
      <p><strong>Kurumsal İşbirlikleri:</strong> kurumsal@biletcepte.com</p>

      <h3><PhoneIcon size={20} color="#0a5c0a" /> Telefon</h3>
      <p><strong>Müşteri Hizmetleri:</strong> 0850 XXX XX XX</p>
      <p><strong>Çağrı Merkezi Çalışma Saatleri:</strong> Hafta içi 09:00 - 18:00</p>

      <h3><MapPinIcon size={20} color="#0a5c0a" /> Adres</h3>
      <p>
        BiletCepte Online Bilet Satış ve Pazarlama A.Ş.<br />
        Örnek Mahallesi, Teknoloji Caddesi No: 123<br />
        Şişli / İstanbul<br />
        Türkiye
      </p>

      <h3><ClockIcon size={20} color="#0a5c0a" /> Çalışma Saatleri</h3>
      <p>
        <strong>Hafta İçi:</strong> 09:00 - 18:00<br />
        <strong>Cumartesi:</strong> 10:00 - 16:00<br />
        <strong>Pazar:</strong> Kapalı
      </p>

      <h3><GlobeIcon size={20} color="#0a5c0a" /> Sosyal Medya</h3>
      <p>Bizi sosyal medyadan takip edin!</p>
      <div style={{ marginTop: '20px' }}>
        <p><FacebookIcon size={18} color="#1877f2" /> Facebook: /BiletCepte</p>
        <p><InstagramIcon size={18} color="#e4405f" /> Instagram: @biletcepte</p>
        <p><TwitterIcon size={18} color="#1da1f2" /> Twitter: @biletcepte</p>
        <p><LinkedInIcon size={18} color="#0a66c2" /> LinkedIn: BiletCepte</p>
      </div>

      <h3><LightBulbIcon size={20} color="#0a5c0a" /> Öneri ve Şikayetler</h3>
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
  