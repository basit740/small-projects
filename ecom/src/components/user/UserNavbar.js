import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import { logout } from '../../store/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserNavbar = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [isSticky, setIsSticky] = useState(false);

	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch(logout());
		window.location.href = '/login';
	};

	const loginHandler = (e) => {
		e.preventDefault();
		navigate('/login');
	};

	const handleScroll = () => {
		if (window.pageYOffset > 60) {
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<Navbar
			bg='primary'
			variant='dark'
			expand='lg'
			className={isSticky ? 'sticky-navbar' : ''}
		>
			<Container>
				<Navbar.Brand href='/'>My E-commerce</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavLink className='nav-link' to='/'>
							Home
						</NavLink>
						<NavLink className='nav-link' to='/shopping-cart'>
							Shopping Cart
						</NavLink>
						{auth.user && (
							<NavLink className='nav-link' to='/user-profile'>
								User Profile
							</NavLink>
						)}
						{auth.user && auth.user.role === 'admin' && (
							<NavLink className='nav-link' to='/admin/dashboard'>
								Admin Panel
							</NavLink>
						)}
					</Nav>
					{auth.user && (
						<Nav className='justify-content-end'>
							<NavLink
								className='nav-link'
								href='/logout'
								onClick={logoutHandler}
							>
								Logout
							</NavLink>
						</Nav>
					)}

					{!auth.user && (
						<Nav className='justify-content-end'>
							<NavLink
								className='nav-link'
								href='/logout'
								onClick={loginHandler}
							>
								Login
							</NavLink>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default UserNavbar;
