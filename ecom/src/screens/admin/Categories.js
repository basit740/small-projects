import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const Categories = () => {
	return (
		<Container>
			<Row className='mt-5'>
				<Col>
					<h1>Categories Management</h1>
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col>
					<Table striped bordered hover>
						<thead></thead>
						<tbody></tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default Categories;
