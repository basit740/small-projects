import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import { getAllProducts } from '../../api/product';
import { getOrders } from '../../api/order';
const Dashboard = () => {
	const totalOrders = 125;
	const totalUsers = 350;
	const totalRevenue = 10000;

	const [data, setData] = useState();

	useEffect(() => {
		async function getData() {
			const orders = await getOrders(localStorage.getItem('token'));
			const products = await getAllProducts();

			console.log(products);

			setData({
				totalOrders: orders.length,
				totalproducts: products.length,
			});
		}

		getData();
	}, []);
	return (
		<Container>
			<Helmet>
				<title>Dashboard | Ecom Admin</title>
			</Helmet>
			<Row className='mt-5'>
				<Col>
					<h1>Admin Dashboard</h1>
				</Col>
			</Row>
			<Row className='mt-5'>
				<Col md={4}>
					<Card className='text-center'>
						<Card.Body>
							<Card.Title>Total Orders</Card.Title>
							<Card.Text>{data && data.totalOrders}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className='text-center'>
						<Card.Body>
							<Card.Title>Total Products</Card.Title>
							<Card.Text>{data && data.totalproducts}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className='text-center'>
						<Card.Body>
							<Card.Title>Total Users</Card.Title>
							<Card.Text>0</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
