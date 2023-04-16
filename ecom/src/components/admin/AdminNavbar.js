import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../store/reducers/authSlice';

const AdminNavbar = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const navLinkStyle = { color: theme === 'light' ? 'black' : 'white' };

	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch(logout());
		window.location.href = '/login';
	};

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
							{theme} theme
						</Button>
					</Nav>

					{user && (
						<Nav className='justify-content-end'>
							<NavLink
								className='nav-link'
								href='/logout'
								onClick={logoutHandler}
								style={{ ...navLinkStyle, fontWeight: 'bold' }}
							>
								Logout
							</NavLink>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AdminNavbar;
