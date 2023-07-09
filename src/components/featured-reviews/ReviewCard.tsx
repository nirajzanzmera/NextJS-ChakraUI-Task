import { useEffect, useState} from "react";
import axios from 'axios'
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  Button,
  Modal,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalOverlay,
  Alert,
  AlertIcon,
  Text
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import {  BsPerson } from "react-icons/bs";

interface ReviewCardProps {
  review:any
}

function ReviewCard(props: ReviewCardProps) {
  const router = useRouter();
  const { review } = props
  const [BugDetails, setBugDetails] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokenvalue, setTokenValue] = useState("");
  const [reviewdetail, setReviewDetail] = useState<any>();
  const boxcolor = useColorModeValue('brand.100', 'gray.500');
  const linkcolors = useColorModeValue("gray.700", "gray.200");
  const chakracolor = useColorModeValue("gray.600", "gray.300");
  const headingcolor = useColorModeValue("gray.700", "white");
  const datecolor =  useColorModeValue("gray.600", "gray.400");
  const datehovercolor =  useColorModeValue("gray.600", "gray.200");

    const getBugsReviewData = (async () => {
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/b_r_homepage`,
      )
      .then((response) => response.data);
      
      setReviewDetail(request["latestreviews"])
  });
  useEffect(() => {
      getBugsReviewData();
  }, []);
  const handleClick = () => {
    window.location.replace("/allreview")
  }

  useEffect(() => {
    var tokenvalue:any = localStorage.getItem("access-enable-token") 
    setTokenValue(tokenvalue)
  },[])


  return (
    <>
    <div style={{display: 'flex', flexWrap:'wrap', justifyContent: 'center',cursor:"pointer"}}>
    {reviewdetail     &&
      reviewdetail.map((review:any) => (
      <Flex
        key={review.id}
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
        style={{padding:"5px"}}   
        // style={{width:"33.33%", padding:"5px"}}   
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
      pathname: `/appdetails/${review.app_slug}`,
    });
  }}
>{review.app_name}
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
      pathname: `/appdetails/${review.app_slug}/review/${review.review_slug}`,
    });
  }}
  >
    {review.title}
  </Link>
  <chakra.p mt={2} color={chakracolor}  fontWeight="600">
    Comments: {review.comments}
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
      {moment(review.created_on).format("MMM D, YYYY")}
      </chakra.span> 

    </chakra.p>

    <Flex alignItems="center">
    <Box as={BsPerson} aria-label = "Commented by:" size="20px" color={linkcolors}/>
      <Text
        color={linkcolors}
        fontWeight="700"
      >
        &nbsp;{review.username}
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
        pathname: `/appdetails/${review.app_slug}`,
      });
    }}
  >{review.app_name}
  </Link>
  </Flex>
    <Link  fontSize="2xl"
color={headingcolor}
fontWeight="700"
_hover={{
  color: datehovercolor,
  textDecor: "underline",
}}>
        {review.title}
    </Link>
    <chakra.p mt={2} color={chakracolor}  fontWeight="600">
      Comments: {review.comments}
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
        {moment(review.created_on).format("MMM D, YYYY")}
        </chakra.span> 

      </chakra.p>
    
      <Flex alignItems="center">
      <Box as={BsPerson} aria-label = "Commented by:" size="20px" color={linkcolors}/>
        <Text
          color={linkcolors}
          fontWeight="700"
        >
          &nbsp;{review.username}
        </Text>
      </Flex>
      </div>
      
</Box>
      }
      </Flex>
    ))}
    </div>
    <div style={{display:"flex", alignItems:"center", justifyContent: "center", marginTop:"10px"}}>
        <Button onClick={handleClick}>View More Reviews</Button>
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
  )
}

export default ReviewCard
