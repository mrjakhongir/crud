import { Product } from '@/lib/definitions';
import { useCallback, useState } from 'react';
const BASE_URL = 'https://dummyjson.com';

interface ProductsResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}

export default function useGet() {
	const [data, setData] = useState<ProductsResponse | null>(null);
	const [error, setError] = useState<null | Error>(null);
	const [loading, setLoading] = useState(false);

	const makeRequest = useCallback(async (url: string, token: string) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`${BASE_URL}/${url}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			setData(data);
		} catch (err) {
			if (err instanceof Error) {
				setError(err);
			} else {
				setError(new Error('An unknown error occurred'));
			}
		} finally {
			setLoading(false);
		}
	}, []);

	return { makeRequest, data, error, loading };
}
