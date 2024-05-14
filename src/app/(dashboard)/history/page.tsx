import HistoryGrid from '@/components/history/HistoryGrid';
import { supabaseServerClient } from '@/utils/supabase/server';
import Image from 'next/image';
import React from 'react';

type Props = {};

const History = async (props: Props) => {
  const supabase = supabaseServerClient();

  const { data } = await supabase
    .from('interior_designs')
    .select()
    .not('image_urls', 'is', null)
    .order('created_at', { ascending: false });

  return <HistoryGrid data={data ?? []} />;
};

export default History;
