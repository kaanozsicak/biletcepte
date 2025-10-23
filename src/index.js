//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Yardim from './yardim';
import Iletisim from './iletisim';
import Biletler from './biletler';
import Admin from './admin';

// Firebase yapılandırması
// Güvenlik için .env dosyasına taşınmalı
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCVBtUrEWXXM91NWvnQ3GaOMp_vDxl7WWQ",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "biletcepte-a5ec6.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://biletcepte-a5ec6-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "biletcepte-a5ec6",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "biletcepte-a5ec6.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1034963300927",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:1034963300927:web:f9e2c051ac6c3136cb3e8a"
};

// Firebase'i başlat
initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/help" element={<Yardim />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="/biletler" element={<Biletler />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
