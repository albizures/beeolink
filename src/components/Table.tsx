import * as React from 'react'
import { cn } from '../cn'

function Table(props: React.HTMLAttributes<HTMLTableElement>) {
	const { className, ...moreProps } = props
	return (
		<div className="relative w-full overflow-auto">
			<table
				className={cn('table table-zebra w-full caption-bottom text-sm', className)}
				{...moreProps}
			/>
		</div>
	)
}

function TableHeader(props: React.HTMLAttributes<HTMLTableSectionElement>) {
	const { className, ...moreProps } = props
	return <thead className={cn('[&_tr]:border-b', className)} {...moreProps} />
}

function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
	const { className, ...moreProps } = props
	return (
		<tbody
			className={cn('[&_tr:last-child]:border-0', className)}
			{...moreProps}
		/>
	)
}

function TableFooter(props: React.HTMLAttributes<HTMLTableSectionElement>) {
	const { className, ...moreProps } = props
	return (
		<tfoot
			className={cn(
				'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
				className,
			)}
			{...moreProps}
		/>
	)
}

function TableRow(props: React.HTMLAttributes<HTMLTableRowElement>) {
	const { className, ...moreProps } = props
	return (
		<tr
			className={cn(
				'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
				className,
			)}
			{...moreProps}
		/>
	)
}

function TableHead(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
	const { className, ...moreProps } = props
	return (
		<th
			className={cn('h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
				className,
			)}
			{...moreProps}
		/>
	)
}

function TableCell(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
	const { className, ...moreProps } = props
	return (
		<td
			className={cn(
				'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
				className,
			)}
			{...moreProps}
		/>
	)
}

function TableCaption(props: React.HTMLAttributes<HTMLTableCaptionElement>) {
	const { className, ...moreProps } = props
	return (
		<caption
			className={cn('mt-4 text-sm text-muted-foreground', className)}
			{...moreProps}
		/>
	)
}

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
}
