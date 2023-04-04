import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
	return (
		<Nav className='flex-column admin-sidebar bg-primary'>
			<LinkContainer to='/admin/dashboard'>
				<NavLink to='/admin/dashboard'>Dashboard</NavLink>
			</LinkContainer>
			<LinkContainer to='/admin/orders'>
				<NavLink>Orders</NavLink>
			</LinkContainer>
			<LinkContainer to='/admin/users'>
				<NavLink>Users</NavLink>
			</LinkContainer>
			<LinkContainer to='/admin/products'>
				<NavLink>Products</NavLink>
			</LinkContainer>
		</Nav>
	);
};

export default AdminSidebar;
