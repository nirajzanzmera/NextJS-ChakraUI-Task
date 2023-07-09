import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  CheckboxGroup,
  Checkbox,
  useToast,
  FormHelperText,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { API_URL } from "envconfig";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CountrySelect from "./CountrySelect";
import UserRoleSelect from "./UserRoleSelect";
import DisabilityExtentSlider from "./DisabilityExtentSlider";
import axios from "axios";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { getApps } from "firebase/app";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import AppDevRoleSelect from "./AppDevRoleSelect";
import { CheckCircleIcon, Search2Icon } from "@chakra-ui/icons";

export default function UserPreferences({
  session,
  emailAuthId,
}: any): JSX.Element {
  const router = useRouter();
  const toast = useToast();

  const [fullName, setFullName] = useState<string>(session?.name);
  const [userName, setUserName] = useState<string>("");
  const [userNameRequired, setUserNameRequired] = useState<boolean>(false);
  const [userNameVerify, setuserNameVerify] = useState<boolean>();
  const [email, setEmail] = useState<string>();
  const [appId, setAppId] = useState<string>();

  const [disabilities, setDisabilities] = useState<string[]>([]);
  const [country, setCountry] = useState();
  const [userRoles, setUserRoles] = useState();

  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const setCountryName = (count: any) => {
    setCountry(count);
  };

  useEffect(() => {
    if (session && session.email) {
      setEmail(session.email);
    } else {
      setEmail(emailAuthId);
    }
    // eslint-disable-next-line
  }, [session, emailAuthId]);

  const keyCollection: any = {};
  const setExtentCollection = (extension: any, extensionValue: any) => {
    keyCollection[extension] = extensionValue;
  };

  const verifyUsername = async () => {
    setuserNameVerify(undefined);
    try {
      const response = await fetch(`${API_URL}/username_availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Security-Policy": "upgrade-insecure-requests",
        },
        body: JSON.stringify({
          _username: userName,
        }),
      });
      const data = await response.json();
      if (data.message === "username available.") {
        setuserNameVerify(true);
      } else {
        setuserNameVerify(false);
      }
    } catch (error) {
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!country || !userRoles || !userName || disabilities.length === 0) {
      toast.closeAll();
      toast({
        title: "Please fill all the required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (!userNameVerify) {
      toast.closeAll();
      toast({
        title:
          "Please check the availability of your username before submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    setSubmitIsLoading(true);

    try {
      const imgUrl = session?.image.replace("=s96-c", "");
      const extentArray: any = [];
      disabilities.forEach((dis: any) => {
        extentArray.push(keyCollection[dis]);
      });
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Security-Policy": "upgrade-insecure-requests",
        },
        body: JSON.stringify({
          _uid_: session?.id || "tester_tester",
          name_: fullName,
          _username: userName,
          _email: email,
          _disability: disabilities.join(),
          extent_ofdisability: extentArray.join(),
          _country: country,
          _usertype: userRoles,
          _image_url: imgUrl || "",
          provider_: session?.provider || "email",
          _application_id: appId || 0,
        }),
        // body: JSON.stringify({
        //   _uid: session.user.uid.sub,
        //   name_: session.user.name,
        //   _email: session.user.email,
        //   _disability: disabilities.join(),
        //   extent_ofdisability: '0',
        //   _country: country,
        //   _usertype: 'provider',
        //   _image_url: session.user.image.replace('=s96-c', ''),
        // }),
      });
      const data = await response.json();

      if (data && data.token) {
        localStorage.setItem("access-enable-token", data.token);
        router.push("/");
        setTimeout(() => {
          setSubmitIsLoading(false);
        }, 2500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   let reqUrl = 'https://172-105-61-130.ip.linodeusercontent.com:5000/alluserroles';
  //   let reqObj = {
  //     method: 'GET',
  //   };
  // let response = fetch(reqUrl, reqObj);
  // const json = response.JSON();

  // const getRoleData = async () => {
  //   const request = await axios
  //     .get("https://172-105-61-130.ip.linodeusercontent.com:5000/alluserroles")
  //     .then((response) => response.data);
  //     let rolesname = {...request.roles}
  //     setUserRole(rolesname)
  // };

  // countryList.forEach((country: any) => {
  //   setCountries([
  //     ...countries,
  //     {
  //       name: country['name']['common'],
  //       code: country['cca2'],
  //       flag: country['flags']['svg'],
  //     },
  //   ])
  // countries.push({
  //   name: country['name']['common'],
  //   code: country['cca2'],
  //   flag: country['flags']['svg'],
  // })
  // })


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="iconName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src={session?.image.replace("=s96-c", "")} />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="fullName">
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Full Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <Input
              placeholder="johndoe"
              _placeholder={{ color: "gray.500" }}
              type="text"
              isRequired
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setuserNameVerify(undefined);
              }}
              errorBorderColor={"crimson"}
              isInvalid={userNameVerify === false}
            />
            <InputRightElement width="6.5rem">
              {!userNameVerify ? (
                userNameVerify === false ? (
                  <Button
                    bgColor={"crimson"}
                    color={"white"}
                    h="1.75rem"
                    mr="0.5rem"
                    aria-label="Unavailable"
                  >
                    Unavailable
                  </Button>
                ) : (
                  <Button
                    h="1.75rem"
                    mr="0.5rem"
                    aria-label="Check Username"
                    onClick={() => {
                      if (userName !== "") {
                        setUserNameRequired(false);
                        verifyUsername();
                      } else {
                        setUserNameRequired(true);
                      }
                    }}
                  >
                    Verify
                  </Button>
                )
              ) : (
                <Button
                  colorScheme={"teal"}
                  h="1.75rem"
                  mr="0.5rem"
                  aria-label="Username Available"
                >
                  Available
                </Button>
              )}
            </InputRightElement>
          </InputGroup>
          {userNameRequired && userName === "" ? (
            <FormHelperText color={"crimson"}>
              Username required.
            </FormHelperText>
          ) : userNameVerify === false ? (
            <FormHelperText color={"crimson"}>
              Username is not available.
            </FormHelperText>
          ) : userNameVerify ? (
            <FormHelperText color={"teal"}>
              Username is available.
            </FormHelperText>
          ) : (
            <FormHelperText>
              You can set your username only once, so please choose wisely
            </FormHelperText>
          )}
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
          />
        </FormControl>
        <FormControl id="text">
          <FormLabel>User Role</FormLabel>
          <UserRoleSelect setUserRoles={setUserRoles} userRoles={userRoles} />
        </FormControl>
        {userRoles === "Developer" && (
          <FormControl id="appId">
            <FormLabel>Associated Application</FormLabel>
            <AppDevRoleSelect setAppId={setAppId} />
          </FormControl>
        )}
        <FormControl id="country" isRequired>
          <FormLabel>Country</FormLabel>
          <CountrySelect setCountryName={setCountryName} />
        </FormControl>
        <FormControl id="disablities" isRequired>
          <FormLabel>Disabilities</FormLabel>
          <CheckboxGroup
            colorScheme="blue"
            onChange={(v: string[]) => {
              if (v.includes("No Disability")) {
                setDisabilities([]);
                setDisabilities(["No Disability"]);
              } else {
                setDisabilities(v);
              }
            }}
          >
            <Stack>
              <Checkbox value="No Disability">No Disability</Checkbox>
              <Checkbox
                isDisabled={disabilities.includes("No Disability")}
                value="Visual Disability"
              >
                Visual Disability
              </Checkbox>
              <Checkbox
                isDisabled={disabilities.includes("No Disability")}
                value="Hearing Disability"
              >
                Hearing Disability
              </Checkbox>
              <Checkbox
                isDisabled={disabilities.includes("No Disability")}
                value="Physical / Orthopaedic Disability"
              >
                Physical / Orthopaedic Disability
              </Checkbox>
              <Checkbox
                isDisabled={disabilities.includes("No Disability")}
                value="Learning Disability"
              >
                Learning Disability
              </Checkbox>
              <Checkbox
                isDisabled={disabilities.includes("No Disability")}
                value="Intellectual / Neural Disability"
              >
                Intellectual / Neural Disability
              </Checkbox>
              <Checkbox
                isDisabled={disabilities.includes("No Disability")}
                value="Speech Disability"
              >
                Speech & Language related Impairment
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>

        {disabilities.length > 0 && !disabilities.includes("No Disability") && (
          <FormControl id="extent_of_disablities" isRequired>
            <FormLabel>Extent of Disabilities</FormLabel>
            {disabilities.map((disability: any, index) => {
              setExtentCollection(disability, 50);
              return (
                <>
                  <DisabilityExtentSlider
                    key={index}
                    disability={disability}
                    setExtentCollection={setExtentCollection}
                  />
                </>
              );
            })}
          </FormControl>
        )}
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            isLoading={submitIsLoading}
            loadingText="Submitting"
            onClick={(e: any) => handleSubmit(e)}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
