import { Flex, Text, Input, Icon } from '@chakra-ui/react'; 
import { RiSearch2Line } from 'react-icons/ri'
export function Header(){
  return(
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
      <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        dashgo
      <Text as="span" color="pink.500" ml="1">.</Text>
      </Text>
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
          _placeholder={{color: 'gray.400'}}
        />
        <Icon as={RiSearch2Line} fontSize="20"/>
      </Flex>
    </Flex> 

  ); 
}