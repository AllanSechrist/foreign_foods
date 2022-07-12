import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaruantCard from "../RestaruantCard";

function Restaurants() {
  const [restaurantList, setRestaurantList] = useState([]);

  const fetchRestaurants = async () => {
    const data = await axios.get("http://localhost:5000/restaurants");
    const { restaurant } = data.data;
    setRestaurantList(restaurant);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {restaurantList.map((restaurant) => (
        <RestaruantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default Restaurants;
