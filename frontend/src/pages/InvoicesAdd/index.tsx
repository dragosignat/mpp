import React from 'react';
import InvoiceAddForm from '@/components/InvoiceAddForm';

function InvoiceAdd() {
    return (
        <>
            <div className=' p-5 flex flex-col space-y-4'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-3xl font-bold'>Add a new invoice</h1>
                </div>
                <InvoiceAddForm />
            </div>
        </>
    );
}

export default InvoiceAdd;
