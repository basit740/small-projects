import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddUpdateSubcategoryForm = ({
	show,
	handleClose,
	onSubmit,
	subcategory,
}) => {
	const [title, setTitle] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (subcategory) {
			setTitle(subcategory.title);
		} else {
			setTitle('');
		}
	}, [subcategory]);

	const handleSave = () => {
		if (title.trim() === '') {
			setError('Title is required');
			return;
		}

		setError('');
		if (subcategory) {
			onSubmit(subcategory.id, { title, categoryId: subcategory.categoryId });
		} else {
			onSubmit({ title });
		}
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{subcategory ? 'Update Subcategory' : 'Add Subcategory'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId='subcategoryTitle'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter subcategory title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>
					{error && <p className='text-danger'>{error}</p>}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Cancel
				</Button>
				<Button variant='primary' onClick={handleSave}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddUpdateSubcategoryForm;
