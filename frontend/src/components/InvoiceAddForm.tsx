import React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {date, z} from 'zod';
import {Checkbox} from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar as CalendarIcon} from 'lucide-react';
import {Calendar} from '@/components/ui/calendar';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib/utils';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/redux/store';
import {Textarea} from '@/components/ui/textarea';
import {addInvoice} from '@/redux/invoices/invoiceSlice';
import {useToast} from '@/components/ui/use-toast';
import {InvoiceCreate} from '@/types/Invoices';
import {format} from 'date-fns';
import {useEffect} from 'react';
import {loadClients} from '@/redux/clients/clientsSlice';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectClients} from '@/redux/clients/clientsSlice';

// This shold match the Invoice type from the backend
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
            // Convert the dates to ISO strings withouth the timezone
            due_date: values.dueDate.toISOString(),
            date_of_issue: values.dateOfIssue.toISOString(),
            amount: values.amount,
            description: values.description,
        };

        console.log(invoice);

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

    const clients = useSelector(selectClients);

    // Load the client list from the store
    useEffect(() => {
        if (clients.length === 0) {
            console.log('loading clients');
            dispatch(loadClients());
        }
    }, [dispatch]);

    const clientOptions = clients.map((client) => ({
        value: client.clientId,
        label: client.clientName,
    }));

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='clientId'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Client Name</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select a client' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {clientOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
