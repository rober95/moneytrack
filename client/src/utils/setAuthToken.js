import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('jwtToken', token);
  } else {
    // Delete Auth Header
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('jwtToken');
  }
};

export default setAuthToken;
