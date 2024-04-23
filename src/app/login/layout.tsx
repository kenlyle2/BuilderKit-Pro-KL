import { getUserDetails } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const LoginLayout = async ({ children }: Props) => {
  const user = await getUserDetails();

  if (user) {
    redirect('/generate');
  }

  return children;
};

export default LoginLayout;
