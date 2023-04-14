import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

import AddCategoryForm from './categories/AddCategoryForm';
import AddUpdateCategoryModal from './categories/AddUpdateCategoryModal';
// api actions

import {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
	getSubcategories,
	getSubcategoriesByCategoryId,
	getSubcategory,
	createSubcategory,
	updateSubcategory,
	deleteSubcategory,
} from '../../api/category';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [categoryToUpdate, setCategoryToUpdate] = useState(null);

	// helper functions

	const handleCreateCategory = async (newCategory) => {
		console.log(newCategory);
		const createdCategory = await createCategory(
			newCategory,
			localStorage.getItem('token')
		);

		//
		console.log(createdCategory); // because createdCategory is only giving id

		newCategory = { ...newCategory, id: createdCategory.id };

		setCategories([...categories, newCategory]);
	};

	const handleUpdateCategory = async (updatedCategory) => {
		console.log(updatedCategory); // because updatedCategory is only giving id

		const result = await updateCategory(
			updatedCategory,
			localStorage.getItem('token')
		);
		console.log(result);

		if (result) {
			setCategories(
				categories.map((category) =>
					category.id === updatedCategory.id ? updatedCategory : category
				)
			);
		}
	};

	const handleDeleteCategory = async (categoryId) => {
		const result = await deleteCategory(
			categoryId,
			localStorage.getItem('token')
		);
		if (result) {
			setCategories(
				categories.filter((category) => category.id !== categoryId)
			);
		}
	};

	// Modal functionality
	const handleShowAddModal = () => setShowAddModal(true);
	const handleCloseAddModal = () => setShowAddModal(false);

	const handleShowUpdateModal = (category) => {
		setCategoryToUpdate(category);
		setShowUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setCategoryToUpdate(null);
		setShowUpdateModal(false);
	};

	useEffect(() => {
		async function fetchData() {
			const fetchedCategories = await getCategories();

			setCategories(fetchedCategories);
			setLoading(false);
		}

		fetchData();
	}, []);

	return (
		<Container>
			<Row className='mt-5'>
				<Col>
					<h1>Categories Management</h1>
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan='3'>Loading...</td>
								</tr>
							) : (
								categories.length > 0 &&
								categories.map((category) => (
									<tr key={category.id}>
										<td>{category.id}</td>
										<td>{category.title}</td>
										<td>{category.description}</td>
										<td>
											<Button
												variant='info'
												onClick={() => handleShowUpdateModal(category)}
												size='sm'
												style={{ marginRight: '10px' }}
											>
												Update
											</Button>
											<Button
												variant='danger'
												onClick={() => handleDeleteCategory(category.id)}
												size='sm'
											>
												Delete
											</Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</Table>
					<AddCategoryForm onCreateCategory={handleCreateCategory} />
				</Col>
			</Row>

			<Button className='mt-3' onClick={handleShowAddModal}>
				Add Category
			</Button>
			<AddUpdateCategoryModal
				show={showAddModal}
				handleClose={handleCloseAddModal}
				onSubmit={handleCreateCategory}
			/>
			<AddUpdateCategoryModal
				show={showUpdateModal}
				handleClose={handleCloseUpdateModal}
				onSubmit={handleUpdateCategory}
				categoryToUpdate={categoryToUpdate}
			/>
		</Container>
	);
};

export default Categories;
