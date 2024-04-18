import axios from "axios";
axios.interceptors.request.use(
    req => {
        const user = localStorage.getItem('user');
        const token = user && JSON.parse(user).token;
        if (token) {
            req.headers['access'] = token;
        }
        return req.data;
    },
    error => {
        // Handle error response
        if (error.response) {
          // The server responded with a status code outside of 2xx
          if (error.response.data && error.response.data.error) {
            // Handle JSON error response
            console.error('Server Error:', error.response.data.error);
          } else {
            // Handle non-JSON error response
            console.error('Server Error:', error.response.statusText);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request Error:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Error:', error.message);
        }
        return Promise.reject(error); // Reject promise to propagate error
      }
);