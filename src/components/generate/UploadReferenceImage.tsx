import { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import InputWrapper from '../InputWrapper';
import { cn } from '@/utils/utils';
import { Input } from '../ui/input';
import Image from 'next/image';

type UploadReferenceImageProps = {
  image?: string | null;
  onImageChange: (image: string) => void;
};

const UploadReferenceImage: FC<UploadReferenceImageProps> = ({ image, onImageChange }) => {
  const onDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const base64 = reader.result as string;
      onImageChange(base64);
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['image/jpeg', 'image/png', 'image/gif'] },
    multiple: false,
    onDrop,
    minSize: 1,
    maxSize: 5242880, // 5MB
  });

  return (
    <InputWrapper label='Image'>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed  rounded-lg p-1 text-center cursor-pointer',
          image ? 'max-w-max h-64' : 'py-10'
        )}>
        <Input {...getInputProps()} />
        {image && (
          <Image
            src={image}
            alt='Dropped Image'
            height={256}
            width={256}
            className='w-auto flex justify-center h-full rounded-sm'
          />
        )}
        {!image && (
          <p className='flex items-center justify-center text-sm opacity-50 h-full'>
            Drag 'n' drop an image here, or click to select an image
          </p>
        )}
      </div>
    </InputWrapper>
  );
};

export default UploadReferenceImage;
