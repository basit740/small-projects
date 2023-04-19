import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import { logout } from '../../store/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCartItems } from '../../store/reducers/cartSlice';

import { CSSTransition } from 'react-transition-group';

import { Cart } from 'react-bootstrap-icons';

// css file
import '../../styles/usernavbar.css';

const UserNavbar = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const totalItems = useSelector((state) => state.cart.totalItems);

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
		dispatch(fetchCartItems());

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
			style={{
				position: 'sticky',
			}}
		>
			<Container>
				<Navbar.Brand href='/'>My E-commerce</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavLink className='nav-link' to='/'>
							Home
						</NavLink>
						{auth.user && (
							<NavLink className='nav-link' to='/shopping-cart'>
								Shopping Cart
							</NavLink>
						)}
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

					{auth.user && (
						<Nav className='justify-content-end'>
							<NavLink className='nav-link' to='/shopping-cart'>
								<Cart size={32} />
								<CSSTransition
									in={true}
									classNames='badge-transition'
									timeout={300}
									appear={true}
								>
									<Badge bg='secondary' pill className='ms-1'>
										{totalItems}
									</Badge>
								</CSSTransition>
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
