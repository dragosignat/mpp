import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Client, ClientCreate, ClientUpdate} from '@/types/Client';
import axios from 'axios';
import {API_URL} from '@/config/apiConfig';
import axiosInstance from '@/config/axiosConfig';

export interface ClientsState {
    clients: Client[];
    currentPage?: number;
    itemsPerPage?: number;
    loading?: boolean;
    error: string;
}

const initialState: ClientsState = {
    clients: [],
    currentPage: 0,
    itemsPerPage: 100,
    loading: false,
    error: '',
};

export const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
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
                    (client) => client.id !== action.payload,
                );
            })
            .addCase(removeClient.rejected, (state) => {
                state.error = 'Failed to remove client';
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                const index = state.clients.findIndex(
                    (client) => client.id === action.payload.clientId,
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
    const {data} = await axiosInstance.get(`/clients`);
    return data;
});

export const addClient = createAsyncThunk(
    'clients/addClient',
    async (client: ClientCreate) => {
        try {
            const {data} = await axiosInstance.post('/clients', client);
            return data;
        } catch (error) {
            const url = `/clients`;
            const method = 'POST';
            const body = client;
            localStorage.setItem(url, JSON.stringify({method, body}));
            return client;
        }
    },
);

export const removeClient = createAsyncThunk(
    'clients/deleteClient',
    async (clientId: string) => {
        try {
            await axiosInstance.delete(`/clients/${clientId}`);
            return clientId;
        } catch (error) {
            const url = `/clients/${clientId}`;
            const method = 'DELETE';
            const body = clientId;
            localStorage.setItem(url, JSON.stringify({method, body}));
            return clientId;
        }
    },
);

export const updateClient = createAsyncThunk(
    'clients/updateClient',
    async (client: ClientUpdate) => {
        try {
            const {data} = await axiosInstance.put(
                `/clients/${client.id}`,
                client,
            );
            return data;
        } catch (error) {
            const url = `/clients/${client.id}`;
            const method = 'PUT';
            const body = client;
            localStorage.setItem(url, JSON.stringify({method, body}));
            return client;
        }
    },
);

export const selectClients = (state: {clients: ClientsState}) =>
    state.clients.clients;
// export const {} = clientSlice.actions;
export default clientSlice.reducer;
