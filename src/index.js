//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
//const { initializeApp } = require("firebase/app"); //
import { getDatabase, ref, push } from 'firebase/database';
import Header from './header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Yardim from './yardim';


const firebaseConfig = {
  apiKey: "AIzaSyCVBtUrEWXXM91NWvnQ3GaOMp_vDxl7WWQ",
  authDomain: "biletcepte-a5ec6.firebaseapp.com",
  databaseURL: "https://biletcepte-a5ec6-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "biletcepte-a5ec6",
  storageBucket: "biletcepte-a5ec6.appspot.com",
  messagingSenderId: "1034963300927",
  appId: "1:1034963300927:web:f9e2c051ac6c3136cb3e8a"
};

initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path='help'  element={<Yardim/>}></Route>
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
