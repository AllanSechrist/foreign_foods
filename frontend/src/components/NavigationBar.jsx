import React, { useContext } from "react";
import { Context } from "./helpers/Context";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar bg-neutral text-base-100">
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
            <Link className="btn btn-ghost btn-sm mx-1" to="/restaurants">
              Restaurants
            </Link>
            <Link className="btn btn-ghost btn-sm mx-1" to="/blog">
              Blogs
            </Link>
            <Link className="btn btn-ghost btn-sm mx-1" to="/about">
              About
            </Link>
            {store.token && (
              <Link
                className="btn btn-ghost btn-sm mx-1"
                to="restaurants/new-restaurant"
              >
                +New Restaurant
              </Link>
            )}
            {!store.token ? (
              <Link className="btn btn-ghost btn-sm mx-1" to="/login">
                Login
              </Link>
            ) : (
              <button
                className="btn btn-ghost btn-sm mx-1"
                onClick={() => actions.logout()}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
