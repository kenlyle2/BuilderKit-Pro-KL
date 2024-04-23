import Navbar from '@/components/generate/Navbar';
import { getUserDetails } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await getUserDetails();

  if (user == null) {
    redirect('/login');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
