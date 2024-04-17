import {ColumnDef} from '@tanstack/react-table';
import {Invoice} from '@/types/Invoices';
import {Check} from 'lucide-react';
import {X} from 'lucide-react';
import {DataTableColumnHeader} from '../data-table-components/data-table-column-header';
import {DataTableRowActions} from './InvoiceDataTableActions';

export const InvoiceColumns: ColumnDef<Invoice>[] = [
    {
        accessorKey: 'client_id',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Client ID' />
        ),
    },
    {
        accessorKey: 'date_of_issue',
        header: 'Date of Issue',
        cell: ({row}) => {
            const dueDate = row.getValue('date_of_issue');
            const formatted = new Date(dueDate).toLocaleDateString();

            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: 'due_date',
        header: 'Due Date',
        cell: ({row}) => {
            const dueDate = row.getValue('due_date');
            const formatted = new Date(dueDate).toLocaleDateString();

            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: 'total_amount',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Amount' />
        ),
        cell: ({row}) => {
            const amount = row.getValue('total_amount');
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);

            return <div className='font-medium'>{formatted}</div>;
        },
    },
    {
        accessorKey: 'is_paid',
        header: 'Paid',
        cell: ({row}) => {
            const isPaid = row.getValue('is_paid');
            if (isPaid === true) {
                return <Check />;
            } else {
                return <X />;
            }
        },
    },
    {
        id: 'actions',
        cell: ({row}) => <DataTableRowActions row={row} />,
    },
];
