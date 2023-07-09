import { useEffect, useState} from "react";
import axios from 'axios'
import {
    chakra,
    Box,
    Image,
    Text,
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
    AlertIcon
  } from "@chakra-ui/react";
import { useRouter } from "next/router";
import moment from "moment";
import BugModal from "components/BugModal";
import {  BsPerson } from "react-icons/bs";

interface ReviewCardProps {
  bugs:any
}

function BugCard(props: ReviewCardProps) {
  const router = useRouter();
  const { bugs } = props
  const [BugDetails, setBugDetails] = useState<any>();
  const [tokenvalue, setTokenValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalBug, setModalBug] = useState(false);
  const boxcolor = useColorModeValue('brand.100', 'gray.500');
  const chakracolor = useColorModeValue("gray.600", "gray.300");
  const linkcolors = useColorModeValue("gray.700", "gray.200");
  const commentcolors = useColorModeValue("gray.700", "gray.200");
  const headingcolor = useColorModeValue("gray.700", "white");
  const datecolor =  useColorModeValue("gray.600", "gray.400");
  const datehovercolor =  useColorModeValue("gray.600", "gray.200");
    const getBugsReviewData = (async () => {
    const request = await axios
      .get(
        `https://172-105-61-130.ip.linodeusercontent.com:5000/b_r_homepage`,
      )
      .then((response) => response.data);
      
      setBugDetails(request["latestbugs"])
  });
  useEffect(() => {
      getBugsReviewData();
  },[]);
  const handleClick = () => {
    window.location.replace("/allbugs")
  }

  useEffect(() => {
    var tokenvalue:any = localStorage.getItem("access-enable-token") 
    setTokenValue(tokenvalue)
  },[])


  return (
    <>
    <div style={{display: 'flex', flexWrap:'wrap', justifyContent: 'center', cursor: 'pointer'}}>
    {BugDetails     &&
      BugDetails.map((bugs:any) => (
        <Flex
        key={bugs.id}
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
      color={datecolor}
      fontWeight="500"
      _hover={{
        color: datehovercolor,
        textDecor: "underline",
      }}
      onClick={() => {
        router.push({
          pathname: `/appdetails/${bugs.app_slug}`,
        });
      }}
    >{bugs.app_name}
    </Link>
</Flex>
  <Link  fontSize="2xl"
      color={headingcolor}
      fontWeight="700"
      _hover={{
        color: datehovercolor,
        textDecor: "underline",
      }}
  onClick={() => {
    router.push({
      pathname: `/appdetails/${bugs.app_slug}/bug/${bugs.bug_slug}`,
    });
  }}
  // color={useColorModeValue("gray.600", "gray.300")}
  >
    {bugs.bug_description}
  </Link>
  <chakra.p mt={2} color={chakracolor}  fontWeight="600">
      Comments: {bugs.comments}
    </chakra.p>
</Box>       
    <div style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
    <chakra.p
      // color={commentcolors}
      color={linkcolors}
      // fontWeight="700"
      cursor="pointer"
    >
    <chakra.span
      fontSize="sm"
      color={datecolor}
    >
       {moment(bugs.created_on).format("MMM D, YYYY")}
       </chakra.span> 

    </chakra.p>
  
    <Flex alignItems="center">
    <Box as={BsPerson} aria-label = "Commented by:" size="20px" color={linkcolors}/>
      <Text
        color={commentcolors}
        fontWeight="700"
      >
        &nbsp;{bugs.username}
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
      pathname: `/appdetails/${bugs.app_slug}`,
    });
  }}
  >{bugs.app_name}
  </Link>
  </Flex>
  <Link  fontSize="2xl"
  color={headingcolor}
  fontWeight="700"
  _hover={{
    color: datehovercolor,
    textDecor: "underline",
  }}
  >
    {bugs.bug_description}
  </Link>
  <chakra.p mt={2} color={chakracolor}  fontWeight="600">
    Comments: {bugs.comments}
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
  {moment(bugs.created_on).format("MMM D, YYYY")}
  </chakra.span> 

</chakra.p>

<Flex alignItems="center">
<Box as={BsPerson} aria-label = "Commented by:" size="20px" color={linkcolors}/>
  <Text
    color={commentcolors}
    fontWeight="700"
  >
    &nbsp;{bugs.username}
  </Text>
</Flex>
</div>
    
</Box>
     }
      </Flex>
    ))}
    </div>
    <div style={{display:"flex", alignItems:"center", justifyContent: "center", marginTop:"10px"}}>
        <Button onClick={handleClick}>View More Bugs</Button>
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
  )
}

export default BugCard
