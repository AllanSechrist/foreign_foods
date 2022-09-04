import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditRestaurantForm from "../EditRestaurantForm";
import axios from "axios";

function EditRestaurant() {
  let { restaurantId } = useParams;
  const [restaurantToEdit, setRestaurantToEdit] = useState([]);

  const getRestaurantToEdit = async () => {
    const data = await axios.get(
      `http://localhost:5000/restaurants/${restaurantId}`
    );
    const { restaurant } = data.data;
    setRestaurantToEdit(restaurant);
  };

  useEffect(() => {
    getRestaurantToEdit();
  });

  return (
    <div>
      <EditRestaurantForm
        restaurantId={restaurantToEdit.id}
        name={restaurantToEdit.name}
        style={restaurantToEdit.style}
        website={restaurantToEdit.website}
        location={restaurantToEdit.location}
      />
    </div>
  );
}

export default EditRestaurant;
