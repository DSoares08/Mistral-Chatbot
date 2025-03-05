import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: mistral('mistral-large-latest'),
    system: 'You are a helpful assistant',
    messages,
  })

  return result.toDataStreamResponse();
}
