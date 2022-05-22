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
                    console.log(data.data.access_token)
                    sessionStorage.setItem("token", data.data.access_token)
                    console.log(sessionStorage.getItem("token"))
                    setStore({ token: data.data.access_token})
                
                })
                .catch(function (error) {
                    console.log(error)
                })
            }
            
		}
	};
};

export default getState;
