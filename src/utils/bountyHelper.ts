import mockBounties from "../../data/mockBounties.json";

export async function sendBounty(bountyIdea: string) {
  const res = await fetch("/api/generateBounty", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bountyIdea }),
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const generatedBounty: Bounty = JSON.parse(await res.json());
  return generatedBounty;
}

export function getRandomBounties(bountiesNum: number) {
  const mockBountiesCopy = [...mockBounties];
  const reducedBounties: Bounty[] = [];
  let maxIterations = 10;
  while (true) {
    if (reducedBounties.length === bountiesNum || maxIterations === 0) {
      return reducedBounties;
    }

    const randomIndex = Math.floor(Math.random() * mockBountiesCopy.length);
    const mockBounty = mockBountiesCopy[randomIndex];

    maxIterations--;

    if (!reducedBounties.includes(mockBounty)) {
      reducedBounties.push(mockBountiesCopy[randomIndex]);
    }
  }
}
