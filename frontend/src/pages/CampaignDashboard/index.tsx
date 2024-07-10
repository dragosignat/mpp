import React from 'react';
import {Separator} from '@/components/ui/separator';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import EmailCampaignSVG from '@/assets/EmailCampaign';
import PhoneCampaignSVG from '@/assets/PhoneCampaignSVG';
import {useQuery} from '@tanstack/react-query';
import axiosInstance from '@/config/axiosConfig';
import {SalesCampaign} from '@/types/Campaign';

function CampaignDashboard() {
    const {
        status,
        data: campaigns,
        error,
    } = useQuery({
        queryKey: ['campaigns-titles'],
        queryFn: () =>
            axiosInstance.get('/campaigns/sales').then((res) => res.data),
    });

    return (
        <>
            <div className=' flex-1 '>
                <div className='flex flex-col items-center justify-center h-full my-4 '>
                    <h1 className='text-4xl font-bold text-gray-800'>
                        One{' '}
                        <span
                            className=' bg-gradient-to-tr from-blue-500 via-purple-500 to-green-400 text-transparent bg-clip-text 
                            transition duration-0 ease-in-out hover:duration-500 hover:from-pink-500 hover:via-red-500 hover:to-yellow-500'
                        >
                            campaing
                        </span>
                        , many{' '}
                        <span className=' italic underline font-sans text-2lg '>
                            possibilities
                        </span>
                        .
                    </h1>
                </div>
                <div className='flex flex-row'>
                    <div className='basis-2/3 m-4 space-y-4 flex flex-col'>
                        <div className='basis-2/3 bg-white rounded-lg shadow-lg justify-center items-center flex flex-col p-4 space-y-4'>
                            <div>
                                <h3 className='text-2xl font-bold'>
                                    Create a new campaign
                                </h3>
                            </div>
                            <Separator className='my-2' />
                            <div className='flex space-x-2 items-center justify-evenly w-full'>
                                <div>
                                    <Link to='/campaign/email'>
                                        <Button variant='outline'>
                                            Email campaign
                                        </Button>
                                    </Link>
                                    <div>
                                        <EmailCampaignSVG className='w-40 h-40' />
                                    </div>
                                </div>
                                <Separator orientation='vertical' />
                                <div className='mx-auto'>
                                    <Link to='/campaign/phone'>
                                        <Button variant='outline'>
                                            Phone campaign
                                        </Button>
                                    </Link>
                                    <div>
                                        <PhoneCampaignSVG className='w-40 h-40' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='basis-1/3'></div>
                    </div>
                    <div className='basis-1/3 m-4 space-y-4 bg-white rounded-lg shadow-lg flex flex-col items-center p-4'>
                        <div>
                            <h3 className='text-2xl font-bold'>
                                Past campaigns
                            </h3>
                        </div>
                        <Separator className='my-2' />
                        <Link to='/campaign/analyse'>
                            <Button variant='outline' className='w-full'>
                                Analyse results
                            </Button>
                        </Link>
                        {status === 'pending' ? (
                            <div>Loading...</div>
                        ) : status === 'error' ? (
                            <div>Error: {error.message}</div>
                        ) : null}
                        <ul className='space-y-2'>
                            {campaigns?.map((campaign: SalesCampaign) => (
                                <li key={campaign.id}>{campaign.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CampaignDashboard;
