import React from 'react';

export interface Bounty {
    id: Number;
    title: string;
    description: string;
};

interface BountyProps {
    bounty: Bounty;
    onBountySelect: (bounty: Bounty) => void;
};

const BountyItem = ({ bounty, onBountySelect }: BountyProps) => {
    return (
        <div className='flex flex-col justify-center p-5 w-[300px] my-[15px] bg-poidhRed rounded-md border-[1px]'>
            <span className='text-center mb-4 h-12'>{bounty.title}</span>
            <div 
                className='border-2 border-dashed border-white p-4 rounded-xl overflow-auto h-56'>
                {bounty.description}
            </div>
            <div className='flex mt-auto w-[100%]' >
                <button onClick={() => onBountySelect(bounty)} className='px-6 py-1 ml-auto  mt-[10px] border-[1px] rounded-md selectButton cursor-pointer'>Select</button>
            </div>
        </div>
    );
}

export default BountyItem;