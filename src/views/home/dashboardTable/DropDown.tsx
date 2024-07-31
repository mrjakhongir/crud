import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

function DropDown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button aria-haspopup='true' size='icon' variant='ghost'>
					<MoreHorizontal className='h-4 w-4' />
					<span className='sr-only'>Toggle menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default DropDown;
