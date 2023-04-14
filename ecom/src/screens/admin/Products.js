import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Table,
	Button,
	Pagination,
} from 'react-bootstrap';

import AddUpdateProductModal from './products/AddUpdateProductModal';

import ProductsPagination from './products/ProductsPagination';

// api actions

import {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from '../../api/product';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [productToUpdate, setProductToUpdate] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(1);
	const [totalProducts, setTotalProducts] = useState(0);

	// helper functions

	const handleCreateProduct = async (newProduct) => {
		const createdProduct = await createProduct(
			newProduct,
			localStorage.getItem('token')
		);
		setProducts([...products, createdProduct]);
	};

	const handleUpdateProduct = async (updatedProduct) => {
		const result = await updateProduct(
			updatedProduct,
			localStorage.getItem('token')
		);
		if (result) {
			setProducts(
				products.map((product) =>
					product.id === updatedProduct.id ? updatedProduct : product
				)
			);
		}
	};

	const handleDeleteProduct = async (productId) => {
		const result = await deleteProduct(
			productId,
			localStorage.getItem('token')
		);
		if (result) {
			setProducts(products.filter((product) => product.id !== productId));
		}
	};

	// Pagination
	// const indexOfLastProduct = currentPage * productsPerPage;
	// const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	// const currentProducts = products.slice(
	// 	indexOfFirstProduct,
	// 	indexOfLastProduct
	// );

	// const pageCount = Math.ceil(products.length / productsPerPage);
	// const changePage = (pageNumber) => setCurrentPage(pageNumber);

	const changePage = (pageNumber) => setCurrentPage(pageNumber);
	const pageCount = Math.ceil(totalProducts / limit);

	// Modal functionality
	const handleShowAddModal = () => setShowAddModal(true);
	const handleCloseAddModal = () => setShowAddModal(false);

	const handleShowUpdateModal = (product) => {
		setProductToUpdate(product);
		setShowUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setProductToUpdate(null);
		setShowUpdateModal(false);
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const fetchedProducts = await getProducts(currentPage, limit);
				setProducts(fetchedProducts.rows);
				setTotalProducts(fetchedProducts.count);
				setLoading(false);
			} catch (e) {
				alert('error fetching products: ', e.message);
			}
		}

		fetchData();
	}, [currentPage, limit]);

	// Pagination here
	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	// Render pagination items
	const renderPaginationItems = () => {
		let items = [];
		for (let i = 1; i <= pageCount; i++) {
			items.push(
				<Pagination.Item
					key={i}
					active={i === currentPage}
					onClick={() => changePage(i)}
				>
					{i}
				</Pagination.Item>
			);
		}
		return items;
	};

	return (
		// Add your table structure and other UI components here
		<Container>
			<Row className='mt-5'>
				<Col>
					<h1>Products Management</h1>
					<Button
						variant='primary'
						onClick={handleShowAddModal}
						className='float-right mb-3'
					>
						Add Product
					</Button>
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
								<th>Price</th>
								<th>Subcategory ID</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan='6'>Loading...</td>
								</tr>
							) : (
								products.map((product) => (
									<tr key={product.id}>
										<td>{product.id}</td>
										<td>{product.title}</td>
										<td>{product.description}</td>
										<td>{product.price}</td>
										<td>{product.subcategoryId}</td>
										<td>
											<Button
												variant='info'
												onClick={() => handleShowUpdateModal(product)}
												size='sm'
												style={{ marginRight: '10px' }}
											>
												Update
											</Button>
											<Button
												variant='danger'
												onClick={() => handleDeleteProduct(product.id)}
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
				</Col>
			</Row>
			<Row>
				<Col>
					{/* <Pagination className='justify-content-center'>
						<Pagination.Prev onClick={handlePreviousPage} />
						{renderPaginationItems()}
						<Pagination.Next onClick={handleNextPage} />
					</Pagination> */}

					<ProductsPagination
						handlePreviousPage={handlePreviousPage}
						handleNextPage={handleNextPage}
						renderPaginationItems={renderPaginationItems}
						limit={limit}
						setLimit={setLimit}
					/>
				</Col>
			</Row>
			{/* <AddUpdateProductModal
				show={showAddModal}
				handleClose={handleCloseAddModal}
				onSubmit={handleCreateProduct}
			/>
			<AddUpdateProductModal
				show={showUpdateModal}
				handleClose={handleCloseUpdateModal}
				onSubmit={handleUpdateProduct}
				productToUpdate={productToUpdate}
			/> */}
		</Container>
	);
};

export default Products;
