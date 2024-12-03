import BountyItem, { Bounty } from "./BountyItem";

interface BountiesListProps {
    bounties: Bounty[];
    onBountySelect: (bounty: Bounty) => void;
}

const BountiesList = ({ bounties, onBountySelect }: BountiesListProps) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 mt-[4%] break-words">
            {bounties.map((bounty) => (
                <BountyItem bounty={bounty} onBountySelect={onBountySelect}/>
            ))}
        </div>
    );
};


export default BountiesList;