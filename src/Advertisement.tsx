import { Flex } from "@chakra-ui/react";

export const Advertisement = () => {
  return (
    <Flex padding="4" width="100%" justify="center">
      <Flex
        padding={{ base: "6", md: "10" }}
        border="1px solid black"
        width={{ base: "95%", md: "80%" }}
        borderRadius="md"
        textAlign="center"
      >
        {/* Google AdSense code */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-9661950831575680"
          data-ad-slot="6928030148"
          data-ad-format="auto"
        ></ins>

        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </Flex>
    </Flex>
  );
};
