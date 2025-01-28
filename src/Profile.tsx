import {
  Flex,
  Box,
  Text,
  Avatar,
  Button,
  useToast,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully.",
        status: "success",
        isClosable: true,
      });
      navigate("/sign-in");
    } catch (error: any) {
      toast({
        title: "Error logging out.",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleDeleteProfile = async () => {
    if (!auth.currentUser) return;

    if (
      !window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteDoc(doc(db, "profiles", auth.currentUser.uid));
      await deleteUser(auth.currentUser);

      toast({
        title: "Profile deleted successfully.",
        status: "success",
        isClosable: true,
      });

      navigate("/sign-in");
    } catch (error: any) {
      toast({
        title: "Error deleting profile.",
        description:
          error.code === "auth/requires-recent-login"
            ? "Please log in again before deleting your profile."
            : error.message,
        status: "error",
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

  if (!profile) {
    return null;
  }

  return (
    <Flex align="center" justify="center" p="4">
      <Box
        w={{ base: "90%", sm: "80%", md: "50%", lg: "40%" }}
        bg="white"
        p="8"
        borderRadius="lg"
        boxShadow="lg"
        maxW="xl"
        mx="auto"
        mt="4"
        borderWidth="1px"
      >
        <Flex justify="center" mb="6">
          <Avatar size="xl" name={profile.name || "Your Name"} />
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb="2">
          <Flex justify="center" align="center">
            {profile.name || "Your Name"}{" "}
            <Badge
              ml="2"
              colorScheme={profile.isPro ? "teal" : "gray"}
              fontSize="0.8em"
              borderRadius="md"
              px="2"
            >
              {profile.isPro ? "Pro" : "Basic"}
            </Badge>
          </Flex>
        </Text>
        <Text fontSize="md" color="gray.600" textAlign="center" mb="2">
          @{profile.username || "username"}
        </Text>

        <Text fontSize="md" textAlign="center" color="gray.600" mb="2">
          {profile.bio || "No bio available"}
        </Text>

        <Text fontSize="sm" textAlign="center" color="gray.500" mb="6">
          Email: {profile.email}
        </Text>

        <Button
          colorScheme="blue"
          width="100%"
          mb="4"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </Button>

        <Button colorScheme="red" width="100%" mb="4" onClick={handleLogout}>
          Log Out
        </Button>

        <Button
          colorScheme="red"
          width="100%"
          variant="outline"
          onClick={handleDeleteProfile}
        >
          Delete Profile
        </Button>
      </Box>
    </Flex>
  );
};
