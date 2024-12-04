"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import GameButton from "@/components/ui/GameButton";

const GenerateBountyForm = ({
  handleIdeaSubmit,
}: {
  handleIdeaSubmit: (bountyIdea: string) => void;
}) => {
  const [bountyIdea, setBountyIdea] = useState<string>("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleIdeaSubmit(bountyIdea);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-items-center m-0 p-8 pt-10 pb-20 gap-16 sm:p-20">
      <h3>bounty ideas generator</h3>
      <div className="flex flex-col justify-center">
        <span>describe your idea</span>
        <input
          type="text"
          value={bountyIdea}
          onChange={(e) => setBountyIdea(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md mb-4"
          maxLength={150}
        />
        <div className="flex flex-row justify-center items-center">
          <div
            className="button"
            onClick={() => {
              handleIdeaSubmit(bountyIdea);
            }}
          >
            <GameButton />
          </div>
          <Button
            onClick={() => {
              handleIdeaSubmit(bountyIdea);
            }}
          >
            generate bounty
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateBountyForm;
