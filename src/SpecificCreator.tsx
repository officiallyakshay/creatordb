import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockData } from "./mockData";

export const SpecificCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(mockData[0]);
  console.log("creator", creator);
  return (
    <Flex
      p="4"
      width="100%"
      justify="center"
      bgColor="white"
      border="1px solid black"
    >
      {/* <Flex p="4" color="black">
        This is user {id}
      </Flex> */}

      <Flex flexDir="column" width={{ base: "95%", md: "80%" }} gap="5">
        <Heading size="3xl" fontWeight="bold" color="black">
          {creator.name}
        </Heading>
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
          <Text color="black">{creator.bio}</Text>
          <Text color="black">Followers: {creator.followers}</Text>
          <Text color="black">Ratings: {creator.ratings}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text color="black">Brands collaborated with:</Text>
          <Flex gap="4" mt="2">
            {creator.collaborations.map((brand) => (
              <Text color="black">{brand}</Text>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
