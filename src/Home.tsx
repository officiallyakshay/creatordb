import { Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockData } from "./mockData";

export const Home = () => {
  const [creators, setCreators] = useState(mockData);
  const navigate = useNavigate();

  return (
    <Flex
      padding="4"
      flexDir="column"
      gap="6"
      width="100%"
      align="center"
      bgColor="white"
    >
      <Flex width="80%" flexDir="column">
        <Text fontWeight="bold" color="black">
          CreatorDB Charts
        </Text>
        <Text color="black">Top Creators</Text>
        <Text color="gray.500">As determined by CreatorDB Users</Text>
      </Flex>
      {/* <Flex flexDir="row" color="black">
        Sort By:
      </Flex> */}
      {creators.map((creator: any, i: number) => (
        <Flex
          flexDir={{ base: "column", md: "row" }}
          border="1px solid black"
          padding="6"
          width={{ base: "95%", md: "80%" }}
          key={i}
          borderRadius="lg"
          align="center"
          gap="4"
          cursor="pointer"
          onClick={() => navigate(`creator/${creator.username}`)}
        >
          <Image
            src={creator.profileImage}
            height="80px"
            width="80px"
            objectFit="cover"
            marginRight="4"
            borderRadius="lg"
          />
          <Flex
            flexDir="column"
            textAlign={{ base: "center", md: "left" }}
            align={window.innerWidth < 602 ? "center" : "left"}
          >
            <Flex flexDir="row" gap="1">
              <Text fontWeight="bold" color="black">
                {creator.name}
              </Text>
              <Text color="black">({creator.username})</Text>
            </Flex>
            <Text fontSize="sm" color="black">
              {creator.bio}
            </Text>
            <Text fontSize="sm" color="black">
              Followers: {creator.followers}
            </Text>
            <Text fontSize="sm" color="black">
              Ratings: {creator.ratings}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
