import { Flex, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxMagnifyingGlass } from "react-icons/rx";

export const Nav = () => {
  const navigate = useNavigate();
  return window.innerWidth > 602 ? (
    <Flex p="4" width="100%" justify="center">
      <Flex gap="4" width="80%">
        <Button onClick={() => navigate("/")}>CreatorDB</Button>
        <Input placeholder="Search CreatorDB" border="1px solid white" />
        {/* should navigate to stripe page maybe */}
        <Button onClick={() => navigate("/subscribe")}>CreatorDB Pro</Button>
        <Button onClick={() => navigate("/sign-in")}>Sign In</Button>
      </Flex>
    </Flex>
  ) : (
    <Flex p="4" gap="4" width="100%">
      <Button onClick={() => navigate("/")}>CreatorDB</Button>
      <Flex marginLeft="auto" gap="4">
        <RxMagnifyingGlass size={40} />
        <RxHamburgerMenu size={40} />
      </Flex>
      {/* <Input placeholder="Search CreatorDB" border="1px solid white" /> */}
      {/* should navigate to stripe page maybe */}
      {/* <Button onClick={() => navigate("/subscribe")}>CreatorDB Pro</Button>
        <Button onClick={() => navigate("/sign-in")}>Sign In</Button> */}
    </Flex>
  );
};
