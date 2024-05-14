// This component serves as the navigation bar for the application, which appears across various pages.
// It dynamically adjusts to display different links based on the user's authentication status and screen size.

import { cn } from '@/utils/utils';
import { getUserDetails } from '@/utils/supabase/server';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import { PiWarehouseDuotone } from 'react-icons/pi';
import { SelectTheme } from '../SelectTheme';
import Logo from '../Logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { RxExternalLink } from 'react-icons/rx';
import UserButton from './UserButton';
import { FaPlus } from 'react-icons/fa';

export default async function Navbar() {
  return (
    <div className='w-full'>
      <div className=' mx-auto flex justify-between items-center p-4 md:px-8 xl:py-4'>
        <Logo />

        <div className='hidden md:flex items-center gap-3'>
          <SelectTheme />
          <NavItems />
        </div>

        {/* Specific to mobile view */}
        <div className='flex md:hidden items-center gap-2'>
          <div className='block md:hidden'>
            <SelectTheme />
          </div>
          <Sheet>
            <SheetTrigger className='block md:hidden'>
              <HiBars3 />
            </SheetTrigger>
            <SheetContent>
              <Logo />

              <div className='space-y-6 mt-8'>
                <SheetClose>
                  <NavItems />
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

function NavItems() {
  return (
    <>
      <Link href='/generate'>
        <Button variant='outline' className='gap-1.5'>
          <FaPlus />
          New Room
        </Button>
      </Link>
      <Link href='/history'>
        <Button variant='outline' className='gap-1.5'>
          <PiWarehouseDuotone />
          My Generated Rooms
        </Button>
      </Link>
      <Link href='https://apps.builderkit.ai/' target='_blank' className='block w-full'>
        <Button variant='outline' className='gap-3 w-full'>
          Demo Apps
          <RxExternalLink />
        </Button>
      </Link>
      <UserButton />
    </>
  );
}
