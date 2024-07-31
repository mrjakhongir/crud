import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div className='container mx-auto'>
			<Outlet />
		</div>
	);
}

export default Layout;
