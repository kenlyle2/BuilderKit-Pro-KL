// This component is responsible for displaying the outputs of the interior design generation process.
// It uses Tabs to toggle between viewing current outputs and historical data.
// It also allows users to select historical outputs to view or use as new inputs.

'use client';

import React, { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypeInteriorDesign } from '@/types/types';
import { LuLoader } from 'react-icons/lu';
import downloadImage, { cn } from '@/utils/utils';
import { TbDownload } from 'react-icons/tb';
import NoStateImage from '../../assets/images/no-state-image.png';
import Image from 'next/image';
import { Button } from '../ui/button';
import { TiArrowShuffle } from 'react-icons/ti';
import { Badge } from '../ui/badge';

type OutputGenerationProps = {
  data: { image_urls: string[]; id: string; outputStyle: string };
};

// Shows a blurred image while the actual image is loading.
const blurImageDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEXSURBVHgBVZDPSsNAEMa//dP8WVOheFToJejBKh7E4hMIXn0FwcfwrQSvPoFevFQUIdrE0NBTXRPTcbJrxc4yLHzz229nRtzd3lCy2YdJ+og5oyiG1hpSKwhICAEXWrGgdYBeEPLdg1TKp5AOEL8kaxqqc+Ci4tr8PcP11SUuzs/+IO/YAdq70HeLx4d7JIMBtmyNpq4RhKEHheQ+GArDCDGL6f4I6egQL08TlHmO7eHQg0RLgLgHfmCbBvOiwPQtg+2K/NMqZFM3WLYtiAgbxiCvKuzs7kGsBmETZ0RuIp6CtS+7wPHJGCaKYGLTkcz4o4/Gp8wIB05fn5FNuLfyA0VZIl0cwNpPtzZRzWYknDthPVj5J/0AA1VXn/cQBtkAAAAASUVORK5CYII=';

const OutputGeneration: FC<OutputGenerationProps> = ({ data }) => {
  return data.image_urls.length > 0 ? (
    <div className='border border-light-grey dark:border-dark p-4 rounded-lg w-full md:w-3/5 lg:w-4/5'>
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
    <div className='border border-light-grey dark:border-dark p-4 rounded-lg flex flex-col justify-center items-center w-full md:w-3/5 lg:w-4/5'>
      <div className='space-y-5 w-full md:max-w-sm flex flex-col justify-center items-center'>
        <Image src={NoStateImage} alt='No State Image' height={400} width={400} className='size-24' />
        <p className='text-[#060B1E] dark:text-white font-semibold text-xl'>
          Generated room will appear here
        </p>
        <p className='text-center text-light text-sm '>
          Looks like you haven't created anything yet! Click the button and then click generate
        </p>
        <Button className='gap-2'>
          <TiArrowShuffle />
          Generate random room
        </Button>
      </div>
    </div>
  );
};

export default OutputGeneration;

// // State to track the current tab selection.
// const [currentTab, setCurrentTab] = React.useState('output');

// return (
//   <div className='w-full md:w-1/2 ml-0 md:ml-10'>
//     <Tabs defaultValue='output' value={currentTab} className='w-full h-[605px]'>
//       {/* Tab option to select which section to see (e.g. History | Output) */}
//       <div className='flex justify-center mb-6'>
//         <TabsList className='rounded-full p-1 bg-transparent border dark:border-[#272626]'>
//           <TabsTrigger onClick={() => setCurrentTab('output')} className='rounded-full' value='output'>
//             Output
//           </TabsTrigger>
//           <TabsTrigger onClick={() => setCurrentTab('history')} className='rounded-full' value='history'>
//             History
//           </TabsTrigger>
//         </TabsList>
//       </div>

//       {/* Output tab shows the generated design(s) for the selected option */}
//       <TabsContent value='output' className='h-full bg-[#FCFAFA] dark:bg-[#9f9f9f]/5 rounded-lg'>
//         <div
//           className={cn(
//             'h-full grid md:justify-between gap-2 border border-black/5 rounded-lg px-5 py-4 overflow-auto',
//             !isPending ? 'md:grid-cols-2' : 'grid-cols-1'
//           )}>
//           {isPending ? (
//             <LuLoader className='animate-[spin_3s_linear_infinite] m-auto' size={24} />
//           ) : images ? (
//             images?.map((url, index) => (
//               <div key={index} className='group relative'>
//                 <Image
//                   src={url}
//                   alt=''
//                   width={260}
//                   height={260}
//                   className='border rounded-md mx-auto'
//                   placeholder='blur'
//                   blurDataURL={blurImageDataUrl}
//                 />
//                 {/* Download option on hover to a specific design */}
//                 <div className='absolute inset-0 bg-black/30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-auto cursor-pointer'>
//                   <Button
//                     variant='secondary'
//                     onClick={() => downloadImage(url!, 'interior.png')}
//                     className='rounded-full'>
//                     <TbDownload className='mr-2' />
//                     Download
//                   </Button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className='text-sm '>See the generated image here...</p>
//           )}
//         </div>
//       </TabsContent>

//       {/* History tab conatining the already generated designs */}
//       <TabsContent value='history' className='h-full bg-[#9f9f9f]/5'>
//         <div className='h-full border border-black/5 rounded-lg px-5 py-4 space-y-2 overflow-auto'>
//           {data?.length > 0 ? (
//             data.map((item, index) => (
//               <div
//                 key={index}
//                 className='p-2 gap-4 flex items-center rounded-lg bg-white hover:bg-gray-200 dark:bg-[#1F1F1F] dark:hover:bg-[#383838] cursor-pointer mb-2'
//                 onClick={() => {
//                   setCurrentTab('output');
//                   onSelectItem(item);
//                 }}>
//                 <div className='text-sm font-semibold'>{index + 1}.</div>
//                 <div className='space-y-1'>
//                   <p className='max-w-fit text-sm font-semibold leading-5'>
//                     {item.prompt.charAt(0).toUpperCase() + item.prompt.slice(1).toLowerCase()}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className='text-sm'>No generation found.</p>
//           )}
//         </div>
//       </TabsContent>
//     </Tabs>
//   </div>
// );
