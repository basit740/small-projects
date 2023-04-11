import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { login } from '../../store/reducers/authSlice';
import { login as apiLogin, getCurrentUser } from '../../api/auth.js';

// react redux
import { useDispatch } from 'react-redux';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const response = await apiLogin(email, password);
		if (response.token) {
			const response2 = await getCurrentUser(response.token);
			if (response2) {
				dispatch(login({ user: response2, token: response.token }));
			}
			setLoading(false);

			if (response2.role === 'admin') {
				window.location.href = '/admin/dashboard';
			} else {
				window.location.href = '/';
			}
		}
	};

	return (
		<Container className='mt-6' style={{ marginTop: '100px' }}>
			<Row className='justify-content-center'>
				<Col xs={12} md={6}>
					<Card>
						<Card.Body>
							<Card.Title className='text-center mb-4'>Login</Card.Title>
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
									{loading ? 'Logging in...' : 'Login'}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginPage;
