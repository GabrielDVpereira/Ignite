import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { Search } from "./Search";
import { NotificationsNav } from "./NotificationsNav";

export function Header() {

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
      <Logo />
      { isWideVersion &&  <Search />}
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Flex>
  );
}
