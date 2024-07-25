import { Modal } from '@mantine/core';

interface DialogProps {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
  title: string;
  children: Readonly<React.ReactNode>;
}

export const Dialog = ({ openModal, closeModal, isOpen, title, children }: DialogProps) => {
  return (
    <>
      <Modal opened={isOpen} onClose={closeModal} title={title} centered>
        {children}
      </Modal>
    </>
  );
};
