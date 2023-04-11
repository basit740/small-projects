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
import Users from './screens/admin/Users';
import Orders from './screens/admin/Orders';
import Products from './screens/admin/Products';
import Categories from './screens/admin/Categories';

// layouts
import UserLayout from './components/user/UserLayout';
import AdminLayout from './components/admin/AdminLayout';

// common screens
import LoginPage from './screens/common/LoginPage.js';

// Admin protected routes
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';

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
			<Route path='/users' element={<Orders />} />
			<Route path='/orders' element={<Orders />} />
			<Route path='/products' element={<Products />} />
			<Route path='/categories' element={<Categories />} />

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
			{/* <Outlet /> */}
			<Routes>
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/users' element={<Users />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/products' element={<Products />} />
				<Route path='/categories' element={<Categories />} />
				{/* Add more admin routes here */}
			</Routes>
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
				<Route
					path='/admin/*'
					element={<ProtectedAdminRoute element={<AdminApp />} />}
				/>
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</Router>
	);
}

export default App;
