import {ColumnDef} from '@tanstack/react-table';
import {Lead} from '@/types/Leads';
import {DataTableColumnHeader} from '../DataTableComponents/DataTableColumnHeader';
import {decodeBase64SocialLinks} from '@/types/SocialLink';
// import {DataTableRowActions} from './ClientDataTableActions';

export const LeadsColumnShort: ColumnDef<Lead>[] = [
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
    {
        accessorKey: 'social_links',
        header: 'Social Links',
        cell: ({row}) => {
            const socialLinks = decodeBase64SocialLinks(
                row.original.social_links,
            );
            return (
                <>
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
                </>
            );
        },
    },
    {
        accessorKey: 'lead_status',
        header: 'Lead Status',
    },
    // {
    //     id: 'actions',
    //     cell: ({row}) => <DataTableRowActions row={row} />,
    // },
];
