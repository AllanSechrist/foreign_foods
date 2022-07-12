import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function RestaurantCard({
  restaurant: { id, name, style, food_rating, price_rating, service_rating },
}) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="card shadow-xl bg-base-100">
        <div className="text-center items-center space-x-4 card-body">
          <div>
            <h1 className="card-title">{name}</h1>
            <h3>{style}</h3>
            <p>{food_rating}</p>
            <p>{price_rating}</p>
            <p>{service_rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

RestaurantCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default RestaurantCard;
