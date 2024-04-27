import React from 'react';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {selectInvoices} from '@/redux/invoices/invoiceSlice';
import InvoiceEditForm from '@/components/InvoiceEditForm';

function InvoicesEdit() {
    const {invoiceId} = useParams();
    const invoices = useSelector(selectInvoices);
    const invoice = invoices.find((i) => i.id === invoiceId);
    console.log(invoice);

    if (!invoice) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className=' p-5 flex flex-col'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <Button className='' variant='ghost'>
                            <Link to='/invoices'>
                                <div className='flex flex-row items-start space-y-0'>
                                    <ArrowLeft className='h-6 w-6' />
                                    <div className=' font-semibold text-lg '>
                                        Go Back
                                    </div>
                                </div>
                            </Link>
                        </Button>
                        <h1 className='text-l font-bold py-2'>
                            Editing: {invoice?.id}
                        </h1>
                    </div>
                </div>
                <InvoiceEditForm invoiceId={invoiceId} />
            </div>
        </>
    );
}

export default InvoicesEdit;
