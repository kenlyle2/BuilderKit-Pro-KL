'use client';

import { FC } from 'react';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface SignOutButtonProps {
  className?: string;
}

const SignOutButton: FC<SignOutButtonProps> = ({ className }) => {
  const supabase = supabaseBrowserClient();

  const router = useRouter();

  return (
    <Button
      variant='outline'
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
      className={className}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
