import {DataTable} from '@/components/ClientDataTable/ClientDataTable';
import {ClientColumns} from '@/components/ClientDataTable/ClientDataTableColumns';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import LeadsSVG from '@/assets/leads';
import FindLeadsDialog from '@/components/FindLeadsDialog';
import ImportCSVDialog from '@/components/ImportCSVDialog';

function PeopleDashboard() {
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
                                                Explore all clients
                                            </Button>
                                        </Link>
                                        {/* <Link to='/clients/add'>
                                            <Button variant='default'>
                                                Add Client
                                            </Button>
                                        </Link> */}
                                    </div>
                                </div>
                                <DataTable columns={ClientColumns} data={[]} />
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
                                        {/* <Link to='/clients/add'>
                                            <Button variant='default'>
                                                Add Client
                                            </Button>
                                        </Link> */}
                                    </div>
                                </div>
                                <DataTable columns={ClientColumns} data={[]} />
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
                                        {/* <Link to='/clients/add'>
                                            <Button variant='default'>
                                                Add Client
                                            </Button>
                                        </Link> */}
                                    </div>
                                </div>
                                <DataTable columns={ClientColumns} data={[]} />
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
