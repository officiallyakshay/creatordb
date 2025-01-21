import { Box, Text } from "@chakra-ui/react";

export const VerticalLineWithText = ({ title }: any) => {
  return (
    <Box display="flex" alignItems="center">
      <Box
        borderLeft="2px solid black"
        height="auto"
        paddingLeft="12px" // Adjust indentation
        marginLeft="8px" // Adjust margin for the indentation
      >
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
      </Box>
    </Box>
  );
};
