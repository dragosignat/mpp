import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Invoice, InvoiceCreate, InvoiceUpdate} from '@/types/Invoices';
import axios from 'axios';
import {API_URL} from '@/config/apiConfig';

export interface InvoiceState {
    invoices: Invoice[];
    loading?: boolean;
    error: string;
}

const initialState: InvoiceState = {
    invoices: [],
    loading: false,
    error: '',
};

export const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadInvoices.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload;
            })
            .addCase(loadInvoices.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to load invoices';
            })
            .addCase(loadInvoicesByClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadInvoicesByClient.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload;
            })
            .addCase(loadInvoicesByClient.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to load invoices';
            })
            .addCase(addInvoice.fulfilled, (state, action) => {
                console.log(action.payload);
                state.invoices.push(action.payload);
            })
            .addCase(addInvoice.rejected, (state) => {
                state.error = 'Failed to add invoice';
            })
            .addCase(removeInvoice.fulfilled, (state, action) => {
                state.invoices = state.invoices.filter(
                    (invoice) => invoice.id !== action.payload,
                );
            })
            .addCase(removeInvoice.rejected, (state) => {
                state.error = 'Failed to remove invoice';
            })
            .addCase(updateInvoice.fulfilled, (state, action) => {
                const index = state.invoices.findIndex(
                    (invoice) => invoice.id === action.payload.id,
                );
                if (index !== -1) {
                    state.invoices[index] = action.payload;
                }
            })
            .addCase(updateInvoice.rejected, (state) => {
                state.error = 'Failed to update invoice';
            });
    },
});

export const loadInvoices = createAsyncThunk(
    'invoices/loadInvoices',
    async () => {
        const {data} = await axios.get(`${API_URL}/invoices`);
        return data;
    },
);

export const loadInvoicesByClient = createAsyncThunk(
    'invoices/loadInvoicesByClient',
    async (clientId: string) => {
        const {data} = await axios.get(
            `${API_URL}/invoices?clientId=${clientId}`,
        );
        return data;
    },
);

export const addInvoice = createAsyncThunk(
    'invoices/addinvoice',
    async (invoice: InvoiceCreate) => {
        const {data} = await axios.post(`${API_URL}/invoices`, invoice);
        return data;
    },
);

export const removeInvoice = createAsyncThunk(
    'invoices/deleteinvoice',
    async (id: string) => {
        await axios.delete(`${API_URL}/invoices/${id}`);
        return id;
    },
);

export const updateInvoice = createAsyncThunk(
    'invoices/updateinvoice',
    async (invoice: InvoiceUpdate) => {
        const {data} = await axios.put(
            `${API_URL}/invoices/${invoice.id}`,
            invoice,
        );
        return data;
    },
);

export const selectInvoices = (state: {invoices: InvoiceState}) =>
    state.invoices.invoices;
// export const {} = invoiceSlice.actions;
export default invoiceSlice.reducer;
