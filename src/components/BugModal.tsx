import {
  chakra,
  Box,
  Button,
  Stack,
  Image,
  useColorModeValue,
  Text,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Flex,
  Spacer,
  Link,
  Table,
  ButtonGroup,
  Td,
  Tr,
  Thead,
  Th,
  Tbody,
  IconButton,
  Select,
  Checkbox,
  CheckboxGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import ReviewForm from "./ReviewForm";
import { BugForm } from "./newBugModal_new";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { AddIcon } from "@chakra-ui/icons";
import { API_URL } from "envconfig";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const BugModal = ({ modalOpener, onOpenModal, onCloseModal, session }: any) => {
  const [user, setUser] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [whatis, setwhatis] = useState("bug");
  const [token, setToken]=useState("")

  const fetchUser = async () => {
    const response = await fetch(`${API_URL}/check_login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Security-Policy": "upgrade-insecure-requests",
      },
      body: JSON.stringify({
        _email: "chinmay@gmail.com",
        _uid: "104293997582890195605",
      }),
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    var tokenvalue:any = localStorage.getItem("access-enable-token") 
    setToken(tokenvalue)
  },[token])
  
  return (
    <>
    {token == null ?
      <Modal
      scrollBehavior="inside"
      isOpen={modalOpener}
      size="lg"
      onClose={onCloseModal}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
    <ModalOverlay />
      <ModalContent maxW="70rem">
        <ModalHeader>Post a Bug</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{padding:"50px"}}>
          <Alert status="warning">
          <AlertIcon />
          You need to
          <Link href="/auth" paddingInline={2}>
            Login
          </Link>
          to report a Bug
          </Alert>
          </ModalBody>
          {/*  setModalCheck(false); */}
        </ModalContent>
      </Modal>
      : 
      <Modal
      scrollBehavior="inside"
      isOpen={modalOpener}
      size="lg"
      onClose={onCloseModal}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent maxW="70rem">
        <ModalHeader>Post a Bug</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
         <Spacer />
        <BugForm/>
        </ModalBody>
        {/*  setModalCheck(false); */}
      </ModalContent>
    </Modal>
    }
    
    </>
  );
};

export default BugModal;
