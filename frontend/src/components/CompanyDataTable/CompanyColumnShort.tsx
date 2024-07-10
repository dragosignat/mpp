import {ColumnDef} from '@tanstack/react-table';
import {Company} from '@/types/Companies';
import {DataTableColumnHeader} from '../DataTableComponents/DataTableColumnHeader';
// import {DataTableRowActions} from './ClientDataTableActions';

export const CompaniesColumnShort: ColumnDef<Company>[] = [
    {
        accessorKey: 'name',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
    },
    {
        accessorKey: 'industry',
        header: 'Industry',
    },
    {
        accessorKey: 'size',
        header: 'Size',
    },
];
