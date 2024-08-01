import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardHeader from './DashboardHeader';
import DashboardTable from './dashboardTable/DashboardTable';

function HomePage() {
	const [searchProducts, setSearchProducts] = useState('');
	return (
		<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
			<DashboardHeader setSearchProducts={setSearchProducts} />
			<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
				<Card x-chunk='dashboard-06-chunk-0'>
					<CardHeader>
						<CardTitle>Products</CardTitle>
					</CardHeader>
					<CardContent>
						<DashboardTable searchProducts={searchProducts} />
					</CardContent>
				</Card>
			</main>
		</div>
	);
}

export default HomePage;
