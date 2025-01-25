import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  Divider,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { mockData } from "./mockData";
import { formatNumber } from "./utils/formatNumber";
import { SocialMediaIcons } from "./utils/socialMediaIcons";
import { VerticalLineWithText } from "./utils/indentedTitle";
import { LuExternalLink } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

export const Biography = () => {
  const { id } = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const creator = mockData.find((creator) => creator.username === id);

  if (!creator) return null;

  return (
    <Flex p="6" width="100%" justify="center" bg="gray.50" minH="100vh">
      <Box
        bg="white"
        p="6"
        borderRadius="lg"
        boxShadow="lg"
        width={{ base: "95%", md: "80%" }}
      >
        {/* Header Section */}
        <Heading size="lg" fontWeight="bold" color="black" mb="4">
          Biography
        </Heading>
        <Text fontSize="xs" color="gray.400" mb="4">
          Information ethically scraped from Wikipedia.
        </Text>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          gap="6"
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
            gap="4"
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading size="md" fontWeight="bold" color="gray.700">
              {creator.name}
            </Heading>
            <Flex wrap="wrap" gap="2" justify={{ base: "center", md: "left" }}>
              {creator.genres.map((genre, i) => (
                <Text key={i} fontSize="sm" color="gray.600">
                  {genre}
                  {i < creator.genres.length - 1 && <Text as="span"> • </Text>}
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
          </Flex>
        </Flex>

        {/* Divider */}
        <Divider my="6" />

        {/* Personal Details */}
        <Box w={isMobile ? "auto" : "50%"}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap="3">
              <VerticalLineWithText title="Personal Details" />
              <Text fontSize="xs" color="gray.400">
                Submitted by CreatorDB users.
              </Text>
            </Flex>
            <Flex gap="2" align="center" cursor="pointer">
              <Text>Edit</Text>
              <FaRegEdit size="20" />
            </Flex>
          </Flex>
          <Box mt="4">
            <Flex
              gap="2"
              align="center"
              padding="2"
              borderBottom="1px solid black"
              justify="space-between"
            >
              <Text fontSize="sm" as="b">
                Official Website
              </Text>
              {/* <Text fontSize="sm">{creator.website}</Text> */}
            </Flex>
            <Flex
              gap="2"
              align="center"
              padding="2"
              borderBottom="1px solid black"
              justify="space-between"
            >
              <Text fontSize="sm" as="b">
                Born
              </Text>
              {/* <Flex gap="2" flexDir="column">
                <Text fontSize="sm">{creator.dob}</Text>
                <Text fontSize="sm">{creator.dob_loc}</Text>
              </Flex> */}
            </Flex>
            <Flex
              gap="2"
              align="center"
              padding="2"
              borderBottom="1px solid black"
              justify="space-between"
            >
              <Text fontSize="sm" as="b">
                Height
              </Text>
              {/* <Text fontSize="sm">{creator.height}</Text> */}
            </Flex>
          </Box>
        </Box>

        <Divider my="6" />

        <Box>
          <Flex>
            <VerticalLineWithText title="Photos and Videos" />
            <MdKeyboardArrowRight size="30" />
          </Flex>
          {/* {creator.photos.map((photo: any) => (
            <Image
            src={photo}
            height="200px"
            width="200px"
            objectFit="cover"
            // borderRadius="full"
            boxShadow="lg"
          />
          ))} */}
        </Box>

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
                  {/* <Text color="gray.500" fontSize="sm">
                    (Not Verified)
                  </Text> */}
                  <Link href={collaboration.url} target="_blank">
                    <LuExternalLink />
                  </Link>
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
    </Flex>
  );
};
