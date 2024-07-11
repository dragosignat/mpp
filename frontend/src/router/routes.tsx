import Homepage from '@/pages/Homepage';
import ClientList from '@/pages/ClientList';
import ClientAdd from '@/pages/ClientAdd';
import ClientEdit from '@/pages/ClientEdit';
import {createBrowserRouter} from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import Root from '@/layouts/Root';
import LoginPage from '@/pages/LoginPage';
import Signup from '@/pages/SignupPage';
import CampaignPage from '@/pages/Campaigns';
import CampaignAdd from '@/pages/CampaignAdd';
import PeopleDashboard from '@/pages/PeopleDashboard';
import KanbanDashboard from '@/pages/KanbanDashboard';
import Leads from '@/pages/Leads';
import LeadAddForm from '@/components/LeadsAddForm';
import CampaignDashboard from '@/pages/CampaignDashboard';
import CampaignEmail from '@/pages/CampaignEmail';
import CampaignSMS from '@/pages/CampaignSMS';

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
                path: '/people',
                element: <PeopleDashboard />,
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
                path: '/kanban',
                element: <KanbanDashboard />,
            },
            {
                path: '/leads',
                element: <Leads />,
            },
            {
                path: '/leads/add',
                element: <LeadAddForm />,
            },
            {
                path: '/campaign',
                element: <CampaignDashboard />,
            },
            {
                path: '/campaign/email',
                element: <CampaignEmail />,
            },
            {
                path: 'campaign/sms',
                element: <CampaignSMS />,
            },
            {
                path: '/campaign/analyse',
                element: <CampaignPage />,
            },
            {
                path: '/campaign/analyse/add',
                element: <CampaignAdd />,
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
