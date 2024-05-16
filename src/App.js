// App.js
import React from 'react';
import './App.css'; // Ana stil dosyasını içe aktarın
import Header from './header.js'; // Header bileşenini içe aktarın
import DivComponent from './div.js'; // DivComponent bileşenini içe aktarın




const App = () => {
  return (<>
 
    <div className="App">
      <Header/>
      <DivComponent/>
    </div>

    
    </>
  );
}

export default App;
