import { useState, useEffect } from "react";
import { Flex, Text, Button, Divider, Box, useToast } from "@chakra-ui/react";
import { auth } from "../firebase"; // Firebase auth import
import { signOut, deleteUser, onAuthStateChanged } from "firebase/auth"; // Firebase auth methods
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState<any>(null); // Store authenticated user's details
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/sign-in"); // Redirect to sign-in if no user is logged in
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast({
        title: "Logged out successfully!",
        status: "success",
        isClosable: true,
      });
      navigate("/sign-in"); // Redirect to sign-in after logging out
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      if (user) {
        await deleteUser(user);
        setUser(null);
        toast({
          title: "Account deleted successfully!",
          status: "success",
          isClosable: true,
        });
        navigate("/sign-in"); // Redirect to sign-in after account deletion
      }
    } catch (error: any) {
      toast({
        title: "Error deleting account",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  // Render profile section if user is logged in
  if (user) {
    return (
      <Flex
        p="4"
        mt="10"
        flexDir="column"
        width="100%"
        align="center"
        justify="center"
      >
        <Flex
          flexDir="column"
          width={{ base: "90%", sm: "70%", md: "40%", lg: "30%" }}
          gap="4"
          bg="white"
          p="8"
          borderRadius="md"
          boxShadow="xl"
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Profile
          </Text>
          <Box>
            <Text fontSize="md">
              <strong>Name:</strong> {user.displayName || "N/A"}
            </Text>
            <Text fontSize="md">
              <strong>Username:</strong> {user.email.split("@")[0]}
            </Text>
            <Text fontSize="md">
              <strong>Email:</strong> {user.email}
            </Text>
          </Box>

          <Divider mt="4" />

          <Button colorScheme="red" onClick={handleSignOut}>
            Log Out
          </Button>

          <Button colorScheme="gray" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Flex>
      </Flex>
    );
  }

  // If no user is signed in, redirect to sign-in
  navigate("/sign-in");

  return null;
};
