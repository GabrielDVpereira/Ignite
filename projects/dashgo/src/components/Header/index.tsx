import { Flex } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { Search } from "./Search";
import { NotificationsNav } from "./NotificationsNav";

export function Header() {
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
      <Search />
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile />
      </Flex>
    </Flex>
  );
}
