import { useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { Container, Navbar, Button, Card, Row, Col } from 'react-bootstrap';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Outlet,
	Navigate,
} from 'react-router-dom';

// user screens
import Home from './screens/user/Home.js';
import ShoppingCart from './screens/user/ShoppingCart.js';
import UserProfile from './screens/user/UserProfile.js';

// admin screens
import Dashboard from './screens/admin/Dashboard';
import UsersList from './screens/admin/UsersList';
import OrdersList from './screens/admin/OrdersList';

// layouts
import UserLayout from './components/user/UserLayout';
import AdminLayout from './components/admin/AdminLayout';

const UserRoutes = () => {
	return (
		<Routes>
			<Route path='' element={<Home />} />
			<Route path='shopping-cart' element={<ShoppingCart />} />
			<Route path='user-profile' element={<UserProfile />} />
			{/* Add more user routes here */}
		</Routes>
	);
};

const AdminRoutes = () => {
	return (
		<Routes>
			<Route path='/dashboard' element={<Dashboard />} />
			<Route path='/users' element={<UsersList />} />
			<Route path='/orders' element={<OrdersList />} />
			{/* Add more admin routes here */}
		</Routes>
	);
};

const UserApp = () => {
	return (
		<UserLayout>
			<UserRoutes />
		</UserLayout>
	);
};

const AdminApp = () => {
	return (
		<AdminLayout>
			<AdminRoutes />
		</AdminLayout>
	);
};

function App() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	useEffect(() => {
		document.body.classList.add(theme);
		return () => {
			document.body.classList.remove(theme);
		};
	}, [theme]);

	return (
		<Router>
			<Routes>
				<Route path='/*' element={<UserApp />} />
				<Route path='/admin/*' element={<AdminApp />} />
			</Routes>
		</Router>
	);
}

export default App;
