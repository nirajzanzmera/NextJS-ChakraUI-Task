import React, { useState } from "react";
import styles from "../../styles/first.module.css";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Image,
  Collapse,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Spacer,
} from "@chakra-ui/react";
import {
  BsChevronDown as ChevronDownIcon,
  BsChevronRight as ChevronRightIcon,
} from "react-icons/bs";
import { GrClose as CloseIcon } from "react-icons/gr";
import { GiHamburgerMenu as HamburgerIcon } from "react-icons/gi";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Hero from "./Hero";
import BugModal from "./BugModal";
import ReviewModal from "./ReviewModal";

// import { getToken   } from 'next-auth/jwt'
// import { useEffect } from 'react'

export default function Header({
  session,
  onOpenModalBug,
  onCloseModalBug,
  modalBug,
  onOpenModalReview,
  onCloseModalReview,
  modalReview,
}: any) 
{
  const { isOpen, onToggle } = useDisclosure();
  const [showModal, setshowModal] = useState(false);

  interface MyToken {
    username: string;
    session: any;
    // whatever else is in the JWT.
  }
  // const trigger = async () => {
  //   const token = await getToken()
  // }

  // const setModal =  () =>{
  //    setshowModal(!showModal);
  // }

  // const giveModalData = () => {
  //   // setModal();
  //   takeModalOpen();
  // }

  const clearListCookies = () =>{ 
    var allCookies = document.cookie.split(';');

    // The "expire" attribute of every cookie is 
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
        document.cookie = allCookies[i] + "=;expires="
        + new Date(0).toUTCString();
}

  const handleLogout = () => {
    signOut();
    localStorage.removeItem("access-enable-token");
  };
  const linkColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              // @ts-ignore
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "space-between" }}
          alignItems={"center"}
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontSize={"3xl"}
            fontWeight={"extrabold"}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            bgClip="text"
            bgGradient="linear(to-l, green.400,purple.500)"
          >
            <Link href="/" passHref>
              <Image
                marginRight={"25px"}
                marginBottom={"0px"}
                boxSize="7vh"
                objectFit="cover"
                src="/assets/logo.png"
                alt="Access Enable Logo"
                cursor="pointer"
              />
            </Link>
          </Text>

          <Flex
            display={{ base: "none", md: "flex" }}
            justifyContent={"center"}
          >
            <DesktopNav
              onOpenModalBug={onOpenModalBug}
              onOpenModalReview={onOpenModalReview}
            />

            {/* <Text
              as='a'
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={500}
              color={linkColor}
              cursor="pointer"
              paddingLeft={2}
              paddingTop={1}
              onClick={() => { router.push('/applications') }}
              >
              Applications
            </Text> */}
          </Flex>
          <Spacer />
          {/* <Flex className={styles.flexStyle}>
            <Button
            as="a"
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            colorScheme={"green"}
            _hover={{
              bg: "blue.300",
            }}
            onClick={takeModalOpen}
            >
            Bug/Review
            </Button>
          </Flex> */}

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {session ? (
              <Menu id="1">
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    alt={"Hello, "+ jwt_decode<MyToken>(session).username}
                    // src={session.user.uid.image && session.user.uid.image.replace('=s96-c', '')}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Center>
                    <Text style={{fontWeight:"bold"}}>
                    {"Hello, "+ jwt_decode<MyToken>(session).username}
                    </Text>
                  </Center>
                  <MenuDivider />
                  <Link href="/profile" passHref>
                    <MenuItem>My Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link href="/auth" passHref>
                <Button
                  as="a"
                  display={{base: "flex", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  colorScheme={"blue"}
                  _hover={{
                    bg: "blue.300",
                  }}
                  onClick={clearListCookies}
                >
                  Login / Register
                </Button>
              </Link>
            )}
          </Stack>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav
          onOpenModalBug={onOpenModalBug}
          onOpenModalReview={onOpenModalReview}
        />
      </Collapse>
      <BugModal
        session={session}
        onOpenModal={onOpenModalBug}
        onCloseModal={onCloseModalBug}
        modalOpener={modalBug}
      />
      <ReviewModal
        session={session}
        onOpenModal={onOpenModalReview}
        onCloseModal={onCloseModalReview}
        modalOpener={modalReview}
      />
    </Box>
  );
}

const DesktopNav = ({ onOpenModalBug, onOpenModalReview }: any) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const router = useRouter();

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover
            id="pop"
            key={"uniqueId"}
            trigger={"hover"}
            placement={"bottom-start"}
          >
            <PopoverTrigger>
              <ChakraLink
                p={2}
                href= {"#"}
                fontSize={"sm"}
                onClick={() => router.push(navItem.href ?? "#")}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </ChakraLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                      key={child.label}
                      {...child}
                      onOpenModalBug={onOpenModalBug}
                      onOpenModalReview={onOpenModalReview}
                    />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({
  label,
  href,
  subLabel,
  action,
  onOpenModalBug,
  onOpenModalReview,
}: any) => {
  const router = useRouter();
  return (
    <ChakraLink
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      onClick={() => {
        if (action) {
          if (action === "bug") {
            onOpenModalBug();
          } else if (action === "review") {
            onOpenModalReview();
          }
        } else {
          router.push(href ?? "#");
        }
      }}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
      _focus={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            _groupFocus={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          _groupFocus={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChakraLink>
  );
};

const MobileNav = ({ onOpenModalBug, onOpenModalReview }: any) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          onOpenModalBug={onOpenModalBug}
          onOpenModalReview={onOpenModalReview}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({
  label,
  children,
  href,
  action,
  onOpenModalBug,
  onOpenModalReview,
}: any) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ChakraLink}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        onClick={() => {
          router.push(href ?? "#");
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child: any) => (
              <ChakraLink
                key={child.label}
                href={"#"}
                py={2}
                onClick={() => {
                  if (child.action) {
                    if (child.action === "bug") {
                      onOpenModalBug();
                    } else if (child.action === "review") {
                      onOpenModalReview();
                    }
                  } else {
                    router.push(child.href ?? "#");
                  }
                }}
              >
                {child.label}
              </ChakraLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  action?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Bugs",
    children: [
      {
        label: "Explore Bugs",
        subLabel: "Accessible Designs to inspire you",
        href: "/allbugs",
      },
      {
        label: "Post a Bug",
        subLabel: "Let your voice be heard!",
        href: "#",
        action: "bug",
      },
    ],
  },
  {
    label: "Reviews",
    children: [
      {
        label: "Explore Reviews",
        subLabel: "Accessible Designs to inspire you",
        href: "/allreview",
      },
      {
        label: "Add a Review",
        subLabel: "Share your experience!",
        href: "#",
        action: "review",
      },
    ],
  },
  {
    label: "Applications",
    href: "/applications",
  },
  {
    label: "About us",
    href: "/about",
  },
  {
    label: "Contact us",
    href: "/contact",
  },
];
