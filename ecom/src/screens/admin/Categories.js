import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import AddUpdateCategoryModal from './categories/AddUpdateCategoryModal';
import AddUpdateSubcategoryForm from './subcategories/AddUpdateSubcategoryForm';

import Helmet from 'react-helmet';

import {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	createSubcategory,
} from '../../api/category';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [categoryToUpdate, setCategoryToUpdate] = useState(null);

	const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);

	// navigation

	const navigate = useNavigate();

	// helper functions

	const handleCreateCategory = async (newCategory) => {
		const createdCategory = await createCategory(
			newCategory,
			localStorage.getItem('token')
		);

		newCategory = { ...newCategory, id: createdCategory.id };

		setCategories([...categories, newCategory]);
	};

	const handleUpdateCategory = async (updatedCategory) => {
		const result = await updateCategory(
			updatedCategory,
			localStorage.getItem('token')
		);

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

	const handleShowAddSubcategoryModal = (category) => {
		setSelectedCategory(category);
		setShowAddSubcategoryModal(true);
	};

	const handleCloseAddSubcategoryModal = () => {
		setSelectedCategory(null);
		setShowAddSubcategoryModal(false);
	};

	const handleCreateSubcategory = async (newSubcategory) => {
		newSubcategory.categoryId = selectedCategory.id;
		const createdSubcategory = await createSubcategory(
			newSubcategory,
			localStorage.getItem('token')
		);

		if (createdSubcategory.id) {
			navigate('/admin/subcategories');
		}
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
			<Helmet>
				<title>Categories | Ecom Admin</title>
			</Helmet>
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
												style={{ marginRight: '10px' }}
											>
												Delete
											</Button>

											<Button
												variant='success'
												onClick={() => handleShowAddSubcategoryModal(category)}
												size='sm'
											>
												Add Subcategory
											</Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</Table>
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
			<AddUpdateSubcategoryForm
				show={showAddSubcategoryModal}
				handleClose={handleCloseAddSubcategoryModal}
				onSubmit={handleCreateSubcategory}
				categoryId={selectedCategory?.id}
			/>
		</Container>
	);
};
export default Categories;
