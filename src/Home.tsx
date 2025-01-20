import { Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Flex>
      {/* <Heading>Welcome to CreatorDB</Heading> */}
      <Link to="top-creators">
        <Heading>Top Creators</Heading>
      </Link>
    </Flex>
  );
};
