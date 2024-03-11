import Navbar from '@/components/Navbar';
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

    return (
        <div>
            <Navbar />
            <div className='grid grid-cols-3 p-5 divide-x-[1px] gap-4'>
                <div className='cols-span-2'>
                    <table className='table-auto sticky top-0'>
                        <thead>
                            {clientList.map((client) => {
                                return (
                                    <tr key={client.clientId}>
                                        <td>{client.clientName}</td>
                                        <td>{client.clientAddress}</td>
                                        <td>{client.clientEmail}</td>
                                    </tr>
                                );
                            })}
                        </thead>
                    </table>
                </div>
                <div>TEST</div>
            </div>
        </div>
    );
}

export default CRUDView;
