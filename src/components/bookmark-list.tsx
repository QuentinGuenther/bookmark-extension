import { Box, Heading, SimpleGrid, VStack } from "@chakra-ui/layout";
import {
  BookmarkElement,
  BookmarkGroup as BookmarkGroupType,
  isBookmarkElement,
  isBookmarkGroup,
} from "../models/bookmark";
import { useBookmarkStore } from "../stores/use-bookmark-store";
import { BookmarkItem } from "./bookmark-item";

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
              return <BookmarkItem bookmarkElement={element} group={label} />;
            } else if (isBookmarkGroup(element)) {
              element = element as BookmarkGroupType;
              return (
                <BookmarkSubGroup
                  label={element.label}
                  groupLabel={label}
                  bookmarkList={element.bookmarkList}
                />
              );
            } else {
              return <></>;
            }
          })}
        </VStack>
      </VStack>
    </Box>
  );
};

interface BookmarkSubGroupProps extends BookmarkGroupProps {
  groupLabel: string;
}
const BookmarkSubGroup: React.FC<BookmarkSubGroupProps> = ({
  bookmarkList,
  groupLabel,
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
              <BookmarkItem
                bookmarkElement={element}
                group={groupLabel}
                subGroup={label}
              />
            );
          } else if (isBookmarkGroup(element)) {
            element = element as BookmarkGroupType;
            return (
              <BookmarkSubGroup
                label={element.label}
                groupLabel={groupLabel}
                bookmarkList={element.bookmarkList}
              />
            );
          } else {
            return <></>;
          }
        })}
      </VStack>
    </VStack>
  );
};

export const BookmarkList: React.FC = () => {
  const bookMarks = useBookmarkStore((state) => state.bookmarkList);
  return (
    <SimpleGrid columns={2} spacingX={2} spacingY={4}>
      {bookMarks.map((element) => {
        if (isBookmarkElement(element)) {
          element = element as BookmarkElement;
          return <BookmarkItem bookmarkElement={element} />;
        } else if (isBookmarkGroup(element)) {
          element = element as BookmarkGroupType;
          return (
            <BookmarkGroup
              label={element.label}
              bookmarkList={element.bookmarkList}
            />
          );
        } else {
          return <></>;
        }
      })}
    </SimpleGrid>
  );
};
