// This component is responsible for displaying the outputs of the interior design generation process.
// It uses Tabs to toggle between viewing current outputs and historical data.
// It also allows users to select historical outputs to view or use as new inputs.

'use client';

import React, { FC } from 'react';
import downloadImage from '@/utils/utils';
import { TbDownload } from 'react-icons/tb';
import Image from 'next/image';
import { Button } from '../ui/button';
import { TiArrowShuffle } from 'react-icons/ti';
import { Badge } from '../ui/badge';
import NoStateIcon from '@/assets/icons/NoStateIcon';

type OutputGenerationProps = {
  data: { image_urls: string[]; id: string; outputStyle: string };
  handleRandomRoomGeneration: () => void;
};

// Shows a blurred image while the actual image is loading.
const blurImageDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEXSURBVHgBVZDPSsNAEMa//dP8WVOheFToJejBKh7E4hMIXn0FwcfwrQSvPoFevFQUIdrE0NBTXRPTcbJrxc4yLHzz229nRtzd3lCy2YdJ+og5oyiG1hpSKwhICAEXWrGgdYBeEPLdg1TKp5AOEL8kaxqqc+Ci4tr8PcP11SUuzs/+IO/YAdq70HeLx4d7JIMBtmyNpq4RhKEHheQ+GArDCDGL6f4I6egQL08TlHmO7eHQg0RLgLgHfmCbBvOiwPQtg+2K/NMqZFM3WLYtiAgbxiCvKuzs7kGsBmETZ0RuIp6CtS+7wPHJGCaKYGLTkcz4o4/Gp8wIB05fn5FNuLfyA0VZIl0cwNpPtzZRzWYknDthPVj5J/0AA1VXn/cQBtkAAAAASUVORK5CYII=';

const OutputGeneration: FC<OutputGenerationProps> = ({ data, handleRandomRoomGeneration }) => {
  return data.image_urls.length > 0 ? (
    <div className='border p-4 rounded-lg w-full md:w-3/5 lg:w-4/5'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data.image_urls.map((item, index) => (
          <div key={index} className='group relative flex flex-col justify-center items-center'>
            <Image
              src={item}
              alt=''
              width={260}
              height={260}
              className='border rounded-md mx-auto w-full'
              placeholder='blur'
              blurDataURL={blurImageDataUrl}
            />

            <Badge variant='transparent' className='absolute bottom-2'>
              {data.outputStyle}
            </Badge>
            {/* Download option on hover to a specific design */}
            <div className='absolute inset-0 bg-black/30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-auto cursor-pointer'>
              <Button
                variant='secondary'
                onClick={() => downloadImage(item, 'interior.png')}
                className='rounded-full'>
                <TbDownload className='mr-2' />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className='border p-4 rounded-lg flex flex-col justify-center items-center w-full md:w-3/5 lg:w-4/5'>
      <div className='space-y-5 w-full md:max-w-sm flex flex-col justify-center items-center'>
        <NoStateIcon />
        <p className='text-default font-semibold text-xl'>Generated room will appear here</p>
        <p className='text-center text-subtle text-sm'>
          Looks like you haven't created anything yet! Click the button and then click generate
        </p>
        <Button className='gap-2' onClick={handleRandomRoomGeneration}>
          <TiArrowShuffle />
          Generate random room
        </Button>
      </div>
    </div>
  );
};

export default OutputGeneration;
