import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const AdminNavbar = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	const navLinkStyle = { color: theme === 'light' ? 'black' : 'white' };

	return (
		<Navbar
			bg={theme === 'light' ? 'light' : 'dark'}
			expand='lg'
			variant={theme === 'light' ? 'dark' : 'light'}
		>
			<Container>
				<Navbar.Brand href='/admin/dashboard' style={navLinkStyle}>
					Admin Dashboard
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='/' style={navLinkStyle}>
							Website
						</Nav.Link>
					</Nav>
					<Nav>
						<Button variant='light' onClick={toggleTheme}>
							{theme}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AdminNavbar;
