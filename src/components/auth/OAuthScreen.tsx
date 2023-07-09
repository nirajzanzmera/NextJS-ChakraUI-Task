import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  FormLabel,
  Textarea,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { Component, useRef, useState } from "react";
import { GrGoogle } from "react-icons/gr";
import { ImHome } from "react-icons/im";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { API_URL } from "envconfig";
import UserPreferences from "./UserPreferences";
import { useRouter } from "next/router";

export default function OAuthScreen({ providers, setEmailAuthSent }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLinkedin, setIsLoadingLinkedin] = useState(false);
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [isLoadingTwitter, setIsLoadingTwitter] = useState(false);
  // const [isLoadingEmail, setIsLoadingEmail] = useState(false)

  const [isEmailClick, setIsEmailClick] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    // e.preventDefault();
    sendMagicLink();
    // e.target.reset();
  };

  let checkEmail;

  if (isEmailClick === true) {
    checkEmail = (
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box my={4} textAlign="left">
            <FormControl isRequired>
              <Input
                type="email"
                placeholder="Enter your email ID"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <Button
              border={"1px"}
              borderColor={"blue.900"}
              size={"lg"}
              w={["xs", "sm"]}
              width="full"
              mt={4}
              onClick={() => sendMagicLink()}
              bg={"blue.100"}
              color={"blue.700"}
              _hover={{
                bg: "blue.100",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Flex>
    );
  }

  const sendMagicLink = async () => {
    let reqObj = {
      email: email,
    };
    try {
      const response = await fetch(`${API_URL}/send-magiclink`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqObj),
      });
      let data = await response.json();
      if (data && data.message === "Email was sent successfully.") {
        setShowModal(true);
        setEmailAuthSent(true);
        confirmEmailLink();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmEmailLink = async () => {
    try {
      const response = await fetch(`${API_URL}/confirm_email_link`, {
        method: "GET",
      });
      const data = await response.json();
      if (data && data.token) {
        localStorage.setItem("access-enable-token", data.token);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bgGradient="linear(to-r, blue.400, purple.600)"
    >
      <Box
        rounded={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"2xl"}
        p={20}
        w={["md", "2xl"]}
      >
        <Stack align={"center"} mb={10}>
          <Heading fontSize={["3xl", "4xl"]}>Log in to your account</Heading>
          <Text fontSize={["xl", "2xl"]} color={"gray.600"}>
            to experience the community️
          </Text>
        </Stack>

        <Stack align={"center"}>
          <Button
            bg={"white"}
            color={"red.400"}
            _hover={{
              bg: "red.50",
            }}
            border={"1px"}
            size={"lg"}
            w={["xs", "sm"]}
            leftIcon={<GrGoogle />}
            // key={provider.name}
            isLoading={isLoading}
            loadingText="Logging in with Google"
            onClick={() => {
              signIn("google");
              //signIn('email', { email: 'chinmayparab1999@gmail.com' })
              setIsLoading(true);
            }}
          >
            Log in with Google
          </Button>
          {/* )} */}
          {/* {Object.values(providers).map((provider: any) => ( */}
          <Button
            bg={"white"}
            color={"blue.500"}
            _hover={{
              bg: "blue.100",
            }}
            border={"1px"}
            size={"lg"}
            w={["xs", "sm"]}
            leftIcon={<AiFillLinkedin />}
            // key={provider.name}
            isLoading={isLoadingLinkedin}
            loadingText="Logging in with LinkedIn"
            onClick={() => {
              signIn("linkedin");
              //signIn('email', { email: 'chinmayparab1999@gmail.com' })
              setIsLoadingLinkedin(true);
            }}
          >
            Log in with Linkedln
          </Button>
          {/* {Object.values(providers).map((provider: any) => ( */}
          <Button
            bg={"white"}
            color={"blue.700"}
            _hover={{
              bg: "blue.50",
            }}
            border={"1px"}
            size={"lg"}
            w={["xs", "sm"]}
            leftIcon={<AiFillFacebook />}
            // key={provider.name}
            isLoading={isLoadingFacebook}
            loadingText="Logging in with Facebook"
            onClick={() => {
              signIn("facebook");
              // signIn('email', { email: 'chinmayparab1999@gmail.com' })
              setIsLoadingFacebook(true);
            }}
          >
            Log in with Facebook
          </Button>
          {/* {Object.values(providers).map((provider: any) => ( */}
          {/* <Button
            bg={'white'}
            color={'blue.300'}
            _hover={{
              bg: 'skyblue.50',
            }}
            border={'1px'}
            size={'lg'}
            w={['xs', 'sm']}
            leftIcon={<AiFillTwitterSquare />}
            // key={provider.name}
            isLoading={isLoadingTwitter}
            loadingText='Logging in with Twitter'
            onClick={() => {
              signIn('twitter')
              // signIn('email', { email: 'chinmayparab1999@gmail.com' })
              setIsLoadingTwitter(true)
            }}
          >
            Log in with Twitter
          </Button> */}
          <Button
            bg={"white"}
            color={"red.800"}
            _hover={{
              bg: "blue.50",
            }}
            border={"1px"}
            size={"lg"}
            w={["xs", "sm"]}
            leftIcon={<AiOutlineMail />}
            onClick={() => {
              setIsEmailClick(true);
            }}
          >
            Log in with Email
          </Button>
          {checkEmail}
          <Link href="/" passHref>
            <Button
              bg={"white"}
              color={"green.400"}
              _hover={{
                bg: "green.50",
              }}
              border={"1px"}
              size={"lg"}
              w={["xs", "sm"]}
              leftIcon={<ImHome />}
            >
              Back To Home
            </Button>
          </Link>
        </Stack>
      </Box>
    </Flex>
  );
}
