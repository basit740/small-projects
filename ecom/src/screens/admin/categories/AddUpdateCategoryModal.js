import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddUpdateCategoryModal = ({
	show,
	handleClose,
	onSubmit,
	categoryToUpdate,
}) => {
	const [categoryTitle, setCategoryTitle] = useState(
		categoryToUpdate ? categoryToUpdate.title : ''
	);
	const [id, setId] = useState(categoryToUpdate ? categoryToUpdate.id : null);
	const [description, setDescription] = useState(
		categoryToUpdate ? categoryToUpdate.description : ''
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit({
			id: id,
			title: categoryTitle,
			description: description,
		});
		handleClose();
	};

	useEffect(() => {
		console.log(categoryToUpdate);
		if (categoryToUpdate) {
			setCategoryTitle(categoryToUpdate.title);
			setDescription(categoryToUpdate.description);
			setId(categoryToUpdate.id);
		}
	}, [categoryToUpdate]);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{categoryToUpdate ? 'Update Category' : 'Add Category'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId='categoryName'>
						<Form.Label>Category Title</Form.Label>
						<Form.Control
							type='text'
							value={categoryTitle}
							onChange={(e) => setCategoryTitle(e.target.value)}
							required
						/>
					</Form.Group>

					<Form.Group controlId='categoryName'>
						<Form.Label>Category Description</Form.Label>
						<Form.Control
							type='text'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose} className='mt-3'>
					Cancel
				</Button>
				<Button variant='primary' type='submit' className='mt-3'>
					{categoryToUpdate ? 'Update' : 'Add'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddUpdateCategoryModal;
