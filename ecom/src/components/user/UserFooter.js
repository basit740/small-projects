import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const UserFooter = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col>
						<p>
							&copy; {new Date().getFullYear()} My E-commerce. All rights
							reserved.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default UserFooter;
