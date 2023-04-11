import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { useSelector } from 'react-redux';

const UserProfile = () => {
	const user = useSelector((state) => state.auth.user);
	// const user = {
	// 	name: 'John Doe',
	// 	email: 'john@example.com',
	// 	address: '123 Main St',
	// 	city: 'New York',
	// 	state: 'NY',
	// 	zip: '10001',
	// };

	return (
		<Container>
			<Row className='mt-5'>
				<Col>
					<h1>User Profile</h1>
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col md={6}>
					<Card>
						<Card.Body>
							<Card.Title>{user.lastName}</Card.Title>
							<Card.Text>Email: {user.email}</Card.Text>
							{/* <Card.Text>Address: {user.address}</Card.Text> */}
							{/* <Card.Text>
								{user.city}, {user.state} {user.zip}
							</Card.Text> */}
							<Button variant='primary'>Edit Profile</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default UserProfile;
