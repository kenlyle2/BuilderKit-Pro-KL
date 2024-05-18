import { toast } from '@/components/ui/use-toast';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Function: cn (Class Name)
// This utility function combines and deduplicates class names using clsx and twMerge.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errorToast = (description: string, title?: string) =>
  toast({ title, description, variant: 'destructive' });

// Helper function: image download
function forceDownload(blobUrl: string, filename: string) {
  const a = document.createElement('a');
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Design download function. It takes the URL of the image and the filename as arguments.
export default function downloadImage(url: string, filename: string) {
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: 'cors',
  })
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch((e) => console.error(e));
}
