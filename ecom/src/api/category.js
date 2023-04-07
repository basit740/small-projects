import api from './api';

// Category Functions

export function getCategories() {
	return api
		.get('/category')
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

export function getCategory(id) {
	return api
		.get(`/category/${id}`)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

export function createCategory(categoryData, accessToken) {
	return api
		.post('/category', categoryData, {
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

export function updateCategory(id, categoryData, accessToken) {
	categoryData = { ...categoryData, id };
	return api
		.put(`/category/${id}`, categoryData, {
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

export function deleteCategory(id, accessToken) {
	return api
		.delete(`/category/${id}`, {
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

// Subcategory Functions

export function getSubcategories() {
	return api
		.get('/subcategory')
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

export function getSubcategoriesByCategoryId(categoryId) {
	return api
		.get(`/category/${categoryId}/subcategories`)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

export function getSubcategory(id) {
	return api
		.get(`/subcategory/${id}`)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

export function createSubcategory(subcategoryData, accessToken) {
	return api
		.post('/subcategory', subcategoryData, {
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

export function updateSubcategory(id, subcategoryData, accessToken) {
	subcategoryData = { ...subcategoryData, id };
	return api
		.put(`/subcategory/${id}`, subcategoryData, {
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

export function deleteSubcategory(id, accessToken) {
	return api
		.delete(`/subcategory/${id}`, {
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
