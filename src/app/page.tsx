"use client";

import BountiesList from "@/components/global/BountiesList";
import GenerateBountyForm from "@/components/global/GenerateBountyForm";
import { useState } from "react";
import { sendBounty } from "@/utils/bountyHelper";
import { toast } from "react-toastify";

const BOUNTIES_NUM = parseInt(process.env.NEXT_PUBLIC_BOUNTIES_NUM || "3");
const LOADING_BOUNTIES = Array.from({length: BOUNTIES_NUM}).map(() => ({
    title: "",
    description: "",
    isGenerating: true,
  }));

export default function Home() {
  const [bounties, setBounties] = useState<Bounty[]>([]);

  const updateBounty = (index: number, bountyIdea: string) => {
    sendBounty(bountyIdea)
      .then((generatedBounty: Bounty) => {
        setBounties((prevBounties) => {
          const updatedBounties = [...prevBounties];
          updatedBounties[index] = generatedBounty;
          return updatedBounties;
        });
      })
      .catch((error) => {
        console.error("Error generating bounty:", error);
        setBounties((prevBounties) => {
          const updatedBounties = [...prevBounties];
          updatedBounties[index] = {
            title: "Error",
            description: "Failed to generate bounty.",
            isGenerating: false,
          };
          return updatedBounties;
        });
      });
  };

  const handleIdeaSubmit = (bountyIdea: string) => {
    if (!bountyIdea) {
      toast.error("Please fill in all fields.");
      return;
    }

    setBounties(LOADING_BOUNTIES);
    for (let i = 0; i < BOUNTIES_NUM; i++) {
      updateBounty(i, bountyIdea);
    }
  };

  return (
    <>
      <GenerateBountyForm handleIdeaSubmit={handleIdeaSubmit} />
      <div className="border-dashed border-t-[1px] h-1 border-white mx-4" />
      <BountiesList bounties={bounties} />
    </>
  );
}
