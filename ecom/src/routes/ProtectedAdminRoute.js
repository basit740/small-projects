import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ element }) => {
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (user && user.role !== 'admin') {
			navigate('/user-profile');
		}
	}, [user, navigate]);

	return user ? element : null;
};

export default ProtectedAdminRoute;
