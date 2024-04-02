import EmailAuth from '@/app/login/EmailAuth';
import Link from 'next/link';
import GoogleAuth from './GoogleAuth';

type TypeParams = {
  searchParams: { message: string };
};

export default function Login({ searchParams }: TypeParams) {
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
        <Link
          href='/'
          className='absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 size-4 transition-transform group-hover:-translate-x-1'>
            <polyline points='15 18 9 12 15 6' />
          </svg>
          Back
        </Link>

        <div className='flex flex-col gap-6 items-center'>
          <GoogleAuth />
          <p>- or -</p>
          <EmailAuth searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}