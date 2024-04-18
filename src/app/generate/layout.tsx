import ModalUserKeys from '@/components/ModalUserKeys';
import Navbar from '@/components/generate/Navbar';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <ModalUserKeys />
    </>
  );
}
