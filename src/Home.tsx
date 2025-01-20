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
      cursor="pointer"
    >
      {creators.map((creator: any, i: number) => (
        <Flex
          flexDir={{ base: "column", md: "row" }}
          border="1px solid white"
          padding="6"
          width={{ base: "95%", md: "80%" }}
          key={i}
          borderRadius="lg"
          align="center"
          gap="4"
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
              <Text fontWeight="bold">{creator.name}</Text>
              <Text>({creator.username})</Text>
            </Flex>
            <Text fontSize="sm">{creator.bio}</Text>
            <Text fontSize="sm" color="gray.400">
              Followers: {creator.followers}
            </Text>
            <Text fontSize="sm" color="gray.400">
              Ratings: {creator.ratings}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
