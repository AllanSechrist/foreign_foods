import React, { useEffect, useContext } from "react";
import { Context } from "../helpers/Context";
import RestaruantCard from "../RestaruantCard";

function Restaurants() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getRestaurants();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {store.restaurants.map((restaurant) => (
        <RestaruantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default Restaurants;
