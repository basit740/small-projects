import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const ShoppingCart = () => {
	const cartItems = [
		{ id: 1, name: 'Product 1', price: 99.99, quantity: 1 },
		{ id: 2, name: 'Product 2', price: 59.99, quantity: 2 },
		{ id: 3, name: 'Product 3', price: 29.99, quantity: 1 },
	];

	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<Container>
			<Row className='mt-5'>
				<Col>
					<h1>Shopping Cart</h1>
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => (
								<tr key={item.id}>
									<td>{item.name}</td>
									<td>${item.price.toFixed(2)}</td>
									<td>{item.quantity}</td>
									<td>${(item.price * item.quantity).toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
			<Row>
				<Col className='text-right'>
					<p>Total Price: ${totalPrice.toFixed(2)}</p>
					<Button variant='primary'>Proceed to Checkout</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default ShoppingCart;
