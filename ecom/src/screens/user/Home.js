import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';

import classes from '../../styles/home.module.css';

import { getAllProducts } from '../../api/product';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [featuredProducts, setFeaturedProducts] = useState([]);

	// const products = [
	// 	{
	// 		id: 1,
	// 		name: 'Product 1',
	// 		price: '$99.99',
	// 		imageUrl:
	// 			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Product 2',
	// 		price: '$59.99',
	// 		imageUrl:
	// 			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Product 3',
	// 		price: '$29.99',
	// 		imageUrl:
	// 			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80',
	// 	},
	// ];

	// const featuredProducts = [
	// 	{
	// 		id: 1,
	// 		name: 'Featured Product 1',
	// 		imageUrl:
	// 			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Featured Product 2',
	// 		imageUrl:
	// 			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Featured Product 3',
	// 		imageUrl:
	// 			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80',
	// 	},
	// ];

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
										<Button variant='primary'>Add to Cart</Button>
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
