'use client';
import React, { FC, useEffect, useState } from 'react';
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import OutputGeneration from './OutputGeneration';
import { TypeInteriorDesignGeneration } from '../../../types/utils';
import { toast } from '../ui/use-toast';
import { generateImageFn } from '@/app/(main)/generate/actions';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import InputWrapper from '../InputWrapper';
import { cn } from '@/utils/utils';
import Image from 'next/image';

type FormInputProps = {
  data: TypeInteriorDesignGeneration[];
};

type FormFields = {
  prompt: string;
  'neg-prompt': string;
  'no-of-outputs': string;
  scale: number;
  ref_image: string;
};

const initialData: FormFields = {
  prompt: '',
  'neg-prompt': '',
  'no-of-outputs': '1',
  scale: 10,
  ref_image: '',
};

const FormInput: FC<FormInputProps> = ({ data }) => {
  const supabase = supabaseBrowserClient();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [predictionId, setPredictionId] = useState<string>();
  const [generation, setGeneration] = React.useState<TypeInteriorDesignGeneration>();
  const [formData, setFormData] = useState<FormFields>(initialData);
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGeneration = async (data: FormData) => {
    setIsPending(true);

    const response = await generateImageFn(data, image!);
    if (typeof response == 'string') {
      toast({ description: response, variant: 'destructive' });
      setIsPending(false);
    } else {
      setPredictionId(response.id);
    }
  };

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
            setGeneration(payload.new as TypeInteriorDesignGeneration);
            setIsPending(false);
            router.refresh();
          }
        }
      )
      .subscribe();

    return async () => {
      await supabase.removeChannel(channel);
    };
  }, [predictionId, supabase, router]);

  //Convert to base64 url for image
  const onDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const base64 = reader.result as string;
      setImage(base64);
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['image/jpeg', 'image/png', 'image/gif'] },
    multiple: false,
    onDrop,
    minSize: 0,
    maxSize: 5242880, // 5MB
  });

  return (
    <div className='p-5 xl:p-0 h-auto md:h-auto '>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:border-r pr-0 md:pr-10'>
          <div className='mb-6'>
            <p className='text-[#27262B] text-xl font-bold leading-10'>AI Image Generation</p>
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
              <InputWrapper label='Image'>
                <div
                  {...getRootProps()}
                  className={cn(
                    'border-2 border-dashed border-gray-300 rounded-lg p-1 text-center cursor-pointer  ',
                    image ? 'max-w-max h-64' : 'py-10'
                  )}>
                  <Input {...getInputProps()} />
                  {image ? (
                    <Image
                      src={image}
                      alt='Dropped Image'
                      height={256}
                      width={256}
                      className='w-auto flex justify-center h-full rounded-sm'
                    />
                  ) : (
                    <p className='flex items-center justify-center h-full'>
                      Drag 'n' drop an image here, or click to select an image
                    </p>
                  )}
                </div>
              </InputWrapper>
            </div>

            <SubmitButton disabled={isPending} className='w-full' formAction={handleGeneration}>
              Generate
            </SubmitButton>
          </form>
        </div>

        <OutputGeneration
          data={data}
          isPending={isPending}
          generation={generation}
          setImage={setImage}
          onSelectItem={(value) => {
            setGeneration(value);
            setFormData({
              prompt: value.prompt,
              'neg-prompt': value.negative_prompt ?? '',
              'no-of-outputs': value.no_of_outputs,
              scale: value.scale,
              ref_image: value.ref_image,
            });
          }}
        />
      </div>
    </div>
  );
};

export default FormInput;
