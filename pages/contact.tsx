import React, { useEffect, useState } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Icon,
  Stack,
  SimpleGrid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  Textarea,
  Divider ,
  VStack,
  Tooltip,
  Link,
  IconButton,
  InputGroup,
  Grid,
  useClipboard,
  InputLeftElement,
} from "@chakra-ui/react";
import Footer from "components/Footer";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from "react-icons/bs";
import Header from "components/Header";

export default function Contact() {
  const [sessionState, setSessionState] = useState<any>();
  const [modalBug, setModalBug] = useState(false);
  const [modalReview, setModalReview] = useState(false);
  const headingbackColor = useColorModeValue("gray.800", "white");
  const subheading = useColorModeValue("gray.500", "gray.600");


  const onOpenModalBug = () => {
    setModalBug(true);
  };
  const onOpenModalReview = () => {
    setModalReview(true);
  };
  const onCloseModalBug = () => {
    setModalBug(false);
  };
  const onCloseModalReview = () => {
    setModalReview(false);
  };

  useEffect(() => {
    setSessionState(localStorage.getItem("access-enable-token"));
  }, []);

  const { hasCopied, onCopy } = useClipboard("example@example.com");

  const Feature = (props: any) => {
    return (
      <Flex>
        <Flex shrink={0}>
          <Flex
            alignItems="center"
            justifyContent="center"
            h={12}
            w={12}
            rounded="md"
            bg={useColorModeValue("brand.500", "black")}
            color="white"
          >
            <Icon
              boxSize={6}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {props.icon}
            </Icon>
          </Flex>
        </Flex>
        <Box ml={4}>
          <chakra.dt
            fontSize="lg"
            fontWeight="medium"
            lineHeight="6"
            color={useColorModeValue("gray.900", "black")}
          >
            {props.title}
          </chakra.dt>
          <chakra.dd mt={2} color={useColorModeValue("gray.500", "gray.400")}>
            {props.children}
          </chakra.dd>
        </Box>
      </Flex>
    );
  };

  return (
    <>
      <Header
        session={sessionState}
        onOpenModalBug={onOpenModalBug}
        onCloseModalBug={onCloseModalBug}
        modalBug={modalBug}
        onOpenModalReview={onOpenModalReview}
        onCloseModalReview={onCloseModalReview}
        modalReview={modalReview}
      />
      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        p={20}
        w="auto"
        justifyContent="center"
        alignItems="center"
      >
        <Box py={12} bg={useColorModeValue("white", "gray.800")} rounded="xl">
          <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
            
            
            <Box textAlign={{ lg: "center" }}>
            <chakra.h2
                  fontSize={{ base: "2xl", md: "3xl" }}
                  color={headingbackColor}
                  fontWeight="bold"
                >
                  Hello,{" "}
                  <chakra.span
                    color={subheading}
                  >
                    Access Enablers
                  </chakra.span>
                </chakra.h2>
             
              <Text  align='center'
                mt={4}
                maxW="2xl"
                fontSize="xl"
                mx={{ lg: "auto" }}
                color={useColorModeValue("gray.500", "gray.400")}
              >
                Please fill this form to get in touch with us for any queries or concerns. 
              </Text>
              <Text  align='center'
                mt={4}
                maxW="2xl"
                fontSize="xl"
                mx={{ lg: "auto" }}
                color={useColorModeValue("gray.500", "gray.400")}
              >
               We will do our best to respond in 1-2 business days.
              </Text>
            </Box>

          
                    <Box>
                      <VStack style={{ margin: "0", width: "100%" }} spacing={3}>
                          <Box
                            bg={useColorModeValue("white", "gray.700")}
                            borderRadius="lg"
                            p={4}
                            w={["100%", "100%", "45%"]}
                            color={useColorModeValue(
                              "gray.700",
                              "whiteAlpha.900",
                            )}
                            shadow="base"
                          >
                            <VStack spacing={10}>
                              <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <InputGroup>
                                  {/* <InputLeftElement children={<BsPerson />} /> */}
                                  <Input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                  />
                                </InputGroup>
                              </FormControl>

                              <FormControl isRequired>
                                <FormLabel>Email</FormLabel>

                                <InputGroup>
                                  {/* <InputLeftElement children={<MdOutlineEmail />} /> */}
                                  <Input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                  />
                                </InputGroup>
                              </FormControl>

                              <FormControl isRequired>
                                <FormLabel>Message</FormLabel>

                                <Textarea
                                  name="message"
                                  placeholder="Your Message"
                                  rows={6}
                                  resize="none"
                                />
                              </FormControl>

                              <Button
                                colorScheme="blue"
                                bg="blue.400"
                                color="white"
                                _hover={{
                                  bg: "blue.500",
                                }}
                                isFullWidth
                              >
                                <a href = "mailto:access.enable.web@gmail.com"></a>
                                Send Message
                              </Button>
                            </VStack>
                          </Box>
                        
                      </VStack>
                    </Box>
          </Box>
          <Box mt={10}>
              <Stack
                spacing={{ base: 10, md: 0 }}
                display={{ md: "grid" }}
                gridTemplateColumns={{ md: "repeat(2,1fr)" }}
                gridColumnGap={{ md: 8 }}
                gridRowGap={{ md: 10 }}
              >
    
                <Feature
                  title="Transfers are instant"
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  }
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </Feature>
                <Feature
                  title="Mobile notifications"
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  }
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                  </Feature>
                </Stack>
          </Box>     
        </Box>
      </Flex>
      <Footer />
    </>
  );
}
