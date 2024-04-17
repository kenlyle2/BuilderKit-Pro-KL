import Replicate from 'replicate';
import { headers } from 'next/headers';
import { getKeyFromCookie } from './cookieStore';

export async function startGeneration(inputs: TypeGenerationInput): Promise<string> {
  const replicateKey = getKeyFromCookie('replicate');

  const replicate = new Replicate({
    auth: replicateKey || process.env.REPLICATE_API_TOKEN,
  });

  const { prompt, negativePrompt, noOfOutputs, scale, refImage } = inputs;

  const origin = headers().get('origin');

  const prediction = await replicate.predictions.create({
    version: '854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b',
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
    webhook: `${origin}/api/webhooks/replicate`,
    webhook_events_filter: ['completed'],
  });

  console.log(`Generation started with Prediction Id: ${prediction.id}`);

  return prediction.id;
}

export type TypeGenerationInput = {
  prompt: string;
  negativePrompt: string;
  noOfOutputs?: string;
  scale: number;
  refImage: string;
};
