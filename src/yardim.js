import React from 'react';
import './yardim.css';
import Header from './header';

const Yardim = () => {
  return (
    <>
      <Header />
      <div className="yardim">
      <h1>Yardım ve Kullanım Kılavuzu</h1>
      
      <h3>Nasıl Giriş Yapılır?</h3>
      <p>
        "Giriş Yap" butonuna tıklayarak sistemde kayıtlı olan E-Mail adresiniz ve şifrenizi girerek 
        giriş yapabilirsiniz. Giriş yapmadan da bilet arayabilirsiniz, ancak bilet satın alma ve 
        iptal işlemleri için üye girişi zorunludur.
      </p>

      <h3>Bilet Nasıl Aranır?</h3>
      <p>
        Ana sayfada bulunan arama formunu kullanarak:
      </p>
      <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
        <li><strong>Nereden:</strong> Başlangıç şehrini seçin</li>
        <li><strong>Nereye:</strong> Varış şehrini seçin</li>
        <li><strong>Tarih:</strong> Seyahat tarihini belirleyin</li>
        <li><strong>Bilet Ara:</strong> Butona tıklayarak müsait biletleri görün</li>
      </ul>

      <h3>Üyelik Avantajları</h3>
      <p>
        BiletCepte'ye üye olarak:
      </p>
      <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
        <li>Biletlerinizi online satın alabilirsiniz</li>
        <li>Geçmiş bilet işlemlerinizi görüntüleyebilirsiniz</li>
        <li>Bilet iptali yapabilirsiniz</li>
        <li>Özel kampanya ve indirimlerden yararlanabilirsiniz</li>
      </ul>

      <h3>Güvenlik</h3>
      <p>
        Tüm ödeme işlemleriniz 256-bit SSL sertifikası ile güvence altındadır. 
        Kişisel bilgileriniz kesinlikle üçüncü şahıslarla paylaşılmaz.
      </p>

      <h3>İletişim</h3>
      <p>
        Herhangi bir sorunuz veya sorununuz için <strong>İletişim</strong> sayfamızdan 
        bizimle iletişime geçebilirsiniz. Müşteri hizmetlerimiz hafta içi 09:00-18:00 
        saatleri arasında hizmetinizdedir.
      </p>
    </div>
    </>
  );
}

export default Yardim;