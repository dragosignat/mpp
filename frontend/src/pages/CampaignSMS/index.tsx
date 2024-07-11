import React from 'react';
import {Button} from '@/components/ui/button';
import {useQuery} from '@tanstack/react-query';
import axiosInstance from '@/config/axiosConfig';
import {SalesScript, SalesScriptCreate} from '@/types/Campaign';
import {Separator} from '@/components/ui/separator';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Lead} from '@/types/Leads';
import {SalesCampaignCreate} from '@/types/Campaign';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';

function CampaignSMS() {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [leads, setLeads] = useState<number[]>([]);
    const [selectedScript, setSelectedScript] = useState<number | null>(null);
    const [campignName, setCampaignName] = useState<string>('');

    const {
        status: scriptsStatus,
        data: scriptsData,
        error: scriptsError,
    } = useQuery({
        queryKey: ['scripts'],
        queryFn: () =>
            axiosInstance.get('/campaigns/scripts?type=sms').then((res) => res),
    });

    const {
        status: leadsStatus,
        data: leadsData,
        error: leadsError,
    } = useQuery({
        queryKey: ['leads'],
        queryFn: () => axiosInstance.get('/leads').then((res) => res),
    });

    const queryClient = useQueryClient();
    const addScriptMutation = useMutation({
        mutationFn: (data: SalesScriptCreate) =>
            axiosInstance.post('/campaigns/scripts', data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['scripts']});
        },
    });

    const createCampaignMutation = useMutation({
        mutationFn: (data: SalesCampaignCreate) =>
            axiosInstance.post('/campaigns/sales', data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['campaigns']});
        },
    });

    const {toast} = useToast();

    const handleSendCampaign = () => {
        if (!selectedScript || !leads.length || campignName === '') {
            toast({
                title: 'Error',
                description: 'Please select a script and leads to send.',
                variant: 'destructive',
            });
            return;
        }

        const newCampaign: SalesCampaignCreate = {
            name: campignName,
            type: 'sms',
            script_id: selectedScript,
            leads,
        };

        createCampaignMutation.mutate(newCampaign, {
            onSuccess: () => {
                // Clear the form after successful mutation
                setCampaignName('');
                setLeads([]);
                setSelectedScript(null);
                // You can also add a success message or notification here
                toast({
                    title: 'Success',
                    description: 'Campaign created successfully.',
                });
            },
            onError: (error) => {
                // Handle any errors here
                console.error('Error creating campaign:', error);
                // You can also add an error message or notification here
                toast({
                    title: 'Error',
                    description: 'There was an error creating the campaign.',
                    variant: 'destructive',
                });
            },
        });
    };

    const handleSend = () => {
        const newScript: SalesScriptCreate = {
            title,
            subject,
            body,
            type: 'sms',
        };

        addScriptMutation.mutate(newScript, {
            onSuccess: () => {
                // Clear the form after successful mutation
                setTitle('');
                setSubject('');
                setBody('');
                // You can also add a success message or notification here
            },
            onError: (error) => {
                // Handle any errors here
                console.error('Error adding script:', error);
                // You can also add an error message or notification here
            },
        });
    };

    return (
        <>
            <div className='flex flex-col  space-y-4'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-4xl font-bold text-gray-800 my-4'>
                        SMS campaign
                    </h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='outline'>
                                Create a new campaign
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-md'>
                            <DialogHeader>
                                <DialogTitle>Select leads</DialogTitle>
                                <DialogDescription>
                                    You can select all the leads you want to
                                    message in this campaign.
                                </DialogDescription>
                            </DialogHeader>
                            <Label className='space-y-2'>
                                <span>Campaign name: </span>
                                <Input
                                    type='text'
                                    placeholder='Campaign name'
                                    value={campignName}
                                    onChange={(e) =>
                                        setCampaignName(e.target.value)
                                    }
                                    required
                                />
                            </Label>

                            <Table>
                                <TableCaption></TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='w-[100px]'>
                                            Lead name
                                        </TableHead>
                                        <TableHead className='text-right'></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leadsStatus === 'pending' ? (
                                        <div>Loading...</div>
                                    ) : leadsStatus === 'error' ? (
                                        <div>Error: {leadsError.message}</div>
                                    ) : (
                                        leadsData.data
                                            ?.filter((lead: Lead) => lead.phone)
                                            .map((lead: Lead) => (
                                                <TableRow key={lead.id}>
                                                    <TableCell className='font-medium'>
                                                        {lead.first_name}{' '}
                                                        {lead.last_name}
                                                    </TableCell>
                                                    <TableCell className='text-right'>
                                                        <input
                                                            type='checkbox'
                                                            onChange={(e) => {
                                                                if (
                                                                    e.target
                                                                        .checked
                                                                ) {
                                                                    setLeads([
                                                                        ...leads,
                                                                        lead.id,
                                                                    ]);
                                                                } else {
                                                                    setLeads(
                                                                        leads.filter(
                                                                            (
                                                                                id,
                                                                            ) =>
                                                                                id !==
                                                                                lead.id,
                                                                        ),
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    )}
                                </TableBody>
                            </Table>

                            <DialogFooter className='sm:justify-center'>
                                <DialogClose asChild>
                                    <Button type='button' variant='secondary'>
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button onClick={handleSendCampaign}>
                                    Send to selected leads
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='flex flex-row justify-evenly space-x-4 mx-4 '>
                    <div className='basis-1/2 flex flex-col bg-white rounded-lg shadow-lg p-4'>
                        <h2 className='text-2xl mx-auto font-bold'>
                            Phone scripts
                        </h2>
                        <Separator className='my-4' />
                        <div className='flex flex-col'>
                            <Table>
                                <TableCaption></TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='w-[100px]'>
                                            Campaign
                                        </TableHead>
                                        <TableHead className='text-right'>
                                            Type
                                        </TableHead>
                                        <TableHead className='text-right'></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {scriptsData?.data.map(
                                        (script: SalesScript) => (
                                            <TableRow key={script.id}>
                                                <TableCell className='font-medium'>
                                                    {script.title}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    {script.type}
                                                </TableCell>
                                                <TableCell className='text-right space-x-4 '>
                                                    <Checkbox
                                                        checked={
                                                            selectedScript ===
                                                            script.id
                                                        }
                                                        onCheckedChange={() => {
                                                            setSelectedScript(
                                                                script.id,
                                                            );
                                                        }}
                                                    />

                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant='outline'>
                                                                View
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className='sm:max-w-md'>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    {
                                                                        script.title
                                                                    }
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    Type:{' '}
                                                                    {
                                                                        script.type
                                                                    }
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className='flex flex-col space-x-2'>
                                                                <div>
                                                                    <span className='font-bold'>
                                                                        Subject:{' '}
                                                                    </span>
                                                                    {
                                                                        script.subject
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <span className='font-bold'>
                                                                        Body:{' '}
                                                                    </span>
                                                                    {
                                                                        script.body
                                                                    }
                                                                </div>
                                                            </div>
                                                            <DialogFooter className='sm:justify-start'>
                                                                <DialogClose
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        type='button'
                                                                        variant='secondary'
                                                                    >
                                                                        Close
                                                                    </Button>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className='basis-1/2 flex flex-col bg-white rounded-lg shadow-lg p-4'>
                        <h2 className='text-2xl mx-auto font-bold'>Compose</h2>
                        <Separator className='my-4' />
                        <div className='flex flex-col space-y-4'>
                            <Label htmlFor='title'>Title</Label>
                            <Input
                                id='title'
                                name='title'
                                type='text'
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Label htmlFor='subject'>Subject</Label>
                            <Input
                                id='subject'
                                name='subject'
                                type='text'
                                placeholder='Subject'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            <Label htmlFor='body'>Body</Label>
                            <Textarea
                                id='body'
                                name='body'
                                placeholder='Body'
                                rows={10}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            <Button
                                onClick={handleSend}
                                disabled={addScriptMutation.isPending}
                            >
                                {addScriptMutation.isPending
                                    ? 'Sending...'
                                    : 'Send'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CampaignSMS;
