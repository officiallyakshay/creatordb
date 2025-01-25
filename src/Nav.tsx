import { useState, useEffect } from "react";
import {
  Flex,
  Input,
  Button,
  Text,
  useBreakpointValue,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { RxHamburgerMenu, RxMagnifyingGlass } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth

export const Nav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Track if search input should be shown
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null); // Track authenticated user
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const auth = getAuth(); // Initialize Firebase Auth

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser); // Set the user object if logged in, otherwise null
    });
    return unsubscribe; // Cleanup listener on unmount
  }, [auth]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
          minWidth="auto"
          variant="outline"
          borderColor="white"
          _hover={{ bg: "transparent" }}
          onClick={() => navigate("/")}
        >
          <Text color="white">CreatorDB</Text>
        </Button>

        {/* Search Input */}
        {!isMobile && (
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search CreatorDB"
            color="white"
            borderColor="white"
            _focus={{ boxShadow: "none", borderColor: "white" }}
            _hover={{ borderColor: "white" }}
            minWidth="auto"
          />
        )}

        {/* Search Input (Visible only when magnifying glass is clicked) */}
        {isMobile && isSearchOpen && (
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search CreatorDB"
            color="white"
            borderColor="white"
            _focus={{ boxShadow: "none", borderColor: "white" }}
            _hover={{ borderColor: "white" }}
            minWidth="auto"
          />
        )}
        {/* Magnifying Glass Button on Mobile */}
        {isMobile && (
          <Flex marginLeft="auto">
            <RxMagnifyingGlass
              size={30}
              color="white"
              onClick={() => setIsSearchOpen(!isSearchOpen)} // Show search input on click
              style={{ cursor: "pointer" }}
            />
          </Flex>
        )}

        {/* Buttons for Mobile */}
        {isMobile && (
          <Flex gap="4" flexDirection="column" alignItems="flex-end">
            <RxHamburgerMenu
              size={30}
              color="white"
              onClick={onOpen}
              style={{ cursor: "pointer" }}
            />
          </Flex>
        )}

        {/* Buttons for Desktop */}
        {!isMobile && (
          <>
            <Button
              minWidth="auto"
              variant="outline"
              borderColor="#69C9D0"
              _hover={{ bg: "transparent" }}
              onClick={() => navigate("/subscribe")}
            >
              <Text color="#69C9D0">CreatorDB PRO</Text>
            </Button>
            <Button
              minWidth="auto"
              variant="outline"
              borderColor="white"
              _hover={{ bg: "transparent" }}
              onClick={() => navigate("/submit-a-creator")}
            >
              <Text color="white">Submit A Creator</Text>
            </Button>
            <Button
              minWidth="auto"
              variant="outline"
              borderColor="white"
              _hover={{ bg: "transparent" }}
              onClick={() =>
                user ? navigate("/profile") : navigate("/sign-in")
              }
            >
              {user ? (
                <Flex align="center" gap="2">
                  <FaUserCircle color="white" />
                  <Text color="white">My Profile</Text>
                </Flex>
              ) : (
                <Text color="white">Sign In</Text>
              )}
            </Button>
          </>
        )}
      </Flex>

      {/* Modal for Hamburger Menu */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap="4">
            <Button
              variant="outline"
              borderColor="white"
              _hover={{ borderColor: "white", bg: "transparent" }}
              onClick={() => {
                navigate("/submit-a-creator");
                onClose();
              }}
            >
              Submit a Creator
            </Button>
            <Button
              variant="outline"
              borderColor="white"
              _hover={{ bg: "transparent" }}
              onClick={() => {
                if (user) {
                  navigate("/profile");
                  onClose(); // Close the modal after navigating to profile
                } else {
                  navigate("/sign-in");
                  onClose(); // Close the modal after navigating to sign-in
                }
              }}
            >
              {user ? (
                <Flex align="center" gap="2">
                  <FaUserCircle color="white" />
                  <Text color="black">My Profile</Text>
                </Flex>
              ) : (
                <Text color="black">Sign In</Text>
              )}
            </Button>

            <Button
              variant="outline"
              borderColor="white"
              _hover={{ borderColor: "white", bg: "transparent" }}
              onClick={() => {
                navigate("/subscribe");
                onClose();
              }}
            >
              CreatorDB PRO
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
