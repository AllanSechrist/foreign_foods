import { createContext, useReducer } from "react";
import restaurantReducer from "./RestaurantReducer";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const initialState = {
    restaurants: [],
    blogs: [],
    blog: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(restaurantReducer, initialState);

  return (
    <RestaurantContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;
