import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from './ThemeContext';
import './theme/custom-bootstrap.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ThemeProvider>
		<App />
	</ThemeProvider>
);
