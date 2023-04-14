import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddUpdateProductModal = ({
	show,
	handleClose,
	onSubmit,
	productToUpdate,
	categories,
	subcategories,
}) => {
	const [productId, setProductId] = useState(
		productToUpdate ? productToUpdate.id : null
	);
	const [productTitle, setProductTitle] = useState(
		productToUpdate ? productToUpdate.title : ''
	);
	const [productDescription, setProductDescription] = useState(
		productToUpdate ? productToUpdate.description : ''
	);
	const [productPrice, setProductPrice] = useState(
		productToUpdate ? productToUpdate.price : ''
	);
	const [subcategoryId, setSubcategoryId] = useState(
		productToUpdate ? productToUpdate.subcategoryId : ''
	);
	const [productImage, setProductImage] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('id', productId);
		formData.append('title', productTitle);
		formData.append('description', productDescription);
		formData.append('price', productPrice);
		formData.append('subcategoryId', subcategoryId);
		if (productImage) {
			formData.append('image', productImage);
		}

		onSubmit(formData);
		handleClose();
	};

	useEffect(() => {
		if (productToUpdate) {
			setProductId(productToUpdate.id);
			setProductTitle(productToUpdate.title);
			setProductDescription(productToUpdate.description);
			setProductPrice(productToUpdate.price);
			setSubcategoryId(productToUpdate.subcategoryId);
		}
	}, [productToUpdate]);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{productToUpdate ? 'Update Product' : 'Add Product'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId='productTitle'>
						<Form.Label>Product Title</Form.Label>
						<Form.Control
							type='text'
							value={productTitle}
							onChange={(e) => setProductTitle(e.target.value)}
							required
						/>
					</Form.Group>

					<Form.Group controlId='productDescription'>
						<Form.Label>Product Description</Form.Label>
						<Form.Control
							type='text'
							value={productDescription}
							onChange={(e) => setProductDescription(e.target.value)}
							required
						/>
					</Form.Group>

					<Form.Group controlId='productPrice'>
						<Form.Label>Product Price</Form.Label>
						<Form.Control
							type='number'
							step='0.01'
							value={productPrice}
							onChange={(e) => setProductPrice(parseFloat(e.target.value))}
							required
						/>
					</Form.Group>

					<Form.Group controlId='subcategoryId'>
						<Form.Label>Subcategory</Form.Label>
						<Form.Control
							as='select'
							value={subcategoryId}
							onChange={(e) => setSubcategoryId(parseInt(e.target.value))}
							required
						>
							<option value=''>Select a subcategory</option>
							{subcategories.map((subcategory) => (
								<option key={subcategory.id} value={subcategory.id}>
									{subcategory.title}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='productImage'>
						<Form.Label>Product Image</Form.Label>
						<Form.Control
							type='file'
							onChange={(e) => setProductImage(e.target.files[0])}
						/>
					</Form.Group>

					<Button variant='primary' type='submit' className='mt-3'>
						{productToUpdate ? 'Update' : 'Add'}
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default AddUpdateProductModal;
