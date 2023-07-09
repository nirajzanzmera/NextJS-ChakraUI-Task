import {
    chakra,
    Box,
    Button,
    Stack,
    Image,
    useColorModeValue,
    Text,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Spacer,
    Center,
    VStack,
    SimpleGrid,
    HStack,
    Heading,
    Tag,
    Divider,
    Select,
    Link,
    FormControl
} from "@chakra-ui/react";
import axios from "axios";
import CountUp from 'react-countup'

import { AddIcon } from "@chakra-ui/icons";
// import { API_URL_SEARCH } from "envconfig";
import { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
// import ArticleList from "./application/listTemplate";
import { useRouter } from "next/router";
import ReactStars from "react-rating-stars-component";
// import BugCard from "./featured-reviews/Bug-Card";
// import ReviewCard from "./featured-reviews/ReviewCard";
import _ from "lodash";
import moment from "moment";
import Header from "components/Header";

const GlobalSearch = () => {
    const router = useRouter();
    let query = router.query;
    const [user, setUser] = useState<any>()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState("inside");
    const [whatis, setwhatis] = useState("bug");
    const [totlabug, setTotalBugs] = useState<any>();
    const [totalreview, setTotalReview] = useState<any>();
    const [search, setSearch] = useState<any>(query?.value || '');
    const [SortBy, setSortBy] = useState<any>();
    const [tokenvalue, setTokenValue] = useState("");
    const [sessionState, setSessionState] = useState<any>();
    const [modalBug, setModalBug] = useState(false);
    const [modalReview, setModalReview] = useState(false);
    const [cat,setCat] = useState<any>([]);

    const chakracolor = useColorModeValue("gray.600", "gray.300");
    const linkcolors = useColorModeValue("gray.700", "gray.200")
    useEffect(() => {
        setSessionState(localStorage.getItem("access-enable-token"));
        
      }, []);
    useEffect(() => {
        var tokenvalue: any = localStorage.getItem("access-enable-token")
        setTokenValue(tokenvalue)
    }, [])

    useEffect(() => {
        if(query.value){
     axios.get(`https://172-105-61-130.ip.linodeusercontent.com:5000/searchresults?type=all&searchquery=${query.value}`).then((response)=>{

            setUser(response?.data);
        setCat(["app","bug","rev"])

        })}
      }, []);

    const fetchUser = async () => {
        const response = await axios.get(`https://172-105-61-130.ip.linodeusercontent.com:5000/searchresults?type=all&searchquery=${search}`)
        setUser(response?.data);
        setCat(["app","bug","rev"])

    };

    const handleSortBy = (event: any) => {
        if (event.target.value == 'new') {
            let tempApplicationDetails = _.cloneDeep(user?.applications?.hits)
                .sort(
                    (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
                )
                .reverse();
            let tempBugDetails = _.cloneDeep(user?.bugs?.hits)
                .sort(
                    (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
                )
                .reverse();
            let tempReviewDetails = _.cloneDeep(user?.reviews?.hits)
                .sort(
                    (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
                )
                .reverse();
            setUser({ applications: { ...user?.applications, hits: tempApplicationDetails }, bugs: { ...user?.bugs, hits: tempBugDetails }, reviews: { ...user?.reviews, hits: tempReviewDetails } })
        } else if (event.target.value == 'old') {
            let tempApplicationDetails = _.cloneDeep(user?.applications?.hits)
                .sort(
                    (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
                );
            let tempBugDetails = _.cloneDeep(user?.bugs?.hits)
                .sort(
                    (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
                );
            let tempReviewDetails = _.cloneDeep(user?.reviews?.hits)
                .sort(
                    (a: any, b: any) => +new Date(a.created_on) - +new Date(b.created_on),
                );
            setUser({ applications: { ...user?.applications, hits: tempApplicationDetails }, bugs: { ...user?.bugs, hits: tempBugDetails }, reviews: { ...user?.reviews, hits: tempReviewDetails } })
        }

    }
    const onCloseModalBug = () => {
        setModalBug(false);
    };
    const onCloseModalReview = () => {
        setModalReview(false);
    };
    const onOpenModalBug = () => {
        setModalBug(true);
    };
    const onOpenModalReview = () => {
        setModalReview(true);
    };

    const handleSortByApps = (e: any) =>{
        if(e.target.value == "app"){
            setCat([e.target.value])
        } else if(e.target.value == "bug"){
            setCat([e.target.value])   
        } else if(e.target.value == "rev"){
            setCat([e.target.value])
        
        }else{
            setCat(["app","bug","rev"])
        }
    }
    // const router = useRouter();
//   const name = query.name;
    return (

        <>
            <Header
                session={sessionState}
                onOpenModalBug={onOpenModalBug}
                onCloseModalBug={onCloseModalBug}
                modalBug={modalBug}
                onOpenModalReview={onOpenModalReview}
                onCloseModalReview={onCloseModalReview}
                modalReview={modalReview}
            />
            {/* <form onSubmit={fetchUser}> */}
            <Stack
                direction={{ base: "column", sm: "row" }}
                mb={{ base: 4, md: 8 }}
                spacing={2}
                justifyContent={"center"}
                padding="3% 10% 1% 10%"

            >
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
                        value={search}
                      placeholder="Search"
                      onChange={(e) => {
                        setSearch(e.target.value)
                    }}
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

                {/* <InputGroup role="Search">
                    <InputLeftElement pointerEvents="none" h={12}>
                        <FaSearch />
                    </InputLeftElement>
                    <Input variant="outline" placeholder="Search" onChange={(e) => {

                        setSearch(e.target.value)
                    }} size={"lg"} />
                </InputGroup> */}
                {/* <Button
                    as="a"
                    colorScheme="gray"
                    w={{ base: "full", sm: "auto" }}
                    mb={{ base: 2, sm: 0 }}
                    size="lg"
                    cursor="pointer"
                    onClick={() => fetchUser()}
                >
                    Search
                    <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                            clipRule="evenodd"
                        />
                    </Icon>
                </Button> */}
            </Stack>
            {/* </form> */}
            <Stack
                // direction={{ base: "column", sm: "row" }}
                mb={{ base: 4, md: 8 }}
                spacing={2}
                justifyContent={"center"}
                padding="1% 10% 1% 10%"

            >
            {user?.applications?.hits && <Box w="100%" display="flex" justifyContent="space-around">
                <Select
                    placeholder="Sort By old/new"
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

                <Select
                    placeholder="Sort By Category"
                    flex="0.3"
                    onChange={(e) => handleSortByApps(e)}
                >
                    <option value="app" selected={SortBy === "app"}>
                        Applications
                    </option>
                    <option value="bug" selected={SortBy === "bug"}>
                        Bugs
                    </option>
                    <option value="rev" selected={SortBy === "rev"}>
                        Reviews
                    </option>
                </Select>
            </Box>}
            <br></br>
            <br></br>


            {!cat.includes("app") || user?.applications?.hits && <h2 style={{ fontSize: "36px", fontWeight: "bolder" }}>Search Results!</h2>}
            {
                !cat.includes("app") || user?.applications &&
                <>
                    <br></br>

                    <Box w="100%">
                        <h2 style={{ fontSize: "26px", display: "flex" }}>Search Results for Applications having {search || query.value}</h2>
                        <VStack>
                            <SimpleGrid columns={[1, 1, 1, 2, 3]} spacing="16" padding="8">
                                {user.applications.hits.length > 0 ? (
                                    user.applications.hits.map((item: any, i: any) => {
                                        // if(weborapp?.length ===2) return null;
                                        return (
                                            <Box
                                                key={i}
                                                p="4"
                                                w="100%"
                                                h="100%"
                                                border="1px solid #dee0e3"
                                                boxShadow="0 0 2px 0 #c4c7cc"
                                                bg={"white"}
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
                                                                            ? item.ratings_stars_avg.toFixed(1) + " stars"
                                                                            : 0 + " stars"}
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

                                                                <Text fontSize={"large"}>Review</Text>
                                                            </VStack>
                                                        </HStack>
                                                        <Divider opacity={1} color="#ccc" />
                                                        {/* <Text as="p" marginTop="2">
        App url: <a>{item.app_url}</a>
      </Text> */}
                                                        <Text
                                                            as="p"
                                                            marginTop="2"
                                                            color={"black"}
                                                            fontSize={"md"}
                                                            display="flex"
                                                        >
                                                            <Text as="span" color="orange.400">
                                                                Industry:
                                                            </Text>
                                                            {item.industry_name}
                                                        </Text>
                                                        <Text
                                                            as="p"
                                                            marginTop="2"
                                                            color={"black"}
                                                            fontSize={"md"}
                                                            display="flex"

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
                                ) :null}
                            </SimpleGrid>
                        </VStack>
                    </Box>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                            <Button onClick={() =>
                                router.push("/applications")
                            }>View More Applications</Button>
                        </div>
                </>
            }

            {
               !cat.includes("bug") ||  user?.bugs?.hits && <>
                    <br></br>
                    <br></br>
                    <h2 style={{ fontSize: "26px", display: "flex" }}>Search Results for Bugs having {search || query.value}</h2>
                    <br></br>
                    {/* <BugCard bugs={user.bugs.hits} hidden={true} /> */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', cursor: 'pointer' }}>
                        { user.bugs.hits &&
                            user.bugs.hits.map((bugs: any) => (
                                <Flex
                                    key={bugs.id}
                                    // bg={useColorModeValue("#F9FAFB", "gray.600")}
                                    // p={50}
                                    alignItems="center"
                                    justifyContent="center"
                                    style={{ width: "33.33%", padding: "8px" }}
                                >
                                    {tokenvalue != null ?
                                        <Box
                                            mx="auto"
                                            px={5}
                                            py={4}
                                            rounded="lg"
                                            shadow="lg"
                                            maxW="2xl"
                                            style={{ margin: "0", width: "100%" }}
                                        >

                                            <Box mt={1}>
                                                <Link mt={1}
                                                    style={{ color: "gray.600" }}
                                                    color={chakracolor}
                                                    onClick={() => {
                                                        router.push({
                                                          pathname: `/appdetails/${bugs.application_slug}/bug/${bugs.bug_slug}`,
                                                        });
                                                      }}
                                                // color={useColorModeValue("gray.600", "gray.300")}
                                                >
                                                    {bugs.bug_description}
                                                </Link>
                                            </Box>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <chakra.p
                                                    // color={useColorModeValue("gray.700", "gray.200")}
                                                    color={linkcolors}
                                                    // fontWeight="700"
                                                    cursor="pointer"
                                                >
                                                    <em>
                                                        Posted On: {moment(bugs.created_on).format("MMM Do YYYY")}
                                                    </em>

                                                </chakra.p>
                                                <chakra.p
                                                    // color={useColorModeValue("gray.700", "gray.200")}
                                                    color={linkcolors}
                                                    // fontWeight="700"
                                                    cursor="pointer"
                                                >
                                                    <em>
                                                        By: {bugs.username}
                                                    </em>
                                                </chakra.p>
                                            </div>
                                            <div>
                                                <chakra.p>
                                                    Comments: {bugs.comments}
                                                </chakra.p>
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
                                            style={{ margin: "0", width: "100%" }}
                                        >

                                            <Box mt={1}>
                                                <Link mt={1}
                                                    style={{ color: "gray.600" }}
                                                    color={chakracolor}
                                                // color={useColorModeValue("gray.600", "gray.300")}
                                                >
                                                    {bugs.bug_description}
                                                </Link>
                                            </Box>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <chakra.p
                                                    // color={useColorModeValue("gray.700", "gray.200")}
                                                    color={linkcolors}
                                                    // fontWeight="700"
                                                    cursor="pointer"
                                                >
                                                    <em>
                                                        Posted On: {moment(bugs.created_on).format("ll")}
                                                    </em>

                                                </chakra.p>
                                                <chakra.p
                                                    // color={useColorModeValue("gray.700", "gray.200")}
                                                    color={linkcolors}
                                                    // fontWeight="700"
                                                    cursor="pointer"
                                                >
                                                    <em>
                                                        By: {bugs.username}
                                                    </em>
                                                </chakra.p>
                                            </div>
                                            <div>
                                                <chakra.p>
                                                    Comments: {bugs.comments}
                                                </chakra.p>
                                            </div>
                                        </Box>
                                    }
                                </Flex>
                            ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                            <Button onClick={() =>
                                router.push("/allbugs")
                            }>View More Bugs</Button>
                        </div>
                    <br></br>
                    <br></br>
                    

                </>
            }

            {
                !cat.includes("rev") || user?.reviews?.hits && <>
                    <br></br>
                    <br></br>
                    <h2 style={{ fontSize: "26px", display: "flex" }}>Search Results for Reviews having {search || query.value}</h2>
                    <br></br>
                    {/* <ReviewCard review={user.reviews.hits} hidden={true} /> */}
                    { user.reviews.hits && 
                        user.reviews.hits.map((review: any) => (
                            <Flex
                                key={review.id}
                                // bg={useColorModeValue("#F9FAFB", "gray.600")}
                                // p={50}
                                alignItems="center"
                                justifyContent="center"
                                style={{ width: "33.33%", padding: "8px" }}
                            >
                                {tokenvalue != null ?
                                    <Box
                                        mx="auto"
                                        px={5}
                                        py={4}
                                        rounded="lg"
                                        shadow="lg"
                                        maxW="2xl"
                                        style={{ margin: "0", width: "100%" }}
                                    >

                                        <Box mt={1}>
                                            <Link mt={1}
                                                style={{ color: "gray.600" }}
                                                color={chakracolor}
                                                onClick={() => {
                                                    router.push({
                                                      pathname: `/appdetails/${review.application_slug}/review/${review.review_slug}`,
                                                    });
                                                  }}
                                            // color={useColorModeValue("gray.600", "gray.300")}
                                            >
                                                {review.title}
                                            </Link>
                                        </Box>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <chakra.p
                                                // color={useColorModeValue("gray.700", "gray.200")}
                                                color={linkcolors}
                                                // fontWeight="700"
                                                cursor="pointer"
                                            >
                                                <em>
                                                    Posted On: {moment(review.created_on).format("MMM Do YYYY")}
                                                </em>

                                            </chakra.p>
                                            <chakra.p
                                                // color={useColorModeValue("gray.700", "gray.200")}
                                                color={linkcolors}
                                                // fontWeight="700"
                                                cursor="pointer"
                                            >
                                                <em>
                                                    By: {review.username}
                                                </em>
                                            </chakra.p>
                                        </div>
                                        <div>
                                            <chakra.p>
                                                Comments: {review.comments}
                                            </chakra.p>
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
                                        style={{ margin: "0", width: "100%" }}
                                    >

                                        <Box mt={1}>
                                            <Link mt={1}
                                                style={{ color: "gray.600" }}
                                                color={chakracolor}
                                            // color={useColorModeValue("gray.600", "gray.300")}
                                            >
                                                {review.title}
                                            </Link>
                                        </Box>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <chakra.p
                                                // color={useColorModeValue("gray.700", "gray.200")}
                                                color={linkcolors}
                                                // fontWeight="700"
                                                cursor="pointer"
                                            >
                                                <em>
                                                    Posted On: {moment(review.created_on).format("ll")}
                                                </em>

                                            </chakra.p>
                                            <chakra.p
                                                // color={useColorModeValue("gray.700", "gray.200")}
                                                color={linkcolors}
                                                // fontWeight="700"
                                                cursor="pointer"
                                            >
                                                <em>
                                                    By: {review.username}
                                                </em>
                                            </chakra.p>
                                        </div>
                                        <div>
                                            <chakra.p>
                                                Comments: {review.comments}
                                            </chakra.p>
                                        </div>
                                    </Box>
                                }
                            </Flex>
                        ))}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                            <Button onClick={() =>
                                router.push("/allreview")
                            }>View More Reviews</Button>
                        </div>
                    <br></br>
                    <br></br>

                </>
            }


</Stack>

        </>

    )

}

export default GlobalSearch;