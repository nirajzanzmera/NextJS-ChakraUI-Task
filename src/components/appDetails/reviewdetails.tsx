import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import {
  Box,
  Flex,
  HStack,
  Tag,
  Text,
  useColorModeValue,
  Heading,
  AccordionIcon,
  Accordion,
  Checkbox,
  AccordionButton,
  VStack,
  Stack,
  AccordionItem,
  AccordionPanel,
  Select,
  FormControl,
  Input,
  Button,
  Modal,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  Alert,
  AlertIcon,
  ModalOverlay,
  Link,
  useDisclosure 
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from 'next/image'
import BackPng from "../../../back-arrow.png";
import ReviewModal from "components/ReviewModal";
import {  BsPerson } from "react-icons/bs";

function Items({
  currentItems,
  chakracolor,
  linkcolors,
  tokenvalue,
  onOpen,
  router,
  datehovercolor,
  headingcolor,
  firstColorMode,
  platform,
  reviewcomment,
  FilterVersion,
  data,
}: any) {
  return (<>
    <div className="items" style={{width: "100%"}}>
       <div className="row ms-1 me-1" style={{width: "100%"}}> 
         {currentItems.length > 0 ? (
              currentItems
                .filter(
                  (x: any) =>{

                   return (x.platform === platform || !platform) && (FilterVersion?.length ? FilterVersion?.includes(x.versions) : true)
                  }
                )
                .map((item: any, i: any) => {
                  return (
                    <>
                    {tokenvalue != null ?
                    <Box
                      key={i}
                      borderRadius="10px"
                      w="100%"
                      h="20%"
                      bg={firstColorMode}
                      p={4}
                      style={{cursor:"pointer",marginTop:"3px", marginBottom: "4px"}}
                      onClick={() => {
                        router.push({
                          pathname: `/appdetails/${data.Apps.slug}/review/${item.slug}`,
                        });
                      }}
                      border="1px solid #dee0e3"
                    >
                      <Flex w="100%" h="100%" flexDirection="column">
                        <Box w="100%" h="100%">
                          <Box w="100%" h="40%">
                            <Flex
                              w="100%"
                              h="100%"
                              flexDirection="row"
                              alignItems="center"
                            >
                              <Box w="50%">
                                <Flex w="100%" flexDirection="row">
                                  <Box w="50%">
                                  <Link  fontSize="2xl"
                                    color={headingcolor}
                                    fontWeight="700"
                                    _hover={{
                                      color: {datehovercolor},
                                      textDecor: "underline",
                                    }}>{item.title}</Link>
                                  </Box>
                                </Flex>
                              </Box>
                            </Flex>
                          </Box>

                          <Box w="100%" h="60%">
                            <Flex
                              w="100%"
                              h="100%"
                              flexDirection="column"
                              justifyContent="flex-start"
                            >
                              <Box w="100%" h="50%">
                              <div style={{display:"flex", justifyContent:"space-between",alignItems: "center"}}>
                              <Text color={chakracolor} fontWeight="600">Comments : {reviewcomment[item.bug_review_id]}</Text>
                              <Flex alignItems="center">
                              <Box as={BsPerson} aria-label = "Posted by:" size="20px" color={linkcolors}/>
                              <Text color={linkcolors} fontWeight="700">&nbsp;{item.username}</Text>
                              </Flex>
                              </div>
                              </Box>

                              {/* <Box w="100%" h="50%">
                              <Box w="100%" h="50%">
                                        
                                        <Text style={{display: "flex"}}>Bug Impact : {(item.review_description).substring(0,30)+'...'}
                                        <Text style={{color:"blue"}}
                                        onClick={() => {
                                          router.push({
                                            pathname: `/appdetails/${data.Apps.app_id}/review/${item.bug_review_id}`,
                                          });
                                        }}
                                        >View more</Text></Text>
                                      </Box>
                              </Box> */}
                            </Flex>
                          </Box>
                        </Box>
                      </Flex>
                    </Box>
                    :  
                   
                    <Box
                    key={i}
                    borderRadius="10px"
                    w="100%"
                    h="20%"
                    bg={firstColorMode}
                    p={4}
                    style={{cursor:"pointer"}}
                    onClick={onOpen}
                    border="1px solid #dee0e3"
                  >
                    <Flex w="100%" h="100%" flexDirection="column">
                      <Box w="100%" h="100%">
                        <Box w="100%" h="40%">
                          <Flex
                            w="100%"
                            h="100%"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Box w="50%">
                              <Flex w="100%" flexDirection="row">
                                <Box w="50%">
                                <Link  fontSize="2xl"
                                    color={headingcolor}
                                    fontWeight="700"
                                    _hover={{
                                      color: {datehovercolor},
                                      textDecor: "underline",
                                    }}>{item.title}</Link>
                                </Box>
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>

                        <Box w="100%" h="60%">
                          <Flex
                            w="100%"
                            h="100%"
                            flexDirection="column"
                            justifyContent="flex-start"
                          >
                            <Box w="100%" h="50%">
                            <div style={{display:"flex", justifyContent:"space-between",alignItems: "center"}}>
                              <Text color={chakracolor} fontWeight="600" >Comments : {reviewcomment[item.bug_review_id]}</Text>
                              <Flex alignItems="center">
                                    <Box as={BsPerson} aria-label = "Posted by:" size="20px" color={linkcolors}/>
                              <Text color={linkcolors} fontWeight="700">&nbsp;{item.username}</Text>
                              </Flex>
                            </div>
                            </Box>

                            {/* <Box w="100%" h="50%">
                            <Box w="100%" h="50%">
                                      
                                      <Text style={{display: "flex"}}>Bug Impact : {(item.review_description).substring(0,30)+'...'}
                                      <Text style={{color:"blue"}}
                                      onClick={() => {
                                        router.push({
                                          pathname: `/appdetails/${data.Apps.app_id}/review/${item.bug_review_id}`,
                                        });
                                      }}
                                      >View more</Text></Text>
                                    </Box>
                            </Box> */}
                          </Flex>
                        </Box>
                      </Box>
                    </Flex>
                  </Box>
                  }
                   </>
                  );
                })
            ) : (
              <Box>
                <Text>No Reviews available.</Text>
              </Box>
            )}
      </div>
     </div>
     </>
     );
}

export default function ReviewDetails({ data,session}: any) {
  let ReviewList = data && data.Reviews;
  // let history = useHistory();
  const [AppDetails, setAppDetails] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [BugDetails, setBugDetails] = useState([]);
  const [BugReviews, setBugReviews] = useState([]);
  const [filterReviewDetails, setFilterReviewDetails] = useState<any>([]);
  const [Category, setCategory] = useState([]);
  const [reFetch, setreFetch] = useState(true);
  const [insideState, setinsideState] = useState("details");
  const [ratings, setRatings] = useState(0);

  const [FilterPlatform01, setFilterPlatform01] = useState(["iOS", "android"]);
  const [FilterVersionsIOS01, setFilterVersionsIOS01] = useState<any>([]);
  const [FilterVersionsAnd01, setFilterVersionsAND01] = useState<any>([]);
  const [FilterCategory01, setFilterCategory01] = useState([]);
  const [SortBy, setSortBy] = useState("new");
  const [showResults, setShowResults] = React.useState(false)
  const firstColorMode = useColorModeValue("white", "gray.700");
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQuery01, setsearchQuery01] = useState<any>(null);
  const [modalReview, setModalReview] = useState(false);
  const [reviewcomment, setReviewComment] = useState<any[]>([]);
  const [tokenvalue, setTokenValue] = useState("")
  let [isLoading,setIsLoading] = useState(0);
  const [appid, setappid] = useState<any>();
  const [platform,setPlatform] = useState<any>()
  const [FilterVersion,setFilterVersions] = useState<any>([])
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [endOffset, setEndOffset] = useState(10);
  const [currentItems, setCurrentItems] = useState(filterReviewDetails.slice(0, 10));


  const [sessionState, setSessionState] = useState<any>();
  // var tempBugDetails = BugDetails;
  // var tempBugReviews = BugReviews;

  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * itemsPerPage) % filterReviewDetails.length;  
    setItemOffset(newOffset);
  };

  const handleFilter = () => setShowResults(!showResults)

  const Option = (props:any) => {
      return (
        <div>
          <components.Option {...props}>
            <input
              type="checkbox"
              checked={props.isSelected}
            />{" "}
            <label>{props.label}</label>
          </components.Option>
        </div>
      );
    };
  

  useEffect(() => {
    var tokenvalue:any = localStorage.getItem("access-enable-token") 
    setTokenValue(tokenvalue)
  },[])

  const onOpenModalReview = () => {
    setModalReview(true);
  };

  const onCloseModalReview = () => {
    setModalReview(false);
  };

  const handleSortBy = (event: any) => {
    if (event.target.value === "new" && (SortBy !== "new" || event?.target?.refreshedData?.length)) {
      let tempBugReviews = [...(event?.target?.refreshedData || filterReviewDetails)]
        .sort(
          (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
        )
        .reverse();
      setFilterReviewDetails(tempBugReviews);
      setSortBy(event.target.value);
    } else if (event.target.value === "old" && (SortBy !== "old" || event?.target?.refreshedData?.length)) {
      let tempBugReviews = [...(event?.target?.refreshedData || filterReviewDetails)].sort(
        (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
      );
      setFilterReviewDetails(tempBugReviews);
      setSortBy(event.target.value);
    }
  };

  const handlePlatformSelect01 = (event: any) => {
    if (event.target.checked) {
      let temp = [...FilterPlatform01];
      temp.push(event.target.value.toLowerCase());
      setFilterPlatform01(temp);
    } else {
      let temp = [...FilterPlatform01];
      const index = temp.indexOf(event.target.value.toLowerCase());
      if (index > -1) {
        temp.splice(index, 1);
        setFilterPlatform01(temp);
      }
    }
  };

  const handleVersionSelectIOS01 = (event: any) => {
    if (event.target.checked) {
      let temp: any = [...FilterVersionsIOS01];
      temp.push(event.target.value);
      setFilterVersionsIOS01(temp);
    } else {
      let temp: any = [...FilterVersionsIOS01];
      const index = temp.indexOf(event.target.value);
      if (index > -1) {
        temp.splice(index, 1);
        setFilterVersionsIOS01(temp);
      }
    }
  };

  const handleVersionSelectAnd01 = (event: any) => {
    if (event.target.checked) {
      let temp: any = [...FilterVersionsAnd01];
      temp.push(event.target.value);
      setFilterVersionsAND01(temp);
    } else {
      let temp: any = [...FilterVersionsAnd01];
      const index = temp.indexOf(event.target.value);
      if (index > -1) {
        temp.splice(index, 1);
        setFilterVersionsAND01(temp);
      }
    }
  };

  let id = router.query.app_id;

  useEffect(() => {
    setappid(id);
  }, [id]);

  useEffect(() => {
    setEndOffset(itemOffset + itemsPerPage)
    setAppDetails(data.Appversions);
    setBugDetails(data.Bugs);
    setBugReviews(
      data.Reviews.sort(
        (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
      ).reverse(),
    );
    setFilterReviewDetails(data.Reviews);
    setRatings(data.rating);
    setReviewComment(data.CommentsReviews);
    setCurrentItems(filterReviewDetails.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterReviewDetails.length / itemsPerPage));
  }, [data,  itemOffset, itemsPerPage, endOffset, filterReviewDetails]);

  const linkcolors = useColorModeValue("gray.700", "gray.200");
  const chakracolor = useColorModeValue("gray.600", "gray.300");
  const headingcolor = useColorModeValue("gray.700", "white");
  const datecolor =  useColorModeValue("gray.600", "gray.400");
  const datehovercolor =  useColorModeValue("gray.600", "gray.200");
  const handleRefresh = () => {
    window.location.reload();
  }


  const refreshList = async () => {
    setIsLoading(1)
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/appdetails?app_id=${appid}`,
      )
      .then((response) => response.data);
    setIsLoading(0)
    // setFilterReviewDetails([...request?.Reviews])
    setReviewComment(request?.CommentsReviews);
    handleSortBy({target:{value:SortBy,refreshedData:request?.Reviews}})
  }


  // const handleRoute = () => {
  //   history.push("/");
  // }
  // const usersPerPage01 = 3;
  // const [pageNumber01, setPageNumber01] = useState(0);
  // const pagesVisited01 = pageNumber01 * usersPerPage01;

  // const displayData01 = BugReviews.slice(
  //   pagesVisited01,
  //   pagesVisited01 + usersPerPage01,
  // );

  const handleSearchChange01 = (event: any) => {
    setsearchQuery01(event.target.value);
  };

  // var a01 = displayData01.filter((data: any) => {
  //   if (searchQuery01 == null) return data;
  //   else if (
  //     data.title.toLowerCase().includes(searchQuery01.toLowerCase()) ||
  //     data.review_description
  //       .toLowerCase()
  //       .includes(searchQuery01.toLowerCase())
  //   ) {
  //     return data;
  //   }
  // });

  // a01 = a01.filter((data: any) => {
  //   if (FilterPlatform01.length === 0) return a01;
  //   else if (FilterPlatform01.includes(data.platform.toLowerCase())) {
  //     return data;
  //   }
  // });

  // a01 = a01.filter((data: any) => {
  //   if (FilterVersionsIOS01.length === 0 || FilterVersionsAnd01.length === 0)
  //     return a01;
  //   else if (
  //     FilterVersionsIOS01.includes(data.versions) ||
  //     FilterVersionsAnd01.includes(data.versions)
  //   ) {
  //     return data;
  //   }
  // });
  const handleSearch = (e:any) => {
    e.preventDefault();
    if (SortBy === "new") {
      const tempBugs = [...BugReviews]
        .filter(
          (x: any) =>
            x.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            x.review_description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        )
        .sort(
          (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
        )
        .reverse();
      setFilterReviewDetails(tempBugs);
    } else {
      const tempBugs = [...BugReviews]
        .filter(
          (x: any) =>
            x.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            x.review_description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        )
        .sort(
          (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
        );
      setFilterReviewDetails(tempBugs);
    }
  };
  return (
    <>
         <ReviewModal
        session={session}
        onOpenModal={onOpenModalReview}
        onCloseModal={onCloseModalReview}
        modalOpener={modalReview}
      />

      <div style={{position:"fixed", bottom: "0", right: "0",left:"0", marginBottom: "0", marginRight: "20"}}>
      <Image
      // loader={myLoader}
      src={BackPng}
      alt="back"
      width={50}
      height={50}
      layout="fixed"
      // onClick={handleRoute}
    />
      </div>
    <Box w="100%" h="100%">
      <Flex
        w="100%"
        h="100%"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Box w="100%" h="20%" paddingBottom="8">
        <Box style={{border:"1px solid #f0f0f0", borderRadius:"10px", marginBottom:"10px"}}>
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
                    onChange={(e:any) => setSearchQuery(e.target.value)}
                  ></Input>
                </FormControl>
              </Flex>
            </Box>

            <Box>
              <Button
                style={{height:"100%"}}
                size="sm"
                type="submit"
                bg={"green"}
                color={"white"}
                // onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </Flex>
          </form>
          <div >
            <Box style={{textAlign:"right", width:"93%", height:"45px", marginBottom:"20px"}}>
              <Button
                style={{height:"100%"}}
                size="lg"
                colorScheme='black'
                align='center' 
                variant='outline'

                onClick={handleFilter}
              >
                Filter
              </Button>
            </Box>
          </div>
          {showResults ? 
          <>
          <Flex
            w="100%"
            h="100%"
            direction={{ base: 'column', md: 'row' }}
            // flexDirection="row"
            padding="4"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box w={{base:"100%",md:"20%"}} marginTop={{base:"12px",md:"0px"}}>
              <Select
                placeholder="Sort By"
                flex="0.3"
                onChange={(e:any) => handleSortBy(e)}
              >
                <option value="old" selected={SortBy === "old"}>
                  Oldest First
                </option>
                <option value="new" selected={SortBy === "new"}>
                  Newest First
                </option>
              </Select>
            </Box>
            
            {data.Apps.web_or_app == 'app' ? 
            <Box w={{base:"100%",md:"20%"}} marginTop={{base:"12px",md:"0px"}}>
              {/* <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Filter
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}> */}
                      {/* <Text marginTop={2}>Select Platform</Text> */}
                      <Box minWidth="fit-content">
                          <Select
                            placeholder="Select Android/iOS"
                            flex="0.3"
                            
                          onChange={(e:any) => {
                            setPlatform(e?.target?.value)
                          }}
                          >
                            <option value="Android">
                              Android
                            </option>
                            <option value="iOS">
                              Ios
                            </option>
                          </Select>
                         
                        </Box>
                       
                      {/* {data.Appversions.map((item:any) =>{
                        return (
                        <>
                        <Checkbox
                        defaultChecked={true}
                        // onChange={(e) =>}
                        isChecked={true}
                        // key={idx}
                      >
                        {item.os}
                      </Checkbox>
                      <Stack pl={6} mt={1} spacing={1}>
                       
                              <Checkbox
                                value={item.version}
                                // onChange={(e) =>
                                //   handleCategorySelect(e)
                                // }
                                isChecked={true}
                                // key={i}
                              >
                                {item.version}
                              </Checkbox>
                            );
                      </Stack>
                      </>
                        )
                       })} */}
                  {/* </AccordionPanel>
                </AccordionItem>
              </Accordion> */}
            </Box> : ""
            }
            {data.Apps.web_or_app == 'app' ?<Box w={{base:"100%",md:"20%"}} marginTop={{base:"12px",md:"0px"}}> <span
                          style={{minWidth:"-webkit-fill-available"}}
                          className="d-inline-block"
                          data-toggle="popover"
                          data-trigger="focus"
                          data-content="Please select account(s)"
                        >
                          <ReactSelect
                          options={data.Appversions?.reduce((result: any, item: any) => {
                            if(platform ===  item?.os) result.push({ "value": item?.version, "label": item?.version })
                            return result
                          }, [])}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{
                              Option
                            }}
                            onChange={e=>{
                              setFilterVersions(Array.isArray(e) ? e?.map(item=>item?.value) : [])
                            }}
                            // allowSelectAll
                            // value={cat}
                          />
                        </span></Box>:""}
          </Flex>
          </> : "" 
          }
        </Box>
        </Box>

        <Box w="100%">
        <Flex>
              <Box style={{width:"93%", height:"45px", marginBottom:"10px"}}>
                <Button
                  style={{left:"0"}}
                  size="sm"
                  type="submit"
                  bg={"green"}
                  color={"white"}
                  onClick={onOpenModalReview}
                >
                  Post a Review
                </Button>
              </Box>
              <Stack style={{ alignSelf: 'end', position: "absolute", right: "6%", paddingBottom: "1.5%" }} direction='row'>
                <Button
                  isLoading={!!isLoading}
                  loadingText='Refreshing'
                  colorScheme='teal'
                  variant='outline'
                  onClick={() => {
                    refreshList();
                  }}
                >
                  Refresh
                </Button>
              </Stack>  
              </Flex>
          <VStack w="100%">
           
          </VStack>
                   <Items
                      currentItems={currentItems}
                      chakracolor={chakracolor}
                      linkcolors={linkcolors}
                      tokenvalue={tokenvalue}
                      onOpen={onOpen}
                      router={router}
                      platform={platform}
                      firstColorMode={firstColorMode}
                      data={data}
                      FilterVersion={FilterVersion}
                      reviewcomment={reviewcomment}
                    />
                  <div className="d-flex justify-content-center  mt-5">
                    <ReactPaginate
                      nextLabel="Next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={pageCount}
                      previousLabel="< Previous"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      // renderOnZeroPageCount={null}
                    />
                    </div>
        </Box>
      </Flex>
    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Caution</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{padding:"50px"}}>
          <Alert status="warning">
          <AlertIcon />
          You need to
          <Link href="/auth" paddingInline={2}>
            Login
          </Link>
          to View a Review
          </Alert>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
