import { supabaseAdmin } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const prediction = await req.json();

  try {
    console.log(`Generation received for Prediction: ${prediction.id}`);

    let updateData = null;
    if (prediction.status === 'failed') {
      updateData = { error: prediction.error };
    } else {
      const result = typeof prediction.output === 'string' ? [prediction.output] : prediction.output;
      updateData = { image_urls: result };
    }

    await supabaseAdmin.from('interior_designs').update(updateData).eq('prediction_id', prediction.id);

    return NextResponse.json({ message: 'Webhook Received.' }, { status: 200 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
