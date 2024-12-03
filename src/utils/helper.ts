export default async function sendBounty(bountyIdea: string) {
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

    const data = await res.json();
    return res.json();
};