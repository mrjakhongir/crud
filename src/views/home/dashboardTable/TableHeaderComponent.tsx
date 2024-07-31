import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
function TableHeaderComponent() {
	return (
		<TableHeader>
			<TableRow>
				<TableHead>Title</TableHead>
				<TableHead>Category</TableHead>
				<TableHead>Brand</TableHead>
				<TableHead>Price</TableHead>
				<TableHead>Rating</TableHead>
				<TableHead>Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
}

export default TableHeaderComponent;
