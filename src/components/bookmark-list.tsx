import {
  Box,
  BoxProps,
  Divider,
  Heading,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/layout";
import {
  BookmarkElement,
  BookmarkGroup as BookmarkGroupType,
  isBookmarkElement,
  isBookmarkGroup,
} from "../models/bookmark";
import { useBookmarkStore } from "../stores/use-bookmark-store";
import { BookmarkItem } from "./bookmark-item";

interface BookmarkGroupProps extends BoxProps {
  bookmarkList: Array<BookmarkElement | BookmarkGroupType>;
  label: string;
}
const BookmarkGroup: React.FC<BookmarkGroupProps> = ({
  bookmarkList,
  label,
  ...rest
}) => {
  return (
    <Box borderWidth={1} borderRadius={3} boxShadow="sm" p={2} {...rest}>
      <Heading fontSize="sm">{label}</Heading>
      <UnorderedList styleType="none" spacing={2}>
        {bookmarkList.map((element) => {
          if (isBookmarkElement(element)) {
            element = element as BookmarkElement;
            return (
              <BookmarkItem
                key={element.id}
                bookmarkElement={element}
                group={label}
                as={ListItem}
              />
            );
          } else if (isBookmarkGroup(element)) {
            element = element as BookmarkGroupType;
            return (
              <BookmarkSubGroup
                key={`bookmarkGroup_${element.label}_bookmarkSubGroup_${element.label}`}
                label={element.label}
                groupLabel={label}
                bookmarkList={element.bookmarkList}
                as={ListItem}
              />
            );
          } else {
            return <></>;
          }
        })}
      </UnorderedList>
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
    <Box {...rest}>
      <Divider />
      <Heading fontSize="sm" pt={3}>
        {label}
      </Heading>
      <UnorderedList styleType="none" spacing={2}>
        {bookmarkList.map((element) => {
          if (isBookmarkElement(element)) {
            element = element as BookmarkElement;
            return (
              <BookmarkItem
                key={element.id}
                bookmarkElement={element}
                group={groupLabel}
                subGroup={label}
                as={ListItem}
              />
            );
          } else if (isBookmarkGroup(element)) {
            element = element as BookmarkGroupType;
            return (
              <BookmarkSubGroup
                key={`bookmarkGroup_${element.label}_bookmarkSubGroup_${element.label}`}
                label={element.label}
                groupLabel={groupLabel}
                bookmarkList={element.bookmarkList}
                as={ListItem}
              />
            );
          } else {
            return <></>;
          }
        })}
      </UnorderedList>
    </Box>
  );
};

export const BookmarkList: React.FC = () => {
  const bookMarks = useBookmarkStore((state) => state.bookmarkList);

  return (
    <SimpleGrid minChildWidth="250px" spacingX={4} spacingY={2} mt={6}>
      {bookMarks.map((element) => {
        if (isBookmarkElement(element)) {
          element = element as BookmarkElement;
          return <BookmarkItem key={element.id} bookmarkElement={element} />;
        } else if (isBookmarkGroup(element)) {
          element = element as BookmarkGroupType;
          return (
            <BookmarkGroup
              key={`bookmarkGroup_${element.label}`}
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
