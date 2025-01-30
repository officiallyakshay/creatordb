import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  Divider,
  Grid,
  GridItem,
  useBreakpointValue,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { mockData } from "./mockData";
import { formatNumber } from "./utils/formatNumber";
import { SocialMediaIcons } from "./utils/socialMediaIcons";
import { VerticalLineWithText } from "./utils/indentedTitle";
import { LuExternalLink } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  addDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const Biography = () => {
  const { id } = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isEditing, setIsEditing] = useState(false);
  const [newWebsite, setNewWebsite] = useState("");
  // const [newBornDate, setNewBornDate] = useState("");
  // const [newBornLocation, setNewBornLocation] = useState("");
  // const [newHeight, setNewHeight] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true); // <-- Add loading state
  const navigate = useNavigate();
  const toast = useToast();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Auth listener to get the logged-in user's profile
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        try {
          const profileDoc = doc(db, "profiles", user.uid);
          const profileSnap = await getDoc(profileDoc);
          if (profileSnap.exists()) {
            setProfile(profileSnap.data());
          } else {
            toast({
              title: "Profile not found. Redirecting to edit profile.",
              status: "info",
              isClosable: true,
            });
            navigate("/edit-profile");
          }
        } catch (error: any) {
          toast({
            title: "Error fetching profile.",
            description: error.message,
            status: "error",
            isClosable: true,
          });
        }
      } else {
        navigate("/sign-in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, toast]);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const q = query(
          collection(db, "creators"),
          where("username", "==", id)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setCreator(querySnapshot.docs[0].data());
        } else {
          toast({
            title: "Creator not found.",
            status: "error",
            isClosable: true,
          });
          navigate("/");
        }
      } catch (error: any) {
        toast({
          title: "Error fetching creator data.",
          description: error.message,
          status: "error",
          isClosable: true,
        });
      } finally {
        setLoading(false); // <-- Ensure loading stops after fetching
      }
    };

    if (id) {
      fetchCreatorData();
    }
  }, [id, navigate, toast]);

  const handleClaimPage = async () => {
    if (!profile || !creator) {
      toast({
        title: "Unable to claim page.",
        description:
          "Please ensure you are signed in and creator data is loaded.",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    try {
      // Check if a claim already exists for the current user and creator
      const q = query(
        collection(db, "pending_page_claims"),
        where("userProfile.id", "==", auth.currentUser?.uid),
        where("creatorProfile.id", "==", id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a claim already exists
        toast({
          title: "You have already submitted a claim for this page.",
          description: "Please wait for the review process to complete.",
          status: "info",
          isClosable: true,
        });
        return;
      }

      // Add the claim request to the `pending_page_claims` collection
      await addDoc(collection(db, "pending_page_claims"), {
        userProfile: {
          id: auth.currentUser?.uid,
          name: profile.name,
          email: profile.email,
        },
        creatorProfile: {
          id: id,
          name: creator.name,
          bio: creator.bio,
          followers: creator.followers,
        },
        status: "pending", // Status of the claim
        submittedAt: new Date().toISOString(), // Timestamp for tracking
      });

      toast({
        title: "Page claim submitted successfully!",
        description: "Your request has been sent for review.",
        status: "success",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Failed to submit page claim.",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" minHeight="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!creator) return null; // Now it's safe to check after loading

  const handleSaveChanges = async () => {
    // Save the changes to the pending_personal_details collection in Firestore
    try {
      await addDoc(collection(db, "pending_personal_details"), {
        creatorId: creator.id,
        editor: user?.email,
        newWebsite,
        // newBornDate,
        // newBornLocation,
        // newHeight,
        // timestamp: new Date(),
      });
      alert("Changes saved as pending!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes: ", error);
    }
  };

  return (
    <Flex p="6" width="100%" justify="center" bg="gray.50" minH="100vh">
      <Box
        bg="white"
        p="6"
        borderRadius="lg"
        boxShadow="lg"
        width={{ base: "95%", md: "80%" }}
      >
        <Flex
          justify="space-between"
          flexDir={isMobile ? "column" : "row"}
          gap="4"
        >
          <Heading
            size="lg"
            fontWeight="bold"
            color="black"
            textAlign={isMobile ? "center" : "left"}
          >
            Biography
          </Heading>
          <Flex gap="2">
            <Button
              bg="black"
              color="white"
              _hover={{ opacity: 0.7 }}
              onClick={handleClaimPage}
            >
              <Text>Claim Page</Text>
            </Button>
            <Button
              bg="#69C9D0"
              color="white"
              _hover={{ opacity: 0.7 }}
              // onClick={() => }
            >
              <Text mr="2">Edit Page</Text>
              <FaRegEdit size="20" />
            </Button>
          </Flex>
        </Flex>
        {/* <Text fontSize="xs" color="gray.400" mb="4">
          Information ethically scraped from Wikipedia.
        </Text> */}
        <Flex
          flexDir={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          gap="6"
          mt="7"
        >
          <Image
            src={creator.profileImage}
            height="100px"
            width="100px"
            objectFit="cover"
            borderRadius="full"
            boxShadow="lg"
          />
          <Flex
            flexDir="column"
            gap="4"
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading size="md" fontWeight="bold" color="gray.700">
              {creator.name}
            </Heading>
            <Flex wrap="wrap" gap="1" justify={{ base: "center", md: "left" }}>
              {creator.genres.map((genre: any, i: number) => (
                <Text key={i} fontSize="sm" color="gray.600">
                  {genre}
                  {i < creator.genres.length - 1 && <Text as="span"> • </Text>}
                </Text>
              ))}
            </Flex>

            <Flex
              gap="4"
              fontSize={isMobile ? "sm" : "md"}
              color="gray.700"
              justify={{ base: "center", md: "left" }}
            >
              <Text>Followers: {formatNumber(creator.followers)}</Text>
              <Text>Rating: {creator.ratings}/5</Text>
            </Flex>
          </Flex>
        </Flex>

        <Divider my="6" />

        <Box>
          <VerticalLineWithText title="Mini Bio" />
          <Text mt="4" color="gray.700">
            {creator.bio}
          </Text>
        </Box>

        <Divider my="6" />

        {/* Personal Details */}
        <Box w={isMobile ? "auto" : "50%"}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap="3">
              <VerticalLineWithText title="Personal Details" />
              <Text fontSize="xs" color="gray.400">
                Submitted by CreatorDB users.
              </Text>
            </Flex>
            <Flex
              gap="2"
              align="center"
              cursor="pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Text fontSize="xs">{isEditing ? "Cancel" : "Edit"}</Text>
              <FaRegEdit size="20" />
            </Flex>
          </Flex>
          <Box mt="4">
            {isEditing ? (
              <>
                <FormControl mb="4">
                  <FormLabel htmlFor="website">Official Website</FormLabel>
                  <Input
                    id="website"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder={creator.website}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="bornDate">Born</FormLabel>
                  <Input
                    id="bornDate"
                    // value={newBornDate}
                    // onChange={(e) => setNewBornDate(e.target.value)}
                    // placeholder={creator.born.date}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="bornLocation">Location</FormLabel>
                  <Input
                    id="bornLocation"
                    // value={newBornLocation}
                    // onChange={(e) => setNewBornLocation(e.target.value)}
                    // placeholder={creator.born.location}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="height">Height</FormLabel>
                  <Input
                    id="height"
                    // value={newHeight}
                    // onChange={(e) => setNewHeight(e.target.value)}
                    // placeholder={creator.height}
                  />
                </FormControl>
                <Button bg="#69C9D0" color="white" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Flex
                  gap="2"
                  align="center"
                  padding="2"
                  borderBottom="1px solid black"
                  justify="space-between"
                >
                  <Text fontSize="sm" as="b">
                    Official Website
                  </Text>
                  <Link href={creator.website} target="_blank">
                    <Flex flexDir="row" gap="2">
                      <Text fontSize="sm">{creator.website}</Text>
                      {creator.website ? <LuExternalLink /> : null}
                    </Flex>
                  </Link>
                </Flex>
                <Flex
                  gap="2"
                  align="center"
                  padding="2"
                  borderBottom="1px solid black"
                  justify="space-between"
                >
                  <Text fontSize="sm" as="b">
                    Born
                  </Text>
                  <Flex
                    gap="2"
                    flexDir={isMobile ? "column" : "row"}
                    align="center"
                  >
                    {/* <Text fontSize="sm">{creator.born.date}</Text> */}
                    {!isMobile && creator.born ? (
                      <Text as="span"> • </Text>
                    ) : null}
                    {/* <Text fontSize="sm">{creator.born.location}</Text> */}
                  </Flex>
                </Flex>
                <Flex
                  gap="2"
                  align="center"
                  padding="2"
                  borderBottom="1px solid black"
                  justify="space-between"
                >
                  <Text fontSize="sm" as="b">
                    Height
                  </Text>
                  <Text fontSize="sm">{creator.height}</Text>
                </Flex>
              </>
            )}
          </Box>
        </Box>

        <Divider my="6" />

        <Box>
          <Flex>
            <VerticalLineWithText title="Photos and Videos" />
            <MdKeyboardArrowRight size="30" />
          </Flex>
          {/* {creator.photos.map((photo: any) => (
            <Image
            src={photo}
            height="200px"
            width="200px"
            objectFit="cover"
            // borderRadius="full"
            boxShadow="lg"
          />
          ))} */}
        </Box>

        <Divider my="6" />

        {/* Brands Collaborated Section */}
        <Box>
          <VerticalLineWithText title="Brands Collaborated With" />
          <Grid mt="4" gap="4">
            {creator.collaborations.map((collaboration: any, i: number) => (
              <GridItem key={i}>
                <Flex align="center" gap="2">
                  <Text fontWeight="medium" color="gray.800">
                    {collaboration.brand}
                  </Text>
                  <Link href={collaboration.url} target="_blank">
                    <LuExternalLink />
                  </Link>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <Divider my="6" />

        {/* Social Media Section */}
        <Box>
          <VerticalLineWithText title="Social Media" />
          <Box mt="4">
            <SocialMediaIcons platforms={creator.platforms} />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
