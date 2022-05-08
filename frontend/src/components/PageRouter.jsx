import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Restaurants from "./pages/Restaurants"
import Blogs from "./pages/Blogs"
import Home from "./pages/Home"
import Header from "./Header";
import Footer from "./Footer";
import React from 'react'



function PageRouter() {
    return (
        <Router>
            <Header />
            <nav>
                <Link to="/">Home</Link>
                <Link to="/restaurants">Restaurants</Link>
                <Link to="/blog">Blogs</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/restaurants" element={<Restaurants/>} />
                <Route path="/blog" element={<Blogs />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default PageRouter

