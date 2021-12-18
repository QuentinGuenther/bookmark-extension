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
import {
  BookmarkElement,
  BookmarkGroup as BookmarkGroupType,
  isBookmarkElement,
  isBookmarkGroup,
} from "../models/bookmark";
import { useBookmarkStore } from "../stores/use-bookmark-store";

interface BookmarkGroupProps {
  bookmarkList: Array<BookmarkElement | BookmarkGroupType>;
  label: string;
}
const BookmarkGroup: React.FC<BookmarkGroupProps> = ({
  bookmarkList,
  label,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Heading fontSize="m">{label}</Heading>
      <VStack
        spacing={0}
        alignItems="start"
        pl={2}
        borderWidth={3}
        p={2}
        width="auto"
      >
        <VStack spacing={0} pl={2} alignItems="start">
          {bookmarkList.map((element) => {
            if (isBookmarkElement(element)) {
              element = element as BookmarkElement;
              return (
                <BookMark
                  icon={element.faviconUrl}
                  title={element.label}
                  url={element.url}
                />
              );
            } else if (isBookmarkGroup(element)) {
              element = element as BookmarkGroupType;
              return (
                <BookmarkSubGroup
                  label={element.label}
                  bookmarkList={element.bookmarkList}
                />
              );
            }
          })}
        </VStack>
      </VStack>
    </Box>
  );
};

const BookmarkSubGroup: React.FC<BookmarkGroupProps> = ({
  bookmarkList,
  label,
  ...rest
}) => {
  return (
    <VStack spacing={0} alignItems="start" borderTopWidth={1} pt={3} {...rest}>
      <Heading fontSize="sm">{label}</Heading>
      <VStack spacing={0} alignItems="start">
        {bookmarkList.map((element) => {
          if (isBookmarkElement(element)) {
            element = element as BookmarkElement;
            return (
              <BookMark
                icon={element.faviconUrl}
                title={element.label}
                url={element.url}
              />
            );
          } else if (isBookmarkGroup(element)) {
            element = element as BookmarkGroupType;
            return (
              <BookmarkSubGroup
                label={element.label}
                bookmarkList={element.bookmarkList}
              />
            );
          }
        })}
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
  const bookMarks = useBookmarkStore((state) => state.bookmarkList);
  console.log(bookMarks);
  return (
    <SimpleGrid columns={2} spacingX={2} spacingY={4}>
      {bookMarks.map((element) => {
        if (isBookmarkElement(element)) {
          element = element as BookmarkElement;
          return (
            <BookMark
              icon={element.faviconUrl}
              title={element.label}
              url={element.url}
            />
          );
        } else if (isBookmarkGroup(element)) {
          element = element as BookmarkGroupType;
          return (
            <BookmarkGroup
              label={element.label}
              bookmarkList={element.bookmarkList}
            />
          );
        }
      })}
    </SimpleGrid>
  );
};
