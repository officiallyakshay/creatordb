import {
  Box,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export const Subscribe = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const handleSubscribe = () => {
    // Redirect to Stripe checkout page
    console.log("Redirecting to Stripe payment page...");
  };

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

        {/* Styled Table */}
        <TableContainer w="100%">
          <Table variant="striped" size="md">
            <Thead>
              <Tr bg="#69C9D0">
                <Th color="white" fontSize="lg">
                  Feature
                </Th>
                <Th color="white" fontSize="lg">
                  Free
                </Th>
                <Th color="white" fontSize="lg">
                  Pro
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Browse CreatorDB</Td>
                <Td>✅</Td>
                <Td>✅</Td>
              </Tr>
              <Tr>
                <Td>Claim page as a creator</Td>
                <Td>❌</Td>
                <Td>✅</Td>
              </Tr>
              <Tr>
                <Td>
                  Submitted creators show immediately and do not go through a
                  review process
                </Td>
                <Td>❌</Td>
                <Td>✅</Td>
              </Tr>
              <Tr>
                <Td>Edit any existing post</Td>
                <Td>❌</Td>
                <Td>✅</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        {/* Subscribe Button */}
        <Button
          mt="6"
          bg="#69C9D0"
          color="white"
          _hover={{ bg: "#5ab9c3" }}
          size="lg"
          onClick={handleSubscribe}
        >
          Subscribe to CreatorDB Pro
        </Button>
      </VStack>
    </Box>
  );
};
