//div.js
import React, { useState } from 'react';
import './div.css'; // Stil dosyasını içe aktarın

const DivComponent = () => {
  const [basValue, setBasValue] = useState('bal'); // Başlangıç değeri "bal" olarak ayarlandı
  const [bitValue, setBitValue] = useState('bal'); // Bitiş değeri "bal" olarak ayarlandı
  const [tarih, setTarih] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formun gönderilmesiyle ilgili işlemleri burada yapabilirsiniz
    console.log('Form submitted:', basValue, bitValue, tarih);
  };

  return (
    <div>
      <div className='biletarabox'>
        <div className='biletara'>
          <label htmlFor="baslangic" className='baslabel'>Başlangıç : </label>
          <select className="baslangic" name="location1" value={basValue} onChange={(e) => setBasValue(e.target.value)}>
            <option value="bal">Balıkesir</option>
            <option value="ist">İstanbul</option>
            <option value="izmir">İzmir</option>
            <option value="bur">Bursa</option>
          </select>

          <label htmlFor="bitis" className='bitislabel'>Bitiş : </label>
          <select name="cars" className="bitis" value={bitValue} onChange={(e) => setBitValue(e.target.value)}>
            <option value="bal">Balıkesir</option>
            <option value="ist">İstanbul</option>
            <option value="izmir">İzmir</option>
            <option value="bur">Bursa</option>
          </select>

          <label className="tarihlabel" htmlFor="birthday">Tarih : </label>
          <form className='tarih' onSubmit={handleSubmit}>
            <input type="date" className="tarihinput" name="birthday" onChange={(e) => setTarih(e.target.value)}></input>
            <button className="submit" type="submit">Bul</button>
          </form>
        </div>
      </div>

      <div className="reklamlar">
        <div className="reklam">
          <img className="reklam1" src="reklam1.jpg" alt="Reklam 1" width="600" height="300" />
          <img className="reklam2" src="reklam2.png" alt="Reklam 2" width="600" height="300" />
        </div>
      </div>
      <div className="sorulanSorular">
        <h2>Sıkça Sorulan Sorular</h2>
        <div className="soru">
          <h3>BiletCepte'de hangi otobüs firmalarının biletlerini bulabilirim?</h3>
          <p>Cevap 1</p>
        </div>
        <div className="soru">
          <h3>Soru 2?</h3>
          <p>Cevap 2</p>
        </div>
      </div>
    </div>
  );
}

export default DivComponent;
