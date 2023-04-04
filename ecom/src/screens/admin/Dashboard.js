import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
	const totalOrders = 125;
	const totalUsers = 350;
	const totalRevenue = 10000;

	return (
		<Container>
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
							<Card.Text>{totalOrders}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className='text-center'>
						<Card.Body>
							<Card.Title>Total Users</Card.Title>
							<Card.Text>{totalUsers}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className='text-center'>
						<Card.Body>
							<Card.Title>Total Revenue</Card.Title>
							<Card.Text>${totalRevenue.toFixed(2)}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
