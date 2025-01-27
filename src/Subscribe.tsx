import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  useToast,
  Divider,
  useBreakpointValue,
  Center,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const Subscribe = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false); // State for the slider
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        toast({
          title: "Sign In Required",
          description:
            "You must be signed in to check out what Pro has to offer.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        navigate("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [auth, toast, navigate]);

  return (
    <Box maxW="4xl" mx="auto" p="6">
      <VStack spacing="6">
        {/* Status Messages */}
        {status === "success" && (
          <Text fontSize="xl" color="green.500">
            You're now a Pro Member! Enjoy your premium benefits.
          </Text>
        )}
        {status === "cancel" && (
          <Text fontSize="xl" color="red.500">
            Subscription canceled. No changes were made.
          </Text>
        )}

        {/* Title */}
        <Text fontSize="2xl" fontWeight="bold">
          Compare Plans
        </Text>

        {/* Switch for Monthly/Annual */}
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="4"
        >
          <FormLabel mb="0" fontWeight="bold" fontSize="lg" color="gray.700">
            Monthly
          </FormLabel>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.100"
            p="2"
            borderRadius="full"
            w="16"
            h="8"
            boxShadow="sm"
          >
            <Switch
              size="lg"
              colorScheme="teal"
              isChecked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
          </Box>
          <FormLabel mb="0" fontWeight="bold" fontSize="lg" color="#69C9D0">
            Annual{" "}
            <Text as="span" color="gray.500">
              (Save $90)
            </Text>
          </FormLabel>
        </FormControl>

        {/* Pricing Plans */}
        <HStack
          spacing="4"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="stretch"
        >
          <Box
            flex="1"
            minW={{ base: "100%", md: "45%" }}
            bg="gray.100"
            color="black"
            border="1px"
            borderColor="gray.300"
            borderRadius="lg"
            p="6"
            boxShadow="xl"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <VStack align="start" spacing="3">
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb="4"
                textAlign="center"
                w="full"
              >
                Free
              </Text>
              <HStack>
                <Text>✅</Text>
                <Text>Browse CreatorDB</Text>
              </HStack>
              <HStack>
                <Text>❌</Text>
                <Text>Claim page as a creator</Text>
              </HStack>
              <HStack>
                <Text>❌</Text>
                <Text>Submitted creators go through a review process</Text>
              </HStack>
              <HStack>
                <Text>❌</Text>
                <Text>Edit any existing post</Text>
              </HStack>
            </VStack>
            <Divider my="4" />
            <VStack>
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                $0/month
              </Text>
              <Center mt="4">
                <Button
                  bg="white"
                  color="gray.600"
                  _hover={{ bg: "gray.200" }}
                  size="lg"
                  fontWeight="bold"
                  isDisabled
                >
                  Included for Free
                </Button>
              </Center>
            </VStack>
          </Box>

          {/* Pro Plan */}
          <Box
            flex="1"
            minW={{ base: "100%", md: "45%" }}
            bg="#69C9D0"
            color="white"
            border="1px"
            borderColor="#5ab9c3"
            borderRadius="lg"
            p="6"
            boxShadow="xl"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <VStack align="start" spacing="3">
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb="4"
                textAlign="center"
                w="full"
              >
                Pro ({isAnnual ? "Annual" : "Monthly"})
              </Text>
              <HStack>
                <Text>✅</Text>
                <Text>Browse CreatorDB</Text>
              </HStack>
              <HStack>
                <Text>✅</Text>
                <Text>Claim page as a creator</Text>
              </HStack>
              <HStack>
                <Text>✅</Text>
                <Text>Submitted creators show immediately without review</Text>
              </HStack>
              <HStack>
                <Text>✅</Text>
                <Text>Edit any existing post</Text>
              </HStack>
            </VStack>
            <Divider my="4" />
            <VStack>
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                {isAnnual ? "$150/year" : "$20/month"}
              </Text>
              {isAnnual && (
                <Text fontSize="sm" color="gray.200" fontWeight="medium">
                  Save $90 compared to the monthly plan
                </Text>
              )}
              <Center mt="4">
                {/* <Link to="" target="_blank"> */}
                <Button
                  bg="white"
                  color="#69C9D0"
                  _hover={{ bg: "#f0f0f0" }}
                  size="lg"
                  fontWeight="bold"
                >
                  Subscribe to Pro
                </Button>
                {/* </Link> */}
              </Center>
            </VStack>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};
