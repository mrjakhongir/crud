import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './layouts/Layout';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Authlayout from './layouts/Authlayout';
import { RootState } from './store/store';
import HomePage from './views/home/HomePage';

function App() {
	const isAuthenticated = useSelector((state: RootState) => state.auth.token);

	async function requireAuth() {
		if (!isAuthenticated) {
			throw redirect('/login');
		}
		return null;
	}

	async function redirectIfUser() {
		if (isAuthenticated) {
			throw redirect('/');
		}
		return null;
	}

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <HomePage />,
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
