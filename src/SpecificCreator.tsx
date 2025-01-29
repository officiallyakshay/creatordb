import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Link,
  Image,
  Text,
  Box,
  Grid,
  GridItem,
  Divider,
  useBreakpointValue,
  useToast,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  addDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase"; // Adjust imports to your setup
import { formatNumber } from "./utils/formatNumber";
import { SocialMediaIcons } from "./utils/socialMediaIcons";
import { VerticalLineWithText } from "./utils/indentedTitle";
import { LuExternalLink } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

export const SpecificCreator = () => {
  const { id } = useParams(); // ID of the creator from the URL
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState<any>(null); // Specific creator's data

  useEffect(() => {
    // Auth listener to get the logged-in user's profile
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
        // Query the `creators` collection where the `username` matches the `id` from the URL
        const q = query(
          collection(db, "creators"),
          where("username", "==", id)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming `username` is unique, take the first document
          const creatorData = querySnapshot.docs[0].data();
          setCreator(creatorData);
        } else {
          console.error("Creator not found in Firestore.");
          toast({
            title: "Creator not found.",
            status: "error",
            isClosable: true,
          });
          navigate("/");
        }
      } catch (error: any) {
        console.error("Error fetching creator data:", error);
        toast({
          title: "Error fetching creator data.",
          description: error.message,
          status: "error",
          isClosable: true,
        });
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
      <Flex align="center" justify="center" minHeight="100vh" bg="gray.100">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex p="6" width="100%" justify="center" bg="gray.50" minH="100vh">
      {!loading && creator && (
        <Box
          bg="white"
          p="6"
          borderRadius="lg"
          boxShadow="lg"
          width={{ base: "95%", md: "80%" }}
        >
          {/* Header Section */}
          <Flex
            flexDir={{ base: "column", md: "row" }}
            gap="6"
            align={{ base: "center", md: "flex-start" }}
          >
            <Image
              src={creator.profileImage}
              height="200px"
              width="200px"
              objectFit="cover"
              borderRadius="full"
              boxShadow="lg"
            />
            <Flex
              flexDir="column"
              gap="3"
              textAlign={{ base: "center", md: "left" }}
              width="100%"
            >
              <Flex
                justify="space-between"
                flexDir={isMobile ? "column" : "row"}
              >
                <Heading size="lg" fontWeight="bold" color="black">
                  {creator.name}
                </Heading>
                {profile.isPro ? (
                  <Button
                    bg="black"
                    color="white"
                    _hover={{ opacity: 0.7 }}
                    mt={isMobile ? "3" : "0"}
                    onClick={handleClaimPage}
                  >
                    Claim Page
                  </Button>
                ) : (
                  <Tooltip
                    label="Upgrade to Pro to claim a creator's page."
                    placement="top"
                  >
                    <Button
                      bg="black"
                      color="white"
                      _hover={{ opacity: 0.7 }}
                      mt={isMobile ? "3" : "0"}
                      onClick={handleClaimPage}
                      isDisabled
                    >
                      Claim Page
                    </Button>
                  </Tooltip>
                )}
              </Flex>
              <Flex
                wrap="wrap"
                gap="2"
                justify={{ base: "center", md: "left" }}
              >
                {Array.isArray(creator.genres) && creator.genres.length > 0 ? (
                  <Text fontSize="sm" color="gray.600">
                    {creator.genres.join(" • ")}{" "}
                    {/* Join genres with dot separator */}
                  </Text>
                ) : (
                  <Text fontSize="sm" color="gray.600">
                    No genres available
                  </Text>
                )}
              </Flex>

              <Text color="gray.700">{creator.bio}</Text>
              <Flex
                gap="4"
                fontSize={isMobile ? "sm" : "md"}
                color="gray.700"
                justify={{ base: "center", md: "left" }}
              >
                <Text>Followers: {formatNumber(creator.followers)}</Text>
                <Text>Rating: {creator.ratings}/5</Text>
              </Flex>
              <Flex justify={isMobile ? "center" : "left"}>
                <Button
                  bg="#69C9D0"
                  color="white"
                  _hover={{
                    bg: "gray.800",
                  }}
                  onClick={() => navigate(`/creator/${id}/biography`)}
                  mt="2"
                  width={isMobile ? "100%" : "auto"}
                >
                  Read More
                  <MdKeyboardArrowRight size="20" />
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Divider my="6" />

          <Box>
            <VerticalLineWithText title="Brands Collaborated With" />
            <Grid
              mt="4"
              // templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap="4"
            >
              {creator.collaborations.map((collaboration: any, i: number) => (
                <GridItem key={i}>
                  <Flex align="center" gap="2">
                    <Text fontWeight="medium" color="gray.800">
                      {collaboration.brand}
                    </Text>
                    {collaboration.url && (
                      <Link href={collaboration.url} target="_blank">
                        <LuExternalLink />
                      </Link>
                    )}
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          </Box>

          <Divider my="6" />

          <Box>
            <VerticalLineWithText title="Social Media" />
            <Box mt="4">
              <SocialMediaIcons platforms={creator.platforms} />
            </Box>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

// USING MOCK DATA

// import {
//   Button,
//   Flex,
//   Heading,
//   Image,
//   Link,
//   Text,
//   Box,
//   Grid,
//   GridItem,
//   Divider,
//   useBreakpointValue,
// } from "@chakra-ui/react";
// import { useParams, useNavigate } from "react-router-dom";
// import { mockData } from "./mockData";
// import { formatNumber } from "./utils/formatNumber";
// import { SocialMediaIcons } from "./utils/socialMediaIcons";
// import { VerticalLineWithText } from "./utils/indentedTitle";
// import { LuExternalLink } from "react-icons/lu";
// import { MdKeyboardArrowRight } from "react-icons/md";

// export const SpecificCreator = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isMobile = useBreakpointValue({ base: true, md: false });

//   return (
//     <Flex p="6" width="100%" justify="center" bg="gray.50" minH="100vh">
//       {mockData.map((creator, i) =>
//         creator.username !== id ? null : (
//           <Box
//             key={i}
//             bg="white"
//             p="6"
//             borderRadius="lg"
//             boxShadow="lg"
//             width={{ base: "95%", md: "80%" }}
//           >
//             {/* Header Section */}
//             <Flex
//               flexDir={{ base: "column", md: "row" }}
//               gap="6"
//               align={{ base: "center", md: "flex-start" }}
//             >
//               <Image
//                 src={creator.profileImage}
//                 height="200px"
//                 width={isMobile ? "200px" : "250px"}
//                 objectFit="cover"
//                 borderRadius="full"
//                 boxShadow="lg"
//               />
//               <Flex
//                 flexDir="column"
//                 gap="3"
//                 textAlign={{ base: "center", md: "left" }}
//                 width="100%"
//               >
//                 <Flex
//                   justify="space-between"
//                   flexDir={isMobile ? "column" : "row"}
//                 >
//                   <Heading size="lg" fontWeight="bold" color="black">
//                     {creator.name}
//                   </Heading>
//                   <Button
//                     bg="black"
//                     color="white"
//                     _hover={{ opacity: 0.7 }}
//                     mt={isMobile ? "3" : "0"}
//                     // onClick={() => }
//                   >
//                     Claim Page
//                   </Button>
//                 </Flex>
//                 <Flex
//                   wrap="wrap"
//                   gap="2"
//                   justify={{ base: "center", md: "left" }}
//                 >
//                   {creator.genres.map((genre, i) => (
//                     <Text key={i} fontSize="sm" color="gray.600">
//                       {genre}
//                       {i < creator.genres.length - 1 && (
//                         <Text as="span"> • </Text>
//                       )}
//                     </Text>
//                   ))}
//                 </Flex>
//                 {/* this should be creator.header. like a 50 word excerpt */}
//                 <Text color="gray.700">{creator.bio}</Text>
//                 <Flex
//                   gap="4"
//                   fontSize={isMobile ? "sm" : "md"}
//                   color="gray.700"
//                   justify={{ base: "center", md: "left" }}
//                 >
//                   <Text>Followers: {formatNumber(creator.followers)}</Text>
//                   <Text>Rating: {creator.ratings}/5</Text>
//                 </Flex>
//                 <Flex justify={isMobile ? "center" : "left"}>
//                   <Button
//                     // bg="black"
//                     bg="#69C9D0"
//                     color="white"
//                     _hover={{
//                       bg: "gray.800",
//                     }}
//                     onClick={() => navigate(`/creator/${id}/biography`)}
//                     mt="2"
//                     width={isMobile ? "100%" : "auto"}
//                   >
//                     Read More
//                     <MdKeyboardArrowRight size="20" />
//                   </Button>
//                 </Flex>
//               </Flex>
//             </Flex>

//             <Divider my="6" />

//             {/* Brands Collaborated Section */}
//             <Box>
//               <VerticalLineWithText title="Brands Collaborated With" />
//               <Grid
//                 mt="4"
//                 // templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
//                 gap="4"
//               >
//                 {creator.collaborations.map((collaboration, i) => (
//                   <GridItem key={i}>
//                     <Flex align="center" gap="2">
//                       <Text fontWeight="medium" color="gray.800">
//                         {collaboration.brand}
//                       </Text>
//                       {collaboration.url && (
//                         <Link href={collaboration.url} target="_blank">
//                           <LuExternalLink />
//                         </Link>
//                       )}
//                     </Flex>
//                   </GridItem>
//                 ))}
//               </Grid>
//             </Box>

//             <Divider my="6" />

//             {/* Social Media Section */}
//             <Box>
//               <VerticalLineWithText title="Social Media" />
//               <Box mt="4">
//                 <SocialMediaIcons platforms={creator.platforms} />
//               </Box>
//             </Box>
//           </Box>
//         )
//       )}
//     </Flex>
//   );
// };
