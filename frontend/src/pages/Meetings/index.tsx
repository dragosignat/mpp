import React from 'react';
import MeetingsCalendar from '@/components/MeetingsCalendar';
import {useQuery} from '@tanstack/react-query';
import axiosInstance from '@/config/axiosConfig';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Lead} from '@/types/Leads';

function Meetings() {
    const {status: leadsStatus, data: leadsData} = useQuery({
        queryKey: ['leads'],
        queryFn: () => axiosInstance.get('/leads'),
    });

    return (
        <>
            <div className='my-8 flex flex-col'>
                <MeetingsCalendar />
                <div className='m-4 p-4 bg-white rounded-lg border-zinc-800 '>
                    <Table>
                        <TableCaption>Quick info to book a lead</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[100px]'>
                                    Lead
                                </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leadsData?.data.map((lead: Lead) => (
                                <TableRow>
                                    <TableCell>
                                        {lead.first_name} {lead.last_name}
                                    </TableCell>
                                    <TableCell>{lead.email}</TableCell>
                                    <TableCell>{lead.lead_status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Meetings;
