import {useEffect, useState} from "react"
import axios from "axios"
import Header from "./Header";
import Footer from "./Footer";
import '../App.css';
import ActionAreaCard from "./Card";


const baseURL = "http://localhost:5000"


function App() {
  const [restaurantList, setRestaurantList] = useState([])
  const [blogList, setBlogList] = useState([])

  const fetchRestaurants = async () => {
    const data = await axios.get(`${baseURL}/restaurants`)
    const { restaurant } = data.data
    setRestaurantList(restaurant)
    // console.log(data.data.restaurant)
  }

  const fetchBlogs = async () => {
    const data = await axios.get(`${baseURL}/blog`)
    const {blog} = data.data
    setBlogList(blog)
    console.log(blog)
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    fetchBlogs()
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
            rating={restaurant.food_rating}
            price={restaurant.price_rating}
            service={restaurant.service_rating}
          />
          )
          
        })}
      <Footer />
    </div>
  );
}

export default App;
