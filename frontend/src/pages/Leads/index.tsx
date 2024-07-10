import {DataTable} from '@/components/DataTable';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axiosInstance from '@/config/axiosConfig';
import {LeadsColumn} from '@/components/LeadsDataTable/LeadsColumns';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';

function Leads() {
    const {status: leadsStatus, data: leadsData} = useQuery({
        queryKey: ['leads'],
        queryFn: () => axiosInstance.get('/leads'),
    });

    return (
        <>
            <div className='flex flex-col p-4 space-y-4'>
                <div className='flex space-x-4 '>
                    <h1 className=' text-2xl font-bold '>Leads</h1>
                    <Link to='/leads/add'>
                        <Button variant='outline'>Add a new lead</Button>
                    </Link>
                </div>
                <DataTable
                    columns={LeadsColumn}
                    data={leadsData?.data || []}
                    message={
                        leadsStatus === 'pending'
                            ? 'Loading...'
                            : '' || leadsStatus === 'error'
                              ? 'Error fetching data'
                              : ''
                    }
                />
            </div>
        </>
    );
}

export default Leads;
