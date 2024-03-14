import {ColumnDef} from '@tanstack/react-table';
import {ClientProp} from '@/types/Client';

export const ClientColumns: ColumnDef<ClientProp>[] = [
    {
        accessorKey: 'clientName',
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
