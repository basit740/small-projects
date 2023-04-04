import React from 'react';
import UserNavbar from './UserNavbar';
import UserFooter from './UserFooter';

const UserLayout = ({ children }) => {
	return (
		<>
			<UserNavbar />
			<main>{children}</main>
			<UserFooter />
		</>
	);
};

export default UserLayout;
