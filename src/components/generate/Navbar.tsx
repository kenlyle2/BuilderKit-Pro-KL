// This component serves as the navigation bar for the application, which appears across various pages.
// It dynamically adjusts to display different links based on the user's authentication status and screen size.

import { cn } from '@/utils/utils';
import { getUserDetails } from '@/utils/supabase/server';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import ModalAccount from '../ModalAccount';
import ButtonSignout from './ButtonSignout';
import { SelectTheme } from '../SelectTheme';
import Logo from '../Logo';
import { IoMdArrowBack } from 'react-icons/io';
import Link from 'next/link';
import { Button } from '../ui/button';

export default async function Navbar() {
  const user = await getUserDetails();

  return (
    <div className='w-full'>
      <div className={cn('max-w-6xl mx-auto flex justify-between items-center p-4 xl:px-0 xl:py-4')}>
        <Logo />

        <div className='hidden md:flex items-center gap-4'>
          <SelectTheme />
          {user && (
            <>
              <ModalAccount user={user} />
              <Link href='https://apps.builderkit.ai/' target='_blank'>
                <Button variant='outline' className='gap-3'>
                  <IoMdArrowBack className='h-5 w-5' />
                  Demo apps
                </Button>
              </Link>
              <ButtonSignout />
            </>
          )}
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
            <SheetContent className=''>
              <Logo />

              {user && (
                <div className='space-y-6'>
                  <ModalAccount user={user} className='font-medium' />
                  <Link href='https://apps.builderkit.ai/' target='_blank'>
                    <Button variant='outline' className='gap-3'>
                      <IoMdArrowBack className='h-5 w-5' />
                      Demo apps
                    </Button>
                  </Link>
                  <ButtonSignout className='w-full' />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
