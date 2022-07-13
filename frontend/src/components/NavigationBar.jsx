import React, { useContext } from "react";
import { Context } from "./helpers/Context";
import { Link } from "react-router-dom";
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
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <Link to="/" className="font-bold align-middle">
            Gaijin Foodie
          </Link>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link className="btn btn-ghost btn-sm mx-1" to="/">
              Home
            </Link>
            <Link className="btn btn-ghost btn-sm mx-1" to="/restaurants">Restaurants</Link>
            <Link className="btn btn-ghost btn-sm mx-1" to="/blog">Blogs</Link>
            <Link className="btn btn-ghost btn-sm mx-1" to="/about">About</Link>
            {!store.token ? (
              <Link className="btn btn-ghost btn-sm mx-1" to="/login">Login</Link>
            ) : (
              <button className="btn btn-ghost btn-sm mx-1" onClick={() => actions.logout()}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
