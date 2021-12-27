import { CopyIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  useClipboard,
  useToast,
  MenuList,
  MenuItem,
  MenuGroup,
  Tooltip,
  LinkBox,
  HStack,
  LinkOverlay,
  Image,
  Box,
  BoxProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { ContextMenu } from "chakra-ui-contextmenu/lib/cjs/ContextMenu";
import { useState } from "react";
import { BookmarkElement } from "../models/bookmark";
import { useBookmarkStore } from "../stores/use-bookmark-store";
import { AddNewBookmark } from "./add-new-bookmark";

interface BookmarkDisplayProps extends BookmarkElement {}

const BookmarkDisplay: React.FC<BookmarkDisplayProps> = ({
  url,
  label,
  faviconUrl,
}) => {
  const hoverBgColor = useColorModeValue("teal.200", "teal.700");
  return (
    <Tooltip hasArrow openDelay={1000} label={url} fontSize="xs">
      <LinkBox
        as="article"
        borderRadius="sm"
        px={2}
        py={1}
        _hover={{ bg: hoverBgColor }}
      >
        <HStack>
          <Image
            src={faviconUrl}
            width="32px"
            height="32px"
            fallbackSrc="favicon.ico"
          />
          <LinkOverlay href={url} whiteSpace="nowrap" fontSize="sm">
            {label}
          </LinkOverlay>
        </HStack>
      </LinkBox>
    </Tooltip>
  );
};

interface BookmarkContextMenuProps {
  data: {
    bookmarkElement: BookmarkElement;
    group?: string;
    subGroup?: string;
  };
  setShow: (show: boolean) => void;
}

const BookmarkContextMenu: React.FC<BookmarkContextMenuProps> = ({
  data,
  setShow,
  children,
}) => {
  const { onCopy } = useClipboard(data.bookmarkElement.url);
  const toast = useToast();
  const deleteBookmark = useBookmarkStore((state) => state.deleteBookmark);

  const onCopyClick = () => {
    onCopy();
    toast({
      title: "Copied URL to clipboard.",
      description: data.bookmarkElement.url,
      status: "info",
    });
  };

  const onEditClick = () => {
    setShow(true);
  };

  const onDeleteClick = () => {
    const confirmation = prompt(
      `Are you sure you want to delete ${data.bookmarkElement.label}?`
    );

    if (confirmation) {
      deleteBookmark(data.bookmarkElement.id);
    }
  };

  return (
    <ContextMenu<HTMLDivElement>
      renderMenu={() => (
        <MenuList>
          <MenuItem icon={<CopyIcon />} onClick={onCopyClick}>
            Copy URL
          </MenuItem>
          <MenuItem icon={<EditIcon />} onClick={onEditClick}>
            Edit
          </MenuItem>
          <MenuGroup title="Danger">
            <MenuItem icon={<DeleteIcon />} onClick={onDeleteClick}>
              Delete
            </MenuItem>
          </MenuGroup>
        </MenuList>
      )}
    >
      {(ref) => <div ref={ref}>{children}</div>}
    </ContextMenu>
  );
};

interface BookmarkItemProps extends BoxProps {
  bookmarkElement: BookmarkElement;
  group?: string;
  subGroup?: string;
}

export const BookmarkItem: React.FC<BookmarkItemProps> = ({
  bookmarkElement,
  group,
  subGroup,
  ...rest
}) => {
  const [show, setShow] = useState<boolean>(false);
  const data = {
    bookmarkElement,
    group,
    subGroup,
  };
  return (
    <Box {...rest}>
      <BookmarkContextMenu data={data} setShow={setShow}>
        <BookmarkDisplay {...bookmarkElement} />
      </BookmarkContextMenu>
      <AddNewBookmark show={show} data={data} useOpenButton={false} />
    </Box>
  );
};
