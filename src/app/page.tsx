'use client';

import BountiesList from '@/components/global/BountiesList';
import GenerateBountyForm from "@/components/global/GenerateBountyForm";
import { useState } from 'react';
import { sendBounty, generateRandomBounties } from '@/utils/helper';
import { toast } from 'react-toastify';

const BOUNTIES_NUM = parseInt(process.env.NEXT_PUBLIC_BOUNTIES_NUM || '3');
const PREGENERATED_BOUNTIES = generateRandomBounties(BOUNTIES_NUM);
const LOADING_BOUNTIES = Array(BOUNTIES_NUM).fill('').map(u => ({
  title: '',
  description: '',
  isGenerating: true,
}));

export default function Home() {
  const [bounties, setBounties] = useState<Bounty[]>(PREGENERATED_BOUNTIES || []);

  const updateBounty = async (bountyIdea: string) => {
    try {
      const generatedBounty: Bounty = await sendBounty(bountyIdea);

      setBounties((prevBounties) => {
        const updatedBounties = [...prevBounties];
        const index = updatedBounties.findIndex((b) => b.isGenerating);
        if (index !== -1) {
          updatedBounties[index] = generatedBounty;
        }
        return updatedBounties;
      });
    } catch (error) {
      console.error('Error generating bounty:', error);
    }
  };

  const handleIdeaSubmit = async (bountyIdea: string) => {
    if (!bountyIdea) {
      toast.error(
        'Please fill in all fields.'
      );
      return;
    }

    setBounties(LOADING_BOUNTIES);

    try {
      for (let i = 0; i < BOUNTIES_NUM; i++) {
        updateBounty(bountyIdea);
      }
    } catch (error) {
      console.error("Failed to generate bounty:", error);
      setBounties((prevBounties) => {
        const updatedBounties = [...prevBounties];
        updatedBounties.pop();
        return [...updatedBounties];
      });
    }
  };

  return (
    <>
      <GenerateBountyForm handleIdeaSubmit={handleIdeaSubmit} />
      <div className='border-dashed border-t-[1px] h-1 border-white mx-4' />
      <BountiesList bounties={bounties} />
    </>
  );
}
