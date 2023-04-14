import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
const Orders = () => {
	const orders = [
		{
			id: 1,
			customerName: 'John Doe',
			date: '2023-04-01',
			status: 'Shipped',
			total: 120.99,
		},
		{
			id: 2,
			customerName: 'Jane Smith',
			date: '2023-04-02',
			status: 'Processing',
			total: 59.99,
		},
		{
			id: 3,
			customerName: 'Mike Johnson',
			date: '2023-03-30',
			status: 'Delivered',
			total: 89.99,
		},
	];

	return (
		<Container>
			<Helmet>
				<title>Orders | Ecom Admin</title>
			</Helmet>
			<Row className='mt-5'>
				<Col>
					<h1>Orders Management</h1>
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Customer Name</th>
								<th>Date</th>
								<th>Status</th>
								<th>Total</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.id}>
									<td>{order.id}</td>
									<td>{order.customerName}</td>
									<td>{order.date}</td>
									<td>{order.status}</td>
									<td>${order.total.toFixed(2)}</td>
									<td>
										<Button variant='primary' size='sm'>
											View
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default Orders;
