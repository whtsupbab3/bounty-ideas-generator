export async function POST(req: Request) {
    const { bountyIdea } = await req.json()

    const message = `This is the bounty idea: ${bountyIdea}.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo', 
                messages: [
                    {
                      "role": "system",
                      "content": "You are a helpful assistant. The user provides you with the bounty idea. You should always return in JSON, providing this: { 'title': '...', 'description': '...' }. You should return the title and description for the provided idea of the bounty. If the input is not clear or nonsence, you should invent your own funny bounty idea for one person to do(Should be not too difficult, like 'Bake pink cookies and take a photo of them.'). Description's max length is 300 symbols, title's max length is 50 symbols."
                    },
                    {
                      "role": "user",
                      "content": message
                    }
                  ],
                max_tokens: 100, 
                temperature: 1, 
                response_format: { "type": "json_object" },
            }),
        });

        if (!response.ok) {
            console.log('Error in response from OpenAI API.')
        }

        const data = await response.json();
        return Response.json(data.choices[0].message.content);
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        return Response.error();
    }  
}

