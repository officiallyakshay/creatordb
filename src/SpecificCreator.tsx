import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  Box,
  Grid,
  GridItem,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { mockData } from "./mockData";
import { formatNumber } from "./utils/formatNumber";
import { SocialMediaIcons } from "./utils/socialMediaIcons";
import { VerticalLineWithText } from "./utils/indentedTitle";
import { LuExternalLink } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

export const SpecificCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex p="6" width="100%" justify="center" bg="gray.50" minH="100vh">
      {mockData.map((creator, i) =>
        creator.username !== id ? null : (
          <Box
            key={i}
            bg="white"
            p="6"
            borderRadius="lg"
            boxShadow="lg"
            width={{ base: "95%", md: "80%" }}
          >
            {/* Header Section */}
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap="6"
              align={{ base: "center", md: "flex-start" }}
            >
              <Image
                src={creator.profileImage}
                height="200px"
                width="200px"
                objectFit="cover"
                borderRadius="full"
                boxShadow="lg"
              />
              <Flex
                flexDir="column"
                gap="3"
                textAlign={{ base: "center", md: "left" }}
              >
                <Heading size="lg" fontWeight="bold" color="black">
                  {creator.name}
                </Heading>
                <Flex
                  wrap="wrap"
                  gap="2"
                  justify={{ base: "center", md: "left" }}
                >
                  {creator.genres.map((genre, i) => (
                    <Text key={i} fontSize="sm" color="gray.600">
                      {genre}
                      {i < creator.genres.length - 1 && (
                        <Text as="span"> • </Text>
                      )}
                    </Text>
                  ))}
                </Flex>
                <Text color="gray.700">{creator.bio}</Text>
                <Flex
                  gap="4"
                  fontSize={isMobile ? "sm" : "md"}
                  color="gray.700"
                  justify={{ base: "center", md: "left" }}
                >
                  <Text>Followers: {formatNumber(creator.followers)}</Text>
                  <Text>Rating: {creator.ratings}/5</Text>
                </Flex>
                <Flex justify={isMobile ? "center" : "left"}>
                  <Button
                    // bg="black"
                    bg="#69C9D0"
                    color="white"
                    _hover={{
                      bg: "gray.800",
                    }}
                    onClick={() => navigate(`/creator/${id}/biography`)}
                    mt="2"
                  >
                    Read More
                    <MdKeyboardArrowRight size="20" />
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            <Divider my="6" />

            {/* Brands Collaborated Section */}
            <Box>
              <VerticalLineWithText title="Brands Collaborated With" />
              <Grid
                mt="4"
                // templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap="4"
              >
                {creator.collaborations.map((collaboration, i) => (
                  <GridItem key={i}>
                    <Flex align="center" gap="2">
                      <Text fontWeight="medium" color="gray.800">
                        {collaboration.brand}
                      </Text>
                      {collaboration.url && (
                        <Link href={collaboration.url} target="_blank">
                          <LuExternalLink />
                        </Link>
                      )}
                    </Flex>
                  </GridItem>
                ))}
              </Grid>
            </Box>

            <Divider my="6" />

            {/* Social Media Section */}
            <Box>
              <VerticalLineWithText title="Social Media" />
              <Box mt="4">
                <SocialMediaIcons platforms={creator.platforms} />
              </Box>
            </Box>
          </Box>
        )
      )}
    </Flex>
  );
};
