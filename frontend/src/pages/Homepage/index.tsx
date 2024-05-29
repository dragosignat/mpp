import {useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {DollarSign, Users, Warehouse, PiggyBank} from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import {loadClients, selectClients} from '@/redux/clients/clientsSlice';
import {AppDispatch} from '@/redux/store';
import BarChartComponent from '@/components/BarChartComponent';

function Homepage() {
    // Load the number of clients and map them to the number total purchase
    const clients = useSelector(selectClients);
    const dispatch = useDispatch<AppDispatch>();
    const clientsToPurchases: {name: string; total: number}[] = [];

    useEffect(() => {
        // Load the clients and form the map
        if (clients.length === 0) {
            console.log('loading clients');
            dispatch(loadClients());
        }
    }, [dispatch]);

    clients.map((client) => {
        clientsToPurchases.push({
            name: client.name,
            total: client.total_purchases,
        });
    });

    return (
        <>
            <div className=' flex flex-col space-y-4 p-5 '>
                <div className=' flex flex-row justify-between'>
                    <h1 className=' font-bold text-3xl '>Dashboard</h1>
                    <div className='flex items-center space-x-2'>
                        <Button variant='secondary'>Download CSV</Button>
                    </div>
                </div>
                <Tabs defaultValue='clients'>
                    <TabsList className=''>
                        <TabsTrigger value='clients'>Clients</TabsTrigger>
                        <TabsTrigger value='sales' disabled>
                            Sales
                        </TabsTrigger>
                        <TabsTrigger value='inventory' disabled>
                            Inventory
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className='grid grid-cols-4 gap-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Revenue
                            </CardTitle>
                            <DollarSign className=' w-4 h-4 text-gray-500 ' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>$25,000.00</div>
                            <p className='text-xs text-muted-foreground'>
                                +20% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                New Clients
                            </CardTitle>
                            <Users className=' w-4 h-4 text-gray-500 ' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>+60</div>
                            <p className='text-xs text-muted-foreground'>
                                +10% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Inventory
                            </CardTitle>
                            <Warehouse className='w-4 h-4 text-gray-500' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>1483</div>
                            <p className='text-xs text-muted-foreground'>
                                Items in the warehouse
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Money Saved
                            </CardTitle>
                            <PiggyBank className=' w-4 h-4 text-gray-500 ' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>$3,345.00</div>
                            <p className='text-xs text-muted-foreground'>
                                -18.3% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className='grid gap-4 grid-cols-7'>
                    <Card className='col-span-5'>
                        <CardHeader>
                            <CardTitle>Sales by client</CardTitle>
                        </CardHeader>
                        <CardContent className='pl-2'>
                            <BarChartComponent data={clientsToPurchases} />
                        </CardContent>
                    </Card>
                    <Card className='col-span-2'>
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>
                                You made 265 sales this month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Homepage;
