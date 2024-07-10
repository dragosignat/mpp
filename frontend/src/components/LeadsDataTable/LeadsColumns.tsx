import {ColumnDef} from '@tanstack/react-table';
import {Lead} from '@/types/Leads';
import {DataTableColumnHeader} from '../DataTableComponents/DataTableColumnHeader';
// import {DataTableRowActions} from './ClientDataTableActions';

export const LeadsColumns: ColumnDef<Lead>[] = [
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
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'position',
        header: 'Position',
    },
    {
        accessorKey: 'company_id',
        header: 'Company ID',
    },
    {
        accessorKey: 'social_links',
        header: 'Social Links',
    },
    {
        accessorKey: 'birthday',
        header: 'Birthday',
    },
    {
        accessorKey: 'last_contact',
        header: 'Last Contact',
    },
    {
        accessorKey: 'first_contact',
        header: 'First Contact',
    },
    {
        accessorKey: 'follow_up',
        header: 'Follow Up',
    },
    {
        accessorKey: 'source',
        header: 'Source',
    },
    {
        accessorKey: 'notes',
        header: 'Notes',
    },
    {
        accessorKey: 'lead_status',
        header: 'Lead Status',
    },
    {
        accessorKey: 'preferred_contact_method',
        header: 'Preferred Contact Method',
    },
    {
        accessorKey: 'lead_score',
        header: 'Lead Score',
    },
    {
        accessorKey: 'created_at',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Created At' />
        ),
    },
    // {
    //     id: 'actions',
    //     cell: ({row}) => <DataTableRowActions row={row} />,
    // },
];
