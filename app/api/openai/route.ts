// app/api/openai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPEN_AI, // Ensure this is correctly set
    });

    const reviewInstructions = `
Code Review Instructions:

    Text Review:
        Review and comment on the textual content, structure, and readability.

    Code Snippet Improvement:
        Provide in-depth feedback on specific code sections that require changes or improvements.
        Show code snippets where changes can be made.

    Final Verdict:
        Conclude with either "Needs review!" if there are significant changes or additions required.
        Or "Looks good to me!" if only minor adjustments are necessary but there are no major errors.
`;

    // Simplified request
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini-2024-07-18', // Use a model that balances performance and accuracy
      messages: [
        { role: 'user', content:reviewInstructions} ,
        
        { role: 'user', content: message },
      ],
    });

    const result = completion.choices[0].message.content;
    
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error in API route:', error);
    return new NextResponse('Failed to fetch AI review', { status: 500 });
  }
}
