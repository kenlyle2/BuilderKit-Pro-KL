// This component is used to take input from the user and display the generated designs.

'use client';

import React, { FC, useEffect, useState } from 'react';
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import OutputGeneration from './OutputGeneration';
import { TypeInteriorDesign } from '@/types/types';
import { toast } from '../ui/use-toast';
import { generateDesignFn } from '@/app/generate/actions';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import InputWrapper from '../InputWrapper';
import UploadReferenceImage from './UploadReferenceImage';

type FormInputProps = {
  data: TypeInteriorDesign[];
};

type FormFields = {
  prompt: string;
  'neg-prompt': string;
  'no-of-outputs': string;
  scale: number;
  image: string;
};

const initialData: FormFields = {
  prompt: '',
  'neg-prompt': '',
  'no-of-outputs': '1',
  scale: 10,
  image: '',
};

const FormInput: FC<FormInputProps> = ({ data }) => {
  const supabase = supabaseBrowserClient();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [predictionId, setPredictionId] = useState<string>();
  const [generatedImages, setGeneratedImages] = useState<string[]>();
  const [formData, setFormData] = useState<FormFields>(initialData);

  const router = useRouter();

  // Handles changes in form inputs and updates the state accordingly.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to initiate the design generation process by calling generateDesignFn from server actions.
  const handleGeneration = async (data: FormData) => {
    setIsPending(true);

    const response = await generateDesignFn(data, formData.image);
    // Handle response from the server action function.
    // If the response is a string then it is an error message, otherwise it is the prediction id.
    if (typeof response === 'string') {
      if (response.includes('Free time limit reached')) {
        toast({
          description: 'You have reached the free time limit.',
          variant: 'destructive',
        });
      } else {
        toast({ description: response, variant: 'destructive' });
      }
      setIsPending(false);
    } else {
      setPredictionId(response.id);
    }
  };

  // Relatime Subscribes to database changes to receive updates on design generation status and results.
  useEffect(() => {
    const channel = supabase
      .channel('value-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'interior_designs',
        },
        async (payload) => {
          if (payload.new.prediction_id === predictionId && payload.new.image_urls) {
            setGeneratedImages(payload.new.image_urls);
            setIsPending(false);
            // Refresh the current page to reflect changes.
            router.refresh();
          }
        }
      )
      .subscribe();

    // Clean-up function to unsubscribe from the channel.
    return () => {
      channel.unsubscribe();
    };
  }, [predictionId, supabase, router]);

  return (
    <div className='p-4 xl:p-0 h-auto md:h-auto '>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:border-r border-[#ECECEC] dark:border-[#272626] pr-0 md:pr-10'>
          <div className='mb-6'>
            <p className='text-xl font-bold leading-10'>AI Interior Generator</p>
          </div>

          <form className='md:h-[600px] flex flex-col justify-between'>
            <div className='flex flex-col gap-6 mb-5'>
              <InputWrapper id='prompt' label='Prompt'>
                <Input
                  id='prompt'
                  name='prompt'
                  placeholder='Image Prompt'
                  autoFocus
                  value={formData.prompt}
                  onChange={handleInputChange}
                />
              </InputWrapper>

              <InputWrapper id='neg-prompt' label='Negative Prompt'>
                <Input
                  id='neg-prompt'
                  name='neg-prompt'
                  placeholder='Negative Prompt'
                  value={formData['neg-prompt']}
                  onChange={handleInputChange}
                />
              </InputWrapper>

              <div className='flex flex-col md:flex-row gap-6 md:gap-2'>
                <InputWrapper id='no-of-outputs' label='Number of Outputs' description='(min: 1, max: 4)'>
                  <Input
                    type='number'
                    min={1}
                    max={4}
                    id='no-of-outputs'
                    name='no-of-outputs'
                    value={formData['no-of-outputs']}
                    onChange={handleInputChange}
                  />
                </InputWrapper>
                <InputWrapper id='scale' label='Scale' description='(min: 1, max: 30)'>
                  <Input
                    type='number'
                    min={1}
                    max={30}
                    id='scale'
                    name='scale'
                    value={formData['scale']}
                    onChange={handleInputChange}
                  />
                </InputWrapper>
              </div>

              {/* Uplaod reference image component */}
              <UploadReferenceImage
                image={formData.image}
                onImageChange={(value) => setFormData({ ...formData, image: value })}
              />
            </div>

            <SubmitButton className='w-full rounded-xl' variant='blue' formAction={handleGeneration}>
              Generate
            </SubmitButton>
          </form>
        </div>

        {/* Show results in this output component */}
        <OutputGeneration
          data={data}
          isPending={isPending}
          images={generatedImages}
          onSelectItem={(value) => {
            setGeneratedImages(value.image_urls!);
            setFormData({
              prompt: value.prompt,
              'neg-prompt': value.negative_prompt ?? '',
              'no-of-outputs': value.no_of_outputs,
              scale: value.scale,
              image: value.ref_image,
            });
          }}
        />
      </div>
    </div>
  );
};

export default FormInput;
