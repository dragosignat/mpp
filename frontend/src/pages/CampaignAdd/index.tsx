import CampaignAddForm from '@/components/CampaignForm';
import React from 'react';

function CampaignAdd() {
    return (
        <>
            <div className=' p-5 flex flex-col'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl font-bold'>
                        Create a new campaign
                    </h1>
                </div>
                <CampaignAddForm />
            </div>
        </>
    );
}

export default CampaignAdd;
