import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

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
import axiosInstance from '@/config/axiosConfig';

import {useNavigate} from 'react-router-dom';
import {Textarea} from './ui/textarea';

const formSchema = z.object({
    campaignName: z.string().min(2, {
        message: 'Campaign name must be at least 2 characters.',
    }),
    campaignDescription: z.string().min(10, {
        message: 'Campaign description must be at least 10 characters.',
    }),
    file: z.any(),
});

function CampaignAddForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            campaignName: '',
            campaignDescription: '',
            file: null,
        },
    });

    const navigate = useNavigate();
    const {toast} = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();

        formData.append('name', values.campaignName);
        formData.append('description', values.campaignDescription);
        formData.append('file', values.file[0]);

        console.log(values.file[0]);

        try {
            await axiosInstance.post('/campaigns', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast({
                title: 'Campaign added',
            });

            navigate('/campaign');
        } catch (error: any) {
            toast({
                title: 'Error adding campaign',
                description: error.message,
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 my-2 bg-white rounded-lg shadow-lg p-4'
            >
                <FormField
                    control={form.control}
                    name='campaignName'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Campaign name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='New Marketing Campaign'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the name of the campaign.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='campaignDescription'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Campaign description</FormLabel>
                            <FormControl>
                                {/* <Input
                                    type='textarea'
                                    placeholder='Describe the campaign details here'
                                    {...field}
                                /> */}
                                <Textarea
                                    placeholder='Describe the campaign details here'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the description of the campaign.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='file'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Upload CSV file</FormLabel>
                            <FormControl>
                                <Input
                                    type='file'
                                    accept='.csv'
                                    onChange={(e) => {
                                        field.onChange(e.target.files);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Upload the CSV file containing campaign reviews.
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

export default CampaignAddForm;
