import {ColumnDef} from '@tanstack/react-table';
import {Lead} from '@/types/Leads';
import {DataTableColumnHeader} from '../DataTableComponents/DataTableColumnHeader';
import {decodeBase64SocialLinks} from '@/types/SocialLink';
// import { DataTableRowActions } from './ClientDataTableActions';

export const LeadsColumn: ColumnDef<Lead>[] = [
    // {
    //     accessorKey: 'pid',
    //     header: ({column}) => (
    //         <DataTableColumnHeader column={column} title='PID' />
    //     ),
    // },
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
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Phone' />
        ),
    },
    {
        accessorKey: 'company_id',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Company ID' />
        ),
    },
    {
        accessorKey: 'position',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Position' />
        ),
    },
    {
        accessorKey: 'social_links',
        header: 'Social Links',
        cell: ({row}) => {
            const socialLinks = decodeBase64SocialLinks(
                row.original.social_links,
            );
            return (
                <div className='flex flex-col'>
                    {socialLinks.facebook && (
                        <a
                            href={socialLinks.facebook}
                            target='_blank'
                            rel='noreferrer noopener'
                            className='hover:underline'
                        >
                            Facebook
                        </a>
                    )}
                    {socialLinks.twitter && (
                        <a
                            href={socialLinks.twitter}
                            target='_blank'
                            rel='noreferrer noopener'
                            className='hover:underline'
                        >
                            Twitter
                        </a>
                    )}
                    {socialLinks.linkedin && (
                        <a
                            href={socialLinks.linkedin}
                            target='_blank'
                            rel='noreferrer noopener'
                            className='hover:underline'
                        >
                            LinkedIn
                        </a>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'birthday',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Birthday' />
        ),
    },
    {
        accessorKey: 'last_contact',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Last Contact' />
        ),
    },
    {
        accessorKey: 'first_contact',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='First Contact' />
        ),
    },
    {
        accessorKey: 'follow_up',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Follow Up' />
        ),
    },
    {
        accessorKey: 'source',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Source' />
        ),
    },
    {
        accessorKey: 'notes',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Notes' />
        ),
    },
    {
        accessorKey: 'lead_status',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Lead Status' />
        ),
    },
    {
        accessorKey: 'preferred_contact_method',
        header: ({column}) => (
            <DataTableColumnHeader
                column={column}
                title='Preferred Contact Method'
            />
        ),
    },
    {
        accessorKey: 'lead_score',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Lead Score' />
        ),
    },
    {
        accessorKey: 'created_at',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Created At' />
        ),
    },
    {
        accessorKey: 'updated_at',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Updated At' />
        ),
    },
    // {
    //     id: 'actions',
    //     cell: ({ row }) => <DataTableRowActions row={row} />,
    // },
];
