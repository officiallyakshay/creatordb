import {
  Box,
  Button,
  Input,
  Textarea,
  Select,
  VStack,
  HStack,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";

const SubmitACreator = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    followers: "",
    platforms: "",
    genres: "",
    collaborations: "",
    ratings: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Here, you would send formData to your backend or state management system.
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <Box
      maxW="xl"
      mx="auto"
      mt="10"
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
            placeholder="Number of Followers"
            borderColor="gray.300"
          />
        </FormControl>

        <FormControl id="platforms" isRequired>
          <FormLabel>Platforms</FormLabel>
          <Select
            name="platforms"
            value={formData.platforms}
            onChange={handleChange}
            placeholder="Select a Platform"
            borderColor="gray.300"
          >
            <option value="YouTube">YouTube</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="Twitter">Twitter</option>
          </Select>
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
            placeholder="Enter collaborations (comma separated)"
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
          <Button colorScheme="teal" onClick={handleSubmit}>
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
                platforms: "",
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
  );
};

export default SubmitACreator;
