import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Button } from '@chakra-ui/react';

const ErrorModal = ({ isOpen, onClose, error }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{error}</Text>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
