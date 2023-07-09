import React from "react";
import {
  Flex,
  Box,
  Text,
  chakra,
  Heading,
  ListItem,
  List,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Helmet } from 'react-helmet';
export default function AllDetails({ app, data }: any) {
  const [platformData, setPlatformData] = React.useState<any>("");
  const [osData, setOsData] = React.useState<any>("");
  const [versionData, setVersion] = React.useState<any>("")
  // const [android, setAndroid] = React.useState<any>("")
  // const [ios, setIos] = React.useState<any>("") 
  var android:any = [];
  var ios: any[] = [];

  // React.useEffect (() => {
  //   data.Appversions.forEach( function (index:any, value:any) {
  //     if(value.os.toLowerCase() === "android"){
  //         android.push(value.version); 
  //     } else if(value.os.toLowerCase() === "ios"){
  //         ios.push(value.version);
  //     }
  //   })
  // },[])
  //   for(data.Appversions, function (index:any, value:any) {
  //     if(value.os.toLowerCase() === "android"){
  //         android.push(value.version); 
  //     } else if(value.os.toLowerCase() === "ios"){
  //         ios.push(value.version);
  //     }
  // })
  

  React.useEffect (() => {
    setPlatformData(data.Appversions)
    var len = data.Appversions.length
    var os = data.Appversions.map(function(item:any) {
      return item['os'];
    })
    var version = data.Appversions.map(function(item:any) {
      return item['version'];
    })
    setVersion(version.join(','));
    setOsData(os.join(', '));
  },[platformData])
  return (
    <Box
      w="100%"
      h="100%"
      border="1px solid #c4c7cc"
      boxShadow="0px 0px 2px 0px #c4c7cc"
    >
      <Flex w="100%" h="100%" alignItems="flex-start" justifyContent="center">
        <List spacing={2} w="100%" fontSize="larger">
          <SimpleGrid columns={[1, 1, 2, 2, 2]} w="100%" p={[4, 4, 8]}>
            <ListItem padding="4">
              <Text as={"span"} fontWeight={"bold"}>
                {app.app_provider_name}:
              </Text>{" "}
              {app.app_name}
            </ListItem>
            <ListItem padding="4" justifyContent="space-evenly">
              <Text as={"span"} fontWeight={"bold"}>
                Created by:
              </Text>{" "}
              {app.created_by}
            </ListItem>
            <ListItem padding="4">
              <Text as={"span"} fontWeight={"bold"}>
                Provider contact:
              </Text>{" "}
              {app.app_provider_contact}
            </ListItem>
            <ListItem padding="4">
              <Text as={"span"} fontWeight={"bold"}>
                App region:
              </Text>{" "}
              {app.webapp_region}
            </ListItem>
            <ListItem padding="4">
            {data.Appversions.map((value:any) => {
      if(value.os.toLowerCase() === "android"){
          android.push(value.version); 
      } else if(value.os.toLowerCase() === "ios"){
          ios.push(value.version);
      }
  })}
              {app.web_or_app == "app" ? 
              <>
              <Text as={"span"} fontWeight={"bold"}>
                Platform: 
              </Text>{" "}
              <br/>
              Android: {android.join(', ')}
              <br />
              iOS: {ios.join(', ')}
              <br/> 
              </>
              :
              <>
              <Text as={"span"} fontWeight={"bold"}>
                Web URL:
              </Text>{" "}
              {app.app_url}
              </>
  }
            </ListItem>
            
          </SimpleGrid>
        </List>

        <div className="text-center">
    <Helmet>
      <meta charSet="utf-8" />
      <title>{app.app_name}</title>
    </Helmet>
    {/* <h1>{app.app_name}</h1> */}
  </div>
        {/* <Box w="30%" h="100%">
          <Flex
            w="100%"
            h="100%"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Box w="100%" h="50%">
              <Text fontWeight={500} fontSize={30}>
                <Heading marginTop="1" fontSize={"xl"}>
                  {app.app_provider_name}
                </Heading>
              </Text>

              <Text>{app.app_name}</Text>
            </Box>

            <Box w="100%" h="50%">
              <Heading marginTop="1" fontSize={"xl"}>
                Created by
              </Heading>

              <Text>{app.created_by}</Text>
            </Box>
          </Flex>
        </Box>

        <Box w="30%" h="100%">
          <Flex
            w="100%"
            h="100%"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Box w="100%" h="50%">
              <Heading marginTop="1" fontSize={"xl"}>
                Provider contact
              </Heading>

              <Text>{app.app_provider_contact}</Text>
            </Box>

            <Box w="100%" h="50%">
              <Heading marginTop="1" fontSize={"xl"}>
                App region
              </Heading>

              <Text>{app.webapp_region}</Text>
            </Box>
          </Flex>
        </Box>

        <Box w="30%" h="100%">
          <Flex
            w="100%"
            h="100%"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Box w="100%" h="50%">
              <Heading marginTop="1" fontSize={"xl"}>
                App url
              </Heading>

              <Text>{app.app_url}</Text>
            </Box>

            <Box w="100%" h="50%">
              <Heading marginTop="1" fontSize={"xl"}>
                App state
              </Heading>

              <Text>{app.app_state == "0" ? "Not " : ""} Active</Text>
            </Box>
          </Flex>
        </Box>
       */}
      </Flex>
    </Box>
  );
}
