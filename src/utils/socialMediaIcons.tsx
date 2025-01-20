import { Flex, IconButton, Link } from "@chakra-ui/react";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

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
    TikTok: <FaTiktok color="#000000" />, // TikTok icon in black
  };

  return (
    <Flex gap="4">
      {platforms.map((platform) => (
        <Link
          key={platform.name}
          href={platform.url}
          aria-label={platform.name}
          target="_blank"
          border="1px solid black"
          borderRadius="sm"
        >
          <IconButton aria-label={`Visit ${platform.name}`} size="xl">
            {iconMap[platform.name] || null}
          </IconButton>
        </Link>
      ))}
    </Flex>
  );
};
