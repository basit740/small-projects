import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { register as apiRegister } from '../../api/auth.js';

const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const response = await apiRegister(email, password);
		if (response.message === 'User created successfully') {
			setLoading(false);
			window.location.href = '/login';
		}
	};

	return (
		<Container className='mt-6' style={{ marginTop: '100px' }}>
			<Row className='justify-content-center'>
				<Col xs={12} md={6}>
					<Card>
						<Card.Body>
							<Card.Title className='text-center mb-4'>Register</Card.Title>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId='formEmail'>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type='email'
										placeholder='Enter email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId='formPassword'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Form.Group>

								<Button variant='primary' type='submit' className='w-100 mt-3'>
									{loading ? 'Registering...' : 'Register'}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default RegisterPage;
