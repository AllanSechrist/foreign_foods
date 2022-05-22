import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Restaurants from "./pages/Restaurants"
import Blogs from "./pages/Blogs"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import NewRestaurant from './pages/NewRestaurant'
import NewBlog from './pages/NewBlog'
import About from './pages/About'
import Login from './pages/Login'
import Header from "./Header";
import Footer from "./Footer";
import injectContext from './helpers/Context'
import React from 'react'



function PageRouter() {
    return (
        <Router>
            <Header />
            <nav>
                <Link to="/">Home</Link>
                <Link to="/restaurants">Restaurants</Link>
                <Link to="/new-restaurant">Add Restaurant</Link>
                <Link to="/new-blog">Add Blog</Link>
                <Link to="/blog">Blogs</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/restaurants" element={<Restaurants/>} />
                <Route path="/new-restaurant" element={<NewRestaurant/>}/>
                <Route path="/new-blog" element={<NewBlog/>} />
                <Route path="/blog" element={<Blogs />} />
                <Route path="/blog/:blogId" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default injectContext(PageRouter)

