import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockData } from "./mockData";
import { formatNumber } from "./utils/formatNumber";
import { SocialMediaIcons } from "./utils/socialMediaIcons";
import { VerticalLineWithText } from "./utils/indentedTitle";
import { LuExternalLink } from "react-icons/lu";

export const SpecificCreator = () => {
  const { id } = useParams();
  // const [creator, setCreator] = useState(mockData);

  return (
    <Flex p="4" width="100%" justify="center" bgColor="white">
      {mockData.map((creator, i) =>
        creator.username !== id ? null : (
          <Flex
            flexDir="column"
            width={{ base: "95%", md: "80%" }}
            gap="5"
            key={i}
          >
            <Heading size="3xl" fontWeight="bold" color="black">
              {creator.name}
            </Heading>
            <Flex gap="1">
              {creator.genres.map((genre, i) => (
                <Flex key={i} gap="1">
                  <Text color="black" textStyle="xs">
                    {genre}
                  </Text>
                  {i === creator.genres.length - 1 ? null : (
                    <Text color="black" textStyle="xs">
                      •
                    </Text>
                  )}
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
                <Text color="black">{creator.bio}</Text>
                <Text color="black">
                  Followers: {formatNumber(creator.followers)}
                </Text>
                <Flex flexDir="row" align="center" gap="2">
                  <Text color="black">Rating: {creator.ratings}/5</Text>
                  {/* <FaStar size="30" color="yellow" fill="yellow" /> */}
                  {/* <StarRating rating={7.6} reviewCount={89000} /> */}
                </Flex>
                <Button color="white" variant="subtle" marginTop="auto">
                  Read More
                </Button>
              </Flex>
            </Flex>
            <Flex gap="5" flexDir="column">
              <Flex mt="2" flexDir="column">
                <VerticalLineWithText title="Brands collaborated with" />
                {/* <Text textStyle="xl" color="black">
                  Brands collaborated with:
                </Text> */}
                <Flex gap="2" mt="4" flexDir="column">
                  {creator.collaborations.map((brand, i) => (
                    <Flex gap="2" flexDir="row" align="center" key={i}>
                      <Text color="black">{brand}</Text>
                      <Text color="gray.500" textStyle="sm">
                        (Not Verified)
                      </Text>
                      <Link
                        href="https://www.youtube.com/"
                        target="_blank"
                        color="black"
                      >
                        <LuExternalLink />
                      </Link>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              <Flex gap="6" mt="2" flexDir="column">
                <VerticalLineWithText title="Social Media" />
                {/* <Text textStyle="xl" color="black">
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
