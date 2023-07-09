import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import styles from "../../../styles/Home.module.css";

import {
  Box,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  Stack,
  Select,
  Button,
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
import  { useRouter } from "next/router";
import { Helmet } from 'react-helmet';
// import Link from "next/link";
import {  BsPerson } from "react-icons/bs";

import _ from "lodash";

// const chakracolor = useColorModeValue("gray.600", "gray.300");
// const linkcolors = useColorModeValue("gray.700", "gray.200");
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

<Box mt={1} >
<Flex justifyContent="space-between" alignItems="center">

    <Link
      fontSize="md"
      color={headingcolor}
      fontWeight="500"
      _hover={{
        color: {datehovercolor},
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
        color: {datehovercolor},
        textDecor: "underline",
      }}
  onClick={() => {
    router.push({
      pathname: `/appdetails/${item.application_slug}/bug/${item.bug_slug}`,
    });
  }}
  // color={useColorModeValue("gray.600", "gray.300")}
  >
    {item.bug_description}
  </Link>
  <chakra.p mt={2} color={chakracolor}  fontWeight="600">
      Comments: {item.comments}
    </chakra.p>
</Box>       
    <div style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
    <chakra.p
      // color={useColorModeValue("gray.700", "gray.200")}
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
  color: {datehovercolor},
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
    color: {datehovercolor},
    textDecor: "underline",
  }}
  >
    {item.bug_description}
  </Link>
  <chakra.p mt={2} color={chakracolor}  fontWeight="600">
    Comments: {item.comments}
  </chakra.p>
</Box>       
<div style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
<chakra.p
  // color={useColorModeValue("gray.700", "gray.200")}
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
            <Text>No Bugs available.</Text>
          </Box>
        )}
          </div>
        
        </div>
    </div>
  );
}

const AllBugsList = ({ data }: any) => {
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
  const [filterBugDetailsShow, setFilterBugDetailsShow] = useState<any[]>(data.search_results);
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
      new Set(data?.search_results?.map((item: any) =>
        item.bug_category.toLowerCase())),
    );
    setAppCategory(category);
    const subCategory = Array.from(
      new Set(data?.search_results?.map((item: any) => item.bug_subcategory.toLowerCase())),
    );
    setAppSubCategory(subCategory);
    setFilterCategory(subCategory);
    setAppDetails(data.Appversions);
    setBugDetails(
      data?.search_results?.sort(
        (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
      ).reverse(),
    );
    setBugReviews(data.Reviews);
    setRatings(data.rating);
    setCurrentItems(filterBugDetails.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterBugDetails.length / itemsPerPage));
  }, [data, itemOffset, itemsPerPage, endOffset,filterBugDetails]);
  
  //=============GET CATEGORY DATA API CALL========================
  useEffect(() => {
    setFilterBugDetails(data.search_results);
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
  const SecondColorMode = useColorModeValue("gray.700", "gray.200");

  const handleFilter = () => setShowResults(!showResults)

  const refreshList = async () =>{
    setIsLoading(1)
    let apps = await axios
    .get("https://172-105-61-130.ip.linodeusercontent.com:5000/searchresults?type=bug_reports&searchquery=")
    .then((response) => response.data);
    setIsLoading(0)
    setFilterBugDetails(apps?.search_results)
    setFilterBugDetailsShow(apps?.search_results)
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
/* 
  App = App.filter((item:any)=>{
    if (webinds.length === 0) return App;
    if(webinds.includes(item.industry_name.toLowerCase())){
      return item
    }
  }) */

  const handleSortBy = (event:any)=>{
    
      if(event.target.value){
        // filterBugDetails.filter()
        let x = 
        data.search_results.filter((item: any) => item.bug_category.toLowerCase() === event.target.value.toLowerCase())
        
        setFilterBugDetails([...x])
        setFilterBugDetailsShow([...x])
      }
      // else if(event.target.value=="media"){
      //   // filterBugDetails.filter()
      //   let y = 
      //   data.search_results.filter((item: any) => item.bug_category.toLowerCase() === "Media Accessibility".toLowerCase())
        
      //   setFilterBugDetails([...y])
      //   setFilterBugDetailsShow([...y])
      // }
      // else if(event.target.value=="keyboard"){
      //   // filterBugDetails.filter()
      //   let z = 
      //   data.search_results.filter((item: any) => item.bug_category.toLowerCase() === "Keyboard Accessibility".toLowerCase())
        
      //   setFilterBugDetails([...z])
      //   setFilterBugDetailsShow([...z])
      // }
      else{
        setFilterBugDetails(data.search_results)
      }
    
    }
    
    const changeSubFilter=(e:any)=>{
      if(e){
        let z = 
        data.search_results.filter((item: any) => {
          return e === item.bug_subcategory.toLowerCase()
        })
        
        setFilterBugDetails(z)
      }
      else{
        setFilterBugDetails(data.search_results)
      }
    
    }
      return (
        <>
           <div className="text-center">
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Bugs</title>
        </Helmet>
        {/* <h1>Application</h1> */}
      </div>
    
          
    
            <Heading marginTop="1" fontSize={"3xl"} style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
              All Bugs
            </Heading>
            <br></br>
            <Box  flexDirection={{ base: 'column', md: 'row' }} w={{base:"73%",md:"20%"}} marginTop={{base:"12px",md:"0px"}} marginLeft="14%" display="flex" >
            <Select
              placeholder="Sort By"
              fontSize="sm"
              marginRight="20%"
              flex="0.3"
              minWidth="219px"
              onChange={(e:any) => handleSortBy(e)}
            >
    
             { appCategory.map((item: any) => {
                return (
                  <option value={item} key={item}>{item.toUpperCase()}</option>
                );
              })}
            </Select>
            <span
              style={{fontSize:"sm", marginRight:"20%",flex:"0.3",minWidth:"219px" }}
              className={styles.spanResponseListBugs}
              data-toggle="popover"
              data-trigger="focus"
              data-content="Please select account(s)"
            >
              <ReactSelect
                options={Array.from(
                  new Set(filterBugDetailsShow.map((item: any) => item.bug_subcategory.toLowerCase())),
                ).reduce((result:any, item:any, index:any) => {
                  result.push({ "value": item, "label": item })
                  return result
                }, [])}
                isMulti={false}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option
                }}
                onChange={(e: any) => {
                  changeSubFilter(e?.value)
                }}
              // allowSelectAll
              // value={cat}
              />
            </span>
          </Box>
            <Stack  direction='row' className={styles.refresh}>
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
              to View a Bugs
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
    
export default AllBugsList;