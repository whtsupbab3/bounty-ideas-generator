import mockBounties from '../../data/mockBounties.json';

export async function sendBounty(bountyIdea: string) {
    const res = await fetch('/api/generateBounty', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bountyIdea }),
    });

    if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
    };

    const generatedBounty: Bounty = JSON.parse(await res.json());
    return generatedBounty;
};

export function generateRandomBounties(bountiesNum: number) {
    const mockBountiesCopy = [...mockBounties];
    console.log(mockBountiesCopy.length)
    const reducedBounties: Bounty[] = [];

    for (let i = 0; i < bountiesNum; i += 18) {
       // const randomIndex = Math.floor(Math.random() * mockBountiesCopy.length);
        reducedBounties.push(mockBountiesCopy[i]);
    }
    return reducedBounties;
};