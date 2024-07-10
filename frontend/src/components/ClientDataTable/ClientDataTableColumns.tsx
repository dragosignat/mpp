import {ColumnDef} from '@tanstack/react-table';
import {Client} from '@/types/Client';
import {Check} from 'lucide-react';
import {X} from 'lucide-react';
import {DataTableColumnHeader} from '../DataTableComponents/DataTableColumnHeader';
import {DataTableRowActions} from './ClientDataTableActions';

export const ClientColumns: ColumnDef<Client>[] = [
    {
        accessorKey: 'name',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'email',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Email' />
        ),
    },
    {
        accessorKey: 'total_purchases',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Total Purchases' />
        ),
        cell: ({row}) => {
            const amount = row.getValue<number>('total_purchases');
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);

            return <div className='font-medium'>{formatted}</div>;
        },
    },
    {
        accessorKey: 'total_outgoing_invoices',
        header: ({column}) => (
            <DataTableColumnHeader
                column={column}
                title='Total Outgoing Invoices'
            />
        ),
        cell: ({row}) => {
            const amount = row.getValue<number>('total_outgoing_invoices');
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);

            return <div className='font-medium'>{formatted}</div>;
        },
    },
    {
        accessorKey: 'is_business',
        header: 'Is Business',
        cell: ({row}) => {
            const isBusiness = row.getValue('is_business');
            if (isBusiness === true) {
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
