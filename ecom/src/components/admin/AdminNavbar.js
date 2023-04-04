import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const AdminNavbar = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<Navbar className='bg-primary' variant='dark' expand='lg'>
			<Container>
				<Navbar.Brand href='/admin/dashboard'>Admin Dashboard</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='/'>Website</Nav.Link>
					</Nav>
					<Nav>
						<Button variant='outline-light' onClick={toggleTheme}>
							Toggle Theme
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AdminNavbar;
