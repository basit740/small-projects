import axios from 'axios';

const adminApi = axios.create({
	baseURL: 'https://your-api-url.com', // Replace this with your API base URL
});

export default adminApi;
