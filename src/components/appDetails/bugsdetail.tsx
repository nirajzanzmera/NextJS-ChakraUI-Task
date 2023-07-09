import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import styles from "../../../styles/Home.module.css"
import {
  Box,
  Flex,
  FormControl,
  Input,
  Checkbox,
  VStack,
  useColorModeValue,
  Text,
  Stack,
  Select,
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
import BugModal from "components/BugModal";
import {  BsPerson } from "react-icons/bs";

import _ from "lodash";

function Items({
  currentItems,
  chakracolor,
  linkcolors,
  tokenvalue,
  onOpen,
  router,
  datehovercolor,
  headingcolor,
  FilterCategory,
  FilterPlatform,
  FilterVersions,
  colorMode,
  data,
  comments,
}: any) {
  return (<>
    <div className="items" style={{width: "100%"}}>
       <div className="row ms-1 me-1" style={{width: "100%"}}> 
        {/* <div style={{display: 'flex', flexWrap:'wrap', justifyContent: 'center', width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
          </div> */}
        {currentItems.length > 0 ? (
          currentItems
            ?.filter((x: any) => {
              return (
                FilterCategory?.includes(x.bug_subcategory.toLowerCase()) &&
                (FilterPlatform?.length === 1
                  ? FilterPlatform?.[0]?.toLowerCase() ==
                    x.platform.toLowerCase()
                  : true) &&
                (FilterVersions?.length
                  ? FilterVersions.includes(x.version)
                  : true)
              );
            })
            .map((item: any, i: any) => {
              return (
                <>
                  {tokenvalue != null ? (
                    <Box
                      key={i}
                      p={4}
                      borderRadius="10px"
                      border="1px solid #dee0e3"
                      boxShadow="none"
                      style={{ cursor: "pointer", marginTop:"3px", marginBottom: "4px"}}
                      w="100%"
                      h="20%"
                      bg={colorMode}
                      onClick={() => {
                        router.push({
                          pathname: `/appdetails/${data.Apps.slug}/bug/${item.slug}`,
                        });
                      }}
                      // shadow="xl"
                    >
                      <Flex w="100%" h="100%" flexDirection="column">
                        {/* <Box w="100%" h="100%"> */}
                        <Box w="100%" h="20%">
                          <Flex
                            w="100%"
                            h="100%"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Box w="100%">
                              <Flex w="100%" flexDirection="row">
                                <Box w="100%" h="60%">
                                  <Flex
                                    w="100%"
                                    h="100%"
                                    flexDirection="column"
                                    justifyContent="flex-start"
                                  >
                                    <Box w="100%" h="50%">
                                      <Link
                                        fontSize="2xl"
                                        color={headingcolor}
                                        fontWeight="700"
                                        _hover={{
                                          color: { datehovercolor },
                                          textDecor: "underline",
                                        }}
                                      >
                                        {item.bug_description}
                                      </Link>
                                    </Box>
                                    <Box w="100%" h="50%">
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Text
                                          color={chakracolor}
                                          fontWeight="600"
                                        >
                                          Comments : {comments[item.bug_id]}
                                        </Text>
                                        <Flex alignItems="center">
                                          <Box
                                            as={BsPerson}
                                            aria-label="Posted by:"
                                            size="20px"
                                            color={linkcolors}
                                          />
                                          <Text
                                            color={linkcolors}
                                            fontWeight="700"
                                          >
                                            &nbsp;{item.username}
                                          </Text>
                                        </Flex>
                                      </div>
                                    </Box>
                                    {/* <Box>
                                  {comments && comments.map((comentData : any) => (
                                    <Text style={{fontWeight:"bold"}}>Comments : {comentData}</Text>
                                    ))}
                                  </Box> */}
                                  </Flex>
                                </Box>
                                {/* <Box mr={4}>
                                        <Heading fontSize="2xl">
                                        Bug - Description : {item.bug_description}
                                        </Heading>
                                      </Box> */}

                                {/* <Box paddingTop={1}>
                                        <Tag
                                          size={"md"}
                                          variant="solid"
                                          colorScheme="orange"
                                        >
                                          {item.platform}
                                        </Tag>
                                      </Box> */}
                                {/* <Box paddingTop={1} style={{marginLeft:"5px"}}>
                                        <Tag
                                          size={"md"}
                                          variant="solid"
                                          colorScheme="orange"
                                        >
                                          {item.tech_used}
                                        </Tag>
                                      </Box> */}
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                        {/* <Box paddingTop={1} style={{marginLeft:"5px"}}>
                                      <Flex
                                        w="100%"
                                        h="100%"
                                        flexDirection="column"
                                        justifyContent="flex-start"
                                      >
                                      <Box w="100%" h="50%">
                                        
                                        <Text style={{display: "flex"}}>Bug Impact : {(item.bug_impact).substring(0,30)+'...'}
                                        <Text style={{color:"blue"}} 
                                          onClick={() => {
                                          router.push({
                                            pathname: `/appdetails/${data.Apps.app_id}/bug/${item.bug_id}`,
                                          });
                                        }}>View more</Text>
                                        </Text>
                                      </Box>
                                      </Flex>
                                    </Box> */}
                        {/* </Box> */}
                      </Flex>
                    </Box>
                  ) : (
                    <Box
                      key={i}
                      p={4}
                      borderRadius="10px"
                      border="1px solid #dee0e3"
                      boxShadow="none"
                      style={{ cursor: "pointer" }}
                      w="100%"
                      h="20%"
                      bg={colorMode}
                      onClick={onOpen}
                      // shadow="xl"
                    >
                      <Flex w="100%" h="100%" flexDirection="column">
                        {/* <Box w="100%" h="100%"> */}
                        <Box w="100%" h="20%">
                          <Flex
                            w="100%"
                            h="100%"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Box w="100%">
                              <Flex w="100%" flexDirection="row">
                                <Box w="100%" h="60%">
                                  <Flex
                                    w="100%"
                                    h="100%"
                                    flexDirection="column"
                                    justifyContent="flex-start"
                                  >
                                    <Box w="100%" h="50%">
                                      <Link
                                        fontSize="2xl"
                                        color={headingcolor}
                                        fontWeight="700"
                                        _hover={{
                                          color: { datehovercolor },
                                          textDecor: "underline",
                                        }}
                                      >
                                        {item.bug_description}
                                      </Link>
                                    </Box>
                                    <Box w="100%" h="50%">
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Text
                                          color={chakracolor}
                                          fontWeight="600"
                                        >
                                          Comments : {comments[item.bug_id]}
                                        </Text>
                                        <Flex alignItems="center">
                                          <Box
                                            as={BsPerson}
                                            aria-label="Posted by:"
                                            size="20px"
                                            color={linkcolors}
                                          />
                                          <Text
                                            color={linkcolors}
                                            fontWeight="700"
                                          >
                                            &nbsp;{item.username}
                                          </Text>
                                        </Flex>
                                      </div>
                                    </Box>
                                    {/* <Box>
                                {comments && comments.map((comentData : any) => (
                                  <Text style={{fontWeight:"bold"}}>Comments : {comentData}</Text>
                                  ))}
                                </Box> */}
                                  </Flex>
                                </Box>
                                {/* <Box mr={4}>
                                      <Heading fontSize="2xl">
                                      Bug - Description : {item.bug_description}
                                      </Heading>
                                    </Box> */}

                                {/* <Box paddingTop={1}>
                                      <Tag
                                        size={"md"}
                                        variant="solid"
                                        colorScheme="orange"
                                      >
                                        {item.platform}
                                      </Tag>
                                    </Box> */}
                                {/* <Box paddingTop={1} style={{marginLeft:"5px"}}>
                                      <Tag
                                        size={"md"}
                                        variant="solid"
                                        colorScheme="orange"
                                      >
                                        {item.tech_used}
                                      </Tag>
                                    </Box> */}
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                        {/* <Box paddingTop={1} style={{marginLeft:"5px"}}>
                                    <Flex
                                      w="100%"
                                      h="100%"
                                      flexDirection="column"
                                      justifyContent="flex-start"
                                    >
                                    <Box w="100%" h="50%">
                                      
                                      <Text style={{display: "flex"}}>Bug Impact : {(item.bug_impact).substring(0,30)+'...'}
                                      <Text style={{color:"blue"}} 
                                        onClick={() => {
                                        router.push({
                                          pathname: `/appdetails/${data.Apps.app_id}/bug/${item.bug_id}`,
                                        });
                                      }}>View more</Text>
                                      </Text>
                                    </Box>
                                    </Flex>
                                  </Box> */}
                        {/* </Box> */}
                      </Flex>
                    </Box>
                  )}
                </>
              );
            })
        ) : (
          <Box>
            <Text>No Bugs available.</Text>
          </Box>
        )}
      </div>
     </div>
     </>
     );
}


export default function BugsDetails({ data,session,modalOpener,onCloseModal}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [AppDetails, setAppDetails] = useState([]);
  const [BugDetails, setBugDetails] = useState([]);
  const [filterBugDetails, setFilterBugDetails] = useState<any[]>([]);
  const [Category, setCategory] = useState<any[]>([]);
  const [appCategory, setAppCategory] = useState<any[]>([]);
  const [appSubCategory, setAppSubCategory] = useState<any[]>([]);
  const [FilterPlatform, setFilterPlatform] = useState<any>(["iOS", "android"]);
  const [BugReviews, setBugReviews] = useState<any[]>([]);
  const [ratings, setRatings] = useState(0);
  const [FilterVersionsIOS, setFilterVersionsIOS] = useState<any>([]);
  const [FilterVersionsAnd, setFilterVersionsAND] = useState<any>([]);
  const [FilterVersions, setFilterVersions] = useState<any>([]);
  const [FilterCategory, setFilterCategory] = useState<any>([]);
  const [FilterCategoryShow, setFilterCategoryShow] = useState<any>([]);
  const [SortBy, setSortBy] = useState("new");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showResults, setShowResults] = React.useState(false);
  const [modalBug, setModalBug] = useState(false);
  const [tokenvalue, setTokenValue] = useState("")
  const [indId, setindId] = useState<any>();
  const [comments, setComments] = useState<any[]>([]);
  const [reviewcomment, setReviewComment] = useState<any[]>([]);
  const [alltheData, setAlltheData] = useState<any>();
  let [isLoading,setIsLoading] = useState(0);
  const [appid, setappid] = useState<any>();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [endOffset, setEndOffset] = useState(10);
  const [currentItems, setCurrentItems] = useState(filterBugDetails.slice(0, 10));

  
  const router = useRouter(); 
  let id = router.query.app_id;
  
  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * itemsPerPage) % filterBugDetails.length;  
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setappid(id);
  }, [id]);

  useEffect(() => {
    var tokenvalue:any = localStorage.getItem("access-enable-token") 
    setTokenValue(tokenvalue)
  },[])

  useEffect(() => {
    setEndOffset(itemOffset + itemsPerPage)
    const category: any[] = Array.from(
      new Set(data.Bugs.map((item: any) => item.bug_category.toLowerCase())),
    );
    setAppCategory(category);
    const subCategory = Array.from(
      new Set(data.Bugs.map((item: any) => item.bug_subcategory.toLowerCase())),
    );
    setAppSubCategory(subCategory);
    setFilterCategory(subCategory);
    setFilterCategoryShow(subCategory);
    setAppDetails(data.Appversions);
    setBugDetails(
      data.Bugs.sort(
        (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
      ).reverse(),
    );
    setComments(data.CommentsBugs);
    
    setFilterBugDetails(data.Bugs);
    setBugReviews(data.Reviews);
    setRatings(data.rating);
    setCurrentItems(filterBugDetails.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterBugDetails.length / itemsPerPage));
  }, [data, itemOffset, itemsPerPage, endOffset, filterBugDetails]);

  useEffect(() => {
    async function getCategory() {
      const res = await axios.get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/cats_subcats`,
        {
          headers: {
            Authorization: localStorage.getItem("access-enable-token") || "",
          },
        },
      );
      setCategory(res.data.categories);
    }
    getCategory();
  }, []);

  // useEffect(() => {
  //   async function getComments() {
  //     const res = await axios.get(
  //       `https://172-105-61-130.ip.linodeusercontent.com:5000/appversions?app_id=${indId?.app_id}`,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("access-enable-token") || "",
  //         },
  //       },
  //     );
  //     setComments(res.data);
  //   }
  //   getComments();
  // }, []);

  const handleRefresh = () => {
    window.location.reload();
  }


  const onOpenModalBug = () => {
    setModalBug(true);
  };

  const onCloseModalBug = () => {
    setModalBug(false);
  };
  const handleFilter = () => setShowResults(!showResults)
  // var tempBugDetails = BugDetails;
  var tempBugReviews = BugReviews;

  const [pageNumber, setPageNumber] = useState(0);
  const colorMode = useColorModeValue("white", "gray.700");
  const usersPerPage = 3;
  const pagesVisited = pageNumber * usersPerPage;

  const handleSortBy = (event: any) => {
    if (event.target.value === "new" && (SortBy !== "new" || event?.target?.refreshedData?.length)) {
      let tempBugDetails = _.cloneDeep([...(event?.target?.refreshedData || filterBugDetails)])
        .sort(
          (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
        )
        .reverse();
      setFilterBugDetails([...tempBugDetails]);
      setSortBy(event.target.value);
    } else if (event.target.value === "old" && (SortBy !== "old" || event?.target?.refreshedData?.length)) {
      let tempBugDetails =[...(event?.target?.refreshedData || filterBugDetails)].sort(
        (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
      );
      setFilterBugDetails([...tempBugDetails]);
      setSortBy(event.target.value);
    }
  };

  // const displayData = tempBugDetails.slice(
  //   pagesVisited,
  //   pagesVisited + usersPerPage,
  // );

  useEffect(() => {
    let iOS: any = [];
    AppDetails.map((d: any) => {
      if ("iOS" === d.os.toLowerCase()) {
        iOS.push(d.version);
      }
    });

    let and: any = [];
    AppDetails.map((d: any) => {
      if ("android" === d.os.toLowerCase()) {
        and.push(d.version);
      }
    });

    setFilterVersionsIOS(iOS);
    setFilterVersionsAND(and);
  }, [AppDetails]);

  const refreshList = async () => {
    setIsLoading(1)
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/appdetails?app_id=${appid}`,
      )
      .then((response) => response.data);
    setIsLoading(0)
    // setFilterBugDetails([...request?.Bugs])
    setComments(request?.CommentsBugs);
    let unAddedFilters: any[] = [],unAddedCategory: any[] = [];
    request?.Bugs?.forEach((item: any)=>{
      if(!FilterCategory?.includes(item?.bug_subcategory.toLowerCase())){
        unAddedFilters = [...unAddedFilters,item?.bug_subcategory.toLowerCase()];
        unAddedCategory = [...unAddedCategory,item?.bug_category.toLowerCase()];
      }
    })
    setFilterCategory((prev: any)=>[...prev,...unAddedFilters]);
    setFilterCategoryShow((prev: any)=>[...prev,...unAddedFilters]);
    setAppCategory(prev=>[...prev,...unAddedCategory])
    // setFilterCategory(request?.Bugs?.map(item=>item?.bug_subcategory))
    // setFilterCategoryShow(request?.Bugs?.map(item=>item?.bug_subcategory))
  
      handleSortBy({target:{value:SortBy,refreshedData:_.cloneDeep(request?.Bugs)}})
  }

  const handleVersionSelectAnd = (event: any) => {
    if (event.target.checked) {
      let temp: any = [...FilterVersionsAnd];
      temp.push(event.target.value);
      setFilterVersionsAND(temp);
    } else {
      let temp: any = [...FilterVersionsAnd];
      const index = temp.indexOf(event.target.value);
      if (index > -1) {
        temp.splice(index, 1);
        setFilterVersionsAND(temp);
      }
    }
  };
  const handleVersionSelectIOS = (event: any) => {
    if (event.target.checked) {
      let temp: any = [...FilterVersionsIOS];
      temp.push(event.target.value);
      setFilterVersionsIOS(temp);
    } else {
      let temp: any = [...FilterVersionsIOS];
      const index = temp.indexOf(event.target.value);
      if (index > -1) {
        temp.splice(index, 1);
        setFilterVersionsIOS(temp);
      }
    }
  };
  const linkcolors = useColorModeValue("gray.700", "gray.200");
  const chakracolor = useColorModeValue("gray.600", "gray.300");
  const headingcolor = useColorModeValue("gray.700", "white");
  const datecolor =  useColorModeValue("gray.600", "gray.400");
  const datehovercolor =  useColorModeValue("gray.600", "gray.200");
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

  const handleCategorySelect = (event: any) => {
    // if (event.target.checked) {
      let temp: any = Array.isArray(event) ? event.map(item=>item?.value.toLowerCase()) : [];
      setFilterCategory(Array.from(new Set(temp)));
    // } else {
    //   let temp: any = [...FilterCategory].filter(
    //     (x: any) => x.toLowerCase() !== event.target.value.toLowerCase(),
    //   );
    //   setFilterCategory(temp);
    // }
  };
  const handleCategoryGroup = (event: any, data: any) => {
    // if (event.target.checked) {
      // let temp: any = [...FilterCategory, ...data];
      setFilterCategory(data);
      setFilterCategoryShow(data)
      // setFilterCategory(data);
    // } else {
    //   let temp: any = [...FilterCategory].filter(
    //     (x: any) => !data.includes(x.toLowerCase()),
    //   );
    //   setFilterCategory(temp);
    // }
  };

  // var a = displayData.filter((data: any) => {
  //   if (searchQuery == null) return data;
  //   else if (
  //     data.bug_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     data.steps_to_reproduce.toLowerCase().includes(searchQuery.toLowerCase())
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
  //   else if (FilterCategory.includes(data.bug_category.toLowerCase())) {
  //     return data;
  //   }
  // });

  const handleSearch = (e:any) => {
    e.preventDefault();
    if (SortBy === "new") {
      const tempBugs: any[] = [...BugDetails]
        .filter(
          (x: any) =>
            x.bug_impact.toLowerCase().includes(searchQuery.toLowerCase()) ||
            x.bug_description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .sort(
          (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
        )
        .reverse();
      setFilterBugDetails(tempBugs);
    } else {
      const tempBugs: any[] = [...BugDetails]
        .filter(
          (x: any) =>
            x.bug_impact.toLowerCase().includes(searchQuery.toLowerCase()) ||
            x.bug_description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .sort(
          (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
        );
      setFilterBugDetails(tempBugs);
    }
  };
  const handlePlatformSelect = (event: any) => {
    // if (event.target.checked) {
    //   let temp: any = [...FilterPlatform];
    //   temp.push(event.target.value.toLowerCase());
      setFilterPlatform([event?.target?.value]);
    // } else {
    //   let temp: any = [...FilterPlatform];
    //   const index = temp.indexOf(event.target.value.toLowerCase());
    //   if (index > -1) {
    //     temp.splice(index, 1);
    //     setFilterPlatform(temp);
    //   }
    // }
  };


  return (
    <>
      <BugModal
        session={session}
        onOpenModal={onOpenModalBug}
        onCloseModal={onCloseModalBug}
        modalOpener={modalBug}
      />
      <Box w="100%" h="100%">
        <Flex
          w="100%"
          h="100%"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Box w="100%" h="20%" paddingBottom="8">
            <Box
              style={{
                border: "1px solid #f0f0f0",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
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
                          onChange={(e: any) => setSearchQuery(e.target.value)}
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
              <div>
                <Box
                  style={{
                    textAlign: "right",
                    width: "93%",
                    height: "45px",
                    marginBottom: "20px",
                  }}
                >
                  <Button
                    style={{ height: "100%" }}
                    size="lg"
                    colorScheme="black"
                    align="center"
                    variant="outline"
                    onClick={handleFilter}
                  >
                    Filter
                  </Button>
                </Box>
              </div>
              {showResults ? (
                <>
                  <Flex
                    // w="100%"
                    h="100%"
                    direction={{ base: 'column', md: 'row' }}
                    // flexDirection="row"
                    padding="4"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box w={{base:"100%",md:"15%"}} marginTop={{base:"12px",md:"0px"}}>
                      <Select
                        placeholder="Sort By"
                        // flex="0.3"
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

                    <Box  w={{base:"100%",md:"15%"}} marginTop={{base:"12px",md:"0px"}}>
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
                      <VStack flexDirection="row">
                        {/* <Flex flexDirection={"row"} padding="1" spacing={2}> */}

                        <Box minWidth="100%">
                          <Select
                            placeholder="Select Category"
                            //  onChange={(e) =>{
                            //   handleCategorySelect(e)}
                            // }
                            onChange={(e: any) => {
                              handleCategoryGroup(
                                {},
                                Category[e?.target?.value]
                                  ?.filter((z: any) =>
                                    appSubCategory.includes(
                                      z.name.toLowerCase()
                                    )
                                  )
                                  .map((x: any) => x.name.toLowerCase())
                              );
                            }}
                            onLoad={(e: any) => {
                              // setIsSelect(e.target.value)
                              // handleWebOrAppChange(e)
                            }}
                          >
                            {Object.keys(Category)
                              ?.filter((x: any) =>
                                appCategory.includes(x.toLowerCase())
                              )
                              ?.map((item) => {
                                return (
                                  // eslint-disable-next-line react/jsx-key
                                  <option value={item}>{item}</option>
                                );
                              })}
                          </Select>
                        </Box>
                      </VStack>
                      {/* </AccordionPanel>
                </AccordionItem>
              </Accordion> */}
                    </Box>
                    <Box w={{base:"100%",md:"15%"}} marginTop={{base:"12px",md:"0px"}}>
                      <span
                        style={{ minWidth: "-webkit-fill-available" }}
                        //  className="d-inline-block"
                        data-toggle="popover"
                        data-trigger="focus"
                        data-content="Please select account(s)"
                      >
                        <ReactSelect
                          //  styles={{width: "93%"}}
                          options={FilterCategoryShow?.reduce(
                            (result: any, item: any, index: any) => {
                              result.push({ value: item, label: item });
                              return result;
                            },
                            []
                          )}
                          isMulti
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          components={{
                            Option,
                          }}
                          onChange={(e: any) => {
                            handleCategorySelect(e);
                          }}
                          // allowSelectAll
                          // value={cat}
                        />
                      </span>
                      {/* </Flex> */}
                      {Object.keys(Category)
                        .filter((x: any) =>
                          appCategory.includes(x.toLowerCase())
                        )
                        .map((d: any, idx: any) => {
                          return (
                            <>
                              {/* <Checkbox
                                  defaultChecked={true}
                                  onChange={(e) =>
                                    handleCategoryGroup(
                                      e,
                                      Category[d]
                                        .filter((z: any) =>
                                          appSubCategory.includes(
                                            z.name.toLowerCase(),
                                          ),
                                        )
                                        .map((x: any) => x.name.toLowerCase()),
                                    )
                                  }
                                  isChecked={Category[d]
                                    .filter((z: any) =>
                                      appSubCategory.includes(
                                        z.name.toLowerCase(),
                                      ),
                                    )
                                    .every((ai: any) =>
                                      FilterCategory.includes(
                                        ai.name.toLowerCase(),
                                      ),
                                    )}
                                  key={idx}
                                >
                                  {d}
                                </Checkbox> */}
                              {/* ///// */}

                              <Stack>
                                {Category[d]
                                  .filter((z: any) =>
                                    appSubCategory.includes(
                                      z.name.toLowerCase()
                                    )
                                  )
                                  .map((x: any, i: any) => {
                                    return (
                                      // <Checkbox
                                      //   value={x.name.toLowerCase()}
                                      //   onChange={(e) =>
                                      //     handleCategorySelect(e)
                                      //   }
                                      //   isChecked={FilterCategory.includes(
                                      //     x.name.toLowerCase(),
                                      //   )}
                                      //   key={i}
                                      // >
                                      //   {x.name}
                                      // </Checkbox>
                                      <></>
                                    );
                                  })}
                              </Stack>
                            </>
                          );
                        })}
                    </Box>
                    {data.Apps.web_or_app == "app" ? (
                      <Box  w={{base:"100%",md:"15%"}} marginTop={{base:"12px",md:"0px"}}>
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
                        <Box>
                          {/* <Text marginTop={2}>Select Platform</Text> */}
                          {/* <Flex flexDirection={"row"} padding="1" spacing={2}> */}
                          <Box minWidth="fit-content">
                            <Select
                              placeholder="Select Android/iOS"
                              onChange={(e: any) => {
                                // setIsSelect(e.target.value)
                                // handleWebOrAppChange(e)
                                handlePlatformSelect(e);
                              }}
                              onLoad={(e: any) => {
                                // setIsSelect(e.target.value)
                                // handleWebOrAppChange(e)
                              }}
                            >
                              <option value="Android">Android</option>
                              <option value="iOS">Ios</option>
                            </Select>
                          </Box>

                          {/* </Flex> */}
                          {/* {data.Appversions.map((item:any) =>{
                        return (
                        <>
                        <Checkbox
                        defaultChecked={true}
                        onChange={(e) => 
                          { 
                           handlePlatformSelect(e)}}
                        isChecked={true}
                        // key={idx}
                      >
                        {item.os}
                      </Checkbox>
                      
                      <Stack pl={6} mt={1} spacing={1}>
                       
                              <Checkbox
                                value={item.version}
                                onChange={(e) =>
                                  handleCategorySelect(e)
                                }
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
                        </Box>
                        {/* </AccordionPanel>
                </AccordionItem>
              </Accordion> */}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data.Apps.web_or_app == "app" ? (
                      <Box  w={{base:"100%",md:"15%"}} marginTop={{base:"12px",md:"0px"}} >
                        {" "}
                        <span
                          style={{ minWidth: "-webkit-fill-available" }}
                          className="d-inline-block"
                          data-toggle="popover"
                          data-trigger="focus"
                          data-content="Please select account(s)"
                        >
                          <ReactSelect
                            options={data.Appversions?.reduce(
                              (result: any, item: any) => {
                                if (FilterPlatform.includes(item?.os))
                                  result.push({
                                    value: item?.version,
                                    label: item?.version,
                                  });
                                return result;
                              },
                              []
                            )}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{
                              Option,
                            }}
                            onChange={(e: any) => {
                              setFilterVersions(
                                Array.isArray(e)
                                  ? e?.map((item) => item?.value)
                                  : []
                              );
                            }}
                            // allowSelectAll
                            // value={cat}
                          />
                        </span>{" "}
                        <VStack alignItems="flex-start">
                          {Object.keys(Category)
                            .filter((x: any) =>
                              FilterPlatform.includes(x.toLowerCase())
                            )
                            .map((d: any, idx: any) => {
                              return (
                                <>
                                  <Checkbox
                                    defaultChecked={true}
                                    onChange={(e: any) =>
                                      handleCategoryGroup(
                                        e,
                                        Category[d]
                                          .filter((z: any) =>
                                            appSubCategory.includes(
                                              z.name.toLowerCase()
                                            )
                                          )
                                          .map((x: any) => x.name.toLowerCase())
                                      )
                                    }
                                    isChecked={Category[d]
                                      .filter((z: any) =>
                                        appSubCategory.includes(
                                          z.name.toLowerCase()
                                        )
                                      )
                                      .every((ai: any) =>
                                        FilterCategory.includes(
                                          ai.name.toLowerCase()
                                        )
                                      )}
                                    key={idx}
                                  >
                                    {d}
                                  </Checkbox>
                                  <Stack pl={6} mt={1} spacing={1}>
                                    {Category[d]
                                      .filter((z: any) =>
                                        appSubCategory.includes(
                                          z.name.toLowerCase()
                                        )
                                      )
                                      .map((x: any, i: any) => {
                                        return (
                                          <Checkbox
                                            value={x.name.toLowerCase()}
                                            onChange={(e: any) =>
                                              handleCategorySelect(e)
                                            }
                                            isChecked={FilterCategory.includes(
                                              x.name.toLowerCase()
                                            )}
                                            key={i}
                                          >
                                            {x.name}
                                          </Checkbox>
                                        );
                                      })}
                                  </Stack>
                                </>
                              );
                            })}
                        </VStack>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Flex>
                </>
              ) : (
                ""
              )}
            </Box>

            <Flex
              w="100%"
              h="100%"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Flex align="right">
                <Box
                  style={{
                    textAlign: "right",
                    width: "93%",
                    height: "45px",
                    marginBottom: "10px",
                  }}
                >
                  <Button
                    style={{ left: "0" }}
                    size="sm"
                    type="submit"
                    bg={"green"}
                    color={"white"}
                    onClick={onOpenModalBug}
                  >
                    Post a Bug
                  </Button>
                </Box>
              </Flex>
              <Stack
                style={{ alignSelf: "end", position: "absolute" }}
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
              <Box w="100%" style={{ cursor: "pointer" }}>
                <VStack w="100%">
                  <Items
                    currentItems={currentItems}
                    chakracolor={chakracolor}
                    linkcolors={linkcolors}
                    tokenvalue={tokenvalue}
                    onOpen={onOpen}
                    router={router}
                    FilterCategory={FilterCategory}
                    FilterPlatform={FilterPlatform}
                    FilterVersions={FilterVersions}
                    colorMode={colorMode}
                    data={data}
                    comments={comments}
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
                </VStack>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Caution</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ padding: "50px" }}>
            <Alert status="warning">
              <AlertIcon />
              You need to
              <Link href="/auth" paddingInline={2}>
                Login
              </Link>
              to View a Bug
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
