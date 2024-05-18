import { IoIosHome } from 'react-icons/io';
import { SelectTheme } from '../SelectTheme';
import Logo from '../Logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { RxExternalLink } from 'react-icons/rx';
import DropdownAccount from './DropdownAccount';
import { FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { getUserDetails } from '@/utils/supabase/server';
import MobileNavbar from './MobileNavbar';

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
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
}

export const NavItems = () => {
  return (
    <>
      <Link href='/generate' className='block'>
        <Button variant='secondary' className='gap-2 w-full justify-start md:flex'>
          <FaPlus />
          New Room
        </Button>
      </Link>
      <Link href='/history' className='block'>
        <Button variant='secondary' className='gap-2 w-full justify-start md:flex'>
          {/* TODO change Icon */}
          <IoIosHome />
          My Generated Rooms
        </Button>
      </Link>
      <Link href='https://apps.builderkit.ai/' className='block' target='_blank'>
        <Button variant='secondary' className='gap-2 w-full justify-start md:flex'>
          Demo Apps
          <RxExternalLink />
        </Button>
      </Link>
    </>
  );
};
