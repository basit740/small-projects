import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';

import classes from '../../styles/home.module.css';

import { getAllProducts } from '../../api/product';
import { addToCart, getCartItems } from '../../api/order';

import { saveCart } from '../../store/reducers/cartSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [featuredProducts, setFeaturedProducts] = useState([]);

	const dispatch = useDispatch();

	const addToCartHandler = async (id) => {
		if (localStorage.getItem('token') === null) {
			window.location.href = '/login';
		}

		const response = await addToCart(
			{
				productId: id,
				quantity: 1,
			},
			localStorage.getItem('token')
		);

		// get Cart

		const serverCart = await getCartItems(localStorage.getItem('token'));

		dispatch(
			saveCart({
				cart: serverCart,
			})
		);
	};

	useEffect(() => {
		async function fetchData() {
			const fetchedProducts = await getAllProducts();

			setProducts(fetchedProducts);
			setFeaturedProducts(fetchedProducts.slice(0, 3));
		}

		fetchData();
	}, []);

	return (
		<>
			<div className={classes['hero-section']}>
				<Container>
					<Row className='mt-5'>
						<Col>
							<Carousel>
								{featuredProducts.length === 3 &&
									featuredProducts.map((product) => (
										<Carousel.Item key={product.id}>
											<img
												className='d-block w-100'
												src={
													process.env.REACT_APP_API_URL + '/' + product.imageURL
												}
												alt={product.title}
											/>
											<Carousel.Caption>
												<h3>{product.title}</h3>
											</Carousel.Caption>
										</Carousel.Item>
									))}
							</Carousel>
						</Col>
					</Row>
				</Container>
			</div>

			<Container>
				<Row className='mt-5'>
					<Col>
						<h1>Welcome to My E-commerce!</h1>
						<p>Shop the latest products at the best prices.</p>
					</Col>
				</Row>
				<Row className='mt-5'>
					{products &&
						products.length > 0 &&
						products.map((product) => (
							<Col key={product.id} sm={12} md={4} className='mb-4'>
								<Card>
									<Card.Img
										variant='top'
										src={process.env.REACT_APP_API_URL + '/' + product.imageURL}
										className={classes['product-image']}
									/>
									<Card.Body>
										<Card.Title>{product.title}</Card.Title>
										<Card.Text>${product.price}</Card.Text>
										<Button
											variant='primary'
											onClick={() => addToCartHandler(product.id)}
										>
											Add to Cart
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))}
				</Row>
			</Container>
		</>
	);
};

export default Home;
