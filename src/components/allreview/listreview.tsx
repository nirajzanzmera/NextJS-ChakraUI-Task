import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";

import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  Flex,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  VStack,
  Stack,
  Checkbox,
  Select,
  CheckboxGroup,
  IconButton,
  filter,
  Button,
  Input,
  FormControl,
  Grid,
  GridItem,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  chakra,
  Link,
  Modal,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalOverlay,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { InfoIcon, ViewIcon, RepeatIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { Helmet } from 'react-helmet';
// import Link from "next/link";
import ReactStars from "react-rating-stars-component";
import {  BsPerson } from "react-icons/bs";


// const chakracolor = chakracolor;
// const linkcolors = linkcolors;
// const [tokenvalue, setTokenValue] = useState<any>("");
// const { isOpen, onOpen, onClose } = useDisclosure();


function Items({ currentItems,chakracolor, linkcolors ,tokenvalue ,onOpen, router, datecolor, datehovercolor, commentcolors, headingcolor}:any) {
  return (
    <div className="items">
      <div className="row m-3">
      
          <div style={{display: 'flex', flexWrap:'wrap', justifyContent: 'center', width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
          {currentItems && currentItems?.length > 0 ? (
            currentItems 
              // .filter((x: any) =>
              //   FilterCategory.includes(x.bug_subcategory.toLowerCase()),
              // )
              .map((item: any, i: any) => {
                return (
                  <Flex
                  key={item.id}
                  // bg={useColorModeValue("#F9FAFB", "gray.600")}
                  // p={50}
                  alignItems="center"
                  justifyContent="center"
                  width={[
                    '100%', 
                    '100%',
                    '50%', 
                    '33.33%', 
                  ]}
                  style={{padding:"8px"}}
                  // style={{width:"33.33%", padding:"8px"}}   
                >
                {tokenvalue != null ?  
<Box
mx="auto"
px={5}
py={4}
rounded="lg"
shadow="lg"
maxW="2xl"
style={{margin:"0", width:"100%"}}
>
<Box mt={1}>
<Flex justifyContent="space-between" alignItems="center">
<Link
  fontSize="md"
  color={datecolor}
  fontWeight="500"
  _hover={{
    color: datehovercolor,
    textDecor: "underline",
  }}
  onClick={() => {
    router.push({
      pathname: `/appdetails/${item.application_slug}`,
    });
  }}
>{item.app_name}
</Link>
</Flex>
  <Link fontSize="2xl"
  color={headingcolor}
  fontWeight="700"
  _hover={{
    color: datehovercolor,
    textDecor: "underline",
  }}
  onClick={() => {
    router.push({
      pathname: `/appdetails/${item.application_slug}/review/${item.review_slug}`,
    });
  }}
  >
    {item.title}
  </Link>
  <chakra.p mt={2} color={chakracolor}  fontWeight="600">
    Comments: {item.comments}
  </chakra.p>
</Box>       
    <div style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
    <chakra.p
      // color={linkcolors}
      color={linkcolors}
      // fontWeight="700"
      cursor="pointer"
    >
    <chakra.span
      fontSize="sm"
      color={datecolor}
    >
      {moment(item.created_on).format("MMM D, YYYY")}
      </chakra.span> 

    </chakra.p>

    <Flex alignItems="center">
    <Box as={BsPerson} aria-label = "Commented by:" size="20px" color={linkcolors}/>
      <Text
        color={linkcolors}
        fontWeight="700"
      >
        &nbsp;{item.username}
      </Text>
    </Flex>
    </div>
</Box>
        : 

<Box
  mx="auto"
  px={5}
  py={4}
  rounded="lg"
  shadow="lg"
  maxW="2xl"
  onClick={onOpen}
  style={{margin:"0", width:"100%"}}
>
  <Box mt={1}>
  <Flex justifyContent="space-between" alignItems="center">

  <Link
    fontSize="md"
    color={datecolor}
    fontWeight="500"
    _hover={{
      color: datehovercolor,
      textDecor: "underline",
    }}
    onClick={() => {
      router.push({
        pathname: `/appdetails/${item.application_slug}`,
      });
    }}
  >{item.app_name}
  </Link>
  </Flex>
    <Link  fontSize="2xl"
color={headingcolor}
fontWeight="700"
_hover={{
  color: datehovercolor,
  textDecor: "underline",
}}>
        {item.title}
    </Link>
    <chakra.p mt={2} color={chakracolor}  fontWeight="600">
      Comments: {item.comments}
    </chakra.p>
  </Box>       
      <div style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
      <chakra.p
        // color={linkcolors}
        color={linkcolors}
        // fontWeight="700"
        cursor="pointer"
      >
      <chakra.span
        fontSize="sm"
        color={datecolor}
      >
        {moment(item.created_on).format("MMM D, YYYY")}
        </chakra.span> 

      </chakra.p>
    
      <Flex alignItems="center">
      <Box as={BsPerson} aria-label = "Commented by:" size="20px" color={linkcolors}/>
        <Text
          color={linkcolors}
          fontWeight="700"
        >
          &nbsp;{item.username}
        </Text>
      </Flex>
      </div>
      
</Box>
                 }
                </Flex>
                )
              })
                 ): (
          <Box>
            <Text>No Reviews available.</Text>
          </Box>
        )}
          </div>
        
        </div>
    </div>
  );
}

const AllReviewList = ({ data }: any) => {
// const itemsPerPage = 10;
  const router = useRouter();

  const [allapps, setallappsone] = useState<Array<Object>>([]);
  const [allweb, setallweb] = useState<Array<Object>>([]);

  const [weborapp, setweborapp] = useState<Array<String>>(["app", "web"]);
  const [appextra, setappextra] = useState<Array<String>>([]);

  const [appinds, setappinds] = useState<Array<String>>([]);
  const [webinds, setwebinds] = useState<Array<String>>([]);

  const [allappfilters, setallappfilters] = useState<Array<String>>([]);
  const [allwebfilters, setallwebfilters] = useState<Array<String>>([]);

  const [filters, setfilters] = useState<Array<String>>([]);
  const [apps, setallapps] = useState<Array<Object>>([]);
  const [extra, setextra] = useState<Array<Object>>([]);
  const [SortBy, setSortBy] = useState("new");

  const [showResults, setShowResults] = React.useState(false)
  const [appCategory, setAppCategory] = useState<any[]>([]);
  const [appSubCategory, setAppSubCategory] = useState<any[]>([]);
  const [AppDetails, setAppDetails] = useState([]);
  const [BugDetails, setBugDetails] = useState([]);
  const [FilterCategory, setFilterCategory] = useState<any>([]);
  const [filterBugDetails, setFilterBugDetails] = useState<any[]>(data.search_results);
  const [BugReviews, setBugReviews] = useState<any[]>([]);
  const [ratings, setRatings] = useState(0);
  const [Category, setCategory] = useState<any[]>([]);
  const colorMode = useColorModeValue("white", "gray.700");
  const [tokenvalue, setTokenValue] = useState<any>("");
  let [isLoading,setIsLoading] = useState<any>(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [endOffset, setEndOffset] = useState(10);
  const [currentItems, setCurrentItems] = useState(filterBugDetails.slice(0, 10));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const boxcolor = useColorModeValue('brand.100', 'gray.500');
  const chakracolor = useColorModeValue("gray.600", "gray.300");
  const linkcolors = useColorModeValue("gray.700", "gray.200");
  const commentcolors = useColorModeValue("gray.700", "gray.200");
  const headingcolor = useColorModeValue("gray.700", "white");
  const datecolor =  useColorModeValue("gray.600", "gray.400");
  const datehovercolor =  useColorModeValue("gray.600", "gray.200");

  // let App: any = data && data.Apps;



  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * itemsPerPage) % filterBugDetails.length;  
  
    setItemOffset(newOffset);
  };
//   useEffect(() => {
//     let web: any = [];
//     App.map((item: any) => {
//       if (item.web_or_app === "web") {
//         web.push(item);
//       }
//     });

//     let webinds: any = [];
//     let webindustries = App.filter((item: any) => {
//       if (item.web_or_app === "web") {
//         webinds.push(item.industry_name.toLowerCase());
//       }
//     });

//     let setwebind: any = new Set(webinds);
//     const b = [...setwebind].map((item) => item);
//     setallwebfilters(b);
//     setwebinds(b);

//     // let app: any = [];
//     // App.map((item: any) => {
//     //   if (item.web_or_app === "app") {
//     //     app.push(item);
//     //   }
//     // });

// //     let appinds: any = [];
// //     let appIndustries: any = App.filter((item: any) => {
// //       if (item.web_or_app === "app") {
// //         appinds.push(item.industry_name.toLowerCase());
// //       }
// //     });
// //     let setappind: any = new Set(appinds);
// //     const a = [...setappind].map((item) => item);
// //     setappinds(a);
// //     setallappfilters(a);

// //     setallappsone(app);
// //     setallweb(web);
//    }, [App]);

  //=========================CATEGORT DATA============================
  useEffect(() => {
    setEndOffset(itemOffset + itemsPerPage)
    // const endOffset = itemOffset + itemsPerPage;
    const category: any[] = Array.from(
      new Set(data?.Bugs?.map((item: any) => item.bug_category.toLowerCase())),
    );
    setAppCategory(category);
    const subCategory = Array.from(
      new Set(data?.Bugs?.map((item: any) => item.bug_subcategory.toLowerCase())),
    );
    setAppSubCategory(subCategory);
    setFilterCategory(subCategory);
    setAppDetails(data.Appversions);
    setBugDetails(
      data?.Bugs?.sort(
        (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
      ).reverse(),
    );
    setFilterBugDetails(data.search_results);
    setBugReviews(data.Reviews);
    setRatings(data.rating);
    setCurrentItems(filterBugDetails.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterBugDetails.length / itemsPerPage));
  }, [data, itemOffset, itemsPerPage, endOffset]);

  //=============GET CATEGORY DATA API CALL========================
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

  //==========HANDLE CATEGORY DATA================

  const handleCategoryGroup = (event: any, data: any) => {
    if (event.target.checked) {
      let temp: any = [...FilterCategory, ...data];
      setFilterCategory(Array.from(new Set(temp)));
    } else {
      let temp: any = [...FilterCategory].filter(
        (x: any) => !data.includes(x.toLowerCase()),
      );
      setFilterCategory(temp);
    }
  };

  //=============================== HANDLE CATEGORY SELECTION=========================
  const handleCategorySelect = (event: any) => {
    if (event.target.checked) {
      let temp: any = [...FilterCategory, event.target.value.toLowerCase()];
      setFilterCategory(Array.from(new Set(temp)));
    } else {
      let temp: any = [...FilterCategory].filter(
        (x: any) => x.toLowerCase() !== event.target.value.toLowerCase(),
      );
      setFilterCategory(temp);
    }
  };

  const AppColorMode = useColorModeValue("white", "gray.700");
  const SecondColorMode = linkcolors;

  const handleFilter = () => setShowResults(!showResults)

  const refreshList = async () =>{
    setIsLoading(1)
    let apps = await axios
    .get("https://172-105-61-130.ip.linodeusercontent.com:5000/searchresults?type=bug_reports&searchquery=")
    .then((response) => response.data);
    setIsLoading(0)
    setFilterBugDetails(apps?.search_results)
  }

  const handleWebOrAppChange = async (event: any) => {
    if (event.target.checked) {
      /* if(event.target.value === 'app'){
        let appinds: any= []
        let appIndustries: any = App.filter((item: any)=>{
        if(item.web_or_app === "app"){
        appinds.push(item.industry_name.toLowerCase())
        }
    })
    let setappind: any = new Set(appinds)
    const a = [...setappind].map( item => item)
    await setappinds(a)
      } */

      let cloneArr = [...weborapp];
      cloneArr.push(event.target.value);
      setweborapp(cloneArr);
    } else {
      /* if(event.target.value === "app"){
        await setappinds([])
    
        
      } */
      let path = event.target;
      let cloneArr = [...weborapp];
      let index = cloneArr.indexOf(path.value);
      if (index > -1) {
        cloneArr.splice(index, 1);
      }
      setweborapp(cloneArr);
    }
  };

  const HandleAppChange = (event: any) => {
    if (event.target.checked) {
      let cloneArr = [...appinds];
      cloneArr.push(event.target.value.toLowerCase());
      setappinds(cloneArr);
    } else {
      let path = event.target.value.toLowerCase();
      let cloneArr = [...appinds];
      let index = cloneArr.indexOf(path);
      if (index > -1) {
        cloneArr.splice(index, 1);
      }
      setappinds(cloneArr);
    }
  };

  const HandleWebChange = (event: any) => {
    if (event.target.checked) {
      let cloneArr = [...webinds];
      cloneArr.push(event.target.value.toLowerCase());
      setwebinds(cloneArr);
    } else {
      let path = event.target.value.toLowerCase();
      let cloneArr = [...webinds];
      let index = cloneArr.indexOf(path);
      if (index > -1) {
        cloneArr.splice(index, 1);
      }
      setwebinds(cloneArr);
    }
  };

//   App = App.filter((item: any) => {
//     if (weborapp.length === 0) {
//       return null;
//     }
//     if (weborapp.includes(item.web_or_app.toLowerCase())) {
//       return item;
//     }
//   });

//   App = App.filter((item: any) => {
//     if (appinds.length === 0) return App;
//     if (
//       appinds.includes(item.industry_name.toLowerCase()) &&
//       item.web_or_app === "app"
//     ) {
//       return item;
//     }
//     if (
//       webinds.includes(item.industry_name.toLowerCase()) &&
//       item.web_or_app === "web"
//     ) {
//       return item;
//     }
//   });

  useEffect(() => {
    var tokenvalue:any = localStorage.getItem("access-enable-token") 
    setTokenValue(tokenvalue)
  },[])

  /* 
  App = App.filter((item:any)=>{
    if (webinds.length === 0) return App;
    if(webinds.includes(item.industry_name.toLowerCase())){
      return item
    }
  }) */


  return (
    <>
       <div className="text-center">
    <Helmet>
      <meta charSet="utf-8" />
      <title>All Reviews</title>
    </Helmet>
    {/* <h1>Application</h1> */}
  </div>
   
        <Heading marginTop="1" fontSize={"3xl"} style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
          All Reviews
        </Heading>
        <Stack style={{alignSelf: 'end', marginRight: "9%", position: "absolute", left: "93%", top: "76px"}} direction='row'>
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
        <div>
          <Items currentItems={currentItems} chakracolor={chakracolor} linkcolors={linkcolors} tokenvalue={tokenvalue} onOpen={onOpen} router={router}/>
        </div>
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
        {/* <Box style={{width: "80%"}}>
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
                      // onChange={(e) => setSearchQuery(e.target.value)}
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
        <Box>
            <Flex
              flexDirection={"row"}
              w="100%"
              h="100%"
              padding="4"
              // w="100%"
              // h="100%"
              // flexDirection="row"
              // padding="4"
              // alignItems="center"
              justifyContent="space-between"
            >
              <Box w="20%" marginRight="4">
                <Select
                  placeholder="Sort By"
                  flex="0.3"
                  // onChange={(e) => handleSortBy(e)}
                >
                  <option value="old" selected={SortBy === "old"}>
                    Oldest First
                  </option>
                  <option value="new" selected={SortBy === "new"}>
                    Newest First
                  </option>
                </Select>
              </Box>
              <Box w="13%">
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
              {showResults ? 
          <>
          <Flex
            w="100%"
            h="100%"
            flexDirection="row"
            padding="4"
            alignItems="center"
            justifyContent="center"
          >
            <Box w="20%">
              <Select
                placeholder="Sort By"
                flex="0.3"
                // onChange={(e) => handleSortBy(e)}
              >
                <option value="old" selected={SortBy === "old"}>
                  Oldest First
                </option>
                <option value="new" selected={SortBy === "new"}>
                  Newest First
                </option>
              </Select>
            </Box>

            <Box w="20%" style={{marginLeft: "25px"}}>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Filter
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Box marginTop={5}>
                      <Text marginTop={2}>Select Category</Text>
                      <VStack marginTop={2} alignItems="flex-start">
                        {Object.keys(Category)
                          .filter((x: any) =>
                            appCategory.includes(x.toLowerCase()),
                          )
                          .map((d: any, idx: any) => {
                            return (
                              <>
                                <Checkbox
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
                                </Checkbox>
                                <Stack pl={6} mt={1} spacing={1}>
                                  {Category[d]
                                    .filter((z: any) =>
                                      appSubCategory.includes(
                                        z.name.toLowerCase(),
                                      ),
                                    )
                                    .map((x: any, i: any) => {
                                      return (
                                        <Checkbox
                                          value={x.name.toLowerCase()}
                                          onChange={(e) =>
                                            handleCategorySelect(e)
                                          }
                                          isChecked={FilterCategory.includes(
                                            x.name.toLowerCase(),
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
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Flex>
          </> : "" 
          }
            </Flex>
        </Box>
          <Accordion w="100%" defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Filter by Website/App
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                //  direction={{ base: 'column', sm: 'row' }}
                pb={4}
              >
                <Flex direction={["column", "column", "row"]}>
                  <Box padding="2">
                    <Checkbox
                      value="app"
                      defaultChecked
                      onChange={handleWebOrAppChange}
                    >
                      App
                    </Checkbox>

                    <Flex w="100%" flexDirection="column" marginLeft={10}>
                      {weborapp.includes("app")
                        ? allappfilters?.map((item: any, i: any) => {
                            return (
                              <Checkbox
                                key={i}
                                onChange={HandleAppChange}
                                defaultChecked
                                size="sm"
                                value={item}
                              >
                                {item}
                              </Checkbox>
                            );
                          })
                        : null}
                    </Flex>
                  </Box>
                  <Box padding="2">
                    <Checkbox
                      value="web"
                      defaultChecked
                      onChange={handleWebOrAppChange}
                    >
                      Website
                    </Checkbox>
                    <Flex
                      w="100%"
                      flexDirection="column"
                      alignItems="left"
                      justifyContent="left"
                      marginLeft={10}
                    >
                      {weborapp.includes("web")
                        ? allwebfilters?.map((item: any, i) => {
                            return (
                              <Checkbox
                                key={i}
                                onChange={HandleWebChange}
                                defaultIsChecked
                                size="sm"
                                value={item}
                              >
                                {item}
                              </Checkbox>
                            );
                          })
                        : null}
                    </Flex>
                  </Box>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box> */}
      {/* </Flex> */}

      {/* <Box w="100%" sttyle={{cursor:"pointer"}}>
              <VStack w="80%" style={{marginLeft:"auto", marginRight:"auto"}}> */}
     
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
};

export default AllReviewList;