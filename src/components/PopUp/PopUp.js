import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
import { useState } from 'react';

  const BasicModal = ({ modalHeader, modalBody }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
  
    return (
      <div>
        {/* Open Modal Button */}
        <Button onClick={onOpen} colorScheme="teal">
          Open Modal
        </Button>
  
        {/* Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> {modalHeader} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalBody}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              {/* Add additional buttons or actions as needed */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  };
  
  export default BasicModal;