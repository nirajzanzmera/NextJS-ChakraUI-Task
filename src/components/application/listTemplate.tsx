import React, { useEffect, useState } from "react";
import axios from "axios";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import ReactPaginate from "react-paginate";
import styles from "../../../styles/Home.module.css";

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
  chakra,
  FormControl,
  Grid,
  GridItem,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { InfoIcon, ViewIcon,RepeatIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { Helmet } from 'react-helmet';
import Link from "next/link";
import ReactStars from "react-rating-stars-component";
import { query } from "firebase/firestore";
import { FaShareAlt } from "react-icons/fa";

// function Items({ currentItems, App, weborapp, AppColorMode, router,SecondColorMode}:any) {
//   return (<>
//     {/* // <div className="items"> */}
//       {/*<div className="row m-3">  */}
//       {
//         {/* // </div> */}
//     {/* // </div> */}
//     </>
//   );
// }

const ArticleList = ({ data }: any) => {
  const router = useRouter();
 // @ts-ignore
  const [search, setSearch] = useState<any>(query?.value || "");
  const [toggle, setToggle] = useState<Boolean>();

  const [allapps, setallappsone] = useState<Array<Object>>([]);
  const [allweb, setallweb] = useState<Array<Object>>([]);

  const [weborapp, setweborapp] = useState<Array<String>>([ "app","web"]);
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
  const [filterBugDetails, setFilterBugDetails] = useState<any[]>([]);
  const [BugReviews, setBugReviews] = useState<any[]>([]);
  const [ratings, setRatings] = useState(0);
  const [Category, setCategory] = useState<any[]>([]);
  let [App,setApp] = useState<any[]>(data && data.Apps);
  let [isLoading,setIsLoading] = useState(0);
  const [webApp, setWebApp] = useState<any[]>([]);
  const [cat, setCat] = useState<any[]>([]);
  const [isSelect, setIsSelect] = useState("web");
  const [displayData, setdisplayData] = useState(true);
  // const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(5);
  // const [endOffset, setEndOffset] = useState(10);
  // const [currentItems, setCurrentItems] = useState(App.slice(0, 10));

  // const handlePageClick = (event:any) => {
  //   const newOffset = (event.selected * itemsPerPage) % App.length;  

  //   setItemOffset(newOffset);
  // };

  // let App: any = data && data.Apps;

  useEffect(() => {
    let web: any = [];
    App.map((item: any) => {
      if (item.web_or_app === "web") {
        web.push(item);
      }
    });

    let webinds: any = [];
    let webindustries = App.filter((item: any) => {
      if (item.web_or_app === "web") {
        webinds.push(item.industry_name.toLowerCase());
      }
    });

    let setwebind: any = new Set(webinds);
    const b = [...setwebind].map((item) => item);
    setallwebfilters(b);
    setwebinds(b);

    let app: any = [];
    App.map((item: any) => {
      if (item.web_or_app === "app") {
        app.push(item);
      }
    });

    let appinds: any = [];
    let appIndustries: any = App.filter((item: any) => {
      if (item.web_or_app === "app") {
        appinds.push(item.industry_name.toLowerCase());
      }
    });
    let setappind: any = new Set(appinds);
    const a = [...setappind].map((item) => item);
    setappinds(a);
    setallappfilters(a);
    setallappsone(app);
    setallweb(web);
  }, [App]);

  //=========================CATEGORT DATA============================
  useEffect(() => {
    // setEndOffset(itemOffset + itemsPerPage)
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
    setFilterBugDetails(data.Bugs);
    setBugReviews(data.Reviews);
    setRatings(data.rating);
    // setCurrentItems(App.slice(itemOffset, endOffset));
    // setPageCount(Math.ceil(App.length / itemsPerPage));
  // }, [data, itemOffset, itemsPerPage, endOffset]);
  }, [data]);

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
  const SecondColorMode = useColorModeValue("gray.700", "gray.200");

  const handleFilter = () => setShowResults(!showResults)

  const fetchUser = async () => {
    const response = await axios.get(`https://172-105-61-130.ip.linodeusercontent.com:5000/searchresults?type=all&searchquery=${search}`)
    setdisplayData(false)
    setweborapp(['web','app']);
    setApp(response?.data?.applications?.hits);
    // setCat(["app","bug","rev"])

};
const handleSortBy = (event: any) => {
  if (event.target.value === "new" && SortBy !== "new") {
    let tempReviewDetails = [...App]
      .sort(
        (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
      )
      .reverse();
    setApp(tempReviewDetails);
    setSortBy(event.target.value);
  } else if (event.target.value === "old" && SortBy !== "old") {
    let tempReviewDetails = [...App].sort(
      (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
    );
    setApp(tempReviewDetails);
    setSortBy(event.target.value);
  }
};
  const handleWebOrAppChange = async (event: any) => {
    setdisplayData(false)
    if (event.target.value === 'app') {
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
      setToggle(false)
      let cloneArr = [...weborapp];
      cloneArr.push(event.target.value);
      setweborapp(['app']);
    } else if (event.target.value === 'web') {
   

      setToggle(false)
      let cloneArr = [...weborapp];
      cloneArr.push(event.target.value);
      setweborapp(['web']);
      // let path = event.target;
      // let cloneArr = [...weborapp];
      // let index = cloneArr.indexOf(path.value);
      // if (index > -1) {
      //   cloneArr.splice(index, 1);
      // }
      // setweborapp(['web']);
    }
  };

  const refreshList = async () =>{
    setIsLoading(1)
    let apps = await axios
    .get("https://172-105-61-130.ip.linodeusercontent.com:5000/showapps")
    .then((response) => response.data);
    setIsLoading(0)
    setApp([...apps?.Apps])
  }

  const HandleAppChange = (event: any) => {
    // if (event?.length) {
      // let cloneArr = [...appinds];'[]
      let cloneArr = Array.isArray(event) ?event?.map((item: { value: string; }) =>item?.value?.toLowerCase()):[];
      setappinds(cloneArr);
    // } else {
    //   let path = event.target.value.toLowerCase();
    //   let cloneArr = [...appinds];
    //   let index = cloneArr.indexOf(path);
    //   if (index > -1) {
    //     cloneArr.splice(index, 1);
    //   }
    //   setappinds(cloneArr);
    // }
  };

  const HandleWebChange = (event: any) => {
    // if (event?.length) {
      // let cloneArr = [...appinds];
      let cloneArr = event?.map((item: { value: string; }) =>item?.value?.toLowerCase());
      setwebinds(cloneArr);
  };


    App = App.filter((item: any) => {
      // if (weborapp.length === 0) {
      //   return null;
      // }
      if (weborapp.includes(item.web_or_app.toLowerCase())) {
        return item;
      }
    });

  App = App.filter((item: any) => {
    if (appinds.length === 0) return App;
    if (webinds.length === 0) return App;
    if (
      appinds.includes(item.industry_name.toLowerCase()) &&
      item.web_or_app === "app"
    ) {
      return item;
    }
    if (
      webinds.includes(item.industry_name.toLowerCase()) &&
      item.web_or_app === "web"
    ) {
      return item;
    }
  });

  const handleRefresh = () => {
    window.location.reload();
  }


  const Option = (props:any) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={HandleAppChange}
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
const getCategories = (cat: any) =>{
  let res;
  // let x = cat.reduce(function(result, item) {
  //   result.push(item.value);
  //   return result;
  // }, [])
  if(cat.includes("web")){
    res =  allwebfilters.reduce((result: any, item: any, index: any) => {
      result.push({ "value": item, "label": item })
      return result
    }, [])
  }
   if(cat.includes("app")){
    res =  allappfilters.reduce((result: any, item: any, index: any) => {
      result.push({ "value": item, "label": item })
      return result
    }, [])
  }
 return res
}

  return (
    <>
       <div className="text-center">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Application</title>
    </Helmet>
    {/* <h1>Application</h1> */}
  </div>
    <Flex
      w="100%"
      h="100%"
      direction={{ base: "column", sm: "column" }}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
    >
      <Flex
        padding="4"
        w="100%"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {/* <Heading marginTop="1" fontSize={"3xl"}>
          Filter
        </Heading> */}
        <Box style={{width: "80%"}}>
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
                      onChange={(e: any) => setSearch(e.target.value)}
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
                  onClick={fetchUser}
                >
                  Search
                </Button>
              </Box>
            </Flex>
        <Box>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              // flexDirection={"row"}
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
              <Box w={{base:"95%",md:"20%"}} marginTop={{base:"12px",md:"0px"}} marginRight="2">
                <Select
                  placeholder="Sort By"
                  flex="0.3"
                  onChange={(e) => handleSortBy(e)}
                >
                  <option value="old" selected={SortBy === "old"}>
                    Oldest First
                  </option>
                  <option value="new" selected={SortBy === "new"}>
                    Newest First
                  </option>
                </Select>
              </Box>
              {/* <Flex direction={["column", "column", "row"]}>

                  <Box padding="2">
                  <Flex flexDirection={"row"} padding="1" spacing={2}>
                        */}
                        <Box minWidth="fit-content" marginRight="4" marginTop={{base:"12px",md:"0px"}}>
                          <Select
                            placeholder="Select Application/Website"
                            flex="0.3"
                            
                          onChange={(e: any) => {
                            setIsSelect(e.target.value)
                            handleWebOrAppChange(e)
                          }}
                          onLoad={(e: any) => {
                            setIsSelect(e.target.value)
                            handleWebOrAppChange(e)
                          }}
                          >
                            <option value="web">
                              Website
                            </option>
                            <option value="app">
                              Application
                            </option>
                          </Select>
                         
                        </Box>
                        <span
                          style={{marginRight:"300px",minWidth:"26%"}}
                          className={styles.spanResponse}
                          data-toggle="popover"
                          data-trigger="focus"
                          data-content="Please select account(s)"
                        >
                          <ReactSelect
                          options={getCategories(weborapp)}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{
                              Option
                            }}
                            onChange={(e:any)=>{
                              if(weborapp?.[0]==='web'){
                                HandleWebChange(e)
                              }else{
                                HandleAppChange(e)
                              }
                            }}
                            // allowSelectAll
                            // value={cat}
                          />
                        </span>
                        {/* </Flex> */}
                    
                    {/* <Checkbox
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
                    </Flex> */}
                  {/* </Box> */}
                  {/* <Box padding="2">
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
                  </Box> */}
                {/* </Flex> */}
              {/* <Box w="13%">
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
              </Box> */}
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
            {/* <Box w="20%">
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
            </Box> */}

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
                                  onChange={(e:any) =>
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
                                          onChange={(e:any) =>
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
          {/* <Accordion w="100%" defaultIndex={[0]} allowMultiple>
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
              > */}

              {/* </AccordionPanel>
            </AccordionItem>
          </Accordion> */}
        </Box>
      </Flex>
        <Stack style={{alignSelf: 'end', marginRight: "34px"}} direction='row'>
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
      {/* {!displayData && <Box
                          mx="auto"
                          px={5}
                          py={4}
                          rounded="lg"
                          shadow="lg"
                          maxW="2xl"
                          style={{margin:"0", width:"529px",
                          marginLeft: "34%",
                          height: "150px",
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "x-large",
                          fontWeight: "600"}}
                        >
                  
                          {/* <Box mt={1}>
                            <Link mt={1} 
                            style={{color:"gray.600"}}
                            color={chakracolor}
                            // color={useColorModeValue("gray.600", "gray.300")}
                            >
                              {item.bug_description}
                            </Link>
                          </Box>        */}
                              {/* <div style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                              <chakra.p
                                // color={useColorModeValue("gray.700", "gray.200")}
                                // color={linkcolors}
                                // fontWeight="700"
                                cursor="pointer"
                              >
                               <em>
                                  Select filter(s) to display Data!
                                 </em> 
                        
                              </chakra.p>
                              {/* <chakra.p
                                // color={useColorModeValue("gray.700", "gray.200")}
                                color={linkcolors}
                                // fontWeight="700"
                                cursor="pointer"
                              >
                                <em>
                                  By: {item.username}
                                </em>
                              </chakra.p>
                              </div>
                              <div>
                              <chakra.p>
                                Comments: {item.comments}
                              </chakra.p> */}
                           
       
      <Box w="100%">
        <VStack>
          <SimpleGrid columns={[1, 1, 1, 2, 3]} spacing="16" padding="8">
            {App.length > 0 ? (
              App.map((item: any, i: any) => {
                return (
                  <Box
                    key={i}
                    p="4"
                    w="100%"
                    h="100%"
                    border="1px solid #dee0e3"
                    boxShadow="0 0 2px 0 #c4c7cc"
                    bg={AppColorMode}
                    shadow="xl"
                    role={"button"}
                    onClick={() => {
                      router.push({
                        pathname: `/appdetails/${item.slug}`,
                      });
                    }}
                  >
                    {/* <HStack
                      spacing={2}
                      w="100%"
                      justifyContent={"space-between"}
                    >
                      <Tag size={"md"} variant="solid" colorScheme="white">
                        {item.created_by}
                      </Tag>

                      <Tag size={"md"} variant="solid" colorScheme="orange">
                        {item.web_or_app.toUpperCase()}
                      </Tag>
                    </HStack> */}

                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                      justifyContent="space-between"
                    >
                      <Box
                        display="flex"
                        flex="1"
                        flexDirection="column"
                        justifyContent="center"
                        marginTop={{ base: "0", sm: "0" }}
                      >
                        <HStack
                          spacing={2}
                          marginTop="1"
                          alignItems="flex-start"
                          justifyContent="space-between"
                        >
                          <VStack
                            justifyContent="flex-start"
                            alignItems="flex-start"
                          >
                            <Heading marginTop="1" fontSize={"3xl"}>
                              {item.app_name}
                            </Heading>
                            <HStack justifyContent="center" alignItems="center">
                              <ReactStars
                                count={5}
                                edit={false}
                                value={
                                  item.ratings_stars_avg
                                    ? item.ratings_stars_avg
                                    : 0
                                }
                                // onChange={ratingChanged}
                                size={20}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={
                                  <i className="fa fa-star-half-alt"></i>
                                }
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                              />
                              <Text fontWeight="bold" fontSize={"16"}>
                                [
                                {item.ratings_stars_avg
                                  ? item.ratings_stars_avg+" stars"
                                  : 0+" stars"}
                                ]
                              </Text>
                            </HStack>
                          </VStack>
                          <VStack>
                            <Tag
                              size={"md"}
                              variant="solid"
                              colorScheme="orange"
                            >
                              {item.web_or_app.toUpperCase()}
                            </Tag>
                          </VStack>
                        </HStack>
                        {/* <HStack spacing={2}>
                          <ReactStars
                            count={5}
                            edit={false}
                            value={3}
                            // onChange={ratingChanged}
                            size={20}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                        </HStack> */}

                        <HStack
                          spacing={2}
                          marginTop="2"
                          justifyContent="space-evenly"
                        >
                          <VStack spacing={0}>
                            <Text fontWeight="bold" fontSize={"2xl"}>
                              {item.bugscount ? item.bugscount : 0}
                            </Text>

                            <Text fontSize={"large"}>Bugs</Text>
                          </VStack>
                          <VStack spacing={0}>
                            <Text fontWeight="bold" fontSize={"2xl"}>
                              {item.reviewscount ? item.reviewscount : 0}
                            </Text>

                            <Text fontSize={"large"}>Reviews</Text>
                          </VStack>
                        </HStack>
                        <Divider opacity={1} color="#ccc" />
                        {/* <Text as="p" marginTop="2">
                          App url: <a>{item.app_url}</a>
                        </Text> */}
                        <Text
                          as="p"
                          marginTop="2"
                          color={SecondColorMode}
                          fontSize={"md"}
                        >
                          <Text as="span" color="orange.400">
                            Industry:
                          </Text>
                          {item.industry_name}
                        </Text>
                        <Text
                          as="p"
                          marginTop="2"
                          color={SecondColorMode}
                          fontSize={"md"}
                        >
                          <Text as="span" color="orange.400">
                            Description:
                          </Text>
                          {item.description}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box w="100%" h="100vh" p={20}>
                <Flex
                  w="100%"
                  h="100%"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={"2xl"}>Empty filter</Text>
                </Flex>
              </Box>
            )}
          {/* <Items currentItems={currentItems} App={App} weborapp={weborapp} AppColorMode={AppColorMode} router={router} SecondColorMode={SecondColorMode} /> */}
          
        {/* <div className="d-flex justify-content-center mt-5">
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
        </div> */}
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
    </>
  );
};

export default ArticleList;
