'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import GameButton from '@/components/ui/GameButton';

interface GenerateBountyFormProps {
    handleIdeaSubmit: (idea: string) => void;
};

const GenerateBountyForm = ({ handleIdeaSubmit }: GenerateBountyFormProps) => {
    const [bountyIdea, setBountyIdea] = useState<string>('');

    return (
        <div className='flex flex-col justify-center'>
            <span>describe your idea</span>
            <input
              type='text'
              value={bountyIdea}
              onChange={(e) => setBountyIdea(e.target.value)}
              className='border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md mb-4'
              maxLength={150}
            />
            <div className='flex flex-row justify-center items-center'>
                <div className='button' onClick={() => { handleIdeaSubmit(bountyIdea); }}>
                    <GameButton />
                </div>
                <Button onClick={() => { handleIdeaSubmit(bountyIdea); }}>generate bounty</Button>
            </div>
        </div>
    );
}

export default GenerateBountyForm;