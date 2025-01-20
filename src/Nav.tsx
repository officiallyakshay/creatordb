import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxMagnifyingGlass } from "react-icons/rx";

export const Nav = () => {
  const navigate = useNavigate();
  return window.innerWidth > 602 ? (
    <Flex p="4" width="100%" justify="center">
      <Flex gap="4" width="80%">
        <Button
          variant="outline"
          border="1px solid white"
          onClick={() => navigate("/")}
        >
          <Text color="white"> CreatorDB</Text>
        </Button>
        <Input
          placeholder="Search CreatorDB"
          border="1px solid white"
          color="white"
        />
        {/* should navigate to stripe page maybe */}
        <Button
          variant="outline"
          border="1px solid white"
          onClick={() => navigate("/subscribe")}
        >
          <Text color="white"> CreatorDB Pro</Text>
        </Button>
        <Button
          variant="outline"
          border="1px solid white"
          onClick={() => navigate("/sign-in")}
        >
          <Text color="white"> Sign In</Text>
        </Button>
      </Flex>
    </Flex>
  ) : (
    <Flex p="4" gap="4" width="100%">
      <Button
        variant="outline"
        border="1px solid white"
        onClick={() => navigate("/")}
      >
        CreatorDB
      </Button>
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
