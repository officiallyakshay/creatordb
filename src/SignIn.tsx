import { Flex, Input, Text } from "@chakra-ui/react";

export const SignIn = () => {
  return (
    <Flex p="4" flexDir="column" gap="4">
      <Text>Sign In</Text>
      <Input placeholder="email" border="1px solid white" />
      <Input placeholder="password" border="1px solid white" />
    </Flex>
  );
};
