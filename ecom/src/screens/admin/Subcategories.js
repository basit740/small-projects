import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import AddUpdateSubcategoryForm from './subcategories/AddUpdateSubcategoryForm';
import {
	getSubcategories,
	createSubcategory,
	updateSubcategory,
	deleteSubcategory,
	getCategories,
} from '../../api/category';

const Subcategories = () => {
	const [subcategories, setSubcategories] = useState([]);

	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [selectedSubcategory, setSelectedSubcategory] = useState(null);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const data = await getSubcategories();
			const categoriesData = await getCategories();

			// add category title for each subcategory
			data.map((subcat) => {
				subcat.category = categoriesData.find(
					(category) => category.id === subcat.categoryId
				).title;
				return subcat;
			});
			setSubcategories(data);
		} catch (error) {
			console.error('Error fetching subcategories:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateSubcategory = async (subcategoryData) => {
		try {
			await createSubcategory(subcategoryData);
			fetchData();
		} catch (error) {
			console.error('Error creating subcategory:', error);
		}
	};

	const handleUpdateSubcategory = async (id, subcategoryData) => {
		subcategoryData.id = id;

		try {
			await updateSubcategory(subcategoryData, localStorage.getItem('token'));
			fetchData();
		} catch (error) {
			alert('Error updating subcategory:');
		}
	};

	const handleDeleteSubcategory = async (id) => {
		try {
			await deleteSubcategory(id, localStorage.getItem('token'));
			fetchData();
		} catch (error) {
			console.error('Error deleting subcategory:', error);
		}
	};

	const openModal = (subcategory) => {
		setSelectedSubcategory(subcategory);
		setShowModal(true);
	};

	const closeModal = () => {
		setSelectedSubcategory(null);
		setShowModal(false);
	};

	return (
		<Container>
			<Row className='mt-5'>
				<Col>
					<h1>Subcategories Management</h1>
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Category</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan='3'>Loading...</td>
								</tr>
							) : (
								subcategories.map((subcategory) => (
									<tr key={subcategory.id}>
										<td>{subcategory.id}</td>
										<td>{subcategory.title}</td>
										<td>{subcategory.category}</td>
										<td>
											<Button
												variant='info'
												onClick={() => openModal(subcategory)}
												style={{ marginRight: '10px' }}
											>
												Update
											</Button>
											<Button
												variant='danger'
												onClick={() => handleDeleteSubcategory(subcategory.id)}
											>
												Delete
											</Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</Table>
				</Col>
			</Row>
			<AddUpdateSubcategoryForm
				show={showModal}
				handleClose={closeModal}
				onSubmit={
					selectedSubcategory
						? handleUpdateSubcategory
						: handleCreateSubcategory
				}
				subcategory={selectedSubcategory}
			/>
		</Container>
	);
};

export default Subcategories;
