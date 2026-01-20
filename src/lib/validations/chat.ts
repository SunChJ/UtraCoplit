import { z } from 'zod';

export const ChatInputSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
  model: z.string().optional(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ModelConfigSchema = z.object({
  selected: z.string(),
  providers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.enum(['google', 'openai', 'openai-compatible', 'openrouter']),
      baseURL: z.string().optional(),
      api_key_env: z.string(),
      models: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      ),
    })
  ),
});

export type ModelConfig = z.infer<typeof ModelConfigSchema>;
