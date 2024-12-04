import { useState } from "react";
import BountyDialog from "./BountyDialog";

const BountiesList = ({
  bounties,
}: {
  bounties: Bounty[];
}) => {
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  return (
    <>
      <BountyDialog
        key={`key-${selectedBounty?.title}`}
        bounty={selectedBounty}
        onClose={() => setSelectedBounty(null)}
      />
      <div className="flex flex-wrap justify-center gap-4 mt-8 break-words">
        {bounties.map((bounty, index) => (
          <BountyItem
            key={index}
            bounty={bounty}
            onBountySelect={setSelectedBounty}
          />
        ))}
      </div>
    </>
  );
};

const BountyItem = ({
  bounty,
  onBountySelect,
}: {
  bounty: Bounty;
  onBountySelect: (bounty: Bounty) => void;
}) => {
  return (
    <div
      className={`flex flex-col justify-center p-5 w-[300px] my-[15px] bg-poidhRed rounded-md border-[1px] ${
        bounty.isGenerating && "animate-pulse"
      }`}
    >
      <span className="text-center mb-4 h-12">{bounty.title}</span>
      <div className="border-2 border-dashed border-white p-4 rounded-xl overflow-auto h-56">
        {bounty.description}
      </div>
      <div className="flex mt-auto w-[100%]">
        <button
          onClick={() => onBountySelect(bounty)}
          className="px-6 py-1 ml-auto  mt-[10px] border-[1px] rounded-md selectButton cursor-pointer"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default BountiesList;
