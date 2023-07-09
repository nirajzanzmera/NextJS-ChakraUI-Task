import {
  chakra,
  Box,
  Button,
  Stack,
  useColorModeValue,
  Text,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Flex,
  Stat,
  FormControl,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spacer,
  Center,
  Heading,
  useMediaQuery,
  Divider,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Links from "next/link";
import axios from "axios";
import CountUp from "react-countup";
import FeedbackImg from "../../feedback.png";
import { AddIcon } from "@chakra-ui/icons";
// import { API_URL_SEARCH } from "envconfig";
import { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import ArticleList from "./application/listTemplate";
import { useRouter } from "next/router";
import ReactStars from "react-rating-stars-component";
import BugCard from "./featured-reviews/Bug-Card";
import ReviewCard from "./featured-reviews/ReviewCard";
import _ from "lodash";
import moment from "moment";
import Header from "./Header";
import styles from "../../styles/hero.module.css";
import { AiFillFileText } from "react-icons/ai";

const Hero = ({ modalOpener, onOpenModalBug, onOpenModalReview }: any) => {
  const [user, setUser] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [whatis, setwhatis] = useState("bug");
  const [totlabug, setTotalBugs] = useState<any>();
  const [totalreview, setTotalReview] = useState<any>();
  const [search, setSearch] = useState<any>("");
  const [SortBy, setSortBy] = useState<any>();
  const [tokenvalue, setTokenValue] = useState("");
  const [sessionState, setSessionState] = useState<any>();
  const [modalBug, setModalBug] = useState(false);
  const [modalReview, setModalReview] = useState(false);
  const [activityData, setActivityData] = useState<any>();
  const [userData, setUserData] = useState<any>(null);
  const [cmtData, setCmtData] = useState<any>([]);
  const [bugData, setBugData] = useState<any>([]);
  const [tokenData, setTokenData] = useState<any>([]);


  const router = useRouter();
  const [isLargerThan425] = useMediaQuery('(min-width: 425px)')
  const chakracolor = useColorModeValue("gray.600", "gray.300");
  const linkcolors = useColorModeValue("gray.700", "gray.200");
  const backColor = useColorModeValue("white", "gray.900");
  const headingbackColor = useColorModeValue("gray.800", "white");
  const diffbackColor = useColorModeValue("white", "gray.900");
  const subheading = useColorModeValue("gray.500", "gray.600");
  const introHeading = useColorModeValue("gray.600", "gray.400");
  const descHeading = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    var tokenvalue: any = localStorage.getItem("access-enable-token");
    setTokenData(tokenvalue);
  }, []);

  const getBugsReviewData = async () => {
    const request = await axios
      .get(`https://172-105-61-130.ip.linodeusercontent.com:5000/b_r_homepage`)
      .then((response) => response.data);

    setTotalReview(request["totalreviews"]);
    setTotalBugs(request["totalbugs"]);
  };
  useEffect(() => {
    getBugsReviewData();
  }, []);

  const getUserData = async () => {
    const request = await axios
      .post(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/mydetails`,
        { _want: "login" },
        {
          headers: {
            // "Content-Type":"multipart/form-data",
            Authorization: localStorage.getItem("access-enable-token") || "",
          },
        }
      )
      .then((response) => response.data);

    setUserData(request);
  };
  useEffect(() => {
    var tdata = window.localStorage.getItem("access-enable-token")
   if (tdata?.length != 0 || tdata != null) { 
    getUserData();    
    }
  }, []);

  const getMyActivityData = async () => {
    if(userData?.details?.user_type){ 
    var applications_id = userData?.details?.application_id;
    var userTypes: any;
    if(userData?.details?.user_type ==  "Developer"){
     userTypes = "Yes"
    }else{
      userTypes = "No"
    } 
      const request = await axios
      .post(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/myactivity`,
        {"is_developer":userTypes , "app_id":applications_id },
        {
          headers: {
            // "Content-Type":"multipart/form-data",
            Authorization: localStorage.getItem("access-enable-token") || "",
          },
        }
      )
      .then((response) => response.data);

    setActivityData(request);
    }
  };
  useEffect(() => {
  var tdata = window.localStorage.getItem("access-enable-token")
   if (tdata?.length != 0 || tdata != null) { 
     getMyActivityData();    
    }
  },[userData]);

  useEffect(() => {
    var CommentDatas: any = [];
    var BugsData: any = [];
    activityData?.topreviewcomments?.map((item: any) => {
      item?.map((cmt: any) => {
        //  CommentDatas[cmt.created_by] = cmt.comment
        let cmtobj: any = {};
        cmtobj[cmt.created_by] = cmt.comment;
        CommentDatas.push(cmtobj);
        // CommentDatas.push(cmt.comment)
      });
    });
    activityData?.topbugcomments?.map((item: any) => {
      item?.map((bug: any) => {
        let bugobj: any = {};
        bugobj[bug.created_by] = bug.comment;
        BugsData.push(bugobj);
      });
    });
    setCmtData(CommentDatas);
    setBugData(BugsData);
  }, [activityData]); 


  function createMarkup(commentText: any) {
    return { __html: commentText };
  }

  const handleSearch=(e:any)=>{
    e.preventDefault();
    if (search == "") {
      router.push(
        {
          pathname: '/globalSearch',
          query: {value : "*"},
        },
        '/globalSearch', // "as" argument
      )
    } else {
    router.push(
      {
        pathname: '/globalSearch',
        query: {value : search},
      },
      '/globalSearch', // "as" argument
    )}
  }

  return (
    <main>
      <Box px={8} mx="auto" role="Landing Page">
        <Box
          w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
          mx="auto"
          textAlign={{ base: "left", md: "center" }}
        >
          {tokenvalue == null ? 
          <>
          <Box py={6}>
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            lineHeight="none"
            letterSpacing={{ base: "normal", md: "tight" }}
            color={"gray.900"}
            role="Header"
          >
            All your{" "}
            <Text
              display={{ base: "block", lg: "inline" }}
              w="full"
              bgClip="text"
              bgGradient="linear(to-r, green.400,purple.500)"
              fontWeight="extrabold"
            >
              customer feedback
            </Text>{" "}
            in one single place
          </chakra.h1>
          <chakra.p
            px={{ base: 0, lg: 24 }}
            mb={6}
            fontSize={{ base: "lg", md: "xl" }}
            color={"gray.600"}
          >
            Access Enable is a feature voting and reporting forum where users
            can discuss features and flaws completing a customer feedback loop.
          </chakra.p>
          </Box>
          </>
          :""}
          <form onSubmit={handleSearch}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            mb={{ base: 4, md: 8 }}
            spacing={2}
            justifyContent={"center"}
            py={6}
          >
            {/* {isLargerThan425 ? "padding-top":{20px} : "padding-top:200px"} */}
            {/* <form onSubmit={handleSearch}> */}
            <InputGroup role="Search">
            
              <Box w="90%" marginRight="4">
                <Flex
                  flexDirection="column"
                  alignItems={"flex-start"}
                  w="100%"
                  h="100%"
                  justifyContent={"flex-start"}
                >
                <FormControl>
                    <Input
                      placeholder="Search"
                      onChange={(e:any) => {

                        setSearch(e.target.value)
                      }}
                    ></Input>
                  </FormControl>
                </Flex>
              </Box>
              </InputGroup>
              <Box>
                <Button
                  height={{base:"40px", md:"40px"}}
                  size="sm"
                  type="submit"
                  bg={"green"}
                  color={"white"}
                  // onClick={() => 
                  //   router.push(
                  //     {
                  //       pathname: '/globalSearch',
                  //       query: {value : search},
                  //     },
                  //     '/globalSearch', // "as" argument
                  //   )}
                >
                  Search
                </Button>
              </Box>
              {/* </form> */}
          </Stack>
          </form>
        {tokenvalue != null ?
        <> 
          <Center py={6}>
            <Stack
              borderWidth="1px"
              borderRadius="lg"
              w={{ sm: "100%", md: "75%" }}
              height={{ sm: "auto", md: "auto" }}
              direction={{ base: "column", md: "column" }}
              // boxShadow={"2xl"}
              padding={4}
            >
              <Heading>My Activity</Heading>
              <Box display={"flex"} width={"100%"} padding={2}>
                <Stack
                  flex={0.5}
                  borderWidth="1px"
                  borderRadius="lg"
                  height={{ sm: "20%", md: "100%" }}
                  // bg={backColor}
                  boxShadow={"2xl"}
                  padding={4}
                  margin={2}
                >
                  {/* <Flex>
                    <AiFillFileText />
                  </Flex> icon */}
                  <Stack
                    // flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}
                  >
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {activityData?.mybugscount}
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                    My Bugs 
                    </Text>

                    {/* <Stack
                    align={"center"}
                    justify={"center"}
                    direction={"row"}
                    mt={6}
                  ></Stack> */}
                  </Stack>
                </Stack>
                <Stack
                  flex={0.5}
                  borderWidth="1px"
                  borderRadius="lg"
                  height={{ sm: "20%", md: "100%" }}
                  bg={backColor}
                  boxShadow={"2xl"}
                  padding={4}
                  margin={2}
                >
                  {/* <Flex>
                    <AiFillFileText />
                  </Flex> icon*/}
                  <Stack
                    // flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}
                  >
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {activityData?.myreviewscount}
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                    My Reviews
                    </Text>

                   
                  </Stack>
                </Stack>
              </Box>

              <Box width={"100%"} height={"100%"} padding={2}>
                <Stack
                  textAlign={"left"}
                  borderWidth="1px"
                  borderRadius="lg"
                  w={{ sm: "100%", md: "100%" }}
                  height={{ sm: "100%", md: "100%" }}
                  bg={backColor}
                  boxShadow={"2xl"}
                  padding={4}
                >
                  <Box w={{ lg: "100%" }}>
                    <chakra.p textAlign={"left"} fontWeight={"bold"}>Top 3 recent Bugs</chakra.p>
                    <UnorderedList>
                      {activityData?.dev_bugs_top3
                        .slice(0, 3)
                        .map((item: any) => {
                          return (
                            <>
                              <ListItem
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  router.push({
                                    pathname: `/appdetails/${item.application_slug}/bug/${item.bug_slug}`,
                                  });
                                }}
                              >
                                {item.username} posted {item.bug_description}
                              </ListItem>
                            </>
                          );
                        })}
                    </UnorderedList>
                    <Link href="#">
                        <a>View more</a>
                    </Link>
                    <chakra.p textAlign={"left"} fontWeight={"bold"}>Top 3 recent Reviews</chakra.p>
                    <UnorderedList>
                      {activityData?.dev_reviews_top3
                        .slice(0, 3)
                        .map((item: any) => {
                          return (
                            <>
                              <ListItem
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  router.push({
                                    pathname: `/appdetails/${item.application_slug}/review/${item.review_slug}`,
                                  });
                                }}
                              >
                                {item.username} posted {item.title}
                              </ListItem>
                            </>
                          );
                        })}
                    </UnorderedList>
                    <Link href="#">
                        <a>View more</a>
                    </Link>
                    <chakra.p textAlign={"left"} fontWeight={"bold"}>Recent Engagement</chakra.p>
                    <chakra.p textAlign={"left"}>
                      Latest Comments on your Bugs
                    </chakra.p>
                    <UnorderedList>
                      {bugData.slice(0, 3)?.map((item: any) => {
                        return (
                          <>
                            <ListItem
                              onClick={() => {
                                router.push({
                                  pathname: `/appdetails/${item.application_slug}/bug/${item.bug_slug}`,
                                });
                              }}
                            >
                              <chakra.p display={"flex"}>
                                {/* <chakra.span>{item.created_by}</chakra.span> */}
                                <chakra.span>
                                  {item.created_by} commented{" "}
                                </chakra.span>
                                &nbsp;
                                <div>
                                  <chakra.span
                                    dangerouslySetInnerHTML={createMarkup(
                                      item.comment
                                    )}
                                  />
                                </div>
                                on
                                {item.bug_description}
                              </chakra.p>
                            </ListItem>
                          </>
                        );
                      })}
                    </UnorderedList>
                    <chakra.p textAlign={"left"}>
                      Latest Comments on your Reviews
                    </chakra.p>
                    <UnorderedList>
                      {cmtData.slice(0, 3)?.map((item: any) => {
                        return (
                          <>
                            <ListItem>
                              <chakra.p display={"flex"}>
                                {/* <chakra.span>{Object.keys(item).join("")}</chakra.span> */}
                                <chakra.span>
                                  {item.created_by} commented{" "}
                                </chakra.span>
                                &nbsp;
                                <div>
                                  <chakra.span
                                    dangerouslySetInnerHTML={createMarkup(
                                      item[Object.keys(item).join("")]
                                    )}
                                  />{" "}
                                  on {item.title}
                                </div>
                              </chakra.p>
                            </ListItem>
                          </>
                        );
                      })}
                    </UnorderedList>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Center>
        </>
        : 
        <></> }
          
          {/* </Stack> */}
          {/* ----------------------------------------------------- */}
          <Stack
            direction={{ base: "column", sm: "row" }}
            mb={{ base: 4, md: 8 }}
            spacing={2}
            justifyContent={"center"}
            role="App Introduction"
          >
            <Box
              bg={diffbackColor}
              mx={{ lg: 8 }}
              display={{ lg: "flex" }}
              maxW={{ lg: "5xl" }}
              shadow={{ lg: "lg" }}
              rounded={{ lg: "lg" }}
            >
              <Box w={{ lg: "50%" }}>
                <Box
                  h={{ base: 64, lg: "full" }}
                  rounded={{ lg: "lg" }}
                  bgSize="cover"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')",
                  }}
                ></Box>
              </Box>
              <Box
                // py={6}
                px={6}
                maxW={{ base: "xl", lg: "5xl" }}
                w={{ lg: "50%" }}
              >
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
                <chakra.p
                  mt={4}
                  color={introHeading}
                >
                  Facing accessibility issues with any apps or websites? Quickly
                  post a bug with some details about your experience and let
                  your voice be heard!
                </chakra.p>
                <Flex>
                  <Center>
                    <Box p="5" role="Bug Report Button">
                      <chakra.button
                        px={2}
                        py={1}
                        bg="gray.900"
                        fontSize="xs"
                        color="gray.100"
                        fontWeight="bold"
                        rounded="lg"
                        textTransform="uppercase"
                        size="lg"
                        _hover={{
                          bg: "gray.900",
                        }}
                        _focus={{
                          bg: "gray.400",
                        }}
                        onClick={onOpenModalBug}
                      >
                        Report Bug
                      </chakra.button>{" "}
                    </Box>
                  </Center>
                  <Spacer />

                  <Center>
                    <Box p="5" role="Total Bugs Reported">
                      <Stat>
                        <StatLabel>Bugs Reported</StatLabel>
                        <StatNumber>
                          <CountUp end={totlabug} />
                        </StatNumber>
                        <StatHelpText></StatHelpText>
                      </Stat>
                    </Box>
                  </Center>
                </Flex>

                <chakra.p
                  mt={4}
                  color={descHeading}
                >
                  Got the hang of how to make the most out of an app/website?
                  Post a review and help fellow users by sharing your
                  experience!
                </chakra.p>

                <Flex>
                  <Center>
                    <Box p="5" role="Review Report Section">
                      <chakra.button
                        size="lg"
                        px={2}
                        py={1}
                        bg="gray.900"
                        fontSize="xs"
                        color="gray.100"
                        fontWeight="bold"
                        rounded="lg"
                        textTransform="uppercase"
                        _hover={{
                          bg: "gray.900",
                        }}
                        _focus={{
                          bg: "gray.400",
                        }}
                        onClick={onOpenModalReview}
                      >
                        Add Review
                      </chakra.button>
                    </Box>
                  </Center>
                  <Spacer />
                  <Center>
                    <Box p="5" role="Review Report Button">
                      <Stat>
                        <StatLabel>Reviews Added</StatLabel>
                        <StatNumber role="Total Review Reported">
                          <CountUp end={totalreview} />
                        </StatNumber>
                        <StatHelpText></StatHelpText>
                      </Stat>
                    </Box>
                  </Center>
                </Flex>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box
          w={{ base: "full", md: 10 / 12 }}
          mx="auto"
          mt={20}
          textAlign="center"
        >
        </Box>
      </Box>
    </main>
  );
};

export default Hero;
