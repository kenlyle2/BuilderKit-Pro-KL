import { FC } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { MdArrowOutward } from 'react-icons/md';
import { User } from '@supabase/supabase-js';
import { cn } from '@/utils/utils';

interface ModalAccountProps {
  user: User;
  className?: string;
}

const ModalAccount: FC<ModalAccountProps> = ({ user, className }) => {
  return (
    <Dialog>
      <DialogTrigger className={cn('text-white hover:no-underline', className)}>
        Account Setting
      </DialogTrigger>
      <DialogContent className='w-11/12 rounded-lg'>
        <DialogHeader className='h-12 border-b mb-5'>
          <DialogTitle className='text-center text-xl'>Account Settings</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 font-medium'>
            <p className='text-[#70747B]'>Display Name</p>
            <p className='text-[#3E3E3E]'>{user?.identities?.[0]?.identity_data?.full_name}</p>
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 font-medium'>
            <p className='text-[#70747B]'>Email Address</p>
            <p className='text-[#3E3E3E]'>{user.email}</p>
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 font-medium'>
            <p className='text-[#70747B]'>Available Credits</p>
            <p className='text-[#3E3E3E]'>24</p>
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 font-medium'>
            <p className='text-[#70747B]'>Current Plan</p>
            <p className='text-[#3E3E3E]'>Free</p>
          </div>
          <Button className='rounded-lg w-full flex border border-[#51DCA3] green-btn-gradient gap-2'>
            Upgrade Plan <MdArrowOutward size={16} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAccount;
