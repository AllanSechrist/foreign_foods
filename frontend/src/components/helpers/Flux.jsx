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
            }
            
		}
	};
};

export default getState;
