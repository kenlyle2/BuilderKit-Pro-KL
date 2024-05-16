'use client';

import { TypeInteriorDesign } from '@/types/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import NoStateIcon from '@/assets/icons/NoStateIcon';

type HistoryGridProps = {
  data: TypeInteriorDesign[];
};

const HistoryGrid: FC<HistoryGridProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className='px-4 md:px-8 mt-9'>
      <p className='text-2xl font-medium text-default mb-6'>My Generated Rooms</p>
      {data && data.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data.map((item) => (
            <div className='p-1.5 rounded-lg bg-border dark:bg-secondary' key={item.id}>
              <Image
                src={item?.image_urls?.[1] ?? ''}
                alt='generated-room'
                className='object-cover rounded-lg w-full h-72 cursor-pointer'
                onClick={() => router.push(`/generate/${item.id}`)}
                width={300}
                height={300}
              />
              <p className='text-xs font-medium text-default capitalize mt-1.5 p-2 border line-clamp-1 rounded bg-white dark:bg-border'>
                {item.prompt}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-72'>
          <NoStateIcon />
          <p className='text-lg text-default mt-5'>No history found</p>
        </div>
      )}
    </div>
  );
};

export default HistoryGrid;
