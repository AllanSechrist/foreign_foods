import React, { useContext } from "react";
import { Context } from "./helpers/Context";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as ViewBlogIcon } from "../assets/svg/visibilityIcon.svg";

function RestaurantCard({
  restaurant: { id, name, style, food_rating, price_rating, service_rating, open, close },
}) {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  return (
    <>
      <div className="card shadow-xl bg-base-100">
        <div className="text-center items-center space-x-4 card-body card-bordered bg-secondary-focus">
          <div>
            <h1 className="card-title text-4xl text-base-100">{name}</h1>
            <h3 className="text-2xl text-base-100">{style}</h3>
          </div>
          <div>
            <p className="text-2xl my-2 text-left">Food:{food_rating}</p>
            <p className="text-2xl my-2 text-left">Price: {price_rating}</p>
            <p className="text-2xl my-2 text-left">Service: {service_rating}</p>
          </div>
          <div className="mt-5">
            <div className="badge badge-outline gap-2 mx-5">Open: {open}</div>
            <div className="badge badge-outline gap-2 mx-5">Close: {close}</div>
          </div>

          <div className="card-actions mt-10">
            <Link to={`/restaurants/${id}/blog`}>
              <button className="btn gap-2 btn-outline btn-accent-focus text-primary-content">
                View Blog <ViewBlogIcon fill="rgb(255, 255, 255)" />
              </button>
            </Link>
            {store.token && (
              <>
                <button
                  className="btn gap-2 btn-error"
                  onClick={() => {
                    actions.deleteRestaurant(id); navigate('/')
                  }}
                >
                  Delete Restaurant <DeleteIcon />
                </button>
                <Link to={`/restaurants/edit-restaurant/${id}`}>
                  <button className="btn btn-accent">Edit Restaurant</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantCard;
