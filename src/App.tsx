import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Authlayout from './layouts/Authlayout';

const requireAuth = async () => {
	const isAuthenticated = false;
	if (!isAuthenticated) {
		throw redirect('/login');
	}
	return null;
};

const redirectIfUser = async () => {
	const isAuthenticated = false;
	if (isAuthenticated) {
		throw redirect('/home');
	}
	return null;
};

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <Home />,
					loader: requireAuth,
				},
				{
					element: <Authlayout />,
					children: [
						{
							path: 'register',
							element: <Register />,
							loader: redirectIfUser,
						},
						{
							path: 'login',
							element: <Login />,
							loader: redirectIfUser,
						},
					],
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
