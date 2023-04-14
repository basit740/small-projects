import api from './api';

export function getProducts(pageNumber, limit) {
	return api
		.get(`/product/?limit=${limit}&page=${pageNumber}`)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

export function getProduct(id) {
	return api
		.get(`/product/${id}`)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

export function createProduct(productData, accessToken) {
	return api
		.post('/product', productData, {
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

export function updateProduct(id, productData, accessToken) {
	return api
		.put(`/product/${id}`, productData, {
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

export function deleteProduct(id, accessToken) {
	return api
		.delete(`/product/${id}`, {
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
