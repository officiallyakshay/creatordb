import { Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockData } from "./mockData";
import { formatNumber } from "./utils/formatNumber";
import { SocialMediaIcons } from "./utils/socialMediaIcons";
import { VerticalLineWithText } from "./utils/indentedTitle";
import { LuExternalLink } from "react-icons/lu";

export const SpecificCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [creator, setCreator] = useState(mockData);

  return (
    <Flex p="4" width="100%" justify="center">
      {mockData.map((creator, i) =>
        creator.username !== id ? null : (
          <Flex
            flexDir="column"
            width={{ base: "95%", md: "80%" }}
            gap="5"
            key={i}
          >
            <Heading size="xl" fontWeight="bold">
              {creator.name}
            </Heading>
            <Flex gap="1">
              {creator.genres.map((genre, i) => (
                <Flex key={i} gap="1">
                  <Text>{genre}</Text>
                  {i === creator.genres.length - 1 ? null : <Text>•</Text>}
                </Flex>
              ))}
            </Flex>
            <Flex>
              <Image
                src={creator.profileImage}
                height="200px"
                width="200px"
                objectFit="cover"
                marginRight="4"
                borderRadius="lg"
              />
              <Flex
                flexDir="column"
                textAlign={{ base: "center", md: "left" }}
                align={window.innerWidth < 602 ? "center" : "left"}
                gap="2"
              >
                <Text>{creator.bio}</Text>
                <Text>Followers: {formatNumber(creator.followers)}</Text>
                <Flex flexDir="row" align="center" gap="2">
                  <Text>Rating: {creator.ratings}/5</Text>
                  {/* <FaStar size="30" color="yellow" fill="yellow" /> */}
                  {/* <StarRating rating={7.6} reviewCount={89000} /> */}
                </Flex>
                <Button
                  bg="black"
                  color="white"
                  _hover={{
                    bg: "gray.800",
                  }}
                  marginTop="auto"
                  onClick={() => navigate(`/creator/${id}/biography`)}
                >
                  <Text color="white">Read More</Text>
                </Button>
              </Flex>
            </Flex>
            <Flex gap="5" flexDir="column">
              <Flex mt="2" flexDir="column">
                <VerticalLineWithText title="Brands collaborated with" />
                {/* <Text >
                  Brands collaborated with:
                </Text> */}
                <Flex gap="2" mt="4" flexDir="column">
                  {creator.collaborations.map((brand, i) => (
                    <Flex gap="2" flexDir="row" align="center" key={i}>
                      <Text>{brand}</Text>
                      <Text color="gray.500" fontSize="sm">
                        (Not Verified)
                      </Text>
                      <Link href="https://www.youtube.com/" target="_blank">
                        <LuExternalLink />
                      </Link>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              <Flex gap="6" mt="2" flexDir="column">
                <VerticalLineWithText title="Social Media" />
                {/* <Text >
                  Social Media
                </Text> */}
                <SocialMediaIcons platforms={creator.platforms} />
              </Flex>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
};
