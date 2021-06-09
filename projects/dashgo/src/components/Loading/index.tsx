import { Spinner,Flex } from "@chakra-ui/react";

export function Loading(){
  return (
    <Flex justify="center" align="center" >
      <Spinner />
    </Flex>
  )
}