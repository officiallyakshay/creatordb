import { Box, Text } from "@chakra-ui/react";

export const VerticalLineWithText = ({ title }: any) => {
  return (
    <Box display="flex" alignItems="center">
      <Box
        borderLeft="4px solid #69C9D0"
        height="auto"
        paddingLeft="12px"
        marginLeft="8px"
      >
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
      </Box>
    </Box>
  );
};
