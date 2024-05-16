// randomText.js

// Bir dizi içinde farklı metin öğeleri tanımla
const texts = [
    "Merhaba dünya!",
    "Bugün güzel bir gün!",
    "JavaScript öğrenmek çok eğlenceli!",
    "React ile harika web uygulamaları yapabilirsiniz.",
    "Gelişmeye ve öğrenmeye devam edin!"
  ];
  
  // Rastgele bir metin seçen ve ekrana yazdıran fonksiyon
  function getRandomText() {
    const randomIndex = Math.floor(Math.random() * texts.length); // Rastgele bir dizin seç
    const selectedText = texts[randomIndex]; // Seçilen metni al
    console.log(selectedText); // Seçilen metni konsola yazdır
  }
  
  // getRandomText fonksiyonunu çağır
  getRandomText();
  