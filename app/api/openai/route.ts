// app/api/openai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Initialize the rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 3, // Number of points
  duration: 15 * 60, // Duration in seconds (15 minutes)
});

// Helper function to handle rate limiting
async function applyRateLimit(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous'; // Get IP from headers
  try {
    await rateLimiter.consume(ip);
  } catch (err) {
    throw new Error('Too many requests, please try again later.');
  }
}

export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting before processing the request
    await applyRateLimit(req);

    const { message } = await req.json();

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI, // Ensure this is correctly set
    });

    const reviewInstructions = `
Code Review Instructions:

    Every category name should be bold and dark to stand out in plain text more.

    Text Review:
        Review and comment on the textual content, structure, and readability.

    Code Snippet Improvement:
        Provide in-depth feedback on specific code sections that require changes or improvements.
        Show code snippets where changes can be made.

    **Final Verdict (Only choose one of the two and explain why, but don't use my listed parameters.)**:
    - **Looks good to me!** 
        - The code should be considered valid if:   
        - There are no return errors.
        - There are no major typos or critical issues.
        - Error handling can be suggested, but its absence will not be the reason for flagging it as "Needs review!" unless it leads to major functional issues.

    - **Needs review!** 
        - The code requires further review if:
        - There are typos or incorrect return or variable types.
        - Major errors are present that affect functionality or correctness.
        - Issues that impact the proper execution of the code or lead to significant errors must be addressed, but be lenient on error handling and input validation.
               
    USER BLOCKERS:
        If asked with anything besides a coding question, please respond with "The question {user question} is not a code review or coding question", if a secondary non programming question doesn't exist, don't include user blockers.
        If there is a code snippet and a random question, answer the code snippet but add the USER BLOCKERS in bold addressing that the 
        *args questions isn't/aren't programming related.
        Always answer the code snippet first, and add the user blockers at the end of the text.
        
`;

    // Send request to OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini-2024-07-18',
      messages: [
        { role: 'user', content: reviewInstructions },
        { role: 'user', content: message },
      ],
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error in API route:', error);
    return new NextResponse('Too many requests, please try again later', { status: 500 });
  }
}
