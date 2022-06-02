import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		    token: null,
		},
		actions: {
			
            login: async (email, password) => {
                await axios.post("http://localhost:5000/login", {
                    "email": email,
                    "password": password
                })
                .then(function (data) {
                    const token = data.data.access_token
                    sessionStorage.setItem("token", token)
                    setStore({ token: token})
                
                })
                .catch(function (error) {
                    console.log(error)
                })
            },

            syncTokenFromSessionStore: () => {
                const token = sessionStorage.getItem("token")
                if(token && token!=="" && token!==undefined) {
                    setStore({token: token})
                }
            },

            logout: () => {
                sessionStorage.removeItem("token")
                setStore({ token: null })
                const data = axios.get("http://localhost:5000/logout")
                console.log(data)
            },
            
            newBlog: async (title, subtitle, body, restaurantId) => {
                const store = getStore()
                const opts = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                await axios.post(`http://localhost:5000/blog/new-blog/${restaurantId}`,
                 {
                     "title": title,
                     "subtitle": subtitle,
                     "body": body
                 },
                 opts)
                .catch(function (error) {
                    console.log(error)
                })
            },

            newRestaurant: async (
                restaurantName,
                style,
                website,
                location,
                openTime,
                closeTime,
                foodRating,
                priceRating,
                serviceRating
            ) => {
                const store = getStore()
                const opts = {
                    headers : {
                        "Authorization": "Bearer " + store.token
                    }
                }
                await axios.post(`http://localhost:5000/new-restaurant`,
                {
                    "name": restaurantName,
                    "style": style,
                    "website": website,
                    "location": location,
                    "open": openTime,
                    "close": closeTime,
                    "food_rating": foodRating,
                    "price_rating": priceRating,
                    "service_rating": serviceRating,
                },
                opts)
                .catch(function (error){
                    console.log(error)
                })
            },
            deleteBlog: async (blogId) => {
                const store = getStore()
                const opts = {
                    headers : {
                        "Authorization": "Bearer " + store.token
                    }
                }
                await axios.delete(`http://localhost:5000/blog/delete-blog/${blogId}`,{opts})
                .catch(function (error) {
                    console.log(error)
                })
            },
            editBlog: async (blogId) => {
                const store = getStore()
                const opts = {
                    headers : {
                        "Authorization": "Bearer " + store.token
                    }
                }
                const data = await axios.get(`http://localhost:5000/blog/edit-blog${blogId}`)
            }

            
		}
	};
};

export default getState;
