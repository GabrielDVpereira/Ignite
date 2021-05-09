import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Diego Fernandes</Text>
        <Text color="gray.300" fontSize="small">
          Diego.shell.f@gmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Gabriel Davi" />
    </Flex>
  );
}
