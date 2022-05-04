import {useEffect, useState} from "react"
import axios from "axios"
import Header from "./Header";
import Footer from "./Footer";
import AreaActionCard from "./Card";
import '../App.css';



function App() {
  return (
    <div className="App">
      <Header />
        <h1>Sup</h1>
        <AreaActionCard />
      <Footer />
    </div>
  );
}

export default App;
