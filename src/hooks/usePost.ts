import { useCallback, useState } from 'react';

interface RequestData {
	username: string;
	password: string;
}

export default function usePost(url: string) {
	const [data, setData] = useState(null);
	const [error, setError] = useState<null | Error>(null);
	const [loading, setLoading] = useState(false);

	const makeRequest = useCallback(
		async (requestData: RequestData) => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(requestData),
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
		},
		[url]
	);

	return { makeRequest, data, error, loading };
}
