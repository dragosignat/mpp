import Homepage from '@/pages/Homepage';
import ClientList from '@/pages/ClientList';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import Root from '@/layouts/Root';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Homepage />,
            },
            {
                path: '/clients',
                element: <ClientList />,
            },
        ],
    },
]);

export default router;
