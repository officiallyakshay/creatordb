import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa"; // For Google icon

export const SignIn = () => {
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
        width={{ base: "80%", sm: "50%", md: "30%" }} // Responsive width
        gap="4"
        bg="white"
        p="6"
        borderRadius="md"
        boxShadow="lg"
      >
        <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center">
          Sign In
        </Text>

        {/* Email input */}
        <Input
          placeholder="Email"
          type="email"
          border="1px solid #ccc"
          _focus={{
            borderColor: "blue.500",
          }}
        />

        {/* Password input */}
        <Input
          placeholder="Password"
          type="password"
          border="1px solid #ccc"
          _focus={{
            borderColor: "blue.500",
          }}
        />

        {/* Sign in button */}
        <Button
          mt="4"
          colorScheme="blue"
          onClick={() => console.log("Sign In with Email")}
        >
          Sign In
        </Button>

        {/* Google sign-in button */}
        <Button
          mt="4"
          variant="outline"
          colorScheme="gray"
          leftIcon={<FaGoogle />}
          onClick={() => console.log("Sign In with Google")}
        >
          Sign In with Google
        </Button>

        {/* Optional "Forgot Password" link */}
        <Text
          mt="4"
          fontSize="sm"
          textAlign="center"
          _hover={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => console.log("Forgot Password")}
        >
          Forgot Password?
        </Text>
      </Flex>
    </Flex>
  );
};
