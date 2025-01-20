import { Flex, Box, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface ColdStarRatingProps {
  rating: number; // The average rating (e.g., 7.6)
  reviewCount: number; // The total number of reviews (e.g., 89000)
}

export const StarRating = ({ rating, reviewCount }: ColdStarRatingProps) => {
  // Format the review count for display (e.g., "89K")
  const formattedReviews =
    reviewCount >= 1000
      ? `${(reviewCount / 1000).toFixed(1).replace(/\.0$/, "")}K`
      : reviewCount.toString();

  return (
    <Flex alignItems="center" gap="2">
      {/* Star with partial fill */}
      <Box position="relative" width="24px" height="24px">
        {/* Empty star as the base */}
        <FaStar color="gray.400" />
        {/* Filled portion of the star */}
        <Box
          position="absolute"
          top="0"
          left="0"
          height="100%"
          width={`${(rating / 10) * 100}%`}
          overflow="hidden"
        >
          <FaStar color="yellow.400" />
        </Box>
      </Box>

      {/* Display the rating and review count */}
      <Text fontSize="md">
        {rating.toFixed(1)} ({formattedReviews})
      </Text>
    </Flex>
  );
};
