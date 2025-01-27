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
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";

export const EditProfile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();
  const user = auth.currentUser;

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add loading state

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
        navigate("/sign-in"); // Redirect if no authenticated user
      }
      setLoading(false); // Set loading to false once auth state is resolved
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth, navigate, toast]);
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `profilePictures/${user?.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        setUploading(false);
        toast({
          title: "Error uploading photo.",
          description: error.message,
          status: "error",
          isClosable: true,
        });
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setPhotoURL(downloadURL);
        setUploading(false);
        toast({
          title: "Photo uploaded successfully!",
          status: "success",
          isClosable: true,
        });
      }
    );
  };

  const handleSubmit = async () => {
    if (!user) return;

    if (!name.trim() || !username.trim() || !bio.trim() || !photoURL.trim()) {
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
        photoURL: photoURL.trim(),
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

  if (loading) {
    // Show a loading spinner while waiting for auth state and profile data
    return (
      <Flex align="center" justify="center" minHeight="100vh" bg="gray.100">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!profile) {
    return null; // Avoid rendering if no profile is available
  }

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
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} isDisabled />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Profile Picture</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            disabled={uploading}
          />
          {uploading && (
            <Text fontSize="sm" color="gray.500" mt="2">
              Uploading photo, please wait...
            </Text>
          )}
        </FormControl>

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

        <Button
          colorScheme="blue"
          width="100%"
          mb="4"
          onClick={handleSubmit}
          isLoading={uploading}
        >
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
