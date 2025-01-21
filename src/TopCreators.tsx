import { Flex, Image, Text, Select } from "@chakra-ui/react";
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
    } else if (option === "default") {
      creators;
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
    <Flex padding="4" flexDir="column" gap="6" width="100%" align="center">
      <Flex width="80%" flexDir="row" justify="space-between" align="center">
        {/* Left Side - Title and Description */}
        <Flex flexDir="column">
          <Text fontWeight="bold">CreatorDB Charts</Text>
          <Text>Top Creators</Text>
          <Text color="gray.500">As determined by CreatorDB Users</Text>
        </Flex>

        {/* Right Side - Sort By Dropdown */}
        <Select
          value={sortOption}
          onChange={handleSortChange}
          width="270px"
          borderColor="black"
          _focus={{ boxShadow: "none", borderColor: "black" }}
        >
          <option value="default">Default</option>
          <option value="highestToLowest">Followers: Highest to Lowest</option>
          <option value="lowestToHighest">Followers: Lowest to Highest</option>
        </Select>
      </Flex>

      {/* Display creators */}
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
          onClick={() => navigate(`/creator/${creator.username}`)}
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
            <Text fontSize="sm">
              Followers: {formatNumber(creator.followers)}
            </Text>
            <Text fontSize="sm">Ratings: {creator.ratings}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
