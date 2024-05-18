import Link from 'next/link';
import DropdownAccount from './DropdownAccount';
import { IoIosHome } from 'react-icons/io';
import { BiLinkExternal } from 'react-icons/bi';
import Logo from '../Logo';
import { SelectTheme } from './SelectTheme';
import { Button } from '@/components/ui/button';
import { GrAdd } from 'react-icons/gr';
import MobileSidebarMenu from './MobileSidebarMenu';

export const navItems = [
  { title: 'New Room', href: '/generate', icon: <GrAdd /> },
  { title: 'My Generated Rooms', href: '/history', icon: <IoIosHome /> },
  { title: 'Demo Apps', href: 'https://apps.builderkit.ai/', icon: <BiLinkExternal /> },
];

export default async function Navbar() {
  return (
    <div className='w-full'>
      <div className=' mx-auto flex justify-between items-center py-4'>
        <Logo />

        <div className='flex items-center gap-3'>
          <SelectTheme />

          <div className='hidden md:flex items-center gap-3'>
            {navItems.map((item) => (
              <Link key={item.title} href={item.href} className='block'>
                <Button variant='secondary' className='gap-2 w-full justify-start'>
                  {item.icon}
                  {item.title}
                </Button>
              </Link>
            ))}

            <DropdownAccount />
          </div>

          {/* Specific to mobile view */}
          <MobileSidebarMenu />
        </div>
      </div>
    </div>
  );
}
