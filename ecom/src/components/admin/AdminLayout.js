import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { Container, Row, Col } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import AdminSidebar from './AdminSidebar';

import './AdminLayout.css';

const AdminLayout = ({ children }) => {
	const { theme } = useContext(ThemeContext);
	return (
		<>
			<AdminNavbar />
			<div
				className={`admin-layout-wrapper d-flex flex-column min-vh-100 ${
					theme === 'light' ? 'theme-light' : 'theme-dark'
				}`}
			>
				<Container fluid className='flex-grow-1'>
					<Row>
						<Col md={3} lg={2} className='p-0'>
							<AdminSidebar />
						</Col>
						<Col md={9} lg={10} className='admin-content'>
							{children}
						</Col>
					</Row>
				</Container>
				<AdminFooter />
			</div>
		</>
	);
};

export default AdminLayout;
