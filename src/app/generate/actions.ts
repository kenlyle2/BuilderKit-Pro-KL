'use server';

import { startGeneration } from '@/utils/replicate';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';

export async function generateImageFn(formData: FormData, imagePreview: string) {
  const supabase = supabaseServerClient();
  const user = await getUserDetails();

  try {
    if (user == null) {
      throw 'Please login to Generate Images.';
    }

    const prompt = formData.get('prompt') as string;
    const negativePrompt = formData.get('neg-prompt') as string;
    const noOfOutputs = formData.get('no-of-outputs') as string;
    const scale = formData.get('scale') as string;

    if (!prompt) {
      throw 'Please enter prompt for the image.';
    }
    if (!imagePreview) {
      throw 'Please upload a reference image.';
    }

    const formatedScale = Number(scale);

    const predictionId = await startGeneration({
      prompt,
      negativePrompt,
      noOfOutputs,
      scale: formatedScale,
      refImage: imagePreview,
    });

    const { error } = await supabase.from('interior_designs').insert({
      user_id: user.id,
      prompt,
      negative_prompt: negativePrompt,
      no_of_outputs: noOfOutputs,
      scale: formatedScale,
      ref_image: imagePreview,
      prediction_id: predictionId,
    });

    if (error) {
      throw error.message;
    }

    return { id: predictionId };
  } catch (error) {
    return `${error}`;
  }
}
