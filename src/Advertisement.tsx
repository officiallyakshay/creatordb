import { Flex } from "@chakra-ui/react";

export const Advertisement = () => {
  return (
    <Flex padding="4" width="100%" justify="center">
      <Flex
        padding={{ base: "6", md: "10" }}
        border="1px solid white"
        width={{ base: "95%", md: "80%" }}
        borderRadius="md"
        textAlign="center"
      >
        Ads here
      </Flex>
    </Flex>
  );
};
