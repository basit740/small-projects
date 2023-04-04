import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AdminFooter = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col>
						<p>
							&copy; {new Date().getFullYear()} Admin Dashboard. All rights
							reserved.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default AdminFooter;
