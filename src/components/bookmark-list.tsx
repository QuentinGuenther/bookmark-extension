import {
  Box,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  VStack,
} from "@chakra-ui/layout";
import { Image, Tooltip } from "@chakra-ui/react";

const BookmarkGroup: React.FC = ({ children, ...rest }) => {
  return (
    <Box>
      <Heading fontSize="m">SDGF</Heading>
      <VStack
        spacing={0}
        alignItems="start"
        pl={2}
        borderWidth={3}
        p={2}
        width="auto"
      >
        <VStack spacing={0} pl={2} alignItems="start">
          {children}
        </VStack>
      </VStack>
    </Box>
  );
};

const BookmarkSubGroup: React.FC = ({ children, ...rest }) => {
  return (
    <VStack spacing={0} alignItems="start" borderTopWidth={1} pt={3}>
      <Heading fontSize="sm">SDGF</Heading>
      <VStack spacing={0} alignItems="start">
        {children}
      </VStack>
    </VStack>
  );
};

function BookMark({
  title,
  url,
  icon,
  ...rest
}: {
  icon: string;
  title: string;
  url: string;
}) {
  return (
    <Tooltip
      hasArrow
      openDelay={500}
      label={url}
      w="100%"
      float="left"
      fontSize="sm"
    >
      <LinkBox
        as="article"
        p={2}
        width="100%"
        borderRadius="sm"
        _hover={{ bg: "teal.700" }}
      >
        <HStack {...rest}>
          <Image
            src={icon}
            width="32px"
            height="32px"
            fallbackSrc="favicon.ico"
          />
          <LinkOverlay href={url} whiteSpace="nowrap" fontSize="sm">
            {title}
          </LinkOverlay>
        </HStack>
      </LinkBox>
    </Tooltip>
  );
}

export const BookmarkList: React.FC = () => {
  const bookMarks = [
    {
      icon: "https://blog.logrocket.com/wp-content/uploads/2019/06/cropped-cropped-favicon-196x196-32x32.png",
      title: "Creating a Chrome extension with React and TypeScript",
      url: "https://blog.logrocket.com/creating-chrome-extension-react-typescript/",
    },
    {
      icon: "https://chakra-ui.com/favicon.png",
      title: "Chakra-UI Stack",
      url: "https://chakra-ui.com/docs/layout/stack",
    },
    {
      icon: "",
      title: "",
      url: "",
    },
  ];
  return (
    <SimpleGrid columns={2} spacingX={2} spacingY={4}>
      <BookmarkGroup>
        {bookMarks.map((element) => {
          return (
            <BookMark
              icon={element.icon}
              title={element.title}
              url={element.url}
            />
          );
        })}
        <BookmarkSubGroup>
          {bookMarks.map((element) => {
            return (
              <BookMark
                icon={element.icon}
                title={element.title}
                url={element.url}
              />
            );
          })}
        </BookmarkSubGroup>
      </BookmarkGroup>
      <BookmarkGroup>
        {bookMarks.map((element) => {
          return (
            <BookMark
              icon={element.icon}
              title={element.title}
              url={element.url}
            />
          );
        })}
        <BookmarkSubGroup>
          {bookMarks.map((element) => {
            return (
              <BookMark
                icon={element.icon}
                title={element.title}
                url={element.url}
              />
            );
          })}
        </BookmarkSubGroup>
      </BookmarkGroup>
      <BookmarkGroup>
        {bookMarks.map((element) => {
          return (
            <BookMark
              icon={element.icon}
              title={element.title}
              url={element.url}
            />
          );
        })}
        <BookmarkSubGroup>
          {bookMarks.map((element) => {
            return (
              <BookMark
                icon={element.icon}
                title={element.title}
                url={element.url}
              />
            );
          })}
        </BookmarkSubGroup>
      </BookmarkGroup>
    </SimpleGrid>
  );
};
