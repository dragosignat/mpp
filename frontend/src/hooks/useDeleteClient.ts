import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/redux/store';
import {removeClient} from '@/redux/clients/clientsSlice';

function useDeleteClient(clientId: string) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Define the function to trigger the deletion action
        const deleteClient = () => {
            dispatch(removeClient(clientId));
        };

        // Call the deleteClient function when the hook is invoked
        deleteClient();

        // Since this hook doesn't return anything, you can leave the return statement empty
    }, [dispatch, clientId]); // Make sure to include all dependencies in the dependency array

    // This hook doesn't return anything, so you can leave the return statement empty
}

export default useDeleteClient;
