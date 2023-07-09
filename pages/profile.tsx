import React, { useEffect, useState } from "react";
import {
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  Textarea,
  Button,
  Container,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import Header from "components/Header";
import { API_URL } from "envconfig";
import professionList from "././../public/assets/professionList.json";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useRouter } from "next/router";
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav";
import { Select } from "chakra-react-select";

export default function Profile() {
  const [sessionState, setSessionState] = useState<any>();
  const [modalBug, setModalBug] = useState(false);
  const [modalReview, setModalReview] = useState(false);
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
  const router = useRouter();

  const toast = useToast();

  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profession, setProfession] = useState("");
  const [otherProfession, setOtherProfession] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [loading, setLoading] = useState(false);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [changes, setChanges] = useState(true);

  useEffect(() => {
    setSessionState(localStorage.getItem("access-enable-token"));
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    try {
      setIsProfileLoaded(false);
      const response = await fetch(`${API_URL}/mydetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Security-Policy": "upgrade-insecure-requests",
          Authorization: localStorage.getItem("access-enable-token")!,
        },
        body: JSON.stringify({ _want: "mydetails" }),
      });
      const data = await response.json();
      if (data.message === "Invalid Token") {
        localStorage.removeItem("access-enable-token");
        router.push("/");
      } else {
        setBio(data.details.bio);
        setCity(data.details.city);
        setState(data.details.state);
        setLinkedin(data.details.linkedin_profile);
        setTwitter(data.details.twitter_profile);
        if (!data.details.profession) {
          setProfession("");
        } else if (professionList.indexOf(data.details.profession) > -1) {
          setProfession(data.details.profession);
        } else {
          setProfession("other");
          setOtherProfession(data.details.profession);
        }
        setIsProfileLoaded(true);
        toast({
          title: "Profile Loaded",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (err) {
    }
  };

  const handleProfileUpdate = async () => {
    setProfessionError(false);
    if (profession === "other" && otherProfession === "") {
      setProfessionError(true);
    } else {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/update_myprofile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Security-Policy": "upgrade-insecure-requests",
            Authorization: localStorage.getItem("access-enable-token")!,
          },
          body: JSON.stringify({
            state_: state,
            city_: city,
            profession_: profession === "other" ? otherProfession : profession,
            twitter_profile_: twitter,
            linkedin_profile_: linkedin,
            bio_: bio,
          }),
        });
        const data = await response.json();
        toast({
          title: "Profile Updated.",
          description: "Updation successful for the profile details",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      } catch (err) {
        toast({
          title: "Profile Update Failed.",
          description: "Updation unsuccessful for the profile details",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SkipNavLink id="main">Skip to content</SkipNavLink>
      <Header
        session={sessionState}
        onOpenModalBug={onOpenModalBug}
        onCloseModalBug={onCloseModalBug}
        modalBug={modalBug}
        onOpenModalReview={onOpenModalReview}
        onCloseModalReview={onCloseModalReview}
        modalReview={modalReview}
      />

      <SkipNavContent id="main">
        <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
          <Container maxW={{ base: "container.xl", md: "container.xl" }}>
            <SimpleGrid
              display={{ base: "initial", md: "grid" }}
              columns={{ md: 3 }}
              spacing={{ md: 6 }}
            >
              <GridItem colSpan={{ md: 1 }}>
                <Box px={[4, 0]}>
                  <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                    Profile
                  </Heading>
                  <Text
                    mt={1}
                    fontSize="sm"
                    color={useColorModeValue("gray.600", "gray.400")}
                  >
                    This information will be your public profile.
                  </Text>
                </Box>
              </GridItem>
              <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                <Box
                  shadow="base"
                  rounded={[null, "md"]}
                  overflow={{ sm: "hidden" }}
                >
                  <Skeleton isLoaded={isProfileLoaded}>
                    <Stack
                      px={4}
                      py={5}
                      bg={useColorModeValue("white", "gray.700")}
                      spacing={6}
                      p={{ sm: 6 }}
                    >
                      <FormControl id="bio">
                        <FormLabel
                          fontWeight="md"
                          color={useColorModeValue("gray.700", "gray.50")}
                        >
                          Bio
                        </FormLabel>
                        <Textarea
                          placeholder="Write here..."
                          mt={1}
                          rows={3}
                          shadow="sm"
                          focusBorderColor="blue.400"
                          fontSize={{ sm: "sm" }}
                          value={bio}
                          onChange={(e: any) => {
                          setBio(e.target.value)
                          setChanges(false)
                          }}
                        />
                        <FormHelperText>
                          Brief description for your profile.
                        </FormHelperText>
                      </FormControl>

                      <Stack direction="column">
                        <Text>Profession </Text>

                        <Select
                          value={
                            profession
                              ? {
                                  label: profession,
                                  value: profession,
                                }
                              : undefined
                          }
                          placeholder="Search Profession..."
                          isClearable
                          onChange={(vals: any) => {
                            setChanges(false)
                            setProfession(vals?.value);
                          }}
                          options={professionList?.map(
                            (professionItem: any, idx: any) => ({
                              label: professionItem,
                              value: professionItem,
                            }),
                          )}
                        />
                        {/* <AutoComplete
                          rollNavigation
                          openOnFocus
                          defaultValue={profession}
                          value={profession}
                          onChange={(vals) => {
                            setProfession(vals);
                          }}
                        >
                          <AutoCompleteInput
                            variant="outline"
                            placeholder="Search Profession..."
                            textTransform="capitalize"
                          />
                          <AutoCompleteList>
                            {professionList.map((professionItem, oid) => (
                              <AutoCompleteItem
                                key={`professionItem-${oid}`}
                                value={professionItem}
                                label={professionItem}
                                textTransform="capitalize"
                              >
                                {professionItem}
                              </AutoCompleteItem>
                            ))}
                          </AutoCompleteList>
                        </AutoComplete> */}
                      </Stack>

                      {profession === "other" && (
                        <FormControl>
                          <FormLabel fontWeight="md" color={"gray.700"}>
                            Please Specify:
                          </FormLabel>
                          <Input
                            type="text"
                            focusBorderColor="blue.400"
                            shadow="sm"
                            w="full"
                            rounded="md"
                            placeholder="Profession"
                            value={otherProfession}
                            onChange={(e: any) => {
                              setOtherProfession(e.target.value);
                              setProfessionError(false);
                            }}
                            isInvalid={professionError}
                          />
                        </FormControl>
                      )}

                      <SimpleGrid columns={6} spacing={6}>
                        <FormControl as={GridItem} colSpan={[6, 3]}>
                          <FormLabel
                            fontWeight="md"
                            color={useColorModeValue("gray.700", "gray.50")}
                          >
                            City
                          </FormLabel>
                          <Input
                            type="text"
                            name="first_name"
                            id="first_name"
                            autoComplete="given-name"
                            focusBorderColor="blue.400"
                            shadow="sm"
                            w="full"
                            rounded="md"
                            placeholder="City"
                            value={city}
                            onChange={(e: any) => {
                              setChanges(false)
                              setCity(e.target.value)}}
                          />
                        </FormControl>

                        {/* <FormControl as={GridItem} colSpan={[6, 3]}>
                          <FormLabel
                            fontWeight="md"
                            color={useColorModeValue("gray.700", "gray.50")}
                          >
                            State
                          </FormLabel>
                          <Input
                            type="text"
                            name="last_name"
                            id="last_name"
                            autoComplete="family-name"
                            focusBorderColor="blue.400"
                            shadow="sm"
                            w="full"
                            rounded="md"
                            placeholder="State"
                            value={state}
                            onChange={(e: any) => setState(e.target.value)}
                          />
                        </FormControl> */}
                      </SimpleGrid>

                      <SimpleGrid columns={3} spacing={6}>
                        <FormControl as={GridItem} colSpan={[3, 2]}>
                          <FormLabel
                            fontWeight="md"
                            color={useColorModeValue("gray.700", "gray.50")}
                          >
                            Twitter Profile
                          </FormLabel>
                          <InputGroup>
                            <InputLeftAddon
                              bg={useColorModeValue("gray.50", "gray.800")}
                              color={useColorModeValue("gray.500", "gay.50")}
                              rounded="md"
                            >
                              https://www.twitter.com/
                            </InputLeftAddon>
                            <Input
                              type="tel"
                              placeholder="username"
                              focusBorderColor="blue.400"
                              rounded="md"
                              value={twitter}
                              onChange={(e: any) => {
                                setChanges(false)
                                setTwitter(e.target.value)}}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl as={GridItem} colSpan={[3, 2]}>
                          <FormLabel
                            fontWeight="md"
                            color={useColorModeValue("gray.700", "gray.50")}
                          >
                            Linkedin Profile
                          </FormLabel>
                          <InputGroup>
                            <InputLeftAddon
                              bg={useColorModeValue("gray.50", "gray.800")}
                              color={useColorModeValue("gray.500", "gay.50")}
                              rounded="md"
                            >
                              https://www.linkedin.com/
                            </InputLeftAddon>
                            <Input
                              type="tel"
                              placeholder="username"
                              focusBorderColor="blue.400"
                              rounded="md"
                              value={linkedin}
                              onChange={(e: any) => {
                                setChanges(false)
                                setLinkedin(e.target.value)}}
                            />
                          </InputGroup>
                        </FormControl>
                      </SimpleGrid>
                    </Stack>
                    <Box
                      px={{ base: 4, sm: 6 }}
                      py={3}
                      bg={useColorModeValue("gray.50", "gray.900")}
                      textAlign="right"
                    >
                      <Button
                        type="submit"
                        colorScheme="blue"
                        fontWeight="md"
                        onClick={() => handleProfileUpdate()}
                        isLoading={loading}
                        loadingText="Updating"
                        disabled={changes}
                      >
                        Save
                      </Button>
                    </Box>
                  </Skeleton>
                </Box>
              </GridItem>
            </SimpleGrid>
          </Container>
          {/* <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden='true'>
          <Box py={5}>
            <Box
              borderTop='solid 1px'
              borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
            ></Box>
          </Box>
        </Box> */}
        </Box>
      </SkipNavContent>
    </>
  );
}
