import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";
import {
  Box,
  Flex,
  Tag,
  Text,
  IconButton,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  chakra,
  Input,
  VStack,
  Button,
  Divider,
  Grid,
  GridItem,
  Container,
  HStack,
  Select,
  Td,
  Tr,
  Tbody,
  Table,
  Th,
  Thead,
  Avatar,
  Heading,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Stack,
  Checkbox,
  Alert,
  AlertIcon,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  MailruShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Header from "components/Header";
import AllDetails from "./alldetails";
import BugsDetails from "./bugsdetail";
// import StarRatings from "react-star-ratings";
import ReactStars from "react-rating-stars-component";
// import BugCard from "../BugCard";
// import ReactPaginate from "react-paginate";
// import { AuthContext } from "../../context/AuthContext.js"

import ReviewDetails from "./reviewdetails";
import { API_URL } from "envconfig";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import UserPreferences from "components/auth/UserPreferences";
import { FaShareAlt } from "react-icons/fa";
import Footer from "components/Footer";
export default function AppDetail({ app }: any) {
  const [show, setshow] = useState("details");
  const router = useRouter();
  let id = router.query.app_id;
  const [appid, setappid] = useState<any>();
  const [AppDetails, setAppDetails] = useState<any>();
  const [showStar, setShowStar] = useState(false);
  // For Bug & Review Screen Work
  const [BugDetails, setBugDetails] = useState([]);
  const [BugReviews, setBugReviews] = useState([]);
  const [rating, setRating] = useState<number>();
  const [searchQuery, setsearchQuery] = useState(null);
  const [searchQuery01, setsearchQuery01] = useState(null);
  const [SortBy, setSortBy] = useState("old");
  const [FilterPlatform, setFilterPlatform] = useState(["iOS", "android"]);
  const [FilterVersionsIOS, setFilterVersionsIOS] = useState([]);
  const [FilterVersionsAnd, setFilterVersionsAND] = useState([]);
  const [FilterCategory, setFilterCategory] = useState([]);
  const [reFetch, setreFetch] = useState(true);
  const [ratedStar, setRatedStar] = useState(true);
  const starRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 3;
  const pagesVisited = pageNumber * usersPerPage;
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
  // const auth = useContext(AuthContext);
  const pageCount = Math.ceil(BugDetails.length / usersPerPage);
  // const changePage = ({ selected }) => {
  //   setPageNumber(selected);
  // };

  const handleSearchChange = (event: any) => {
    setsearchQuery(event.target.value);
  };

  var tempBugDetails = BugDetails;
  var tempBugReviews = BugReviews;

  const handleSortBy = (event: any) => {
    if (event.target.value === "new" && SortBy !== "new") {
      tempBugDetails = [...BugDetails].reverse();
      setBugDetails(tempBugDetails);
      setSortBy(event.target.value);
    } else if (event.target.value === "old" && SortBy !== "old") {
      tempBugDetails = [...BugDetails].reverse();
      setBugDetails(tempBugDetails);
      setSortBy(event.target.value);
    }
  };

  const handlePlatformSelect = (event: any) => {
    if (event.target.checked) {
      let temp = [...FilterPlatform];
      temp.push(event.target.value.toLowerCase());
      setFilterPlatform(temp);
    } else {
      let temp = [...FilterPlatform];
      const index = temp.indexOf(event.target.value.toLowerCase());
      if (index > -1) {
        temp.splice(index, 1);
        setFilterPlatform(temp);
      }
    }
  };

  // const handleVersionSelectIOS = (event:any) => {
  //   if (event.target.checked) {
  //     let temp = [...FilterVersionsIOS];
  //     temp.push(event.target.value);
  //     setFilterVersionsIOS(temp);
  //   } else {
  //     let temp = [...FilterVersionsIOS];
  //     const index = temp.indexOf(event.target.value);
  //     if (index > -1) {
  //       temp.splice(index, 1);
  //       setFilterVersionsIOS(temp);
  //     }
  //   }
  // };

  const displayData = tempBugDetails.slice(
    pagesVisited,
    pagesVisited + usersPerPage,
  );

  // let starRatings;

  // if (ratings) {
  //   starRatings = (
  //     <Flex alignItems={"center"}>
  //       <StarRatings
  //         rating={ratings !== null ? ratings : 0}
  //         //rating={"2.5"}
  //         starRatedColor="teal"
  //         numberOfStars={5}
  //         name="rating"
  //         starDimension="25px"
  //       />
  //       {ratings !== 0 && <chakra.h2>({ratings.toPrecision(2)})</chakra.h2>}
  //     </Flex>
  //   );
  // } else {
  //   null;
  // }

  useEffect(() => {
    if (appid) {
      const getAppDetails = async () => {
        const request = await axios
          .get(
            `https://172-105-61-130.ip.linodeusercontent.com:5000/appdetails?app_id=${appid}`,
          )
          .then((response) => response.data);
        const ratingCheck = await fetch(
          `https://172-105-61-130.ip.linodeusercontent.com:5000/check_rated?app_id=${appid}`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("access-enable-token")!,
            },
          },
        ).then((response) => response.json());
        if (ratingCheck.message !== "You've already rated this app.") {
          //alert("You have Already Rated this Application");
          setRatedStar(false);
        }
        setAppDetails(request);
        setRating(request?.rating);
        console.log("response-->",ratedStar)
      };
      getAppDetails();
    }
    // eslint-disable-next-line
  }, [appid]);

  useEffect(() => {
    setappid(id);
  }, [id]);

  // var a = displayData.filter((data: any) => {
  //   if (searchQuery == null) return data;
  //   else if (
  //     data.bug_description.toLowerCase().includes(searchQuery) ||
  //     data.steps_to_reproduce.toLowerCase().includes(searchQuery)
  //   ) {
  //     return data;
  //   }
  // });

  // a = a.filter((data: any) => {
  //   if (FilterPlatform.length === 0) return a;
  //   else if (FilterPlatform.includes(data.platform.toLowerCase())) {
  //     return data;
  //   }
  // });

  // a = a.filter((data: any) => {
  //   if (FilterVersionsIOS.length === 0 || FilterVersionsAnd.length === 0)
  //     return a;
  //   else if (
  //     FilterVersionsIOS.includes(data.version) ||
  //     FilterVersionsAnd.includes(data.version)
  //   ) {
  //     return data;
  //   }
  // });

  // a = a.filter((data: any) => {
  //   if (FilterCategory.length === 0) return a;
  //   else if (FilterCategory.includes(data.bug_category)) {
  //     return data;
  //   }
  // });
  // const ratingChanged = (newRating: any) => {
  //   if (localStorage.getItem("access-enable-token") !== null) {
  //     checkRatedOrNot(newRating);
  //   } else {
  //     Router.push("/auth");
  //   }
  // };

  const rateApplication = async () => {
    // // const request = await axios
    // //   .get(
    // //     `https://172-105-61-130.ip.linodeusercontent.com:5000/check_rated?app_id=${appid}`
    // //   )
    // //   .then((response) => response.data);
    // const request = await fetch(
    //   `https://172-105-61-130.ip.linodeusercontent.com:5000/check_rated?app_id=${appid}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: localStorage.getItem("access-enable-token")!,
    //     },
    //   },
    // ).then((response) => response.json());
    // if (request.message === "You've already rated this app.") {
    //   //alert("You have Already Rated this Application");
    //   setRatedStar(false);
    // } else {
    const response = await fetch(`${API_URL}/add_rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Security-Policy": "upgrade-insecure-requests",
        Authorization: localStorage.getItem("access-enable-token")!,
      },
      body: JSON.stringify({ app_id: appid, rating_stars: rating }),
    }).then((res) => setShowStar(false));
    // }
  };

  useEffect(() => {
    if (rating !== 0) {
      if (rating && rating < 1 && rating !== 0) {
        setRating(1);
      } else if (rating && rating > 5) {
        setRating(5);
      } else if (rating && rating % 1 !== 0) {
        if (Number((rating.toString()).split(".")[1]) < 5) {
          setRating(Math.floor(rating));
        } else {
          setRating(Math.ceil(rating));
        }
      }
    }
  }, [rating]);

  const shareUrl = "https://accessenable.com/" + router.asPath;
  const title:any = router.query.title;
  
  return (
    <Box h="100%" w="100%">
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
        h="100%"
        w="100%"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Box p={[10, 10, 20]} w="100%" h="30%">
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-evenly"
            h="100%"
          >
            <HStack>
              <Heading>{AppDetails?.Apps?.app_name}</Heading>
              <Menu>
                <MenuButton zIndex={5}>
                  <IconButton
                    // onClick={() => {
                    //   router.push({
                    //     pathname: `/appdetails/${item.app_id}`,
                    //   });
                    // }}
                    colorScheme="orange"
                    aria-label="Share"
                    variant={"solid"}
                    icon={<FaShareAlt />}
                  />
                </MenuButton>
                <MenuList zIndex={5}>
                  <MenuItem>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            style={{display: "flex"}}
            // className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          Share on Twitter
          </TwitterShareButton>
         
          </MenuItem>
          <MenuItem>
              <LinkedinShareButton 
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
                style={{display: "flex"}}>
              <LinkedinIcon size={32} round />
              Share on LinkedIn
              </LinkedinShareButton>
          </MenuItem>
            <MenuItem>
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  style={{display: "flex"}}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                Share on Facebook
                </FacebookShareButton>
          </MenuItem>
          <MenuItem url={shareUrl} subject={title}>
                <EmailShareButton
                url={shareUrl}
                subject={title}
                style={{display: "flex"}}
                className="Demo__some-network__share-button"
              >
                <EmailIcon size={32} round />
                Share on Emails
              </EmailShareButton>
          </MenuItem>
          <MenuItem>
              <WhatsappShareButton
              url={shareUrl}
              title={title}
              style={{display: "flex"}}
              className="Demo__some-network__share-button"
              >
              <WhatsappIcon size={32} round />
              Share on Whatsapp
              </WhatsappShareButton>
          </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <Flex alignItems="center" flexWrap="wrap">
              <Tag size={"md"} variant="solid" colorScheme="orange">
                {AppDetails?.Apps?.web_or_app}
              </Tag>

              {/* {!ratedStar && ( */}
                <Button
                  colorScheme="orange"
                  ml={3}
                  mr={3}
                  fontSize={15}
                  onClick={() => setShowStar(true)}
                >
                  Rate the Application
                </Button>
              {/* )} */}

               {!ratedStar ? (
                <Tag colorScheme="white" marginTop={-2}>
                <ReactStars
                  count={5}
                  edit={false}
                  value={AppDetails?.rating}
                  // onChange={ratingChanged}
                  size={32}
                  isHalf={false}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </Tag>
              ) :
              <> 
              {AppDetails?.rating !== undefined && AppDetails?.rating !== null && (
                <>
                  {" "}
                  <Tag colorScheme="white" marginTop={-2}>
                    <ReactStars
                      count={5}
                      edit={false}
                      value={AppDetails?.rating}
                      // onChange={ratingChanged}
                      size={32}
                      isHalf={false}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                  </Tag>
                  <Text fontWeight="bold" fontSize={"20"} marginBottom="1">
                    [{(AppDetails?.rating) + ' stars'}]
                  </Text>
                </>
              )}
              </> }

              
            </Flex>
            <Box paddingTop={5}>
              <Text>Industry: {AppDetails?.Apps?.industry_name}</Text>
            </Box>
          </Flex>
        </Box>
        <Modal
          isCentered
          // size="lg"
          isOpen={showStar}
          closeOnOverlayClick={false}
          closeOnEsc={false}
          onClose={() => setShowStar(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Rate Application</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {typeof window !== "undefined" &&
              localStorage?.getItem("access-enable-token") !== null ? (
                <>
                  {" "}
                  <Tag colorScheme="white" marginTop={-2}>
                    <ReactStars
                      count={5}
                      value={rating}
                      onChange={(rate: any) => setRating(rate)}
                      size={32}
                      ref={starRef}
                      // edit={false}
                      isHalf={false}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                  </Tag>
                  <Input
                    placeholder="Basic usage"
                    type="number"
                    min={0}
                    max={5}
                    value={rating}
                    onChange={(e: any) => {
                      setRating(e.target.value);
                    }}
                  />
                </>
              ) : (
                <Alert status="warning">
                  <AlertIcon />
                  You need to
                  <Link href="/auth" paddingInline={1}>
                    Login
                  </Link>
                  to report a Bug
                </Alert>
              )}
            </ModalBody>
            <ModalFooter>
              {typeof window !== "undefined" &&
              localStorage?.getItem("access-enable-token") !== null ? (
                <Button colorScheme="blue" mr={4} onClick={rateApplication}>
                  Save
                </Button>
              ) : null}
              <Button onClick={() => setShowStar(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Box paddingInline={[10, 10, 20]} w="100%" h="70%">
          <Tabs h="100%" variant="soft-rounded" colorScheme="orange">
            <TabList>
              <Tab
                onClick={() => {
                  setshow("details");
                }}
              >
                Details
              </Tab>
              <Tab
                onClick={() => {
                  setshow("bugs");
                }}
              >
                Bugs
              </Tab>
              <Tab
                onClick={() => {
                  setshow("reviews");
                }}
              >
                Reviews
              </Tab>
            </TabList>
            <TabPanels h="100%">
              <TabPanel w="100%" h="100%" paddingInline={0}>
                {AppDetails ? <AllDetails app={AppDetails.Apps} data={AppDetails}/> : null}
              </TabPanel>

              <TabPanel w="100%" h="100%" paddingInline={0}>
                {AppDetails ? <BugsDetails data={AppDetails} /> : null}
              </TabPanel>
              <TabPanel w="100%" h="100%" paddingInline={0}>
                {AppDetails ? <ReviewDetails data={AppDetails} /> : null}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}
