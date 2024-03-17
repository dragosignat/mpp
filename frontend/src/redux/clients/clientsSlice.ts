import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Client} from '@/types/Client';

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
        addClient(state, action: PayloadAction<Client>) {
            state.clients.push(action.payload);
        },
        removeClient(state, action: PayloadAction<string>) {
            state.clients = state.clients.filter(
                (client) => client.clientId !== action.payload,
            );
        },
        updateClient(state, action: PayloadAction<Client>) {
            const index = state.clients.findIndex(
                (client) => client.clientId === action.payload.clientId,
            );
            if (index !== -1) {
                state.clients[index] = action.payload;
            }
        },
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
            });
    },
});

export const loadClients = createAsyncThunk('clients/loadClients', async () => {
    const response = await fetch('../mockAPI/clientList.json');
    const data = await response.json();
    return data;
});

export const selectClients = (state: {clients: ClientsState}) =>
    state.clients.clients;
export const {addClient, removeClient, updateClient} = clientSlice.actions;
export default clientSlice.reducer;
