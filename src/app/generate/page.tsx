// This is the main page and includes form input for interior design generation.
// It uses the FormInput component for gathering user input and interacts with the server for interior design generation.

import { supabaseServerClient } from '@/utils/supabase/server';
import FormInput from '@/components/generate/FormInput';

export default async function Generate() {
  const supabase = supabaseServerClient();

  const { data } = await supabase
    .from('interior_designs')
    .select()
    .order('created_at', { ascending: false })
    .not('image_urls', 'is', null);

  return (
    <div className='max-w-6xl mx-auto pt-10'>
      <FormInput data={data!} />
    </div>
  );
}
