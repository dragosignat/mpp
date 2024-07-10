import React, {useState, useEffect} from 'react';
import {Badge} from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {ScrollArea} from '@radix-ui/react-scroll-area';
import ReactMarkdown from 'react-markdown';
import {Campaign, DetailedCampaign} from '@/types/Campaign';
import axiosInstance from '@/config/axiosConfig';
import {Separator} from '@/components/ui/separator';
import {format} from 'date-fns';

const CampaignPage = () => {
    const [selectedCampaign, setSelectedCampaign] =
        useState<DetailedCampaign | null>(null);
    const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);

    async function fetchCampaigns() {
        try {
            const response = await axiosInstance.get('/campaigns');
            setCampaigns(response.data);
        } catch (error) {
            console.error('Failed to fetch campaigns', error);
        }
    }

    async function fetchDetailedCampaign(id: string) {
        try {
            const response = await axiosInstance.get(`/campaigns/${id}`);
            const detailedCampaign: DetailedCampaign = response.data;
            setSelectedCampaign(detailedCampaign);
        } catch (error) {
            console.error('Failed to fetch detailed campaign', error);
        }
    }

    // Fetch campaigns from the API
    useEffect(() => {
        fetchCampaigns();
    }, []);

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'PPpp');
    };

    return (
        <>
            <div className='p-5 flex flex-row justify-normal space-x-4 h-full'>
                <Card className='basis-2/3 shadow-lg'>
                    <CardHeader className='px-7 py-4 flex flex-row justify-between bg-gray-100'>
                        <div className='flex flex-col space-y-2'>
                            <CardTitle className='text-lg font-bold text-gray-800'>
                                Campaigns
                            </CardTitle>
                            <CardDescription className='text-sm text-gray-600'>
                                Manage all your sale campaigns here
                            </CardDescription>
                        </div>
                        <Link to='/campaign/analyse/add'>
                            <Button
                                variant='outline'
                                className='text-sm font-medium'
                            >
                                Import a campaign
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className='p-4'>
                        <ScrollArea>
                            <Table className='min-w-full'>
                                <TableHeader className='bg-gray-200'>
                                    <TableRow>
                                        <TableHead className='px-4 py-2 text-left'>
                                            Campaign
                                        </TableHead>
                                        <TableHead className='hidden sm:table-cell px-4 py-2 text-left'>
                                            Status
                                        </TableHead>
                                        <TableHead className='hidden md:table-cell px-4 py-2 text-left'>
                                            Date
                                        </TableHead>
                                        <TableHead className='px-4 py-2 text-right'>
                                            Number of reviews
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaigns.map((campaign) => (
                                        <TableRow
                                            key={campaign.id}
                                            onClick={() =>
                                                fetchDetailedCampaign(
                                                    campaign.id,
                                                )
                                            }
                                            className={`cursor-pointer hover:bg-gray-200 ${selectedCampaign?.id === campaign.id ? 'bg-gray-100' : ''}`}
                                        >
                                            <TableCell className='px-4 py-2'>
                                                <div className='font-medium text-gray-800'>
                                                    {campaign.name}
                                                </div>
                                                <div className='hidden text-sm text-gray-500 md:inline'>
                                                    Last update:{' '}
                                                    {formatDate(
                                                        campaign.updated_at,
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className='hidden sm:table-cell px-4 py-2'>
                                                <Badge
                                                    variant={
                                                        campaign.is_processing
                                                            ? 'secondary'
                                                            : 'outline'
                                                    }
                                                >
                                                    {campaign.is_processing
                                                        ? 'Processing'
                                                        : 'Active'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='hidden md:table-cell px-4 py-2'>
                                                {formatDate(
                                                    campaign.created_at,
                                                )}
                                            </TableCell>
                                            <TableCell className='px-4 py-2 text-right'>
                                                {campaign.review_count}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card className='basis-1/3 shadow-lg'>
                    <CardHeader className='px-7 py-4 bg-gray-100'>
                        <CardTitle className='text-lg font-bold text-gray-800'>
                            {selectedCampaign
                                ? selectedCampaign.name
                                : 'Campaign Details'}
                        </CardTitle>
                        <CardDescription className='text-sm text-gray-600'>
                            {selectedCampaign
                                ? formatDate(selectedCampaign.updated_at)
                                : 'Select a campaign to view details'}
                        </CardDescription>
                    </CardHeader>
                    <Separator className='my-4' />
                    {selectedCampaign && (
                        <CardContent className='p-4'>
                            <div className='flex flex-col space-y-4'>
                                <div className='flex flex-col space-y-4'>
                                    <div className='flex flex-row justify-between'>
                                        <div>
                                            <strong>Overall sentiment:</strong>{' '}
                                            {selectedCampaign.overall_sentiment ===
                                            'pos' ? (
                                                <Badge className='bg-green-400 text-white'>
                                                    Positive
                                                </Badge>
                                            ) : selectedCampaign.overall_sentiment ===
                                              'neg' ? (
                                                <Badge className='bg-red-400 text-white'>
                                                    Negative
                                                </Badge>
                                            ) : (
                                                <Badge className='bg-yellow-400 text-white'>
                                                    Neutral
                                                </Badge>
                                            )}
                                        </div>
                                        <div>
                                            <strong>Review count:</strong>{' '}
                                            {selectedCampaign.review_count}
                                        </div>
                                    </div>
                                    <div className='overflow-x-auto'>
                                        <Table className='min-w-full bg-white border border-gray-200'>
                                            <TableHeader className='bg-gray-100'>
                                                <TableRow>
                                                    <TableCell className='px-4 py-2 font-semibold text-gray-600 border-b'>
                                                        Positive
                                                    </TableCell>
                                                    <TableCell className='px-4 py-2 font-semibold text-gray-600 border-b'>
                                                        Negative
                                                    </TableCell>
                                                    <TableCell className='px-4 py-2 font-semibold text-gray-600 border-b'>
                                                        Neutral
                                                    </TableCell>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className='bg-white'>
                                                    <TableCell className='px-4 py-2 border-b'>
                                                        {
                                                            selectedCampaign.positive
                                                        }
                                                    </TableCell>
                                                    <TableCell className='px-4 py-2 border-b'>
                                                        {
                                                            selectedCampaign.negative
                                                        }
                                                    </TableCell>
                                                    <TableCell className='px-4 py-2 border-b'>
                                                        {
                                                            selectedCampaign.neutral
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <Separator className='my-4' />
                                <div className='rounded-md'>
                                    <strong>Description:</strong>
                                    <ScrollArea>
                                        <ReactMarkdown className='prose'>
                                            {selectedCampaign.description}
                                        </ReactMarkdown>
                                    </ScrollArea>
                                </div>
                            </div>
                        </CardContent>
                    )}
                </Card>
            </div>
        </>
    );
};

export default CampaignPage;
