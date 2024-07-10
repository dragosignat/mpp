// import {Button} from '@/components/ui/button';
import {useEffect} from 'react';
// import {Client} from '../../types/Client';
import {ClientColumns} from '@/components/ClientDataTable/ClientDataTableColumns';
import {DataTable} from '@/components/ClientDataTable/ClientDataTable';

function CRUDView() {
    return (
        <>
            <div className=' p-5 flex flex-col space-y-4'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-3xl font-bold'>Client List</h1>
                </div>
                <DataTable columns={ClientColumns} data={[]} />
            </div>
        </>
    );
}

export default CRUDView;
