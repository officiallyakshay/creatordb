import { Flex } from "@chakra-ui/react";

export const Advertisement = () => {
  return (
    <Flex padding="4" width="100%" justify="center" bgColor="white">
      <Flex
        padding={{ base: "6", md: "10" }}
        border="1px solid black"
        width={{ base: "95%", md: "80%" }}
        borderRadius="md"
        textAlign="center"
        color="black"
      >
        Ads here
      </Flex>
    </Flex>
  );
};
