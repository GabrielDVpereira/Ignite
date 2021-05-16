import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";


// controlled compontens - when you use a state to store the value of an input and grab it's change with an  onChange funciton
// uncontrolled components - when you use refs to grab the value of an form

export function Search() {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gay.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}
      />
      <Icon as={RiSearch2Line} fontSize="20" />
    </Flex>
  );
}
