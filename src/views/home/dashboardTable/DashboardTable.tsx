import { Table, TableBody } from '@/components/ui/table';
import TableHeaderComponent from './TableHeaderComponent';
import TableRowComponent from './TableRowComponent';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import useGet from '@/hooks/useGet';

function DashboardTable() {
	const token = useSelector((state: RootState) => state.auth.token);
	const { makeRequest, data, error, loading } = useGet(
		'products?limit=10',
		token
	);

	useEffect(() => {
		async function getAllProducts() {
			await makeRequest();
		}
		getAllProducts();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	} else {
		return (
			<Table>
				<TableHeaderComponent />
				<TableBody>
					{data?.products.map((product) => (
						<TableRowComponent key={product.id} product={product} />
					))}
				</TableBody>
				{error && <p className='text-sm text-red-700'>{error.message}</p>}
			</Table>
		);
	}
}

export default DashboardTable;
