import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
// @ts-ignore
import config from '../../opencode.json';

export interface ModelConfig {
  id: string;
  name: string;
}

export interface ProviderConfig {
  id: string;
  name: string;
  type: 'google' | 'openai' | 'openai-compatible' | 'openrouter';
  baseURL?: string;
  api_key_env: string;
  models: ModelConfig[];
}

export interface OpenCodeConfig {
  selected: string;
  providers: ProviderConfig[];
}

export class ModelRegistry {
  private config: OpenCodeConfig = config as OpenCodeConfig;

  async getModel(modelId: string) {
    // Find model ID match across all providers to get the provider
    for (const provider of this.config.providers) {
      if (provider.models.find(m => m.id === modelId)) {
        return this.createProviderInstance(provider, modelId);
      }
    }
    
    throw new Error(`Model ${modelId} not found in configuration`);
  }

  // Fallback to default selected if no ID provided (legacy support)
  async getSelectedModel() {
     return this.getModel(this.config.selected);
  }

  private createProviderInstance(provider: ProviderConfig, modelId: string) {
    const apiKey = process.env[provider.api_key_env];
    if (!apiKey) {
      throw new Error(`Missing API key for environment variable: ${provider.api_key_env}`);
    }

    switch (provider.type) {
      case 'google':
        const google = createGoogleGenerativeAI({ apiKey });
        return google(modelId);
      
      case 'openai':
        const openai = createOpenAI({ apiKey });
        return openai(modelId);
        
      case 'openai-compatible':
        // For compatible APIs (like SiliconFlow, Together, Groq, local, etc.)
        const compatible = createOpenAI({ 
          apiKey,
          baseURL: provider.baseURL
        });
        return compatible(modelId);

      case 'openrouter':
        const openrouter = createOpenAI({
          apiKey,
          baseURL: 'https://openrouter.ai/api/v1',
        });
        return openrouter(modelId);
        
      default:
        throw new Error(`Unsupported provider type: ${provider.type}`);
    }
  }

  async getAllModels() {
    return this.config.providers.flatMap(p => 
      p.models.map(m => ({
        ...m,
        providerId: p.id,
        providerName: p.name
      }))
    );
  }

  getConfig() {
    return this.config;
  }
}

export const modelRegistry = new ModelRegistry();
