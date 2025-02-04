import { Flex, IconButton, Link } from "@chakra-ui/react";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiTwitch } from "react-icons/si"; // Import the Twitch icon

interface Platform {
  name: string;
  handle: string;
  url: string;
}

interface SocialMediaIconsProps {
  platforms: Platform[];
}

export const SocialMediaIcons = ({ platforms }: SocialMediaIconsProps) => {
  const iconMap: { [key: string]: JSX.Element } = {
    YouTube: <FaYoutube color="red" />,
    Twitter: <BsTwitterX color="#000000" />,
    Instagram: <FaInstagram color="#E1306C" />,
    TikTok: <FaTiktok color="#000000" />,
    Twitch: <SiTwitch color="#9146FF" />,
  };

  return (
    <Flex gap="4" wrap="wrap">
      {platforms.map((platform) => (
        <Link
          key={platform.name}
          href={platform.url}
          isExternal
          aria-label={platform.name}
        >
          <IconButton
            icon={iconMap[platform.name] || null}
            aria-label={`Visit ${platform.name}`}
            size="lg"
            variant="outline"
            colorScheme="black"
          />
        </Link>
      ))}
    </Flex>
  );
};
