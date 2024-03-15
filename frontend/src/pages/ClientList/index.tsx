import Navbar from '@/components/Navbar';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import {Client} from '../../types/Client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';

function CRUDView() {
    const CLIENT_LIST_PATH = '../mockAPI/clientList.json';
    const [clientList, setClientList] = useState<Client[]>([]);

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
        // Delete the key from the list
        var clients = [...clientList];
        var idx = clientList.findIndex((x) => x.clientId === key);
        if (idx != -1) {
            clients.splice(idx, 1);
            console.log(clients);
            setClientList(clients);
        }
    }

    return (
        <div className=' '>
            <div className='justify-center p-5 grid'>
                <div className=' flex justify-between container p-5'>
                    <div className=' font-semibold text-xl'>Clients</div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='default'>Add new entry</Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                            <DialogHeader>
                                <DialogTitle>Edit Client</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            BOILERPLATE
                            <DialogFooter>
                                <Button type='submit'>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
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
                                    <td className=' cursor-pointer hover:text-slate-700 '>
                                        {client.clientName}
                                    </td>
                                    <td>{client.clientAddress}</td>
                                    <td>{client.clientEmail}</td>
                                    <td>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant='outline'>
                                                    Edit
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className='sm:max-w-[425px]'>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Edit Client
                                                    </DialogTitle>
                                                    <DialogDescription></DialogDescription>
                                                </DialogHeader>
                                                BOILERPLATE
                                                <DialogFooter>
                                                    <Button type='submit'>
                                                        Save changes
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                    <td>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <Button variant='destructive'>
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you absolutely sure
                                                        you want to delete this?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete your
                                                        data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            handleDelete(
                                                                client.clientId,
                                                            )
                                                        }
                                                        className=' bg-destructive '
                                                    >
                                                        Continue
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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
