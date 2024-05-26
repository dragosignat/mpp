import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectClients} from '@/redux/clients/clientsSlice';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import ClientEditForm from '@/components/ClientEditForm';

const ClientEdit = () => {
    const {clientId} = useParams<{clientId: string}>();
    // Load the client data from the server
    const clients = useSelector(selectClients);
    const client = clients.find((c) => c.id === clientId);

    if (!client || !clientId) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className=' p-5 flex flex-col'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col space-y-2'>
                        <Button className='' variant='ghost'>
                            <Link to='/clients'>
                                <div className='flex flex-row items-start space-x-3 space-y-0'>
                                    <ArrowLeft className='h-6 w-6' />
                                    <div className=' font-semibold text-lg '>
                                        Go Back
                                    </div>
                                </div>
                            </Link>
                        </Button>
                        <h1 className='text-xl font-bold py-2'>
                            Editing: {client?.name}
                        </h1>
                    </div>
                </div>
                <ClientEditForm clientId={clientId} />
            </div>
        </>
    );
};

export default ClientEdit;
