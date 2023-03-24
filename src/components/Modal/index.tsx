import {
  CloseButton,
  Flex,
  Text,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal as ChakraModal,
  ModalProps as ModalChakraModal,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalProps extends ModalChakraModal {
  title?: string;
  padding?: string;
}

export function Modal({
  children,
  title,
  isOpen,
  onClose,
  padding,
  ...rest
}: ModalProps) {
  return (
    <ChakraModal isCentered  isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent maxW="max-content" bg="gray.800" minW="500px">
        <ModalCloseButton />
        <ModalHeader borderTopRadius="6px" padding={padding || ''}>
          <Text textAlign="left" fontSize="18px">
            {title}
          </Text>
        </ModalHeader>
        <ModalBody
          borderBottomRadius="6px"
          padding={padding || ''}
          p="20px"
        >
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}
