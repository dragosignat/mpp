import {ColumnDef} from '@tanstack/react-table';
import {Client} from '@/types/Client';
import {DataTableColumnHeader} from '../DataTableComponents/DataTableColumnHeader';

export const ClientsColumnShort: ColumnDef<Client>[] = [
    {
        accessorKey: 'first_name',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='First Name' />
        ),
    },
    {
        accessorKey: 'last_name',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Last Name' />
        ),
    },
    {
        accessorKey: 'email',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Email' />
        ),
    },
    {
        accessorKey: 'position',
        header: 'Position',
    },
    {
        accessorKey: 'company_id',
        header: 'Company ID',
    },
];
