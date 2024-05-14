'use client';

import { TypeInteriorDesign } from '@/types/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

type HistoryGridProps = {
  data: TypeInteriorDesign[];
};

const HistoryGrid: FC<HistoryGridProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className='px-4 md:px-8 mt-9'>
      <p className='text-2xl font-medium text-[#362d2a] dark:text-white mb-6'>My Generated Rooms</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.map((item) => (
          <div className='p-1.5 rounded-lg bg-[#F0F0F0] dark:bg-[#101010]' key={item.id}>
            <Image
              src={item?.image_urls?.[1] ?? ''}
              alt='generated-room'
              className='object-cover rounded-lg w-full h-72 cursor-pointer'
              onClick={() => router.push(`/generate/${item.id}`)}
              width={300}
              height={300}
            />
            <p className='text-xs font-medium text-grey dark:text-white capitalize mt-1.5 p-2 border border-[#F1F1F1] dark:border-dark bg-white dark:bg-[#161616] line-clamp-1 rounded'>
              {item.prompt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryGrid;
