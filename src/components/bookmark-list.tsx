import {
  Box,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Image, Tooltip } from "@chakra-ui/react";

function BookMark({ title, desc, ...rest }: { title: string; desc: string }) {
  return (
    <Tooltip hasArrow openDelay={500} label={desc} fontSize="sm">
      <LinkBox as="article" maxW="sm" p={3} w="45%" _hover={{ bg: "teal.700" }}>
        <HStack>
          <Image
            src="gibbresh.png"
            width="32px"
            height="32px"
            fallbackSrc="favicon.ico"
          />
          <LinkOverlay href={desc} whiteSpace="nowrap" fontSize="sm">
            {title}
          </LinkOverlay>
        </HStack>
      </LinkBox>
    </Tooltip>
  );
}

export const BookmarkList: React.FC = () => {
  return (
    <VStack>
      <BookMark
        title="Plan Money"
        desc="https://developer.chrome.com/docs/extensions/reference/storage/#property-sync"
      />
      <BookMark
        title="Save Money"
        desc="https://blog.logrocket.com/creating-chrome-extension-react-typescript/"
      />
    </VStack>
  );
};
