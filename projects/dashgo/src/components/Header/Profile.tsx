import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface profileProps {
  showProfileData?: boolean; 
}
export function Profile({showProfileData = true}: profileProps) {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        {
          showProfileData && (
          <>
            <Text>Diego Fernandes</Text>
            <Text color="gray.300" fontSize="small">
              Diego.shell.f@gmail.com
            </Text>
          </>
          )
        }
        
      </Box>
      <Avatar size="md" name="Gabriel Davi" />
    </Flex>
  );
}
