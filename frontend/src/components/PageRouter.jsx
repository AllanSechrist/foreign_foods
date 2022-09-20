import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import NewRestaurant from "./pages/NewRestaurant";
import EditRestaurant from "./pages/EditRestaurant";
import NewBlog from "./pages/NewBlog";
import EditBlog from "./pages/EditBlog";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import injectContext from "./helpers/Context";

function PageRouter() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <nav>
          <NavigationBar />
        </nav>
        <main className="container mx-auto px-3 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/edit-restaurant/:restaurantId" element={<EditRestaurant />} />
            <Route path="restaurants/new-restaurant" element={<NewRestaurant />} />
            <Route path="/blog/new-blog/:restaurantId" element={<NewBlog />} />
            <Route path="/blog/edit-blog/:blogId" element={<EditBlog />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/restaurants/:restaurantId/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default injectContext(PageRouter);
