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
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/redux/store';
import {removeInvoice} from '@/redux/invoices/invoiceSlice';
import {Invoice} from '@/types/Invoices';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    // Tell TypeScript that the row.original object is of type Invoice
    const invoice = row.original as Invoice;
    const invoiceId = invoice.id;
    const dispatch = useDispatch<AppDispatch>();
    const {toast} = useToast();

    const handleDelete = () => {
        dispatch(removeInvoice(invoiceId));
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
            <Link to={`/invoices/${invoiceId}`}>
                <Button variant='outline'>Edit</Button>
            </Link>
        </div>
    );
}
