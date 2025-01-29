import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
  useBreakpointValue,
  Spinner,
  FormControl,
} from "@chakra-ui/react";
import { getStorage } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

export const SubmitACreator = () => {
  const toast = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    profileImage: "",
    bio: "",
    followers: "",
    platforms: [
      { name: "YouTube", handle: "", url: "" },
      { name: "Instagram", handle: "", url: "" },
      { name: "Twitter", handle: "", url: "" },
      { name: "TikTok", handle: "", url: "" },
      { name: "Twitch", handle: "", url: "" },
    ],
    genres: [] as string[],
    collaborations: [{ brand: "", url: "" }],
    ratings: "",
  });
  // const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profileDoc = doc(db, "profiles", user.uid);
          const profileSnap = await getDoc(profileDoc);
          if (profileSnap.exists()) {
            setProfile(profileSnap.data());
          } else {
            toast({
              title: "Profile not found. Redirecting to edit profile.",
              status: "info",
              isClosable: true,
            });
            navigate("/edit-profile");
          }
        } catch (error: any) {
          toast({
            title: "Error fetching profile.",
            description: error.message,
            status: "error",
            isClosable: true,
          });
        }
      } else {
        navigate("/sign-in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate, toast]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        toast({
          title: "Sign In Required",
          description: "You must be signed in to submit a creator.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        navigate("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [auth, toast, navigate]);

  // @ts-ignore
  const handlePlatformChange = (index, field, value) => {
    const updatedPlatforms = [...formData.platforms];
    // @ts-ignore
    updatedPlatforms[index][field] = value;
    setFormData({ ...formData, platforms: updatedPlatforms });
  };

  const handlePlatformDelete = (index: number) => {
    const updatedPlatforms = formData.platforms.filter((_, i) => i !== index);
    setFormData({ ...formData, platforms: updatedPlatforms });
  };

  // @ts-ignore
  const handleCollaborationChange = (index, field, value) => {
    const updatedCollaborations = [...formData.collaborations];
    // @ts-ignore
    updatedCollaborations[index][field] = value;
    setFormData({ ...formData, collaborations: updatedCollaborations });
  };

  const addCollaboration = () => {
    setFormData({
      ...formData,
      collaborations: [...formData.collaborations, { brand: "", url: "" }],
    });
  };

  const handleCollaborationDelete = (index: number) => {
    const updatedCollaborations = formData.collaborations.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, collaborations: updatedCollaborations });
  };

  const isGenresEmpty = formData.genres.every((genre) => genre.trim() === "");

  // const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const storageRef = ref(storage, `profilePictures/${user?.uid}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   setUploading(true);

  //   uploadTask.on(
  //     "state_changed",
  //     null,
  //     (error) => {
  //       setUploading(false);
  //       toast({
  //         title: "Error uploading photo.",
  //         description: error.message,
  //         status: "error",
  //         isClosable: true,
  //       });
  //     },
  //     async () => {
  //       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  //       setPhotoURL(downloadURL);
  //       setUploading(false);
  //       toast({
  //         title: "Photo uploaded successfully!",
  //         status: "success",
  //         isClosable: true,
  //       });
  //     }
  //   );
  // };

  const handleSubmit = async () => {
    const { name, username, bio, followers, platforms, genres, ratings } =
      formData;

    const hasPlatformFilled = platforms.some(
      (platform) => platform.handle.trim() || platform.url.trim()
    );

    if (
      !name.trim() ||
      !username.trim() ||
      !bio.trim() ||
      !followers.trim() ||
      !hasPlatformFilled ||
      isGenresEmpty ||
      !ratings.trim()
    ) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields before submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const currentUser = auth.currentUser;
      const email = currentUser?.email;

      const submissionData = {
        ...formData,
        submittedBy: email,
      };

      // if user isPro, send to "creators" collection
      // await addDoc(
      //   collection(db, profile.isPro ? "creators" : "pending-creators"),
      //   submissionData
      // );
      await addDoc(collection(db, "creators"), submissionData);

      toast({
        title: "Creator Submitted!",
        description: profile.isPro
          ? "Your submission has been added to our platform. Thanks!"
          : "Your submission has been sent and will be reviewed shortly.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        name: "",
        username: "",
        profileImage: "",
        bio: "",
        followers: "",
        platforms: [
          { name: "YouTube", handle: "", url: "" },
          { name: "Instagram", handle: "", url: "" },
          { name: "Twitter", handle: "", url: "" },
          { name: "TikTok", handle: "", url: "" },
          { name: "Twitch", handle: "", url: "" },
        ],
        genres: [],
        collaborations: [{ brand: "", url: "" }],
        ratings: "",
      });
    } catch (error) {
      console.error("Error saving form data: ", error);
      toast({
        title: "Error",
        description: "There was an issue with your submission.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" minHeight="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

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
            to CreatorDB.
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
        <Box p="8" maxW="600px" mx="auto">
          <VStack spacing="4" align="stretch">
            <Text fontSize="xl" fontWeight="bold">
              Submit a Creator
            </Text>
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {/* <Input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={uploading}
            />
            {uploading && (
              <Text fontSize="sm" color="gray.500" mt="2">
                Uploading photo, please wait...
              </Text>
            )} */}
            <Textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
            <Input
              placeholder="Followers Count"
              type="number"
              value={formData.followers}
              onChange={(e) =>
                setFormData({ ...formData, followers: e.target.value })
              }
            />
            <Text fontWeight="semibold">Social Platforms</Text>
            {formData.platforms.map((platform, index) => (
              <Flex
                key={index}
                gap="2"
                alignItems="center"
                flexDir={isMobile ? "column" : "row"}
              >
                <Select
                  value={platform.name}
                  placeholder="Platform"
                  onChange={(e) =>
                    handlePlatformChange(index, "name", e.target.value)
                  }
                >
                  <option value="YouTube">YouTube</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Twitch">Twitch</option>
                </Select>
                <Input
                  placeholder={`${platform.name} Handle`}
                  value={platform.handle}
                  onChange={(e) =>
                    handlePlatformChange(index, "handle", e.target.value)
                  }
                />
                <Input
                  placeholder={`${platform.name} URL`}
                  value={platform.url}
                  onChange={(e) =>
                    handlePlatformChange(index, "url", e.target.value)
                  }
                />
                {formData.platforms.length > 1 && (
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handlePlatformDelete(index)}
                  >
                    X
                  </Button>
                )}
              </Flex>
            ))}

            <Button
              bg="black"
              color="white"
              _hover={{ opacity: 0.8 }}
              onClick={() =>
                setFormData({
                  ...formData,
                  platforms: [
                    ...formData.platforms,
                    { name: "", handle: "", url: "" },
                  ],
                })
              }
            >
              Add Platform
            </Button>

            <Textarea
              placeholder="Genres (comma separated)"
              value={formData.genres.join(", ")} // Join array into a string for display
              onChange={(e) =>
                setFormData({
                  ...formData,
                  genres: e.target.value
                    .split(",")
                    .map((genre) => genre.trim()),
                })
              }
            />

            <Text fontWeight="semibold">Collaborations</Text>
            {formData.collaborations.map((collab, index) => (
              <Flex key={index} gap="2">
                <Input
                  placeholder="Brand Name"
                  value={collab.brand}
                  onChange={(e) =>
                    handleCollaborationChange(index, "brand", e.target.value)
                  }
                />
                <Input
                  placeholder="Brand URL"
                  value={collab.url}
                  onChange={(e) =>
                    handleCollaborationChange(index, "url", e.target.value)
                  }
                />
                {formData.collaborations.length > 1 && (
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleCollaborationDelete(index)}
                  >
                    X
                  </Button>
                )}
              </Flex>
            ))}
            <Button
              bg="black"
              color="white"
              _hover={{ opacity: 0.7 }}
              onClick={addCollaboration}
            >
              Add Collaboration
            </Button>
            <Input
              placeholder="Ratings (1-5)"
              type="number"
              step="0.1"
              max="5"
              min="0"
              value={formData.ratings}
              onChange={(e) =>
                setFormData({ ...formData, ratings: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit Creator
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};
