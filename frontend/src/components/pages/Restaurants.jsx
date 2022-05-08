import React, { useState, useEffect } from 'react'
import axios from "axios"
import ActionAreaCard from "../RestaruantCard";

function Restaurants() {
    const [restaurantList, setRestaurantList] = useState([])

    const fetchRestaurants = async () => {
        const data = await axios.get("http://localhost:5000/restaurants")
        const { restaurant } = data.data
        setRestaurantList(restaurant)
        // console.log(data.data.restaurant)
      }

    useEffect(() => {
      fetchRestaurants()
    }, [])


    return (
        <div>
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
        </div>
    )
}

export default Restaurants
