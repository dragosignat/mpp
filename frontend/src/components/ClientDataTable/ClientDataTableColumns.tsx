import {ColumnDef} from '@tanstack/react-table';
import {Client} from '@/types/Client';
import {Check} from 'lucide-react';
import {X} from 'lucide-react';
import {DataTableColumnHeader} from '../data-table-components/data-table-column-header';
import {DataTableRowActions} from './ClientDataTableActions';

export const ClientColumns: ColumnDef<Client>[] = [
    {
        accessorKey: 'clientName',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
    },
    {
        accessorKey: 'clientAddress',
        header: 'Address',
    },
    {
        accessorKey: 'clientPhone',
        header: 'Phone',
    },
    {
        accessorKey: 'clientEmail',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Email' />
        ),
    },
    {
        accessorKey: 'clientTotalPurchases',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Total Purchases' />
        ),
        cell: ({row}) => {
            const amount = row.getValue('clientTotalPurchases');
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);

            return <div className='font-medium'>{formatted}</div>;
        },
    },
    {
        accessorKey: 'clientIsBusiness',
        header: 'Is Business',
        cell: ({row}) => {
            const isBusiness = row.getValue('clientIsBusiness');
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
