import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DropDown from './DropDown';
import { Product } from '@/lib/definitions';

type TableRowComponentProps = {
	product: Product;
};

function TableRowComponent({ product }: TableRowComponentProps) {
	return (
		<TableRow>
			<TableCell className='font-medium'>{product.title}</TableCell>
			<TableCell className='md:table-cell'>{product.category}</TableCell>
			<TableCell className='md:table-cell'>{product.brand}</TableCell>
			<TableCell className='md:table-cell'>$ {product.price}</TableCell>
			<TableCell>
				<Badge variant='default'>{product.rating}</Badge>
			</TableCell>
			<TableCell>
				<DropDown />
			</TableCell>
		</TableRow>
	);
}

export default TableRowComponent;
