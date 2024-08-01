import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/definitions';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

type TableRowComponentProps = {
	product: Product;
};

function TableRowComponent({ product }: TableRowComponentProps) {
	return (
		<TableRow>
			<TableCell>{product.title}</TableCell>
			<TableCell>{product.category}</TableCell>
			<TableCell>{product.brand}</TableCell>
			<TableCell>$ {product.price}</TableCell>
			<TableCell>
				<Badge variant='default'>{product.rating}</Badge>
			</TableCell>
			<TableCell>
				<div className='flex items-center gap-2'>
					<EditModal product={product} />
					<DeleteModal product={product} />
				</div>
			</TableCell>
		</TableRow>
	);
}

export default TableRowComponent;
