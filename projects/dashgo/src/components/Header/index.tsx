import { Flex, useBreakpointValue, IconButton,Icon } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { Search } from "./Search";
import { NotificationsNav } from "./NotificationsNav";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { RiMenu2Line } from "react-icons/ri";

export function Header() {

  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false, 
    lg: true
  }); 

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mt="4"
      mx="auto"
      px="6"
      align="center"
    >

      {!isWideVersion && (
        <IconButton 
          icon={<Icon as={RiMenu2Line} />} 
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="open navigation"
          mr="2"
        />
      )}
      <Logo />
      { isWideVersion &&  <Search />}
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Flex>
  );
}
