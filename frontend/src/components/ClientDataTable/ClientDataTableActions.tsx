import {Row} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';

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
import {useToast} from '@/components/ui/use-toast';
import {Client} from '@/types/Client';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const client = row.original as Client;
    const clientId = client.pid;
    const {toast} = useToast();
    const handleDelete = () => {
        toast({
            title: 'Client deleted',
            variant: 'destructive',
        });
    };

    return (
        <div className='flex flex-row gap-3 justify-center align-middle'>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant='destructive'>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                className='bg-destructive hover:bg-red-900'
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Link to={`/clients/${clientId}`}>
                <Button variant='outline'>Edit</Button>
            </Link>
        </div>
    );
}
