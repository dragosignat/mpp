import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {LeadCreate} from '@/types/Leads';
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
import {useNavigate} from 'react-router-dom';
import axiosInstance from '@/config/axiosConfig';
import {useQuery} from '@tanstack/react-query';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Company} from '@/types/Companies';

const formSchema = z.object({
    first_name: z.string().min(1, {
        message: 'First name is required.',
    }),
    last_name: z.string().min(1, {
        message: 'Last name is required.',
    }),
    email: z.string().email({
        message: 'Email must be a valid email.',
    }),
    source: z.string().min(1, {
        message: 'Source is required.',
    }),
    phone: z.string().optional(),
    company_id: z.string().optional(),
    position: z.string().optional(),
    notes: z.string().optional(),
    preferred_contact_method: z.string().optional(),
    social_links: z.object({
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
        facebook: z.string().optional(),
    }),
    birthday: z.string().optional(),
});

function LeadAddForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            company_id: '',
            position: '',
            notes: '',
            preferred_contact_method: '',
            source: '',
            social_links: {
                linkedin: '',
                twitter: '',
                facebook: '',
            },
            birthday: '',
        },
    });

    const navigate = useNavigate();
    const {toast} = useToast();

    const {status: companyStatus, data: companyData} = useQuery({
        queryKey: ['companies'],
        queryFn: () => axiosInstance.get('/companies').then((res) => res.data),
    });

    // 2. Define a submit handler.
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Form the lead object
        const lead: LeadCreate = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            company_id: parseInt(values.company_id || '0'),
            position: values.position,
            notes: values.notes,
            preferred_contact_method: values.preferred_contact_method,
            source: values.source,
            social_links: values.social_links,
            birthday: values.birthday,
        };

        axiosInstance
            .post('/leads', lead)
            .then(() => {
                // Display a success message
                toast({
                    title: 'Lead added',
                });

                // Navigate back to the leads list
                navigate('/leads');
            })
            .catch((error) => {
                // Display an error message
                toast({
                    title: 'Error adding lead',
                    description: error.message,
                });
            });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 my-2 bg-white rounded-lg shadow-lg sh p-2'
            >
                <FormField
                    control={form.control}
                    name='first_name'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder='John' {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the first name of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='last_name'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Doe' {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the last name of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
                                    placeholder='john.doe@company.com'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the email of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='source'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Source</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Source of the lead'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                The source of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='phone'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='(123) 456-7890'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the phone number of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='company_id'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Controller
                                    control={form.control}
                                    name='company_id'
                                    render={({field}) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value?.toString()}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select a company to associate with' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {companyStatus === 'pending' ? (
                                                    <SelectItem value='0'>
                                                        Loading...
                                                    </SelectItem>
                                                ) : companyStatus ===
                                                  'error' ? (
                                                    <SelectItem value='0'>
                                                        Error fetching data
                                                    </SelectItem>
                                                ) : (
                                                    companyData?.map(
                                                        (company: Company) => (
                                                            <SelectItem
                                                                key={company.id}
                                                                value={company.id.toString()}
                                                            >
                                                                {company.name}
                                                            </SelectItem>
                                                        ),
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the company ID associated with the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='position'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <Input placeholder='Sales Manager' {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the position of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='notes'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Notes about the lead'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Any additional notes about the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='preferred_contact_method'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Preferred Contact Method</FormLabel>
                            <FormControl>
                                <Input placeholder='Email/Phone' {...field} />
                            </FormControl>
                            <FormDescription>
                                The preferred contact method of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='social_links.linkedin'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='LinkedIn profile URL'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                LinkedIn profile link of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='social_links.twitter'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Twitter profile URL'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Twitter profile link of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='social_links.facebook'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Facebook profile URL'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Facebook profile link of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='birthday'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Birthday</FormLabel>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormDescription>
                                Birthday of the lead.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
}

export default LeadAddForm;
