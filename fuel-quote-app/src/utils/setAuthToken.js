import axios from "axios";

// https://github.com/axios/axios#global-axios-defaults

const setAuthToken = token => {
    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers['Authorization'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers['Authorization'];
    }
};

export default setAuthToken;