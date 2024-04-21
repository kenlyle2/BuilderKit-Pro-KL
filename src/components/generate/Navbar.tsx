import { cn } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import ButtonCta from '../landing-page/ButtonCta';
import { getUserDetails } from '@/utils/supabase/server';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import ModalAccount from '../ModalAccount';
import SignOutButton from '../navbar/SignOutButton';
import { ModeToggle } from '../ModeToggle';

export default async function Navbar() {
  const user = await getUserDetails();

  return (
    <div className='w-full'>
      <div className={cn('max-w-6xl mx-auto flex justify-between items-center p-4 xl:px-0 xl:py-4')}>
        <Link href='/'>
          <div className='flex items-center gap-1'>
            <Image src='/logo.svg' className='size-6 ' width={50} height={50} alt='logo' />
            <p className='text-2xl not-italic font-bold leading-6'>GenAI</p>
          </div>
        </Link>

        <div className='hidden md:flex items-center gap-4'>
          <ModeToggle />
          {user ? (
            <>
              <ModalAccount user={user} />
              <SignOutButton />
            </>
          ) : (
            <ButtonCta label='Sign In' />
          )}
        </div>

        <div className='flex md:hidden items-center gap-2'>
          <div className='block md:hidden'>
            <ModeToggle />
          </div>
          <Sheet>
            <SheetTrigger className='block md:hidden'>
              <HiBars3 />
            </SheetTrigger>
            <SheetContent className=''>
              <Link href='/' className='flex items-center gap-1 mb-10'>
                <Image src='/logo.svg' className='size-6 ' width={50} height={50} alt='logo' />
                <p className='text-2xl not-italic font-bold leading-6'>GenAI</p>
              </Link>

              {user ? (
                <>
                  <div className='space-y-6'>
                    <ModalAccount user={user} className='font-medium' />
                    <SignOutButton className='w-full' />
                  </div>
                </>
              ) : (
                <ButtonCta label='Sign In' />
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
