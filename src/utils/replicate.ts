// This function takes the payload and starts the generation process on Replicate.
// It passes the webhook url to Replicate to receive updates on the generation status/result.

import Replicate from 'replicate';
import { headers } from 'next/headers';

// Initialize Replicate with the API token.
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function startGeneration(inputs: TypeGenerationInput): Promise<string> {
  const { prompt, negativePrompt, noOfOutputs, scale, refImage } = inputs;

  const origin = headers().get('origin');

  const prediction = await replicate.predictions.create({
    // Model version to use for the generation process. You can visit the model's URL on Replicate from the URL below and play around with the model.
    // This is the model url from replicate - https://replicate.com/jagilley/controlnet-hough
    version: '854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b',
    // Input parameters (payload) for the generation process.
    input: {
      eta: 0,
      image: refImage,
      scale,
      prompt: prompt,
      a_prompt: 'best quality, extremely detailed',
      n_prompt: negativePrompt ?? '',
      ddim_steps: 20,
      num_samples: noOfOutputs ?? 1,
      value_threshold: 0.1,
      image_resolution: '512',
      detect_resolution: 512,
      distance_threshold: 0.1,
    },
    // Webhook url where Replicate will send updates on the generation status/result.
    webhook: `${origin}/api/webhooks/replicate`,
    // Filter for the webhook events to receive updates only for the 'completed' event.
    webhook_events_filter: ['completed'],
  });

  console.log(`Generation started with Prediction Id: ${prediction.id}`);

  return prediction.id;
}

// Type definition for the input parameters required for the generation process.
export type TypeGenerationInput = {
  prompt: string;
  negativePrompt: string;
  noOfOutputs?: string;
  scale: number;
  refImage: string;
};
