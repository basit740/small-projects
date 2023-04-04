import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const UserNavbar = () => {
	return (
		<Navbar bg='primary' variant='dark' expand='lg'>
			<Container>
				<Navbar.Brand href='/'>My E-commerce</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavLink className='nav-link' to='/'>
							Home
						</NavLink>
						{/* <Nav.Link href='/shopping-cart'>Shopping Cart</Nav.Link> */}
						<NavLink className='nav-link' to='/shopping-cart'>
							Shopping Cart
						</NavLink>
						<NavLink className='nav-link' to='/user-profile'>
							User Profile
						</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default UserNavbar;
