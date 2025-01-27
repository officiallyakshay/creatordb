import {
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const EditProfile = () => {
  const [name, setName] = useState(""); // User's name
  const [username, setUsername] = useState(""); // User's username
  const [bio, setBio] = useState(""); // User's bio
  const [photoURL, setPhotoURL] = useState(""); // User's profile picture URL
  const [email, setEmail] = useState(""); // Uneditable email from Firebase
  const toast = useToast();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setEmail(user.email || ""); // Fetch email from Firebase Auth
      const fetchProfile = async () => {
        const profileDoc = doc(db, "profiles", user.uid);
        const profileSnap = await getDoc(profileDoc);
        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          setName(profileData.name || "");
          setUsername(profileData.username || "");
          setBio(profileData.bio || "");
          setPhotoURL(profileData.photoURL || "");
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!user) return;

    // Validation to ensure all fields are filled out
    // !photoURL.trim()
    if (!name.trim() || !username.trim() || !bio.trim()) {
      toast({
        title: "All fields are required.",
        description: "Please fill out every field before saving.",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    try {
      const profileDoc = doc(db, "profiles", user.uid);
      await setDoc(profileDoc, {
        name: name.trim(),
        username: username.trim(),
        bio: bio.trim(),
        // photoURL: photoURL.trim(),
        email,
      });
      toast({
        title: "Profile updated successfully!",
        status: "success",
        isClosable: true,
      });
      navigate("/profile");
    } catch (error: any) {
      toast({
        title: "Error updating profile.",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh" bg="gray.100" p="4">
      <Box
        w={{ base: "90%", sm: "80%", md: "50%", lg: "40%" }}
        bg="white"
        p="8"
        borderRadius="lg"
        boxShadow="xl"
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb="6">
          Edit Profile
        </Text>

        <Flex justify="center" mb="6">
          <Avatar
            size="xl"
            src={photoURL || "https://via.placeholder.com/150"}
            name={name || "Your Name"}
          />
        </Flex>

        <FormControl mb="4">
          <FormLabel>Email (Uneditable)</FormLabel>
          <Input type="email" value={email} isReadOnly />
        </FormControl>

        {/* <FormControl mb="4">
          <FormLabel>Profile Picture URL</FormLabel>
          <Input
            type="url"
            placeholder="Paste your profile picture URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </FormControl> */}

        <FormControl mb="4">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl mb="6">
          <FormLabel>Bio</FormLabel>
          <Textarea
            placeholder="Write a short bio about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            resize="none"
          />
        </FormControl>

        <Button colorScheme="blue" width="100%" mb="4" onClick={handleSubmit}>
          Save Changes
        </Button>

        <Button
          colorScheme="gray"
          width="100%"
          variant="outline"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </Button>
      </Box>
    </Flex>
  );
};
