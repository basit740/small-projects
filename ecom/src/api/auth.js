import api from './api';

export function login(email, password) {
	return api
		.post('/auth/login', {
			email,
			password,
		})
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

export function register(email, password) {
	return api
		.post('/auth/register', {
			email,
			password,
		})
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

export function getCurrentUser(accessToken) {
	return api
		.get('/auth/me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}
