import React from "react";
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div className="hero">
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <h1 className="text-8xl font-bold mb-8">Gaijin Foodie</h1>
          <p className="text-5xl mb-8">
            Want to find new and exotic places to eat?
          </p>
          <p>
            You just found the right place! Checkout my collection of foreign
            restaurants in Tokyo!
          </p>
					<Link to='/restaurants' className='btn btn-primary btn-lg mt-20'>
						Enter
					</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
