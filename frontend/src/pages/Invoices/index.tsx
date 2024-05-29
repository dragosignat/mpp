import {useEffect} from 'react';
import {DataTable} from '@/components/InvoiceDataTable/InvoiceDataTable';
import {InvoiceColumns} from '@/components/InvoiceDataTable/InvoiceDataTableColumns';
import {useSelector, useDispatch} from 'react-redux';
import {selectInvoices, loadInvoices} from '@/redux/invoices/invoiceSlice';
import {AppDispatch} from '@/redux/store';

function Invoices() {
    const invoices = useSelector(selectInvoices);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (invoices.length === 0) {
            console.log('loading invoices');
            dispatch(loadInvoices());
        }
    }, [dispatch]);

    return (
        <>
            <div className=' p-5 flex flex-col space-y-4'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-3xl font-bold'>Invoices</h1>
                </div>
                <DataTable columns={InvoiceColumns} data={invoices} />
            </div>
        </>
    );
}

export default Invoices;
