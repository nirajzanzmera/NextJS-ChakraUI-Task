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
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { GrGoogle } from "react-icons/gr";
import { ImHome } from "react-icons/im";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";

export default function OAuthScreen({ providers }: any) {
  const [isLoading, setIsLoading] = useState(false);

  const openemail = () => {
    // <FormLabel>
    //   Enter Your Email Id
    // <Button>
    //   Submit
    // </Button>
    // </FormLabel>
    <Textarea>Abcd</Textarea>;
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
            //loadingText='Logging in with Google'
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
            isLoading={isLoading}
            //loadingText='Logging in with LinkedIn'
            onClick={() => {
              signIn("linkedin");
              //signIn('email', { email: 'chinmayparab1999@gmail.com' })
              setIsLoading(true);
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
            isLoading={isLoading}
            //loadingText='Logging in with Facebook'
            onClick={() => {
              signIn("facebook");
              // signIn('email', { email: 'chinmayparab1999@gmail.com' })
              setIsLoading(true);
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
            isLoading={isLoading}
            //loadingText='Logging in with Twitter'
            onClick={() => {
              signIn('twitter')
              // signIn('email', { email: 'chinmayparab1999@gmail.com' })
              setIsLoading(true)
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
            // key={provider.name}
            isLoading={isLoading}
            //loadingText='Logging in with Google'
            onClick={() => {
              // signIn(provider.id)
              openemail();
            }}
          >
            Log in with Email
          </Button>
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
