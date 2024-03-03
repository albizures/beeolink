import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table'

export type Column<TItem> = {
	title: () => React.ReactNode
	content: (item: TItem, index: number) => React.ReactNode
}

export type DataTableConfig<TItem> = {
	columns: Array<Column<TItem>>
	rowId: (item: TItem, index: number) => number | string
}

export type DataTableProps<TItem> = {
	items: Array<TItem>
	config: DataTableConfig<TItem>
}

export function DataTable<TItem>(props: DataTableProps<TItem>) {
	const { items, config } = props
	const { columns, rowId } = config

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map((column, index) => {
						return <TableHead key={index}>{column.title()}</TableHead>
					})}
				</TableRow>
			</TableHeader>
			<TableBody>

				{items.length === 0
					? (
						<TableRow>
							<TableCell colSpan={columns.length}>No data</TableCell>
						</TableRow>
						)
					: items.map((item, index) => {
						const id = rowId(item, index)
						return (
							<TableRow data-id={id} key={id}>
								{columns.map((column, index) => {
									return <TableCell key={index}>{column.content(item, index)}</TableCell>
								})}
							</TableRow>
						)
					})}
			</TableBody>
		</Table>
	)
}
