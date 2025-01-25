import { Flex, Image, Text, Select, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockData } from "./mockData";
import { formatNumber } from "./utils/formatNumber";

export const TopCreators = () => {
  const [creators, setCreators] = useState(mockData);
  const [sortOption, setSortOption] = useState("default");
  const navigate = useNavigate();

  // Sorting function based on selected option
  const sortCreators = (option: string) => {
    let sortedCreators = [...creators];

    if (option === "highestToLowest") {
      sortedCreators.sort((a, b) => b.followers - a.followers);
    } else if (option === "lowestToHighest") {
      sortedCreators.sort((a, b) => a.followers - b.followers);
    } else if (option === "highestRating") {
      sortedCreators.sort((a, b) => b.ratings - a.ratings);
    } else if (option === "lowestRating") {
      sortedCreators.sort((a, b) => a.ratings - b.ratings);
    }

    setCreators(sortedCreators);
  };

  // Handle change of sort option
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    sortCreators(value);
  };

  return (
    <Flex padding="6" flexDir="column" gap="8" width="100%" align="center">
      {/* Header Section */}
      <Flex
        width={{ base: "90%", md: "80%" }}
        flexDir={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        textAlign={{ base: "center", md: "left" }}
        gap="4"
      >
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            CreatorDB Charts
          </Text>
          <Text fontSize="md" color="gray.600">
            Top Creators
          </Text>
          <Text fontSize="sm" color="gray.500">
            As determined by CreatorDB Users
          </Text>
          <Text mt="2" fontSize="sm" color="gray.500">
            {/* #69C9D0 */}
            {creators.length} Creators
          </Text>
        </Box>

        {/* Sort By Dropdown */}
        <Select
          value={sortOption}
          onChange={handleSortChange}
          width={{ base: "100%", md: "270px" }}
          borderColor="black"
          _focus={{ boxShadow: "none", borderColor: "black" }}
          bg="white"
        >
          <option value="default">Default</option>
          <option value="lowestToHighest">Followers: Lowest to Highest</option>
          <option value="highestToLowest">Followers: Highest to Lowest</option>
          <option value="lowestRating">Ratings: Lowest to Highest</option>
          <option value="highestRating">Ratings: Highest to Lowest</option>
        </Select>
      </Flex>

      {/* Creators List */}
      <Flex
        flexDir="column"
        gap="6"
        width={{ base: "90%", md: "80%" }}
        align="center"
      >
        {creators.map((creator: any, i: number) => (
          <Flex
            key={i}
            flexDir={{ base: "column", md: "row" }}
            border="1px solid black"
            padding="6"
            width="100%"
            borderRadius="lg"
            align="center"
            gap="6"
            cursor="pointer"
            _hover={{ backgroundColor: "gray.50" }}
            onClick={() => navigate(`/creator/${creator.username}`)}
          >
            {/* Profile Image */}
            <Image
              src={creator.profileImage}
              height="100px"
              width="100px"
              objectFit="cover"
              borderRadius="full"
              border="1px solid black"
            />
            {/* Creator Details */}
            <Flex
              flexDir="column"
              textAlign={{ base: "center", md: "left" }}
              align={{ base: "center", md: "flex-start" }}
              gap="2"
            >
              <Text fontSize="lg" fontWeight="bold">
                {creator.name}{" "}
                <Text as="span" color="gray.500">
                  ({creator.username})
                </Text>
              </Text>
              <Text fontSize="sm" color="gray.600" noOfLines={2}>
                {creator.bio}
              </Text>
              <Flex gap="4" fontSize="sm" color="gray.700">
                <Text>Followers: {formatNumber(creator.followers)}</Text>
                <Text>Ratings: {creator.ratings}</Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
