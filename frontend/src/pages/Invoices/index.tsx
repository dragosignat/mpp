import React from 'react';
import {useEffect, useState} from 'react';
import {Invoice} from '@/types/Invoices';
import axios from 'axios';
import {API_URL} from '@/config/apiConfig';
import {DataTable} from '@/components/InvoiceDataTable/InvoiceDataTable';
import {InvoiceColumns} from '@/components/InvoiceDataTable/InvoiceDataTableColumns';

function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const {data: response} = await axios.get(`${API_URL}/invoices`);
                setInvoices(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInvoices();
    }, []);

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
