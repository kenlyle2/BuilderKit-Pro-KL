'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function SelectTheme() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    const selectedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(selectedTheme);
  };

  return (
    <>
      <Button variant='ghost' size='icon' className='focus-visible:ring-0' onClick={handleThemeChange}>
        <SunIcon className='size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <MoonIcon className='absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      </Button>
    </>
  );
}
