import { Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { mockData } from "./mockData";

export const Home = () => {
  const [creators, setCreators] = useState(mockData);
  console.log("creators", creators);
  return (
    <Flex
      padding="4"
      flexDir="column"
      gap="10"
      width="100%"
      align="center"
      cursor="pointer"
    >
      {creators.map((creator: any, i: number) => (
        <Flex
          flexDir="row"
          border="1px solid white"
          padding="8"
          width="80%"
          key={i}
          borderRadius="lg"
        >
          <Image
            src={creator.profileImage}
            height="40"
            width="40"
            objectFit="cover"
            marginRight="4"
            borderRadius="lg"
          />
          <Flex flexDir="column">
            <Flex flexDir="row" gap="1">
              <Text>{creator.name}</Text>
              <Text>({creator.username})</Text>
            </Flex>
            <Text>{creator.bio}</Text>
            <Text>{creator.followers}</Text>
            {/* <Text>{creator.genres}</Text> */}
            {/* <Text>{creator.platforms}</Text> */}
            <Text>{creator.ratings}</Text>
            <Text>{creator.name}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
