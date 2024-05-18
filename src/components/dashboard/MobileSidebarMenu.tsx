import { FC } from 'react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import Logo from '../Logo';
import DropdownAccount from './DropdownAccount';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { navItems } from './Navbar';

interface MobileSidebarMenuProps {}

const MobileSidebarMenu: FC<MobileSidebarMenuProps> = () => {
  return (
    <div className='flex md:hidden items-center gap-2'>
      <Sheet>
        <SheetTrigger className='block md:hidden'>
          <HiBars3 />
        </SheetTrigger>

        <SheetContent>
          <Logo />

          <div className='space-y-3 mt-8'>
            {navItems.map((item) => (
              <SheetClose key={item.title} className='w-full' asChild>
                <Link href={item.href}>
                  <Button variant='secondary' className='gap-2 w-full justify-start'>
                    {item.icon}
                    {item.title}
                  </Button>
                </Link>
              </SheetClose>
            ))}

            <DropdownAccount />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebarMenu;
