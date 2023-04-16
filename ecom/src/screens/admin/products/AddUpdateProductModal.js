import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { getSubcategory } from '../../../api/category';

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

	const [selectedCategory, setSelectedCategory] = useState('');
	const [filteredSubcategories, setFilteredSubcategories] =
		useState(subcategories);

	// categoryChangeHandler
	const categoryChangeHandler = (e) => {
		setSelectedCategory(parseInt(e.target.value));

		const categoryIdSelected = parseInt(e.target.value);

		const prevSubCategories = subcategories.filter(
			(subCat) => subCat.categoryId === categoryIdSelected
		);

		setFilteredSubcategories(prevSubCategories);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log('selected Category', selectedCategory);
		console.log('selected Sub Category', subcategoryId);

		//
		const formData = new FormData();
		formData.append('id', productId);
		formData.append('title', productTitle);
		formData.append('description', productDescription);
		formData.append('price', productPrice);
		formData.append('categoryId', selectedCategory);
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

			const foundSubCategory = subcategories.find(
				(cat) => cat.id === productToUpdate.subcategoryId
			);
			setSelectedCategory(
				categories.find((cat) => cat.id === foundSubCategory.categoryId)
			);

			// also change categoreis and subCategores
		}
		// Reset the selected category when the modal is opened for a new product

		// also reset everything when the modal is opened for a new product

		if (!productToUpdate) {
			setSelectedCategory('');

			setProductId(null);
			setProductTitle('');
			setProductDescription('');
			setProductPrice('');
			setSubcategoryId('');
		}

		// reset the form again
	}, [productToUpdate]);

	return (
		<Modal show={show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>
						{productToUpdate ? 'Update Product' : 'Add Product'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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

					{/* New categories dropdown */}
					<Form.Group controlId='categoryId'>
						<Form.Label>Category</Form.Label>
						<Form.Control
							as='select'
							value={selectedCategory}
							onChange={categoryChangeHandler}
							required
						>
							<option value=''>Select a category</option>
							{categories &&
								categories.length &&
								categories.map((category) => (
									<option
										key={category.id}
										value={category.id}
										selected={
											selectedCategory.id === category.id ? true : false
										}
									>
										{category.title}
									</option>
								))}
						</Form.Control>
					</Form.Group>

					<Form.Group controlId='subcategoryId'>
						<Form.Label>Subcategory</Form.Label>
						<Form.Control
							as='select'
							value={subcategoryId}
							onChange={(e) => setSubcategoryId(parseInt(e.target.value))}
							required
							disabled={!selectedCategory} // Disable subcategories dropdown if no category is selected
						>
							<option value=''>Select a subcategory</option>
							{filteredSubcategories &&
								filteredSubcategories.length > 0 &&
								filteredSubcategories.map((subcategory) => (
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
				</Modal.Body>

				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose} className='mt-3'>
						Cancel
					</Button>
					<Button variant='primary' type='submit' className='mt-3'>
						{productToUpdate ? 'Update' : 'Add'}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default AddUpdateProductModal;
