import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Client} from '@/types/Client';
import axios from 'axios';
import {API_URL} from '@/config/apiConfig';

export interface ClientsState {
    clients: Client[];
    loading?: boolean;
    error: string;
}

const initialState: ClientsState = {
    clients: [],
    loading: false,
    error: '',
};

export const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadClients.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload;
            })
            .addCase(loadClients.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to load clients';
            })
            .addCase(addClient.fulfilled, (state, action) => {
                console.log(action.payload);
                state.clients.push(action.payload);
            })
            .addCase(addClient.rejected, (state) => {
                state.error = 'Failed to add client';
            })
            .addCase(removeClient.fulfilled, (state, action) => {
                state.clients = state.clients.filter(
                    (client) => client.clientId !== action.payload,
                );
            })
            .addCase(removeClient.rejected, (state) => {
                state.error = 'Failed to remove client';
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                const index = state.clients.findIndex(
                    (client) => client.clientId === action.payload.clientId,
                );
                if (index !== -1) {
                    state.clients[index] = action.payload;
                }

            })
            .addCase(updateClient.rejected, (state) => {
                state.error = 'Failed to update client';
            });
    },
});

export const loadClients = createAsyncThunk('clients/loadClients', async () => {
    const {data} = await axios.get(`${API_URL}/clients`);
    return data;
});


export const addClient = createAsyncThunk('clients/addClient', async (client: Client) => {
    const {data} = await axios.post(`${API_URL}/clients`, client);
    return data;
});

export const removeClient = createAsyncThunk('clients/deleteClient', async (clientId: string) => {
    await axios.delete(`${API_URL}/clients/${clientId}`);
    return clientId;
});


export const updateClient = createAsyncThunk('clients/updateClient', async (client: Client) => {
    const {data} = await axios.put(`${API_URL}/clients/${client.clientId}`, client);
    return data;
});


export const selectClients = (state: {clients: ClientsState}) =>
    state.clients.clients;
export const {} = clientSlice.actions;
export default clientSlice.reducer;
