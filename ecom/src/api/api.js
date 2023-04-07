import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL || 'http://50.17.59.159';

const api = axios.create({
	baseURL: apiURL, // Replace this with your API base URL
});

export default api;
