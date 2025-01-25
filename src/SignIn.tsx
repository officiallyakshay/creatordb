import { Flex, Input, Button, Text, Divider, useToast } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa"; // Google icon
import { useState } from "react";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For navigation after sign-in

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  // const auth = getAuth();

  // Email/password sign-in
  // const handleEmailSignIn = async () => {
  //   setIsLoading(true);
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     toast({
  //       title: "Signed in successfully!",
  //       status: "success",
  //       isClosable: true,
  //     });
  //     navigate("/"); // Redirect to homepage or dashboard
  //   } catch (error: any) {
  //     toast({
  //       title: "Error signing in",
  //       description: error.message,
  //       status: "error",
  //       isClosable: true,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Google sign-in
  // const handleGoogleSignIn = async () => {
  //   const provider = new GoogleAuthProvider();
  //   setIsLoading(true);
  //   try {
  //     await signInWithPopup(auth, provider);
  //     toast({
  //       title: "Signed in with Google!",
  //       status: "success",
  //       isClosable: true,
  //     });
  //     navigate("/"); // Redirect to homepage or dashboard
  //   } catch (error: any) {
  //     toast({
  //       title: "Error signing in with Google",
  //       description: error.message,
  //       status: "error",
  //       isClosable: true,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
          Welcome Back
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center" mb="4">
          Sign in to access your account
        </Text>

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Sign in Button */}
        <Button
          mt="4"
          colorScheme="blue"
          isLoading={isLoading}
          // onClick={handleEmailSignIn}
        >
          Sign In
        </Button>

        <Divider mt="4" />

        {/* Google Sign-in Button */}
        <Button
          mt="4"
          variant="outline"
          colorScheme="gray"
          leftIcon={<FaGoogle />}
          isLoading={isLoading}
          // onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </Button>

        {/* Forgot Password */}
        <Text
          mt="4"
          fontSize="sm"
          textAlign="center"
          color="blue.500"
          _hover={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => navigate("/forgot-password")} // Adjust the route as needed
        >
          Forgot Password?
        </Text>
      </Flex>
    </Flex>
  );
};
