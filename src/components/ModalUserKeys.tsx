import { FC } from 'react';
import InputWrapper from './InputWrapper';
import { Input } from './ui/input';
import { SubmitButton } from './SubmitButton';
import { getKeyFromCookie, storeKeyInCookie } from '@/utils/cookieStore';
import Modal from './Model';

const ModalUserKeys: FC = () => {
  const replicateKey = getKeyFromCookie('replicate');

  if (replicateKey) {
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    'use server';

    const replicateKey = formData.get('replicate') as string;
    storeKeyInCookie(replicateKey);
  };

  return (
    <div>
      <Modal>
        <p className='text-lg font-medium'>Please enter the key below to use the respective tools.</p>
        <form>
          <InputWrapper id='replicate' label='Replicate'>
            <Input id='replicate' name='replicate' placeholder='r8_****************************' />
          </InputWrapper>
          <SubmitButton className='w-full mt-5' formAction={handleSubmit}>
            Generate
          </SubmitButton>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUserKeys;
