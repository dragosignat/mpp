import {DataTable} from '@/components/DataTable';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import LeadsSVG from '@/assets/leads';
import FindLeadsDialog from '@/components/FindLeadsDialog';
import ImportCSVDialog from '@/components/ImportCSVDialog';
import {LeadsColumnShort} from '@/components/LeadsDataTable/LeadsColumnShort';
import {CompaniesColumnShort} from '@/components/CompanyDataTable/CompanyColumnShort';
import {ClientsColumnShort} from '@/components/ClientDataTable/ClientsColumnsShort';
import {useQuery} from '@tanstack/react-query';
import axiosInstance from '@/config/axiosConfig';
import {useToast} from '@/components/ui/use-toast';

function PeopleDashboard() {
    const {status: leadsStatus, data: leadsData} = useQuery({
        queryKey: ['leads'],
        queryFn: () => axiosInstance.get('/leads'),
    });

    const {toast} = useToast();

    if (leadsStatus === 'error') {
        toast({
            title: 'Error',
            description: 'Failed to fetch leads',
        });
    }

    const {status: clientsStatus, data: clientsData} = useQuery({
        queryKey: ['clients'],
        queryFn: () => axiosInstance.get('/clients'),
    });

    if (clientsStatus === 'error') {
        toast({
            title: 'Error',
            description: 'Failed to fetch clients',
        });
    }

    const {status: companyStatus, data: companyData} = useQuery({
        queryKey: ['companies'],
        queryFn: () => axiosInstance.get('/companies'),
    });

    if (companyStatus === 'error') {
        toast({
            title: 'Error',
            description: 'Failed to fetch companies',
        });
    }

    return (
        <>
            <div className=' p-5 flex flex-col space-y-4'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-3xl font-bold drop-shadow-xl'>
                        People
                    </h1>
                </div>
                <div className='flex flex-row'>
                    <div className=' basis-2/3 m-4 space-y-8'>
                        <div className=' flex flex-col '>
                            <div className=' space-y-4'>
                                <div className=' flex justify-between px-4 '>
                                    <h3 className='text-2xl font-bold'>
                                        Leads
                                    </h3>
                                    <div className=' space-x-4 '>
                                        <Link to='/clients'>
                                            <Button variant='outline'>
                                                Explore all leads
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <DataTable
                                    columns={LeadsColumnShort}
                                    data={leadsData?.data || []}
                                />
                            </div>
                        </div>
                        <div className=' flex flex-col '>
                            <div className=' space-y-4'>
                                <div className=' flex justify-between px-4 '>
                                    <h3 className='text-2xl font-bold'>
                                        Clients
                                    </h3>
                                    <div className=' space-x-4 '>
                                        <Link to='/clients'>
                                            <Button variant='outline'>
                                                Explore all clients
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <DataTable
                                    columns={ClientsColumnShort}
                                    data={clientsData?.data || []}
                                />
                            </div>
                        </div>
                        <div className=' flex flex-col '>
                            <div className=' space-y-4'>
                                <div className=' flex justify-between px-4 '>
                                    <h3 className='text-2xl font-bold'>
                                        Companies
                                    </h3>
                                    <div className=' space-x-4 '>
                                        <Link to='/clients'>
                                            <Button variant='outline'>
                                                Explore all companies
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <DataTable
                                    columns={CompaniesColumnShort}
                                    data={companyData?.data || []}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=' basis-1/3 bg-white rounded-lg shadow-lg flex flex-col justify-between'>
                        <div className='flex flex-col p-8 space-y-4 '>
                            <FindLeadsDialog />
                            <ImportCSVDialog />
                            <Button variant='default' className=' w-full '>
                                Import from Instagram
                            </Button>
                            {/* Should put a chart here */}
                        </div>
                        <LeadsSVG className=' w-96 h-96 mx-auto' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PeopleDashboard;
