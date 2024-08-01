import { Table, TableBody } from '@/components/ui/table';
import TableHeaderComponent from './TableHeaderComponent';
import TableRowComponent from './TableRowComponent';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import useGet from '@/hooks/useGet';

type DashboardTableProps = {
	searchProducts: string;
};

function DashboardTable({ searchProducts }: DashboardTableProps) {
	const token = useSelector((state: RootState) => state.auth.token);
	const { makeRequest, data, error, loading } = useGet();

	useEffect(() => {
		async function getAllProducts() {
			await makeRequest(`products/search?q=${searchProducts}`, token);
		}
		getAllProducts();
	}, [searchProducts]);

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
