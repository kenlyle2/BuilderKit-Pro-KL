import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import Logo from '../Logo';
import { NavItems } from './Navbar';
import DropdownAccount from './DropdownAccount';
import Image from 'next/image';
import { buttonVariants } from '../ui/button';
import { cn } from '@/utils/utils';
import { getUserDetails } from '@/utils/supabase/server';

const MobileNavbar = async () => {
  const user = await getUserDetails();
  return (
    <Sheet>
      <SheetTrigger className='block md:hidden'>
        <HiBars3 />
      </SheetTrigger>
      <SheetContent>
        <Logo />

        <div className='space-y-3 mt-8'>
          <NavItems />
          <DropdownAccount>
            <div
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
                'flex justify-start px-1.5 py-2.5 !w-full gap-2 cursor-pointer'
              )}>
              <Image
                src={user?.user_metadata?.avatar_url ?? '/avatar.png'}
                className='size-5 rounded-full'
                width={20}
                height={20}
                alt='avatar'
              />
              <p className='font-semibold text-default'>{user?.user_metadata?.full_name} </p>
            </div>
          </DropdownAccount>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
