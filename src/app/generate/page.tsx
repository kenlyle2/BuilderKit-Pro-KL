import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import FormInput from '@/components/generate/FormInput';
import Navbar from '@/components/generate/Navbar';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = supabaseServerClient();

  const user = await getUserDetails();

  if (user == null) {
    redirect('/login');
  }

  const { data } = await supabase
    .from('interior_designs')
    .select()
    .order('created_at', { ascending: false })
    .not('image_urls', 'is', null);

  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto pt-14'>
        <FormInput data={data!} />
      </div>
    </>
  );
}
