const restaurantReducer = (state, action) => {
  switch (action.type) {
    case "GET_RESTS": // gets all the restaurants
      return {
        ...state,
        restaurants: action.payload,
        loading: false,
      };
    case "GET_BLOGS": // gets all the blogs
      return {
        ...state,
        blogs: action.payload.blogs,
				loading: false,
      };
		case "GET_BLOG": // gets a single blog
			return {
				...state,
				blogs: action.payload.blog,
				loading: false,
			}
    case "SET_LOADING": // sets loading to true
      return {
        ...state,
        loading: true,
      }
  }
};

export default restaurantReducer
