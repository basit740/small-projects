import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ theme }) => {
	const navBgColor = theme === 'light' ? 'light' : 'dark';

	const borderTopColor = theme === 'light' ? '#ced4da' : '#adb5bd'; // Adjust the colors based on your preferences

	return (
		<Nav
			// bg='light'
			variant='pills'
			// style={navbarStyle}

			className={`flex-column admin-sidebar bg-${navBgColor}`}
			style={{ borderTop: `1px solid ${borderTopColor}` }}
		>
			<LinkContainer to='/admin/dashboard'>
				<Nav.Link to='/admin/dashboard'>Dashboard</Nav.Link>
			</LinkContainer>
			<LinkContainer to='/admin/orders'>
				<Nav.Link>Orders</Nav.Link>
			</LinkContainer>
			<LinkContainer to='/admin/users'>
				<Nav.Link>Users</Nav.Link>
			</LinkContainer>
			<LinkContainer to='/admin/products'>
				<Nav.Link>Products</Nav.Link>
			</LinkContainer>
			<LinkContainer to='/admin/categories'>
				<Nav.Link>Categories</Nav.Link>
			</LinkContainer>
		</Nav>
	);
};

export default AdminSidebar;
