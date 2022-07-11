import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Context } from "./helpers/Context";
import Restaurants from "./pages/Restaurants";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import NewRestaurant from "./pages/NewRestaurant";
import NewBlog from "./pages/NewBlog";
import About from "./pages/About";
import Login from "./pages/Login";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import Footer from "./Footer";
import injectContext from "./helpers/Context";

function PageRouter() {
  const { store, actions } = useContext(Context);
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <nav>
          <NavigationBar />
          {/* <Link to="/">Home</Link>
                <Link to="/restaurants">Restaurants</Link>
                <Link to="/new-restaurant">Add Restaurant</Link>
                <Link to="/blog">Blogs</Link>
                <Link to="/about">About</Link>
                { !store.token ? 
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    :
                    <button onClick={() => actions.logout()}>Logout</button>
                } */}

          {/* <Header /> */}
        </nav>
        <main className="container mx-auto px-3 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/new-restaurant" element={<NewRestaurant />} />
            <Route path="/blog/new-blog/:restaurantId" element={<NewBlog />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blog/:restaurantId" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default injectContext(PageRouter);
