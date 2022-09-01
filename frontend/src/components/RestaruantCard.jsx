import React, { useContext } from "react";
import { Context } from "./helpers/Context";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as ViewBlogIcon } from "../assets/svg/visibilityIcon.svg";

function RestaurantCard({
  restaurant: { id, name, style, food_rating, price_rating, service_rating },
}) {
  const { store, actions } = useContext(Context);
  return (
    <>
      <div className="card shadow-xl bg-base-100">
        <div className="text-center items-center space-x-4 card-body card-bordered bg-accent-content">
          <div>
            <h1 className="card-title">{name}</h1>
            <h3>{style}</h3>
            <p>{food_rating}</p>
            <p>{price_rating}</p>
            <p>{service_rating}</p>
          </div>
          <div className="card-actions mt-10">
            <Link to={`/restaurants/${id}/blog`}>
              <button className="btn gap-2 btn-accent">
                View Blog <ViewBlogIcon fill='rgb(255, 255, 255)'/>
              </button>
            </Link>
            {store.token && (
              <>
                <button className="btn gap-2 btn-error" onClick={() => {actions.deleteRestaurant(id)}}>
                  Delete Restaurant <DeleteIcon />
                </button>
                <button className="btn btn-success">
                  Edit Restaurant
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantCard;
