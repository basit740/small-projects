import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const UsersList = () => {
	const users = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			role: 'User',
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			role: 'Admin',
		},
		{
			id: 3,
			name: 'Mike Johnson',
			email: 'mike@example.com',
			role: 'User',
		},
	];

	return (
		<Container>
			<Row className='mt-5'>
				<Col>
					<h1>Users List</h1>
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>User ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.role}</td>
									<td>
										<Button variant='primary' size='sm'>
											Edit
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

export default UsersList;
