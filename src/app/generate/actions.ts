'use server';

import { startGeneration } from '@/utils/replicate';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';

// This server function handles the generation of images based on user input.
// It validates user login, checks the provided form data, and starts the image generation process.
export async function generateDesignFn(formData: FormData, imagePreview: string) {
  const supabase = supabaseServerClient();
  const user = await getUserDetails();

  try {
    if (user == null) {
      throw 'Please login to Generate Designs.';
    }

    const prompt = formData.get('prompt') as string;
    const negativePrompt = formData.get('neg-prompt') as string;
    const noOfOutputs = formData.get('no-of-outputs') as string;
    const scale = formData.get('scale') as string;

    if (!prompt) {
      throw 'Please enter prompt for the design.';
    }
    if (!imagePreview) {
      throw 'Please upload a reference design.';
    }

    const formatedScale = Number(scale);

    // Calls the replicate function to start the generation process with the provided deisgn inputs.
    const predictionId = await startGeneration({
      prompt,
      negativePrompt,
      noOfOutputs,
      scale: formatedScale,
      refImage: imagePreview,
    });

    // Store the image details in the database with the prediction id received from Replicate Api.
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
