import Navbar from '@/components/Navbar';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import {ClientProp} from '../types/Client';

function CRUDView() {
    const CLIENT_LIST_PATH = '../mockAPI/clientList.json';
    const [clientList, setClientList] = useState<ClientProp[]>([]);

    // GET from mock API the list of objects to display
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(CLIENT_LIST_PATH);
            const data = await response.json();
            setClientList(data);
        };
        fetchData();
    }, []);

    function handleUpdate(key: string) {
        console.log(`${key} was updated!`);
    }

    function handleDelete(key: string) {
        console.log(`${key} was deleted!`);
    }

    return (
        <div>
            <Navbar />
            <div className='divide-x-[1px] justify-center p-5 flex'>
                <table className='table-auto sticky top-0 border-separate border-spacing-2 '>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Adrress</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientList.map((client) => {
                            return (
                                <tr key={client.clientId}>
                                    <td>{client.clientName}</td>
                                    <td>{client.clientAddress}</td>
                                    <td>{client.clientEmail}</td>
                                    <td>
                                        <Button>Edit</Button>
                                    </td>
                                    <td>
                                        <Button variant='destructive'>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CRUDView;
