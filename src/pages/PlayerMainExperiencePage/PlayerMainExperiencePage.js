import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import BasicModal from '../../components/PopUp/PopUp';

const PlayerMainExperiencePage = () => {
  return (
    <div>
      <BasicModal modalHeader="You Died D:" modalBody="PLAYERNAME has killed you. Complete a task to revive yourself."/>
    </div>
  );
};

export default PlayerMainExperiencePage;