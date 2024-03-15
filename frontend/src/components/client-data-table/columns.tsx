import {ColumnDef} from '@tanstack/react-table';
import {Client} from '@/types/Client';

export const ClientColumns: ColumnDef<Client>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'clientAddress',
        header: 'Address',
    },
    {
        accessorKey: 'clientEmail',
        header: 'Email',
    },
    {
        accessorKey: 'clientPhone',
        header: 'Phone',
    },
    {
        accessorKey: 'clientTotalPurchases',
        header: 'Total Purchases',
    },
];
