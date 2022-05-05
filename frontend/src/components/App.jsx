import {useEffect, useState} from "react"
import axios from "axios"
import Header from "./Header";
import Footer from "./Footer";
import AreaActionCard from "./Card";
import '../App.css';


const baseURL = "http://localhost:5000"


function App() {
  const [restaurantList, setRestaurantList] = useState([])

  const fetchRestaurants = async () => {
    const data = await axios.get(`${baseURL}/restaurants`)
    const { restaurants } = data.data
    // setRestaurantList(restaurants)
    console.log("DATA: ", data)
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

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
