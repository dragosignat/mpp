import Homepage from '@/pages/Homepage';
import ClientList from '@/pages/ClientList';
import ClientAdd from '@/pages/ClientAdd';
import ClientEdit from '@/pages/ClientEdit';
import {createBrowserRouter} from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import Root from '@/layouts/Root';
import Invoices from '@/pages/Invoices';
import InvoicesAdd from '@/pages/InvoicesAdd';
import InvoicesEdit from '@/pages/InvoicesEdit';
import LoginPage from '@/pages/LoginPage';
import Signup from '@/pages/SignupPage';
import Campaign from '@/pages/Campaigns';

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
            {
                path: '/clients/:clientId',
                element: <ClientEdit />,
            },
            {
                path: '/clients/add',
                element: <ClientAdd />,
            },
            {
                path: '/invoices',
                element: <Invoices />,
            },
            {
                path: '/invoices/add',
                element: <InvoicesAdd />,
            },
            {
                path: '/invoices/:invoiceId',
                element: <InvoicesEdit />,
            },
            {
                path: '/campaign',
                element: <Campaign />,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
]);

export default router;
