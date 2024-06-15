import { useEffect, useState } from "react";
import { Container, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";

const CLOSING_HOUR = 8;
const CLOSING_MINUTE = 45;

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      if (now.getHours() === CLOSING_HOUR && now.getMinutes() === CLOSING_MINUTE && now.getSeconds() === 50) {
        setIsModalOpen(true);
      }
    };

    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            closeBoxYes();
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
  }, [isModalOpen]);

  const closeBoxYes = () => {
    console.log("Cash register closed.");
    // Add your cash register closing logic here
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
      </VStack>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Closing Cash Register</ModalHeader>
          <ModalBody>
            <Text>The cash register will be closed in {countdown} seconds.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;