import React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Checkbox} from '@/components/ui/checkbox';

import {Client} from '@/types/Client';

import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@/redux/store';
import {selectClients, updateClient} from '@/redux/clients/clientsSlice';
import {useNavigate} from 'react-router-dom';

const formSchema = z.object({
    clientName: z.string().min(2, {
        message: 'Client name must be at least 2 characters.',
    }),
    clientAddress: z.string().min(2, {
        message: 'Client address must be at least 2 characters.',
    }),
    clientPhone: z
        .string()
        .min(10, {
            message: 'Client phone must be at least 10 characters.',
        })
        .max(30, {
            message: 'Client phone must be at most 30 characters.',
        }),
    clientEmail: z.string().email({
        message: 'Client email must be a valid email.',
    }),
    clientTotalPurchases: z.coerce.number().min(0, {
        message: 'Client total purchases must be at least 0.',
    }),
    clientIsBusiness: z.boolean(),
});

function ClientEditForm({clientId}: {clientId: string | number}) {
    // Load the client data from the server
    const dispatch = useDispatch<AppDispatch>();
    const clients = useSelector(selectClients);
    const client = clients.find((c) => c.clientId === clientId);
    const navigate = useNavigate();
    const {toast} = useToast();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // Load the client data into the form
            clientName: client?.clientName,
            clientAddress: client?.clientAddress,
            clientPhone: client?.clientPhone,
            clientEmail: client?.clientEmail,
            clientTotalPurchases: client?.clientTotalPurchases,
            clientIsBusiness: client?.clientIsBusiness,
        },
    });

    // 2. Define a submit handler.
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Form the client object
        const client: Client = {
            clientId: clientId.toString(),
            clientName: values.clientName,
            clientAddress: values.clientAddress,
            clientPhone: values.clientPhone,
            clientEmail: values.clientEmail,
            clientTotalPurchases: values.clientTotalPurchases,
            clientIsBusiness: values.clientIsBusiness,
        };

        // Dispatch the action to add the client to the store
        dispatch(updateClient(client));
        // Display a success message
        toast({
            title: 'Client updated',
        });

        // Navigate back to the client list
        navigate('/clients');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='clientName'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Client name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='GigaTech Cloud'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This the name of the associated client.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='clientAddress'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Client address</FormLabel>
                            <FormControl>
                                <Input placeholder='123 Main St' {...field} />
                            </FormControl>
                            <FormDescription>
                                This the address of the associated client.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='clientPhone'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Client phone</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='(123) 456-7890'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This the phone of the associated client.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='clientEmail'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Client email</FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
                                    placeholder='john.doe@acme.com'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This the email of the associated client.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='clientTotalPurchases'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Client total purchases</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This the total purchases of the associated
                                client.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='clientIsBusiness'
                    render={({field}) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
                            <FormLabel htmlFor='clientIsBusiness'>
                                Is the client a business?
                            </FormLabel>
                            <FormControl>
                                <Checkbox
                                    id='clientIsBusiness'
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
}

export default ClientEditForm;
