// import {Button} from '@/components/ui/button';
import {useEffect} from 'react';
// import {Client} from '../../types/Client';
import {ClientColumns} from '@/components/ClientDataTable/ClientDataTableColumns';
import {DataTable} from '@/components/ClientDataTable/ClientDataTable';
import {useDispatch, useSelector} from 'react-redux';
import {loadClients, selectClients} from '@/redux/clients/clientsSlice';
import {AppDispatch} from '@/redux/store';

function CRUDView() {
    const clients = useSelector(selectClients);
    const dispatch = useDispatch<AppDispatch>();

    // Load the client list from the store
    useEffect(() => {
        if (clients.length === 0) {
            console.log('loading clients');
            dispatch(loadClients());
        }
    }, [dispatch]);

    return (
        <>
            <div className=' p-5 flex flex-col space-y-4'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-3xl font-bold'>Client List</h1>
                </div>
                <DataTable columns={ClientColumns} data={clients} />
            </div>
        </>
    );
}

export default CRUDView;
