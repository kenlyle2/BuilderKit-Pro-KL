// This page represents the login screen of the application.
// It displays a central form allowing users to log in or register either through email or Google authentication.
// The application name is dynamically fetched from the config and displayed at the top.
// The `EmailAuth` and `GoogleAuth` components are used here for handling the respective authentication methods.

import EmailAuth from '@/components/auth/EmailAuth';
import GoogleAuth from '@/components/auth/GoogleAuth';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function Login() {
  return (
    <div className='h-screen bg-[#031614] flex'>
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center px-6'>
        <h1 className='text-white text-4xl font-medium mb-6'>Interior Design Generator</h1>
        <h2 className='text-[#8F95B2] text-sm mb-16'>Login or register with your email</h2>

        <div className='w-full sm:max-w-md flex flex-col gap-8 items-center'>
          <GoogleAuth />
          <Separator className='w-3/4 bg-[#A5ABB6]/20' />
          <EmailAuth />
        </div>
      </div>

      <div className='w-1/2 hidden md:flex flex-col items-center justify-center gap-12 bg-gradient-to-r from-[#1C4E4933] to-[#031614]'>
        <Image src={'/avatar.png'} alt='' width={150} height={250} />
        <div className='w-2/3 mx-auto text-xl leading-relaxed tracking-wider font-light text-center text-white/65'>
          <q>
            I love using genai as it cutdowns my workflow and lore ipsum dolor sit amet lorem ipsum dolor sit
            amet also
          </q>
        </div>
        <div>
          <p className='text-xl text-center text-white'>Kiya hector</p>
          <p className='text-sm text-center italic font-light text-white/80 mt-4'>
            Founder & CEO <span className='font-normal text-white/90'>@BuilderKit</span>
          </p>
        </div>
      </div>
    </div>
  );
}
