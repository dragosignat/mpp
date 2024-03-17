// import {Button} from '@/components/ui/button';
import {useEffect} from 'react';
// import {Client} from '../../types/Client';
import {ClientColumns} from '@/components/client-data-table/columns';
import {DataTable} from '@/components/client-data-table/client-data-table';
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

    console.log('clients', clients);

    return (
        <>
            <div className=' p-5 flex flex-col'>
                <div className='flex flex-row justify-between p-5'>
                    <h1 className='text-2xl font-bold'>Client List</h1>
                    {/* Toggle a dialog with the form to add a new client */}
                </div>
                <DataTable columns={ClientColumns} data={clients} />
            </div>
        </>
    );
}

export default CRUDView;
