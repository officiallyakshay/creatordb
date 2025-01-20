import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const SpecificCreator = () => {
  const { id } = useParams();
  return (
    <Flex p="4" width="100%" justify="center">
      <Flex p="4">This is user {id}</Flex>
    </Flex>
  );
};
