import { cn } from '@/utils/utils';
import ButtonCta from '../landing-page/ButtonCta';
import { getUserDetails } from '@/utils/supabase/server';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import ModalAccount from '../ModalAccount';
import SignOutButton from '../navbar/SignOutButton';
import { SelectTheme } from '../SelectTheme';
import Logo from '../Logo';

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
              <SignOutButton />
            </>
          )}
        </div>

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
                  <SignOutButton className='w-full' />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
