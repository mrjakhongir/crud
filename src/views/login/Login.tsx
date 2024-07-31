import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setAuth } from '@/store/authSlice';
import usePost from '@/hooks/usePost';

const userSchema = z.object({
	username: z.string().min(3),
	password: z.string().min(8),
});

type Values = z.infer<typeof userSchema>;

function Login() {
	const dispatch = useDispatch();

	const { makeRequest, data, loading, error } = usePost(
		'https://dummyjson.com/auth/login'
	);

	const form = useForm<Values>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: zodResolver(userSchema),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	async function loginUser(formData: Values) {
		await makeRequest(formData);
		if (data) {
			localStorage.setItem('token', data.token);
			dispatch(setAuth(data.token));
		}
	}

	return (
		<div className='h-[100vh] flex items-center'>
			<Card className='w-full mx-auto max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div className='relative grid gap-2 mb-2'>
						<Label htmlFor='username'>Username</Label>
						<Input
							id='username'
							type='username'
							placeholder='emilys'
							required
							{...register('username')}
						/>
						{errors.username && (
							<p className='absolute top-full text-[12px] text-red-700'>
								{errors.username?.message}
							</p>
						)}
					</div>
					<div className='relative grid gap-2 mb-2'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							placeholder='emilyspass'
							required
							{...register('password')}
						/>
						{errors.password && (
							<p className='absolute top-full text-[12px] text-red-700'>
								{errors.password?.message}
							</p>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className={`w-full ${loading && 'opacity-85 cursor-not-allowed'}`}
						disabled={loading}
						type='submit'
						onClick={handleSubmit(loginUser)}>
						{loading ? 'Signing in...' : 'Sign in'}
					</Button>
					{error && <p className='text-sm text-red-700'>{error.message}</p>}
					<div className='mt-4 text-center text-sm'>
						Do'nt have an account yet?{' '}
						<Link to='/register' className='underline'>
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Login;
