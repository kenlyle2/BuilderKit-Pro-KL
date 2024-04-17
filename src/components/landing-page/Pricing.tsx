import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FaFire } from 'react-icons/fa';
import CheckedIcon from '@/assets/icons/CheckedIcon';
import { CiGift } from 'react-icons/ci';
import { cn } from '@/utils/utils';
import Link from 'next/link';

const plans = [
  {
    badge: 'Professional',
    price: '$56',
    features: ['Single user license', 'Lifetime updates', '5,000+ icons', '6 unique styles'],
    isHiglighted: false,
  },
  {
    badge: 'Team',
    price: '$112',
    features: [
      'Single user license',
      'Lifetime updates',
      '5,000+ icons',
      '6 unique styles',
      'Live stroke & corners',
    ],
    isHiglighted: true,
  },
  {
    badge: 'Enterprise',
    price: '$224',
    features: [
      'Single user license',
      'Lifetime updates',
      '5,000+ icons',
      '6 unique styles',
      'Powered by variants',
      'IconJar & SVG library',
      'Unlimited projects',
    ],
    isHiglighted: false,
  },
];

const ListItem = ({ text }: { text: string }) => (
  <li className='flex items-center gap-3 text-black text-lg not-italic font-normal leading-7'>
    <CheckedIcon /> {text}
  </li>
);

const Pricing = () => {
  return (
    <div className='space-y-[120px] px-6 mt-44'>
      <div className='space-y-5'>
        <h1 className='text-center text-5xl md:text-[56px] font-medium leading-[56px] pricing-header '>
          Pay once, use forever, upgrade for free
        </h1>
        <p className='text-[#C8C8C8] text-center text-xl not-italic font-normal leading-8 max-w-3xl mx-auto'>
          Flexible pricing for any team size. It's a one-time payment — you only buy a license once, and all
          future updates are free for you forever.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 space-y-10 md:space-y-0'>
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`w-full h-fit ${plan.isHiglighted ? 'border-4 border-[#26AB75]' : ''}`}>
            <CardContent className='m-8 p-0'>
              {plan.isHiglighted && (
                <div className='relative'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute top-[-66px] left-1/2 -translate-x-1/2'
                    width='207'
                    height='34'
                    viewBox='0 0 207 34'
                    fill='none'>
                    <path
                      d='M32.6055 14C32.6055 6.26801 38.8735 0 46.6055 0H156.605C164.337 0 170.605 6.26801 170.605 14V16.1931C170.605 23.8493 176.756 30.0854 184.411 30.1917L206.605 30.5C206.605 32.433 205.038 34 203.105 34H2.60547C1.5009 34 0.605469 33.1046 0.605469 32C0.605469 30.8954 1.5009 30 2.60547 30H18.6055C26.3375 30 32.6055 23.732 32.6055 16V14Z'
                      fill='#26AB75'
                    />
                  </svg>
                  <p className='text-lg not-italic font-semibold leading-7 text-white absolute top-[-63px] left-1/2 -translate-x-1/2'>
                    Best Now
                  </p>
                </div>
              )}
              <Badge className='text-sm not-italic font-medium leading-5 mb-8'>{plan.badge}</Badge>
              <div className='flex gap-1'>
                <p className='text-black text-3xl not-italic font-normal'>$</p>
                <p className='text-black text-5xl not-italic font-bold'>{plan.price}</p>
              </div>
              <p className='text-black text-lg not-italic font-normal leading-7'>
                For freelancers, indie developers or solopreneurs.
              </p>
              <Button
                className={cn(
                  'rounded-full w-full border border-[#E7E7E7] py-6 font-bold mt-6 mb-12 gap-2',
                  plan.isHiglighted ? 'text-white bg-[#26AB75]' : 'text-[#2AA875] bg-[#DFFFF2]'
                )}>
                <FaFire className='size-5' />
                Buy Now
              </Button>
              <ul className='space-y-3'>
                {plan.features.map((text, index) => (
                  <ListItem key={index} text={text} />
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='mt-5 mb-24 flex justify-center items-center'>
        <Link href='/generate'>
          <Button
            variant='default'
            className='rounded-full text-green-600 text-center text-base not-italic font-medium leading-6 gap-3 py-6 bg-background '>
            {' '}
            <CiGift className='size-6' />
            Try free demo
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
