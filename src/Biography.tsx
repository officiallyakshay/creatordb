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
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { mockData } from "./mockData";
import { formatNumber } from "./utils/formatNumber";
import { SocialMediaIcons } from "./utils/socialMediaIcons";
import { VerticalLineWithText } from "./utils/indentedTitle";
import { LuExternalLink } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";

export const Biography = () => {
  const { id } = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isEditing, setIsEditing] = useState(false);
  const [newWebsite, setNewWebsite] = useState("");
  const [newBornDate, setNewBornDate] = useState("");
  const [newBornLocation, setNewBornLocation] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const creator = mockData.find((creator) => creator.username === id);

  if (!creator) return null;

  const handleSaveChanges = async () => {
    // Save the changes to the pending_personal_details collection in Firestore
    try {
      await addDoc(collection(db, "pending_personal_details"), {
        creatorId: creator.id,
        editor: user?.email,
        newWebsite,
        newBornDate,
        newBornLocation,
        newHeight,
        timestamp: new Date(),
      });
      alert("Changes saved as pending!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes: ", error);
    }
  };

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
            <Flex
              gap="2"
              align="center"
              cursor="pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Text fontSize="xs">{isEditing ? "Cancel" : "Edit"}</Text>
              <FaRegEdit size="20" />
            </Flex>
          </Flex>
          <Box mt="4">
            {isEditing ? (
              <>
                <FormControl mb="4">
                  <FormLabel htmlFor="website">Official Website</FormLabel>
                  <Input
                    id="website"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder={creator.website}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="bornDate">Born</FormLabel>
                  <Input
                    id="bornDate"
                    value={newBornDate}
                    onChange={(e) => setNewBornDate(e.target.value)}
                    placeholder={creator.born.date}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="bornLocation">Location</FormLabel>
                  <Input
                    id="bornLocation"
                    value={newBornLocation}
                    onChange={(e) => setNewBornLocation(e.target.value)}
                    placeholder={creator.born.location}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="height">Height</FormLabel>
                  <Input
                    id="height"
                    value={newHeight}
                    onChange={(e) => setNewHeight(e.target.value)}
                    placeholder={creator.height}
                  />
                </FormControl>
                <Button colorScheme="blue" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
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
                  <Link href={creator.website} target="_blank">
                    <Flex flexDir="row" gap="2">
                      <Text fontSize="sm">{creator.website}</Text>
                      <LuExternalLink />
                    </Flex>
                  </Link>
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
                  <Flex
                    gap="2"
                    flexDir={isMobile ? "column" : "row"}
                    align="center"
                  >
                    <Text fontSize="sm">{creator.born.date}</Text>
                    {!isMobile && <Text as="span"> • </Text>}
                    <Text fontSize="sm">{creator.born.location}</Text>
                  </Flex>
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
                  <Text fontSize="sm">{creator.height}</Text>
                </Flex>
              </>
            )}
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
          <Grid mt="4" gap="4">
            {creator.collaborations.map((collaboration, i) => (
              <GridItem key={i}>
                <Flex align="center" gap="2">
                  <Text fontWeight="medium" color="gray.800">
                    {collaboration.brand}
                  </Text>
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
