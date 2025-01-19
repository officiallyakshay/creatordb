import { Flex, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();
  return (
    <Flex pl="4" pr="4" pt="2" gap="4">
      <Button onClick={() => navigate("/")}>CreatorDB</Button>
      <Input placeholder="Search CreatorDB" border="1px solid white" />
      {/* should navigate to stripe page maybe */}
      <Button onClick={() => navigate("/subscribe")}>CreatorDB Pro</Button>
      <Button onClick={() => navigate("/sign-in")}>Sign In</Button>
    </Flex>
  );
};
