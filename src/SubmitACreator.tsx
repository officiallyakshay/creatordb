import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Stack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { db } from "../firebase";

const SubmitACreator = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    followers: "",
    platforms: [] as string[],
    genres: "",
    collaborations: "",
    ratings: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlatformChange = (selectedPlatforms: string[]) => {
    setFormData({
      ...formData,
      platforms: selectedPlatforms,
    });
  };

  const handleSubmit = async () => {
    const { name, username, bio, followers, platforms, genres, ratings } =
      formData;

    if (
      !name.trim() ||
      !username.trim() ||
      !bio.trim() ||
      !followers.trim() ||
      platforms.length === 0 ||
      !genres.trim() ||
      !ratings.trim()
    ) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all required fields before submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Save the form data to Firebase Firestore in the 'pending_creators' collection
    // try {
    //   await db.collection("pending_creators").add(formData);
    //   toast({
    //     title: "Creator Submitted!",
    //     description:
    //       "Your submission has been sent and will be reviewed shortly.",
    //     status: "success",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "There was an issue with your submission.",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   console.error("Error saving form data: ", error);
    // }

    setFormData({
      name: "",
      username: "",
      bio: "",
      followers: "",
      platforms: [],
      genres: "",
      collaborations: "",
      ratings: "",
    });

    toast({
      title: "Creator Submitted",
      description:
        "Thanks for the submission! We're looking into your submission and will add your creator to CreatorDB if it makes sense to.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Flex
        mt="4"
        fontSize={{ base: "sm", md: "xs" }} // Smaller font size on mobile
        justify="center"
        color="gray.500"
        textAlign={{ base: "center", md: "left" }} // Center-aligned on mobile for better readability
        px={4} // Padding for mobile screens
      >
        <Flex flexDir="column" textAlign="center">
          <Text>
            Disclaimer: Every submission will go through a review before posting
            to CreatorDB
          </Text>
          <Text mt="2" color="#69C9D0">
            <Link to="/subscribe">
              This does not apply to Pro users. Click to upgrade.
            </Link>
          </Text>
        </Flex>
      </Flex>

      <Box
        maxW="xl"
        mx="auto"
        mt="4"
        p="6"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Text fontSize="2xl" mb="6" fontWeight="bold" textAlign="center">
          Submit a Creator
        </Text>
        <VStack spacing={5} align="stretch">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Creator's Name"
              borderColor="gray.300"
            />
          </FormControl>

          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Creator's Username"
              borderColor="gray.300"
            />
          </FormControl>

          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Creator's Bio"
              borderColor="gray.300"
            />
          </FormControl>

          <FormControl id="followers" isRequired>
            <FormLabel>Followers</FormLabel>
            <Input
              type="number"
              name="followers"
              value={formData.followers}
              onChange={handleChange}
              placeholder="Total Number of Followers"
              borderColor="gray.300"
            />
          </FormControl>

          <FormControl id="platforms" isRequired>
            <FormLabel>Platforms</FormLabel>
            <CheckboxGroup
              value={formData.platforms}
              onChange={handlePlatformChange}
            >
              <Stack spacing={2} direction="column">
                <Checkbox value="YouTube">YouTube</Checkbox>
                <Checkbox value="Instagram">Instagram</Checkbox>
                <Checkbox value="TikTok">TikTok</Checkbox>
                <Checkbox value="Twitter">Twitter</Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>

          <FormControl id="genres" isRequired>
            <FormLabel>Genres</FormLabel>
            <Input
              type="text"
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              placeholder="Enter creator's genres (comma separated)"
              borderColor="gray.300"
            />
          </FormControl>

          <FormControl id="collaborations">
            <FormLabel>Collaborations</FormLabel>
            <Input
              type="text"
              name="collaborations"
              value={formData.collaborations}
              onChange={handleChange}
              placeholder="Enter collaborations (with link to post and comma separated)"
              borderColor="gray.300"
            />
          </FormControl>

          <FormControl id="ratings" isRequired>
            <FormLabel>Ratings</FormLabel>
            <Input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              placeholder="Creator's rating (1-5)"
              borderColor="gray.300"
            />
          </FormControl>

          <HStack justify="center" spacing="4" mt="6">
            <Button
              bg="black"
              color="white"
              _hover={{
                bg: "gray.800",
              }}
              onClick={handleSubmit}
            >
              Submit Creator
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setFormData({
                  name: "",
                  username: "",
                  bio: "",
                  followers: "",
                  platforms: [],
                  genres: "",
                  collaborations: "",
                  ratings: "",
                })
              }
            >
              Reset
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default SubmitACreator;
