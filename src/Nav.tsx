import { Flex, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();
  return (
    <Flex p="4" width="100%" justify="center">
      <Flex gap="4" width="80%">
        <Button onClick={() => navigate("/")}>CreatorDB</Button>
        <Input placeholder="Search CreatorDB" border="1px solid white" />
        {/* should navigate to stripe page maybe */}
        <Button onClick={() => navigate("/subscribe")}>CreatorDB Pro</Button>
        <Button onClick={() => navigate("/sign-in")}>Sign In</Button>
      </Flex>
    </Flex>
  );
};
