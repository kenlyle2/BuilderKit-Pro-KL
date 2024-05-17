// This component serves as the navigation bar for the application, which appears across various pages.
// It dynamically adjusts to display different links based on the user's authentication status and screen size.

import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import { IoIosHome } from 'react-icons/io';
import { SelectTheme } from '../SelectTheme';
import Logo from '../Logo';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { RxExternalLink } from 'react-icons/rx';
import DropdownAccount from './DropdownAccount';
import { FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { getUserDetails } from '@/utils/supabase/server';
import { cn } from '@/utils/utils';

export default async function Navbar() {
  const user = await getUserDetails();

  return (
    <div className='w-full'>
      <div className=' mx-auto flex justify-between items-center py-4'>
        <Logo />

        <div className='hidden md:flex items-center gap-3'>
          <SelectTheme />
          <NavItems />
          <DropdownAccount>
            <Image
              src={user?.user_metadata?.avatar_url ?? '/avatar.png'}
              className='size-8 rounded-full cursor-pointer'
              width={20}
              height={20}
              alt='avatar'
            />
          </DropdownAccount>
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
        </div>
      </div>
    </div>
  );
}

function NavItems() {
  return (
    <>
      <Link href='/generate' className='block'>
        <Button variant='secondary' className='gap-2 w-full'>
          <FaPlus />
          New Room
        </Button>
      </Link>
      <Link href='/history' className='block'>
        <Button variant='secondary' className='gap-2 w-full'>
          {/* TODO change Icon */}
          <IoIosHome />
          My Generated Rooms
        </Button>
      </Link>
      <Link href='https://apps.builderkit.ai/' className='block' target='_blank'>
        <Button variant='secondary' className='gap-2 w-full'>
          Demo Apps
          <RxExternalLink />
        </Button>
      </Link>
    </>
  );
}
