import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'

 export default function BasicUsage({ data,session,modalOpener,onCloseModal}:any) {
    return (
      <>
        <Modal 
        scrollBehavior="inside"
        isOpen={modalOpener}
        size="lg"
        onClose={onCloseModal}
        closeOnOverlayClick={false}
        closeOnEsc={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Lorem count={2} /> */}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }