import api from './api';

// Order Functions

export function getOrders(accessToken) {
	return api
		.get('/order', {
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

export function getOrder(id, accessToken) {
	return api
		.get(`/order/${id}`, {
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

export function createOrder(orderData, accessToken) {
	return api
		.post('/order/purchase', orderData, {
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

// will look into it
export function updateOrder(id, orderData, accessToken) {
	return api
		.put(`/order/${id}`, orderData, {
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
//http://18.209.57.116/order/status
export function changeOrderStatus(id, orderData, accessToken) {
	orderData = { ...orderData, id };
	return api
		.put(`/order/status`, orderData, {
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

export function deleteOrder(id, accessToken) {
	return api
		.delete(`/order/${id}`, {
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

// Cart Functions

//http://18.209.57.116/order/cart

export function getCartItems(accessToken) {
	return api
		.get('order/cart', {
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

export function getCartItem(id, accessToken) {
	return api
		.get(`/cart/${id}`, {
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

export function addToCart(cartItemData, accessToken) {
	return api
		.post('/order/add-to-cart', cartItemData, {
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

//http://18.209.57.116/order/add-to-cart

///http://18.209.57.116/order/decrement-quantity

//http://18.209.57.116/order/decrement-quantity
export function decrementItemQty(id, accessToken) {
	return api
		.post(
			`/order/decrement-quantity`,
			{ productId: id },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

// http://18.209.57.116/order/remove-from-cart

export function removeFromCart(id, accessToken) {
	return api
		.post(
			`/order/remove-from-cart/`,
			{ productId: id },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}
