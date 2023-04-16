import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { saveCart } from '../../store/reducers/cartSlice';
import { decrementItemQty, removeFromCart, addToCart } from '../../api/order';

const ShoppingCart = () => {
	const cartItems = useSelector((state) => state.cart.cart);
	const dispatch = useDispatch();

	const handleRemoveFromCart = async (itemId) => {
		const token = localStorage.getItem('token');
		const response = await removeFromCart(itemId, token);

		if (response.message === 'Success') {
			const updatedCart = cartItems.filter(
				(item) => item.product.id !== itemId
			);
			dispatch(saveCart({ cart: updatedCart }));
		}
	};

	const handleDecrementQuantity = async (itemId) => {
		const token = localStorage.getItem('token');
		const response = await decrementItemQty(itemId, token);

		if (response.message === 'Success') {
			const updatedCart = cartItems.map((item) => {
				if (item.product.id === itemId) {
					return {
						...item,
						quantity: item.quantity - 1,
					};
				} else {
					return item;
				}
			});
			dispatch(saveCart({ cart: updatedCart }));
		}
	};

	const handleIncrementQuantity = async (itemId) => {
		const token = localStorage.getItem('token');
		const cartItemData = {
			productId: itemId,
			quantity: 1,
		};

		const response = await addToCart(cartItemData, token);

		if (response.message === 'Success') {
			const itemIndex = cartItems.findIndex(
				(item) => item.product.id === itemId
			);

			// Create a deep copy of cartItems
			const updatedCart = cartItems.map((item) => ({ ...item }));

			// Update the quantity of the item
			updatedCart[itemIndex].quantity += 1;

			dispatch(saveCart({ cart: updatedCart }));
		}
	};

	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
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
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => (
								<tr key={item.product.id}>
									<td>{item.product.title}</td>
									<td>${item.product.price.toFixed(2)}</td>
									<td>{item.quantity}</td>
									<td>${(item.product.price * item.quantity).toFixed(2)}</td>
									<td>
										<Button
											variant='danger'
											onClick={() => handleRemoveFromCart(item.product.id)}
										>
											Remove
										</Button>{' '}
										<Button
											variant='warning'
											onClick={() => handleDecrementQuantity(item.product.id)}
											disabled={item.quantity === 1}
										>
											-
										</Button>
										<Button
											variant='success'
											onClick={() => handleIncrementQuantity(item.product.id)}
										>
											+
										</Button>
									</td>
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
