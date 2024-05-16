//header.js
import React, { useState, useEffect } from 'react';
import './header.css';
import { getDatabase, ref, push, child } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';
let {set, get,onValue, remove, update} = require('firebase/database');

const Header = () => {
  const [currentBaslik, setCurrentBaslik] = useState("Artık");
  const [slidingText, setSlidingText] = useState("Biletler Cepte!");
  const [isModalOpenGiris, setIsModalOpenGiris] = useState(false);
  const [isModalOpenKayit, setIsModalOpenKayit] = useState(false);
  


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
    setIsModalOpenKayit(false);
    push(ref(vt,'kullanicilar/'), { email, password })
    .then(() => {
    console.log("Veri başarıyla eklendi!");
  })
  .catch((error) => {
    console.error("Veri eklenirken hata oluştu:", error);
  });
    }

    function Giris(){
     const mail = document.getElementById("mailg").value;
     const sifre = document.getElementById("sifreg").value;
     setIsModalOpenGiris(false);
     get(child(vtRef, `kullanicilar/`)).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((userSnapshot) => {
          const userData = userSnapshot.val(); // Kullanıcı verileri
          const email = userData.email;
          const password = userData.password;
    
          console.log(email);
          console.log(password);
    
          if (mail === email && sifre === password) {
            console.log("Giriş Başarılı");
            return; // Giriş başarılıysa döngüden çık
          }
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
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



  return (
    <div className="header">
      <div className="logo">
        <img src="logowithoutback.png" alt="Logo" width="200" height="200" />
      </div>
      <div>
        <h1 className="baslik">
          {currentBaslik} <span className="sliding-text">{slidingText}</span>
        </h1>
      </div>

      <div className='basliklar'>
        <h2 className="smallbaslik1">Hızlı<img src="fast.png" width="50" height="35" alt="Fast" /></h2>
        <h2 className="smallbaslik2">Güvenilir<img src="safe.png" width="33" height="30" alt="Safe" /></h2>
        <h2 className="smallbaslik3">Ekonomik<img src="wallet.png" width="33" height="33" alt="Wallet" /></h2>
      </div>

      <div className="menu">
        <div className="menuItem" onClick={handleGirisClick}>
          <h3>Giriş</h3>
        </div>
        <div className="menuItem" onClick={handleKayitClick}>
          <h3>Kayıt Ol</h3>
        </div>
        <div className="menuItem" >
          <h3><Link to="/help">Yardım</Link></h3>
        </div>
        <div className="menuItem">
          <h3>İletişim</h3>
        </div>
      </div>

      {isModalOpenKayit && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Kayıt Ol</h2>
            <input className= 'kayitinput1' type="text" id = "mail" placeholder ="E-Mail" />
            <input className= 'kayitinput2' type="password" id ="sifre" placeholder="Şifre" />
            <input className= 'kayitinput3' type='submit' value = "Kayıt Ol" onClick={Kayit}></input>
          </div>
        </div>
      )}

{isModalOpenGiris && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Giriş Yap</h2>
            <input className= 'girisinput1' type="text" id = "mailg" placeholder ="E-Mail" />
            <input className= 'kayitinput2' type="password" id ="sifreg" placeholder="Şifre" />
            <input className= 'kayitinput3' type='submit' value = "Giriş" onClick={Giris}></input>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
