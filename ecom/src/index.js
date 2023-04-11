import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from './ThemeContext';
import './theme/custom-bootstrap.scss';
import { Provider as ReduxProvider } from 'react-redux';

import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ReduxProvider store={store}>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</ReduxProvider>
);
