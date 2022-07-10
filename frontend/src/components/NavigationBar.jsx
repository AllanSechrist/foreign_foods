import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";
import { Context } from "./helpers/Context";
import Restaurants from "./pages/Restaurants";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import NewRestaurant from "./pages/NewRestaurant";
import NewBlog from "./pages/NewBlog";
import About from "./pages/About";
import Login from "./pages/Login";

export default function NavigationBar() {
  const { store, actions } = useContext(Context);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Link to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </Link>
          <Link to="/restaurants">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Restaurants
            </Typography>
          </Link>
          <Link to="/new-restaurant">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Add Restaurant
            </Typography>
          </Link>
          <Link to="/blog">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blogs
            </Typography>
          </Link>
          <Link to="/about">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              About
            </Typography>
          </Link>
          {!store.token ? (
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          ) : (
            <Button onClick={() => actions.logout()}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
