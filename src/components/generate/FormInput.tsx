// This component is used to take input from the user and display the generated designs.

'use client';

import React, { FC, useEffect, useState } from 'react';
import { TypeInteriorDesign } from '@/types/types';
import { toast } from '../ui/use-toast';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import InputWrapper from '../InputWrapper';
import UploadReferenceImage from './UploadReferenceImage';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import OutputStylesModal, { RoomTypes } from './OutputStylesModal';
import OutputGeneration from './OutputGeneration';
import { generateDesignFn } from '@/app/(dashboard)/generate/actions';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { cn } from '@/utils/utils';
import { Button } from '../ui/button';
import { BarLoader } from 'react-spinners';

type FormInputProps = {
  data?: TypeInteriorDesign;
};

type FormFields = {
  prompt: string;
  image: string;
  roomType: string;
  outputStyle: string;
};

const FormInput: FC<FormInputProps> = ({ data }) => {
  const supabase = supabaseBrowserClient();
  const router = useRouter();

  //TODO change the initial data to match the data structure
  const initialData: FormFields = {
    prompt: data?.prompt ?? '',
    image: data?.ref_image ?? '',
    roomType: data?.roomType ?? '',
    outputStyle: data?.outputStyle ?? '',
  };

  const [isPending, setIsLoading] = useState<boolean>(false);
  const [predictionId, setPredictionId] = useState<string>();
  const [generatedData, setGeneratedData] = useState<{
    image_urls: string[];
    id: string;
    outputStyle: string;
  }>({
    image_urls: data?.image_urls ?? [],
    id: data?.id ?? '',
    outputStyle: data?.outputStyle ?? '',
  });
  const [formData, setFormData] = useState<FormFields>(initialData);

  // Function to initiate the design generation process by calling generateDesignFn from server actions.
  const handleGeneration = async () => {
    const { prompt, outputStyle, roomType, image } = formData;

    if (!prompt || !outputStyle || !roomType || !image) {
      toast({ description: 'Please enter all the required fields.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    const response = await generateDesignFn(prompt, outputStyle, roomType, image);
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
      setIsLoading(false);
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
            setGeneratedData({
              image_urls: payload.new.image_urls,
              id: payload.new.id,
              outputStyle: payload.new.output_style,
            });
            setIsLoading(false);
            // Refresh the current page to reflect changes.
            router.replace(`generate/${payload.new.id}`);
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

  // Function to handle generation of random room
  // TODO improve later
  const handleRandomRoomGeneration = () => {
    setFormData({
      prompt: 'Generate a bedroom with a modern design',
      image: 'https://i.pinimg.com/736x/1d/ca/70/1dca70b45500dfe77e36e138f1fd86b1.jpg',
      roomType: 'bedroom',
      outputStyle: 'Bohemian',
    });
  };

  return (
    <div className='p-4 md:px-8'>
      <p className='text-default font-semibold mb-4'>Let’s create a room</p>
      <div className='block md:flex gap-4'>
        <div className='border   p-4 rounded-lg w-full md:w-2/5 lg:w-3/12'>
          <div className=''>
            <UploadReferenceImage
              image={formData.image}
              onImageChange={(value) => setFormData({ ...formData, image: value })}
            />
            <Separator className='my-3' />
            <InputWrapper id='selectRoom' label='Select Room' className='mb-2'>
              <Select
                value={formData.roomType}
                onValueChange={(value) => setFormData({ ...formData, roomType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder='Choose' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='bedroom'>Bedroom</SelectItem>
                  <SelectItem value='living-room'>Living Room</SelectItem>
                  <SelectItem value='kitchen'>Kitchen</SelectItem>
                  <SelectItem value='bathroom'>Bathroom</SelectItem>
                  <SelectItem value='office'>Office</SelectItem>
                  <SelectItem value='dining-room'>Dining Room</SelectItem>
                </SelectContent>
              </Select>
            </InputWrapper>

            <div className='mb-2'>
              <div className='flex items-center justify-between mb-2'>
                <p className='text-default font-medium text-sm'>Output style</p>
                <OutputStylesModal
                  handleSelectRoom={(room) => setFormData({ ...formData, outputStyle: room })}
                  selected={formData.outputStyle}
                />
              </div>

              <div className='overflow-x-auto flex flex-nowrap gap-2'>
                {RoomTypes.map((room, index) => (
                  <div
                    key={index}
                    onClick={() => setFormData((prev) => ({ ...prev, outputStyle: room.name }))}
                    className={cn(
                      'relative flex flex-col justify-center items-center cursor-pointer border-4 border-transparent w-36',
                      formData.outputStyle === room.name && 'border-blue-600 rounded-lg'
                    )}>
                    <div className='w-32 h-28 rounded overflow-hidden'>
                      <Image
                        src={room.image}
                        alt={room.name}
                        width={120}
                        height={120}
                        className='object-cover h-28 w-32'
                      />
                    </div>
                    <Badge variant='transparent' className='absolute bottom-2'>
                      {room.name}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <InputWrapper id='instructions' label='Instructions' className='mb-4'>
              <Textarea
                id='instructions'
                name='instructions'
                placeholder='Enter additional prompt'
                className='min-h-20'
                value={formData.prompt}
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              />
            </InputWrapper>
            <Button className='w-full' onClick={handleGeneration}>
              {isPending ? <BarLoader height={1} color='white' /> : 'Generate'}
            </Button>
          </div>
        </div>
        <OutputGeneration data={generatedData!} handleRandomRoomGeneration={handleRandomRoomGeneration} />
      </div>
    </div>
  );
};

export default FormInput;
