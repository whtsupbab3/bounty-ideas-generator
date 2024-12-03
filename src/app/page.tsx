"use client";

import BountiesList from "@/components/global/BountiesList";
import BountyDialog from "@/components/global/BountyDialog";
import { Bounty } from "@/components/global/BountyItem";
import GenerateBountyForm from "@/components/global/GenerateBountyForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedBounty, setSelectedBounty] = useState<Bounty>();
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [bounties, setBounties] = useState<Bounty[]>([]);
  
  const handleIdeaSubmit = async (bountyIdea: string) => {
    const res = await fetch('/api/generateBounty', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bountyIdea }),
    });

    if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    const generatedBounty: Bounty = JSON.parse(data.choices[0].message.content);
    setBounties((bs) => [...bs, generatedBounty]);
    console.log(generatedBounty)
  };

  const handleBountySelect = (selectedBounty: Bounty) => {
    setDialogIsOpen(true);
    setSelectedBounty(selectedBounty);
    console.log(selectedBounty)
  };

  const handleCloseBountyDialog = () => {
    setSelectedBounty(undefined);
    setDialogIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-items-center m-0 p-8 pt-0 pb-20 gap-16 sm:p-20">
        <h3 className="mt-[10%]">bounty ideas generator</h3>
        <GenerateBountyForm handleIdeaSubmit={handleIdeaSubmit}/>
      </div>
      <div className="border-dashed border-t-[1px] h-1 border-white mx-4"/>
      {bounties.length !== 0 &&
        <BountiesList bounties={bounties} onBountySelect={handleBountySelect} />
      }
      <BountyDialog isOpen={dialogIsOpen} selectedBounty={selectedBounty} handleClose={handleCloseBountyDialog} />
    </>
  );
}

