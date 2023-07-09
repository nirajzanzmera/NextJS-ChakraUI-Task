import React, { useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import Router from "next/router";
import moment from "moment";
import axios from "axios";
import Parser from 'html-react-parser';
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
import Footer from "components/Footer";

import Image from 'next/image'
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
  FormControl,
  Textarea,
  useToast,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import Header from "components/Header";
// import StarRatings from "react-star-ratings";
import ReactStars from "react-rating-stars-component";
// import BugCard from "../BugCard";
// import ReactPaginate from "react-paginate";
// import { AuthContext } from "../../context/AuthContext.js"

import { API_URL } from "envconfig";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import UserPreferences from "components/auth/UserPreferences";
import { FaShareAlt } from "react-icons/fa";
import {  BsPerson } from "react-icons/bs";
import { useForm } from 'react-hook-form';


const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
  ssr: false,
  loading: () => <p>Loading ...</p>,
  })

export default function BugsComment({ app }: any) {
  const router = useRouter();
  const [show, setshow] = useState("details");
  const [appid, setAppid] = useState<any>();
  const [bugId, setBugId] = useState<any>();
  const [BugDetails, setBugDetails] = useState<any>();
  const [showStar, setShowStar] = useState(false);
  const [userName, setUserName] = useState<string>();
  // For Bug & Review Screen Work
  const [BugReviews, setBugReviews] = useState([]);
  const [rating, setRating] = useState();
  const [searchQuery01, setsearchQuery01] = useState(null);
  const [SortBy, setSortBy] = useState("old");
  const [FilterPlatform, setFilterPlatform] = useState(["iOS", "android"]);
  const [FilterVersionsIOS, setFilterVersionsIOS] = useState([]);
  const [FilterVersionsAnd, setFilterVersionsAND] = useState([]);
  const [FilterCategory, setFilterCategory] = useState([]);
  const [reFetch, setreFetch] = useState(true);
  const [ratedStar, setRatedStar] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  
  const usersPerPage = 3;
  const pagesVisited = pageNumber * usersPerPage;
  const [sessionState, setSessionState] = useState<any>();
  const [modalBug, setModalBug] = useState(false);
  const [modalReview, setModalReview] = useState(false);
  const [commentModal, setCommentModal] = useState<any>({
    mode: undefined,
    commentId: undefined,
  });
  const [bugModal, setBugModal] = useState<any>({
    mode: undefined,
    bugsId: undefined,
  });
  const [commentText, setCommentText] = useState<any>("");
  const [modalcommentText, setModalCommentText] = useState(commentText);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [commentDetails, setCommentDetails] = useState<any>("");
  const [filterCommentDetails, setFilterCommentDetails] = useState<any[]>([]);
  const [Category, setCategory] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  let [isLoading,setIsLoading] = useState(0);
  const [uniqueid, setUniqueId] = useState(0);
  const [viewMore, setViewMore] =useState(5); //How many comments show by default
  const toast = useToast();
  const [screen, setScreen] =useState(0);

  // const handleChange = (e:any) => {
  //   let newData = e
  //   let content = newData.replace(/<.+?>/g, '');
  //   setCommentText(e)
  // }

  // useEffect(() => {
  // const category: any[] = Array.from(
  //   new Set(AppDetails.Bugs.map((item: any) => item.bug_category)),
  // );
  // setCategory(category);
  // const subCategory = Array.from(
  //   new Set(AppDetails.Bugs.map((item: any) => item.bug_subcategory)),
  // );
  // setBugDetails(AppDetails.Bugs);
  // setFilterCommentDetails(AppDetails["Comments Bugs"]);
  // setBugReviews(AppDetails.Reviews);
  // }, [AppDetails]);
  const firstColorMode = useColorModeValue("white", "gray.700");

  const handleRefresh = () => {
    window.location.reload();
  }

  const handleSortBy = (event: any) => {
    if (event.target.value === "new" && SortBy !== "new") {
      let tempBugDetails = [...filterCommentDetails]
        .sort(
          (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
        )
        .reverse();
      setFilterCommentDetails(tempBugDetails);
      setSortBy(event.target.value);
    } else if (event.target.value === "old" && SortBy !== "old") {
      let tempBugDetails = [...filterCommentDetails].sort(
        (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
      );
      setFilterCommentDetails(tempBugDetails);
      setSortBy(event.target.value);
    }
  };

  function createMarkup(commentText:any) {
    return {__html: commentText};
  }

  // useEffect(() => {
  //   let iOS: any = [];
  //   AppDetails.map((d: any) => {
  //     if ("iOS" === d.os.toLowerCase()) {
  //       iOS.push(d.version);
  //     }
  //   });

  //   let and: any = [];
  //   AppDetails.map((d: any) => {
  //     if ("android" === d.os.toLowerCase()) {
  //       and.push(d.version);
  //     }
  //   });

  //   setFilterVersionsIOS(iOS);
  //   setFilterVersionsAND(and);
  // }, [AppDetails]);
useEffect(()=>{
  setScreen(window.innerWidth);
})

  const handleSearch = () => {
    if (SortBy === "new") {
      const tempBugs: any[] = [...commentDetails]
        .filter((x: any) =>
          x.comment.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .sort(
          (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
        )
        .reverse();
      setFilterCommentDetails(tempBugs);
    } else {
      const tempBugs: any[] = [...commentDetails]
        .filter((x: any) =>
          x.comment.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .sort(
          (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
        );
      setFilterCommentDetails(tempBugs);
    }
  };
  const chakracolor = useColorModeValue("gray.600", "gray.300");
  const datecolor =  useColorModeValue("gray.600", "gray.400");
  const linkcolors = useColorModeValue("gray.700", "gray.200");

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
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/mydetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Security-Policy": "upgrade-insecure-requests",
          Authorization: localStorage.getItem("access-enable-token")!,
        },
        body: JSON.stringify({ _want: "login" }),
      });
      const data = await response.json();
      if (data.message !== "Invalid Token") {
        setUserName(data.details.username);
        setUniqueId(data.details.unique_id);
      }
    } catch (err) {
    }
  };
  useEffect(() => {
    setSessionState(localStorage.getItem("access-enable-token"));
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const getAppDetails = useCallback(async () => {
    setIsLoading(1)
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/bugdetails?app_id=${appid}&bug_id=${bugId}`,
      )
      .then((response) => response.data);
      setIsLoading(0)
    setBugDetails(request["Bug Details"][0]);
    setCommentDetails(request["comments"]);
    setFilterCommentDetails(request["comments"]);
  }, [appid, bugId]);

  const refreshList = () =>{
    if (appid && bugId) {
      getAppDetails();
    }
  }

  useEffect(() => {
    if (appid && bugId) {
      getAppDetails();
    }
  }, [appid, bugId, getAppDetails]);
  const addComment = async (data: any) => {
    const request = axios
      .post(
        "https://172-105-61-130.ip.linodeusercontent.com:5000/addcomment",
        JSON.stringify({
          app_id:appid,
          comment: data,
          bug_or_review: "bug",
          bug_rev_id: bugId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access-enable-token") || "",
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          getAppDetails();
          toast({
            title: "Comment Posted",
            description: response.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    setCommentModal({
      mode: undefined,
      commentId: undefined,
    });
    setCommentText("");
  };
  const editComment = async (data: any, commentId: any) => {
    const request = axios
      .put(
        "https://172-105-61-130.ip.linodeusercontent.com:5000/editcomment",
        JSON.stringify({
          app_id: appid,
          comment: data,
          comment_id: commentId,
          bug_or_review: "bug",
          bug_rev_id: bugId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access-enable-token") || "",
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          getAppDetails();

          toast({
            title: "Comment Edited",
            description: response.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    setCommentModal({
      mode: undefined,
      commentId: undefined,
    });
    setCommentText("");
    setModalCommentText("")
  };
  const deleteComment = async (commentId: any) => {
    const request = axios
      .delete(
        "https://172-105-61-130.ip.linodeusercontent.com:5000/deletecomment",
        {
          data: JSON.stringify({
            app_id: appid,
            comment_id: commentId,
            bug_or_review: "bug",
            bug_rev_id: bugId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access-enable-token") || "",
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          getAppDetails();
          toast({
            title: "Comment Deleted",
            description: response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    setCommentModal({
      mode: undefined,
      commentId: undefined,
    });
    setCommentText("");
  };

  const deleteBugs = async (bugsId: any) => {
    const request = axios
      .delete(
        "https://172-105-61-130.ip.linodeusercontent.com:5000/ed_bug",
        {
          data: JSON.stringify({
            bug_id_: bugsId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access-enable-token") || "",
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          router.push(`/appdetails/${response.data.slug}`);
          getAppDetails();
          toast({
            title: "Bugs Deleted",
            description: response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });

    setCommentModal({
      mode: undefined,
      bugsId: undefined,
    });
    setCommentText("");
  };

  useEffect(() => {
    setAppid(router.query.app_id);
    setBugId(router.query.bugs_id);
  }, [router.query.app_id, router.query.bugs_id]);

  const shareUrl = "https://accessenable.com/" + router.asPath;
  const title:any = router.query.title;

  const handleViewMore =(lenValue:number)=>{
    if(viewMore<=lenValue){
      setViewMore(viewMore+5);    //How many comments need to increase
    }
  }

  return (
    <>
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
        <Modal
          isCentered
          closeOnOverlayClick={false}
          closeOnEsc={false}
          isOpen={
            bugModal.mode === "Add" ||
            bugModal.mode === "Edit" ||
            bugModal.mode === "Delete"
          }
          onClose={() => setBugModal("")}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{bugModal.mode} Bugs</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {bugModal.mode === "Add" || bugModal.mode === "Edit" ? (
                <>
                  {/* <QuillNoSSRWrapper  
                    id="comments"
                    value={commentText}
                    onChange={(e) => {setCommentText(e);
                      setError(false);
                    }}
                    theme="snow" />
                  {error && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      Comment is required
                    </span>
                  )} */}
                </>
              ) : (
                <>{"Are you sure? You can't undo this action afterwards."}</>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                type="submit"
                colorScheme={bugModal.mode === "Delete" ? "red" : "green"}
                mr={4}
                onClick={() => {
                  setError(false);
                  if (bugModal.mode === "Delete") {
                    deleteBugs(bugModal.bugsId);
                  } else if (commentText && commentText !== "") {
                    if (bugModal.mode === "Add") {
                      addComment(commentText);
                    } else if (bugModal.mode === "Edit") {
                      editComment(modalcommentText, bugModal.bugsId);
                    }
                  } else {
                    setError(true);
                  }
                }}
              >
                {bugModal.mode}
              </Button>
              <Button
                onClick={() => {
                  setBugModal({
                    mode: undefined,
                    bugsId: undefined,
                  });
                  setCommentText("");
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Flex
          h="100%"
          w="100%"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Box p={{base:10, md: 20}} w="100%" h="30%">
            <Flex
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="space-evenly"
              h="100%"
            >
              <Flex
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  margin: "10px 0",
                }}
                direction={{ base: "column-reverse", md: "row" }}
              >
                <Box w={{ base: "100%", md: "33%" }}>
                  <Text fontSize={20}>
                    <Text fontWeight="bold">Bug Desc: </Text>
                    {BugDetails?.bug_description}
                  </Text>
                </Box>
                {/* <Flex alignItems="center"> */}
                <Box
                  w={{ base: "100%", md: "33%" }}
                  textAlign={{ base: "left", md: "center" }}
                >
                  <Text w="100%">
                    <Text fontSize={20} fontWeight="bold">
                      Bug impact
                    </Text>
                    {BugDetails?.bug_impact}
                  </Text>
                </Box>
                {/* </Flex> */}
                {/* <Flex style={{ justifyContent: "end" }}> */}
                {BugDetails?.created_by === uniqueid && (
                <Box
                  h="100%"
                  w={{ base: "100%", md: "33%" }}
                  textAlign={{ base: "left", md: "right" }}
                >
                  <Button
                    size="md"
                    colorScheme="blue"
                    mr={4}
                    mt={4}
                    onClick={() => {
                      // setCommentText(item.comment);
                      setBugModal({
                        mode: "Edit",
                        // commentId: item.comment_id,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="md"
                    mr={4}
                    mt={4}
                    colorScheme="red"
                    onClick={() =>
                      setBugModal({
                        mode: "Delete",
                        bugsId: BugDetails?.bug_id,
                        // commentId: item.comment_id,
                      })
                    }
                  >
                    Delete
                  </Button>
                </Box>
                )}
                {/* </Flex> */}
              </Flex>
              <Flex
                style={{ width: "66%", justifyContent: "space-between", margin: "10px 0" }}
                direction={{ base: "column", md: "row" }}
              >
                <Box w={{ base: "100%", md: "100%" }}>
                  <Text w={{ base: "100%", md: "100%" }}>
                    <Text fontWeight="bold"> Affected disability</Text>
                    {BugDetails?.affected_disability}
                  </Text>
                </Box>
                <Box
                  w={{ base: "100%", md: "100%" }}
                  textAlign={{ base: "left", md: "center" }}
                >
                  <Text w={{ base: "100%", md: "100%" }}>
                    <Text fontWeight="bold">Steps to reproduce</Text>
                    {BugDetails?.steps_to_reproduce}
                  </Text>
                </Box>
              </Flex>
              <Flex
                style={{
                  width: "66%",
                  justifyContent: "space-between",
                  margin: "10px 0",
                }}
                direction={{ base: "column", md: "row" }}
              >
                <Box
                  w={{ base: "100%", md: "100%" }}
                >
                  <Text w={{ base: "100%", md: "100%" }}>
                    <Text fontWeight="bold">Tech used: </Text>
                    {BugDetails?.tech_used}
                  </Text>
                </Box>
                <Box  w={{ base: "100%", md: "100%" }}
                  textAlign={{ base: "left", md: "center" }}>
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
                          style={{ display: "flex" }}
                          className="Demo__some-network__share-button"
                        >
                          <TwitterIcon size={32} round />
                          Share on Twitter
                        </TwitterShareButton>
                      </MenuItem>
                      <MenuItem>
                        <LinkedinShareButton
                          url={shareUrl}
                          style={{ display: "flex" }}
                          className="Demo__some-network__share-button"
                        >
                          <LinkedinIcon size={32} round />
                          Share on LinkedIn
                        </LinkedinShareButton>
                      </MenuItem>
                      <MenuItem>
                        <FacebookShareButton
                          url={shareUrl}
                          quote={title}
                          style={{ display: "flex" }}
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={32} round />
                          Share onn Facebook
                        </FacebookShareButton>
                      </MenuItem>
                      <MenuItem>
                        <EmailShareButton
                          url={shareUrl}
                          subject={title}
                          style={{ display: "flex" }}
                          className="Demo__some-network__share-button"
                        >
                          <EmailIcon size={32} round />
                          Share on Email
                        </EmailShareButton>
                      </MenuItem>
                      <MenuItem>
                        <WhatsappShareButton
                          url={shareUrl}
                          title={title}
                          style={{ display: "flex" }}
                          className="Demo__some-network__share-button"
                        >
                          <WhatsappIcon size={32} round />
                          Share on Whatsapp
                        </WhatsappShareButton>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
              <Box paddingTop={5}>
                <Text fontWeight="bold">Attachment:</Text>{" "}
                {BugDetails?.poc_url == "default.png" ? (
                  "No Attachments."
                ) : (
                  <>
                    {BugDetails?.poc_url.split(";").map((x: any, i: any) => (
                                           <Link key={i} href={"https://172-105-61-130.ip.linodeusercontent.com/"+x} isExternal>
                                           {x}{" "}
                                       </Link>
                    ))}
                  </>
                )}
              </Box>
            </Flex>
          </Box>

          <Box p={{base:10, md:20}} w="100%" h="70%">
            <Box w="100%" h="100%">
              <Flex
                w="100%"
                h="100%"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Box w="100%" h="20%" paddingBottom="8">
                  <form onSubmit={handleSearch}>
                    <Flex flexDirection={"row"} h="100%" padding="4">
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
                              onChange={(e: any) =>
                                setSearchQuery(e.target.value)
                              }
                            ></Input>
                          </FormControl>
                        </Flex>
                      </Box>
                      <Box>
                        <Button
                          style={{ height: "100%" }}
                          size="sm"
                          type="submit"
                          bg={"green"}
                          color={"white"}
                          onClick={handleSearch}
                        >
                          Search
                        </Button>
                      </Box>
                    </Flex>
                  </form>
                  <Flex
                    w="100%"
                    h="100%"
                    flexDirection="row"
                    padding="4"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Modal
                      isCentered
                      closeOnOverlayClick={false}
                      closeOnEsc={false}
                      isOpen={
                        commentModal.mode === "Add" ||
                        commentModal.mode === "Edit" ||
                        commentModal.mode === "Delete"
                      }
                      onClose={() => setCommentModal("")}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>{commentModal.mode} Comment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {commentModal.mode === "Add" ||
                          commentModal.mode === "Edit" ? (
                            <>
                              <QuillNoSSRWrapper
                               id="comments"
                               placeholder="Comment"
                               value={modalcommentText}
                               onChange={(e) => setModalCommentText(e)}
                               theme="snow"
                                // id="comments"
                                // value={modalcommentText}
                                // onChange={(e) => {
                                //   setModalCommentText(e);
                                //   setError(false);
                                // }}
                                // theme="snow"
                              />
                              {error && (
                                <span
                                  style={{ color: "red", fontSize: "13px" }}
                                >
                                  Comment is required
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              {
                                "Are you sure? You can't undo this action afterwards."
                              }
                            </>
                          )}
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            size="sm"
                            type="submit"
                            colorScheme={
                              commentModal.mode === "Delete" ? "red" : "green"
                            }
                            mr={4}
                            onClick={() => {
                              setError(false);
                              if (commentModal.mode === "Delete") {
                                deleteComment(commentModal.commentId);
                              } else if (commentText && commentText !== "") {
                                if (commentModal.mode === "Add") {
                                  addComment(commentText);
                                } else if (commentModal.mode === "Edit") {
                                  editComment(
                                    modalcommentText,
                                    commentModal.commentId
                                  );
                                }
                              } else {
                                setError(true);
                              }
                            }}
                          >
                            {commentModal.mode}
                          </Button>
                          <Button
                            onClick={() => {
                              setCommentModal({
                                mode: undefined,
                                commentId: undefined,
                              });
                              setCommentText("");
                            }}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    <Box
                      flex="1"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box w={{ base: "100%", md: "20%" }}>
                        <Select
                          placeholder="Sort By"
                          flex="0.3"
                          onChange={(e: any) => handleSortBy(e)}
                        >
                          <option value="old" selected={SortBy === "old"}>
                            Oldest First
                          </option>
                          <option value="new" selected={SortBy === "new"}>
                            Newest First
                          </option>
                        </Select>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
                <Stack
                  style={{ alignSelf: "end", paddingBottom: "10px" }}
                  direction="row"
                >
                  <Button
                    isLoading={!!isLoading}
                    loadingText="Refreshing"
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => {
                      refreshList();
                    }}
                  >
                    Refresh
                  </Button>
                </Stack>
                <Box w="100%">
                  <VStack w="100%">
                    {filterCommentDetails.length > 0 ? (
                      filterCommentDetails
                        .slice(0, viewMore)
                        // .filter(
                        //   (x: any) =>
                        //     x.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        //     x.review_description
                        //       .toLowerCase()
                        //       .includes(searchQuery.toLowerCase()),
                        // )
                        .map((item: any, i: any) => {
                          return (
                            <Box
                              key={i}
                              borderRadius="10px"
                              w="100%"
                              h="150px"
                              bg={firstColorMode}
                              p={4}
                              border="1px solid #dee0e3"
                            >
                              <Flex w="100%" h="100%" flexDirection="row">
                                <Box w="100%" h="100%">
                                  <Box w="100%" h="40%">
                                    <Flex
                                      w="100%"
                                      h="100%"
                                      flexDirection="row"
                                      alignItems="center"
                                      color={chakracolor}
                                    >
                                      <div
                                        dangerouslySetInnerHTML={createMarkup(
                                          item.comment
                                        )}
                                      ></div>
                                    </Flex>
                                  </Box>

                                  <Box w="100%" h="30%">
                                  <Flex alignItems="center">
                                <Box as={BsPerson} aria-label = "Commented by:" size="20px" color={linkcolors}/>
                                  <Text
                                    color={linkcolors}
                                    fontWeight="600"
                                  >
                                    &nbsp;{item.created_by}</Text>
                                </Flex>
                                  </Box>

                                  <Box w="100%" h="30%">
                                  <Flex
                                    w="100%"
                                    h="100%"
                                    flexDirection="column"
                                    justifyContent="flex-start"
                                  >
                                    <Text  fontSize="sm" color={datecolor}> {moment(item.created_on).format("MMM D, YYYY")}</Text>
                                  </Flex>
                                  </Box>
                                </Box>
                                {item.created_by === userName && (
                                  <Box h="100%">
                                    <Button
                                      size="md"
                                      colorScheme="blue"
                                      mb="4"
                                      onClick={() => {
                                        setModalCommentText(item.comment);
                                        setCommentModal({
                                          mode: "Edit",
                                          commentId: item.comment_id,
                                        });
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="md"
                                      colorScheme="red"
                                      onClick={() =>
                                        setCommentModal({
                                          mode: "Delete",
                                          commentId: item.comment_id,
                                        })
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </Box>
                                )}
                              </Flex>
                            </Box>
                          );
                        })
                    ) : (
                      <Box>
                        <Text>No Comments posted yet.</Text>
                      </Box>
                    )}
                  </VStack>
                </Box>
                <Box m="5px auto 5px 0">
                  <Button
                    size="md"
                    colorScheme="gray"
                    onClick={() => {
                      handleViewMore(filterCommentDetails?.length);
                    }}
                    style={{
                      display: `${
                        viewMore >= filterCommentDetails?.length
                          ? "none"
                          : "block"
                      }`,
                    }}
                  >
                    View More
                  </Button>
                </Box>
                <Box h="100%" m="5px 0">
                  <HStack flexDirection={{ base: "column", md: "row" }}>
                    <VStack mb={{ base: 5, md: 0 }}>
                      <QuillNoSSRWrapper
                        id="comments"
                        value={commentText}
                        onChange={(e) => setCommentText(e)}
                        // onChange={(e) => setCommentText(e)}
                        // onChange={(e) => setCommentText(e)}
                        //  formats={formats}
                        //  modules={modules}
                        theme="snow"
                      />

                      {/* <Textarea
                          id="comments"
                          required
                          value={commentText}
                          placeholder="Comment"
                          name="comments"
                          size="sm"
                          onChange={(e) => {
                            setCommentText(e.target.value);
                            setError(false);
                          }}
                        /> */}
                      {error && (
                        <span style={{ color: "red", fontSize: "13px" }}>
                          Comment is required
                        </span>
                      )}
                    </VStack>
                    <Button
                      size="md"
                      bg={"green"}
                      color={"white"}
                      onClick={() => {
                        if (commentText && commentText !== "" || modalcommentText && modalcommentText !== "") {
                          addComment(commentText);
                          setError(false);
                          // setCommentModal({ mode: "Add", commentId: undefined })
                        } else {
                          setError(true);
                        }
                      }}
                    >
                      Post comment
                    </Button>
                  </HStack>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      <Footer />
      </Box>
    </>
  );
}
