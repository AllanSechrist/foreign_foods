import {useEffect, useState} from "react"
import axios from "axios"
import Header from "./Header";
import Footer from "./Footer";
import '../App.css';
import ActionAreaCard from "./Card";


const baseURL = "http://localhost:5000"


function App() {
  const [restaurantList, setRestaurantList] = useState([])

  const fetchRestaurants = async () => {
    const data = await axios.get(`${baseURL}/restaurants`)
    // const { restaurantsData } = data.data
    setRestaurantList(data.data.restaurant)
    console.log(data.data.restaurant)
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  return (
    <div className="App">
      <Header />
        <h1>Sup</h1>
        {restaurantList.map((restaurant) => {
          return(
            <ActionAreaCard 
            key={restaurant.id}
            name={restaurant.name}
            style={restaurant.style}
          />
          )
          
        })}
      <Footer />
    </div>
  );
}

export default App;
