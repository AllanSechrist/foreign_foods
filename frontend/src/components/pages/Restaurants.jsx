import React, { useState, useEffect } from "react";
import axios from "axios";
import ActionAreaCard from "../RestaruantCard";
// import RestaurantGrid from "../RestaurantGrid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// function RestaurantGrid() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         <Grid item xs={4}>
//           <Item>stuff</Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

function Restaurants() {
  const [restaurantList, setRestaurantList] = useState([]);

  const fetchRestaurants = async () => {
    const data = await axios.get("http://localhost:5000/restaurants");
    const { restaurant } = data.data;
    setRestaurantList(restaurant);
    // console.log(data.data.restaurant)
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {restaurantList.map((restaurant) => {
            return (
              <Grid item xs={3}>
                <Item>
                  <ActionAreaCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    style={restaurant.style}
                    rating={restaurant.food_rating}
                    price={restaurant.price_rating}
                    service={restaurant.service_rating}
                  />
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default Restaurants;
