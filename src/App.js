import React from 'react';
import './App.css';
import MemeGenerator from "./components/MemeGenerator";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <MemeGenerator />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
