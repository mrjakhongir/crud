import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/lib/definitions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

type EditModalProps = {
	product: Product;
};

const userSchema = z.object({
	title: z.string().min(5),
	category: z.string().min(3),
	brand: z.string().min(3),
	price: z.number().min(0),
	rating: z.number().min(0),
});

type Values = z.infer<typeof userSchema>;

function EditModal({ product }: EditModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const token = useSelector((state: RootState) => state.auth.token);
	const form = useForm<Values>({ resolver: zodResolver(userSchema) });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	async function editProduct(data: Values) {
		setIsOpen(false);
		const response = await fetch(
			`https://dummyjson.com/products/${product.id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			}
		);

		if (response.ok) {
			alert(`${product.title} updated`);
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>Edit</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-6 py-4'>
					<div className='relative grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='title' className='text-right'>
							Title
						</Label>
						<Input
							id='title'
							defaultValue={product.title}
							className='col-span-3'
							{...register('title')}
						/>
						{errors.title && (
							<p className='absolute left-[26%] top-full text-[12px] text-red-700'>
								{errors.title?.message}
							</p>
						)}
					</div>
					<div className='relative grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='category' className='text-right'>
							Category
						</Label>
						<Input
							id='category'
							defaultValue={product.category}
							className='col-span-3'
							{...register('category')}
						/>
						{errors.category && (
							<p className='absolute left-[26%] top-full text-[12px] text-red-700'>
								{errors.category?.message}
							</p>
						)}
					</div>
					<div className='relative grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='brand' className='text-right'>
							Brand
						</Label>
						<Input
							id='brand'
							defaultValue={product.brand}
							className='col-span-3'
							{...register('brand')}
						/>
						{errors.brand && (
							<p className='absolute left-[26%] top-full text-[12px] text-red-700'>
								{errors.brand?.message}
							</p>
						)}
					</div>
					<div className='relative grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='price' className='text-right'>
							Price
						</Label>
						<Input
							id='price'
							defaultValue={product.price}
							className='col-span-3'
							{...register('price', { valueAsNumber: true })}
						/>
						{errors.price && (
							<p className='absolute left-[26%] top-full text-[12px] text-red-700'>
								{errors.price?.message}
							</p>
						)}
					</div>
					<div className='relative grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='rating' className='text-right'>
							Rating
						</Label>
						<Input
							id='rating'
							defaultValue={product.rating}
							className='col-span-3'
							{...register('rating', { valueAsNumber: true })}
						/>
						{errors.rating && (
							<p className='absolute left-[26%] top-full text-[12px] text-red-700'>
								{errors.rating?.message}
							</p>
						)}
					</div>
				</div>
				<DialogFooter>
					<Button onClick={handleSubmit(editProduct)} type='submit'>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default EditModal;
