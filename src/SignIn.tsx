import { Flex, Input, Button, Text, Divider, useToast } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Check if user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/profile"); // Redirect to profile if already signed in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Handle email sign-in
  const handleEmailSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Signed in successfully!",
        status: "success",
        isClosable: true,
      });
      navigate("/profile"); // Navigate to profile or wherever the user should be redirected after login
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email sign-up
  const handleEmailSignUp = async () => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Account created successfully!",
        status: "success",
        isClosable: true,
      });
      navigate("/profile"); // Navigate to profile after successful sign-up
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Signed in with Google!",
        status: "success",
        isClosable: true,
      });
      navigate("/profile"); // Navigate to profile after Google login
    } catch (error: any) {
      toast({
        title: "Error signing in with Google",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handleForgotPassword = async () => {
    try {
      if (!email) {
        toast({
          title: "Enter your email to reset password",
          status: "info",
          isClosable: true,
        });
        return;
      }
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password reset email sent!",
        status: "success",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error sending password reset email",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

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
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center" mb="4">
          {isSignUp
            ? "Sign up to create your account"
            : "Sign in to access your account"}
        </Text>

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          border="1px solid #ccc"
          _focus={{
            borderColor: "blue.500",
          }}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          border="1px solid #ccc"
          _focus={{
            borderColor: "blue.500",
          }}
        />

        <Button
          mt="4"
          colorScheme="blue"
          isLoading={isLoading}
          onClick={isSignUp ? handleEmailSignUp : handleEmailSignIn}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        <Divider mt="4" />

        <Button
          mt="4"
          variant="outline"
          colorScheme="gray"
          leftIcon={<FaGoogle />}
          isLoading={isLoading}
          onClick={handleGoogleSignIn}
        >
          {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
        </Button>

        {!isSignUp && (
          <Text
            mt="4"
            fontSize="sm"
            textAlign="center"
            color="blue.500"
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </Text>
        )}

        <Text
          mt="4"
          fontSize="sm"
          textAlign="center"
          color="blue.500"
          _hover={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Text>
      </Flex>
    </Flex>
  );
};
