import React, {useContext} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { Context } from './helpers/Context'
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




function PageRouter() {
    const { store, actions } = useContext(Context);
    return (
        <Router>
            
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/restaurants">Restaurants</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/new-restaurant">Add Restaurant</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about">About</Link>
                        </li>
                    
                    
                    
                    
                    
                    { !store.token ? 
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        :
                        <button onClick={() => actions.logout()}>Logout</button>
                    }
                    </ul>
                </div>

            </nav>
            {/* <Header /> */}
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/restaurants" element={<Restaurants/>} />
                <Route path="/new-restaurant" element={<NewRestaurant/>}/>
                <Route path="/blog/new-blog/:restaurantId" element={<NewBlog/>} />
                <Route path="/blog" element={<Blogs />} />
                <Route path="/blog/:restaurantId" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default injectContext(PageRouter)

