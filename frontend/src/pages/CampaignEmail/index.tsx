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

function CampaignEmail() {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const {
        status: scriptsStatus,
        data: scriptsData,
        error: scriptsError,
    } = useQuery({
        queryKey: ['scripts'],
        queryFn: () =>
            axiosInstance
                .get('/campaigns/scripts?type=email')
                .then((res) => res.data),
    });

    const queryClient = useQueryClient();
    const addScriptMutation = useMutation({
        mutationFn: (data: SalesScriptCreate) =>
            axiosInstance.post('/campaigns/scripts', data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['scripts']});
        },
    });

    const handleSend = () => {
        const newScript: SalesScriptCreate = {
            title,
            subject,
            body,
            type: 'email',
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
                        Email campaign
                    </h1>
                    <Button variant='outline'>Create a new campaign</Button>
                </div>
                <div className='flex flex-row justify-evenly space-x-4 mx-4 '>
                    <div className='basis-1/2 flex flex-col bg-white rounded-lg shadow-lg p-4'>
                        <h2 className='text-2xl mx-auto font-bold'>
                            Email scripts
                        </h2>
                        <Separator className='my-4' />
                        <div className='flex flex-col'>
                            {scriptsData?.map((script: SalesScript) => (
                                <div className='flex flex-row justify-between'>
                                    <div key={script.id}>
                                        <h3 className='text-xl font-bold'>
                                            {script.title}
                                        </h3>
                                        <div className=' text-zinc-400 '>
                                            Type: {script.type}
                                        </div>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant='outline'>
                                                View
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className='sm:max-w-md'>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {script.title}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Type: {script.type}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className='flex flex-col space-x-2'>
                                                <div>
                                                    <span className='font-bold'>
                                                        Subject:{' '}
                                                    </span>
                                                    {script.subject}
                                                </div>
                                                <div>
                                                    <span className='font-bold'>
                                                        Body:{' '}
                                                    </span>
                                                    {script.body}
                                                </div>
                                            </div>
                                            <DialogFooter className='sm:justify-start'>
                                                <DialogClose asChild>
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
                                </div>
                            ))}
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

export default CampaignEmail;
