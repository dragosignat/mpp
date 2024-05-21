import React, {useEffect, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {date, z} from 'zod';
import {Check, ChevronsUpDown, Calendar as CalendarIcon} from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar} from '@/components/ui/calendar';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib/utils';
import {Textarea} from '@/components/ui/textarea';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/redux/store';
import {addInvoice} from '@/redux/invoices/invoiceSlice';
import {useToast} from '@/components/ui/use-toast';
import {InvoiceCreate} from '@/types/Invoices';
import {format} from 'date-fns';
import {useNavigate} from 'react-router-dom';
import {API_URL} from '@/config/apiConfig';
import {ClientSearch} from '@/components/SearchClientCombobox';

// This should match the Invoice type from the backend
const formSchema = z.object({
    clientId: z.string().uuid({
        message: 'Please select a client.',
    }),
    dueDate: date(),
    dateOfIssue: date(),
    amount: z.coerce.number().min(0, {
        message: 'Amount must be at least 0.',
    }),
    description: z.string(),
});

function InvoiceAddForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientId: '',
            dueDate: new Date(),
            dateOfIssue: new Date(),
            amount: 0,
            description: '',
        },
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {toast} = useToast();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const invoice: InvoiceCreate = {
            client_id: values.clientId,
            // Convert the dates to ISO strings without the timezone
            due_date: values.dueDate.toISOString(),
            date_of_issue: values.dateOfIssue.toISOString(),
            amount: values.amount,
            description: values.description,
        };

        dispatch(addInvoice(invoice))
            .unwrap()
            .then(() => {
                toast({title: 'Invoice added successfully'});
                navigate('/invoices');
            })
            .catch((error) => {
                toast({
                    title: 'Error adding invoice',
                    description: error.message,
                    variant: 'destructive',
                });
            });
    };

    interface Client {
        id: string;
        name: string;
    }
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    useEffect(() => {
        if (selectedClient) {
            form.setValue('clientId', selectedClient.id);
        }
    }, [selectedClient, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='clientId'
                    render={({field}) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Client Name</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            className={cn(
                                                'w-[200px] justify-between',
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            {selectedClient?.name ||
                                                'Search for a client'}
                                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='w-[200px] p-0'>
                                    <ClientSearch
                                        selectedResult={selectedClient}
                                        onSelectResult={setSelectedClient}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='dateOfIssue'
                    render={({field}) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Date of issue</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[240px] pl-3 text-left font-normal',
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className='w-auto p-0'
                                    align='start'
                                >
                                    <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='dueDate'
                    render={({field}) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Due date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[240px] pl-3 text-left font-normal',
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className='w-auto p-0'
                                    align='start'
                                >
                                    <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='amount'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Add a description of the invoice'
                                    className='resize-none'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
}

export default InvoiceAddForm;
