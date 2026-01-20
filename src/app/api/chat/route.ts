import { streamText } from 'ai';
import { modelRegistry } from '@/lib/model-registry';
import { ChatInputSchema } from '@/lib/validations/chat';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const json = await req.json();
  const { messages, model: modelId } = ChatInputSchema.parse(json);

  try {
    const model = modelId 
      ? await modelRegistry.getModel(modelId)
      : await modelRegistry.getSelectedModel();
    
    const result = streamText({
      model,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: 'Error processing request', details: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
