import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mockData } from "./mockData";
import { formatNumber } from "./utils/formatNumber";
import { StarRating } from "./utils/starRating";
import { FaStar } from "react-icons/fa";
import { SocialMediaIcons } from "./utils/socialMediaIcons";
import { VerticalLineWithText } from "./utils/indentedTitle";

export const SpecificCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(mockData);
  console.log("creator", creator, "id", id);
  return (
    <Flex p="4" width="100%" justify="center" bgColor="white">
      {mockData.map((creator) =>
        creator.username !== id ? null : (
          <Flex flexDir="column" width={{ base: "95%", md: "80%" }} gap="5">
            <Heading size="3xl" fontWeight="bold" color="black">
              {creator.name}
            </Heading>
            <Flex gap="1">
              {creator.genres.map((genre, i) => (
                <>
                  <Text color="black" textStyle="xs">
                    {genre}
                  </Text>
                  {i === creator.genres.length - 1 ? null : (
                    <Text color="black" textStyle="xs">
                      •
                    </Text>
                  )}
                </>
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
                gap="4"
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
              </Flex>
            </Flex>
            <Flex gap="8" flexDir="row">
              <Flex mt="2" flexDir="column">
                <VerticalLineWithText title="Brands collaborated with" />
                <Flex gap="2" mt="4" flexDir="column">
                  {creator.collaborations.map((brand) => (
                    <Flex gap="2" flexDir="row" align="center">
                      <Text color="black">{brand}</Text>
                      <Text color="black" textStyle="sm">
                        (Not Verified)
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              <Flex gap="6" mt="2" flexDir="column">
                <VerticalLineWithText title="Social Media" />
                <SocialMediaIcons platforms={creator.platforms} />
              </Flex>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
};
