'use client';

import { FC, ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ButtonProps } from './ui/button';

interface ModalProps extends ButtonProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent className='w-11/12 rounded-lg'>
        <DialogHeader className='h-10 border-b mb-2'>
          <DialogTitle className='text-xl font-bold'>Get started with BuilderKit tools</DialogTitle>
        </DialogHeader>

        <DialogDescription className='mb-4'>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;