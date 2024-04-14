'use client';

import { supabaseBrowserClient } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function GoogleAuth() {
  const supabase = supabaseBrowserClient();
  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

  return (
    <div className='w-full'>
      <Auth
        supabaseClient={supabase}
        onlyThirdPartyProviders={true}
        providers={['google']}
        redirectTo={redirectUrl}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                defaultButtonText: 'white',
                defaultButtonBackground: '#FFFFFF2B',
                defaultButtonBackgroundHover: '#FFFFFF30',
                defaultButtonBorder: '#FFFFFF2B',
              },
              radii: {
                borderRadiusButton: '6px',
              },
            },
          },
        }}
      />
    </div>
  );
}
