'use client';

import React, { FC, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Room1,
  Room2,
  Room3,
  Room4,
  Room5,
  Room6,
  Room7,
  Room8,
  Room9,
  Room10,
  Room11,
  Room12,
  Room13,
  Room14,
  Room15,
} from '@/assets/images';
import Image, { StaticImageData } from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '@/utils/utils';

type RoomType = {
  image?: StaticImageData;
  name: string;
};

export const RoomTypes = [
  { image: Room1, name: 'Bohemian' },
  { image: Room2, name: 'Scandinavian' },
  { image: Room3, name: 'Mid-Century' },
  { image: Room4, name: 'Minimalism' },
  { image: Room5, name: 'Contemporary' },
  { image: Room6, name: 'Industrial Style' },
  { image: Room7, name: 'Modern' },
  { image: Room8, name: 'Eclectic' },
  { image: Room9, name: 'Modern Farmhouse' },
  { image: Room10, name: 'Shabby Chic' },
  { image: Room11, name: 'Coastal Interior' },
  { image: Room12, name: 'Hollywood Glam' },
  { image: Room13, name: 'Rustic' },
  { image: Room14, name: 'French Country' },
  { image: Room15, name: 'Mediterranean' },
];

type OutputStylesModalProps = {
  handleSelectRoom: (data: string) => void;
  selected: string;
};

const OutputStylesModal: FC<OutputStylesModalProps> = ({ handleSelectRoom, selected }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>({
    name: selected || 'Bohemian',
  });

  const handleRoomClick = (room: RoomType) => {
    setSelectedRoom(room);
  };

  const handleSave = () => {
    if (selectedRoom) {
      handleSelectRoom(selectedRoom.name);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className='text-light font-medium text-sm cursor-pointer'>View more</p>
      </DialogTrigger>
      <DialogContent className='max-w-2xl gap-10'>
        <DialogHeader>
          <DialogTitle className='text-grey text-lg font-semibold text-center'>Select Room style</DialogTitle>
          <DialogDescription className='text-center text-sm text-light-gray'>
            Select the best room style for your room
          </DialogDescription>
        </DialogHeader>

        <div className=''>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {RoomTypes.map((room, index) => (
              <div
                key={index}
                onClick={() => handleRoomClick(room)}
                className={cn(
                  'relative flex flex-col justify-center items-center cursor-pointer border-4 border-transparent',
                  selectedRoom?.name === room.name && 'border-blue-600 rounded-lg'
                )}>
                <Image
                  src={room.image}
                  alt={room.name}
                  width={120}
                  height={120}
                  className='h-28 w-52 rounded'
                />
                <Badge className='absolute bottom-2' variant='transparent'>
                  {room.name}
                </Badge>
              </div>
            ))}
          </div>
          <div className='mt-5 flex gap-6'>
            <DialogClose className='w-full'>
              <Button variant='outline' className='w-full' onClick={() => setSelectedRoom(null)}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose className='w-full'>
              <Button className='w-full' onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutputStylesModal;
