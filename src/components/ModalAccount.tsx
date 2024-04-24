// This component is responsible for rendering a modal dialog related to user accounts.
// It uses Dialog components from '@/components/ui/dialog' for rendering the modal structure.
// Includes a trigger button that users click to open the modal.

import { FC } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { MdArrowOutward } from 'react-icons/md';
import { User } from '@supabase/supabase-js';
import { cn } from '@/utils/utils';

interface ModalAccountProps {
  user: User; // User object from Supabase to display user-specific information in the modal.
  className?: string; // Optional className for styling the modal trigger through external CSS.
}

const ModalAccount: FC<ModalAccountProps> = ({ user, className }) => {
  return (
    <Dialog>
      <DialogTrigger className={cn(' hover:no-underline', className)}>Account Setting</DialogTrigger>
      <DialogContent className='w-11/12 rounded-lg'>
        <DialogHeader className='h-12 border-b mb-5'>
          <DialogTitle className='text-center text-xl'>Account Settings</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 font-medium'>
            <p>Display Name</p>
            <p>{user?.identities?.[0]?.identity_data?.full_name}</p>
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 font-medium'>
            <p>Email Address</p>
            <p>{user.email}</p>
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 font-medium'>
            <p>Available Credits</p>
            <p>24</p>
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 font-medium'>
            <p>Current Plan</p>
            <p>Free</p>
          </div>
          <Button className='rounded-lg w-full gap-2' variant='blue'>
            Upgrade Plan <MdArrowOutward size={16} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAccount;
