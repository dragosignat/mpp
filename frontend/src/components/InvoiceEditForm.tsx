import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {date, z} from 'zod';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@/redux/store';
import {useNavigate} from 'react-router-dom';
import {selectInvoices, updateInvoice} from '@/redux/invoices/invoiceSlice';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Textarea} from '@/components/ui/textarea';
import {Calendar as CalendarIcon, ChevronsUpDown} from 'lucide-react';
import {Calendar} from '@/components/ui/calendar';
import {format} from 'date-fns';
import {cn} from '@/lib/utils';
import {InvoiceUpdate} from '@/types/Invoices';
import {useEffect, useState} from 'react';
import {ClientSearch} from '@/components/SearchClientCombobox';

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
    isPaid: z.boolean(),
});

function InvoiceEditForm({invoiceId}: {invoiceId: string | number}) {
    const dispatch = useDispatch<AppDispatch>();
    const invoices = useSelector(selectInvoices);
    const invoice = invoices.find((i) => i.id === invoiceId);
    const navigate = useNavigate();
    const {toast} = useToast();

    if (!invoice) {
        navigate('/invoices');
        return null;
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientId: invoice?.client_id,
            dueDate: new Date(invoice?.due_date),
            dateOfIssue: new Date(invoice?.date_of_issue),
            amount: invoice?.amount,
            description: invoice?.description,
            isPaid: invoice?.is_paid,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const invoice: InvoiceUpdate = {
            id: invoiceId as string,
            client_id: values.clientId,
            amount: values.amount,
            date_of_issue: values.dateOfIssue.toISOString(),
            due_date: values.dueDate.toISOString(),
            description: values.description,
            is_paid: values.isPaid,
        };

        console.log(invoice);

        dispatch(updateInvoice(invoice))
            .unwrap()
            .then(() => {
                toast({title: 'Invoice edited successfully'});
                navigate('/invoices');
            })
            .catch((error) => {
                toast({
                    title: 'Error editing invoice',
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
                <FormField
                    control={form.control}
                    name='isPaid'
                    render={({field}) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
                            <FormLabel htmlFor='isPaid'>
                                Is the invoice paid?
                            </FormLabel>
                            <FormControl>
                                <Checkbox
                                    id='isPaid'
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

export default InvoiceEditForm;
