import { FC } from 'react';
import InputWrapper from './InputWrapper';
import { Input } from './ui/input';
import { SubmitButton } from './SubmitButton';
import { getReplicateKeyFromCookie, storeKeyInCookie } from '@/utils/cookie-store';
import Modal from './Model';

const ModalUserKeys: FC = () => {
  const replicateKey = getReplicateKeyFromCookie();

  if (replicateKey) {
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    'use server';

    const replicateKey = formData.get('replicate');
    if (replicateKey) {
      storeKeyInCookie(replicateKey as string);
    }
  };

  return (
    <div>
      <Modal>
        <p className='text-lg font-medium'>Please enter the key below to use the respective tools.</p>
        <form>
          <InputWrapper id='replicate' label='Replicate' className="mt-5">
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
