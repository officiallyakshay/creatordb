import {
  Flex,
  Input,
  Button,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxMagnifyingGlass } from "react-icons/rx";

export const Nav = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex p="4" width="100%" justify="center" bgColor="black" align="center">
      <Flex
        gap="4"
        width={isMobile ? "100%" : "80%"}
        align="center"
        justify="space-between"
      >
        {/* Left Side - Logo and Navbar Links */}
        <Button
          variant="outline"
          borderColor="white"
          _hover={{ borderColor: "white", bg: "transparent" }}
          onClick={() => navigate("/")}
          padding="4"
          minWidth="auto"
        >
          <Text color="white">CreatorDB</Text>
        </Button>

        {/* Search Input */}
        {!isMobile && (
          <Input
            placeholder="Search CreatorDB"
            color="white"
            borderColor="white"
            _focus={{ boxShadow: "none", borderColor: "white" }}
            _hover={{ borderColor: "white" }}
            minWidth="auto"
          />
        )}

        {/* Buttons */}
        {!isMobile && (
          <>
            <Button
              variant="outline"
              borderColor="white"
              _hover={{ borderColor: "white", bg: "transparent" }}
              onClick={() => navigate("/submit-a-creator")}
              padding="4"
              minWidth="auto"
            >
              <Text color="white">Submit A Creator</Text>
            </Button>
            <Button
              variant="outline"
              borderColor="white"
              _hover={{ borderColor: "white", bg: "transparent" }}
              onClick={() => navigate("/sign-in")}
              padding="4"
              minWidth="auto"
            >
              <Text color="white">Sign In</Text>
            </Button>
          </>
        )}

        {/* Right Side - Mobile Icons */}
        {isMobile && (
          <Flex marginLeft="auto" gap="4">
            <RxMagnifyingGlass size={30} color="white" />
            <RxHamburgerMenu size={30} color="white" />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
