'use server';

import { modelRegistry } from '@/lib/model-registry';
import fs from 'fs/promises';
import path from 'path';

export async function getModels() {
  return await modelRegistry.getAllModels();
}

export async function getCurrentModelConfig() {
  const config = modelRegistry.getConfig();
  return config;
}

export async function setModel(modelId: string) {
  // Static config in production, so we only return success to satisfy UI interactions if any.
  // The actual model switching happens via client-side state passed to the API.
  return { success: true };
}
