import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import useFetch from '@/hooks/useFetch';

const userSchema = z.object({
	fName: z.string().min(3),
	lName: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(8),
});

type Values = z.infer<typeof userSchema>;

function Register() {
	const navigate = useNavigate();
	const form = useForm<Values>({
		defaultValues: {
			fName: '',
			lName: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(userSchema),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = form;

	function registerUser(data: Values) {
		console.log(data);
		navigate('/');
		reset();
	}

	return (
		<div className='h-[100vh] flex items-center'>
			<Card className='mx-auto w-[400px]'>
				<CardHeader>
					<CardTitle className='text-xl'>Sign Up</CardTitle>
					<CardDescription>
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<div className='relative grid gap-2 mb-2'>
							<Label htmlFor='first-name'>First name</Label>
							<Input
								id='first-name'
								placeholder='Max'
								required
								{...register('fName')}
							/>
							{errors.fName && (
								<p className='absolute top-full text-[12px] text-red-700'>
									{errors.fName?.message}
								</p>
							)}
						</div>
						<div className='relative grid gap-2 mb-2'>
							<Label htmlFor='last-name'>Last name</Label>
							<Input
								id='last-name'
								placeholder='Robinson'
								required
								{...register('lName')}
							/>
							{errors.lName && (
								<p className='absolute top-full text-[12px] text-red-700'>
									{errors.lName?.message}
								</p>
							)}
						</div>
						<div className='relative grid gap-2 mb-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='m@example.com'
								required
								{...register('email')}
							/>
							{errors.email && (
								<p className='absolute top-full text-[12px] text-red-700'>
									{errors.email?.message}
								</p>
							)}
						</div>
						<div className='relative grid gap-2 mb-2'>
							<Label htmlFor='password'>Password</Label>
							<Input id='password' type='password' {...register('password')} />
							{errors.password && (
								<p className='absolute top-full text-[12px] text-red-700'>
									{errors.password?.message}
								</p>
							)}
						</div>
						<Button
							onClick={handleSubmit(registerUser)}
							type='submit'
							className='w-full'>
							Create an account
						</Button>
					</div>
					<div className='mt-4 text-center text-sm'>
						Already have an account?{' '}
						<Link to='/login' className='underline'>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default Register;
