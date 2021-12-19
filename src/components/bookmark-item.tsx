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
} from "@chakra-ui/react";
import { ContextMenu } from "chakra-ui-contextmenu/lib/cjs";
import { useState } from "react";
import { BookmarkElement } from "../models/bookmark";
import { AddNewBookmark } from "./add-new-bookmark";

interface BookmarkDisplayProps extends BookmarkElement {}

const BookmarkDisplay: React.FC<BookmarkDisplayProps> = ({
  url,
  label,
  faviconUrl,
}) => {
  return (
    <Tooltip
      hasArrow
      openDelay={1000}
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
            <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
          </MenuGroup>
        </MenuList>
      )}
    >
      {(ref) => <div ref={ref}>{children}</div>}
    </ContextMenu>
  );
};

interface BookmarkItemProps {
  bookmarkElement: BookmarkElement;
  group?: string;
  subGroup?: string;
}

export const BookmarkItem: React.FC<BookmarkItemProps> = ({
  bookmarkElement,
  group,
  subGroup,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const data = {
    bookmarkElement,
    group,
    subGroup,
  };
  return (
    <>
      <BookmarkContextMenu data={data} setShow={setShow}>
        <BookmarkDisplay {...bookmarkElement} />
      </BookmarkContextMenu>
      <AddNewBookmark show={show} data={data} useOpenButton={false} />
    </>
  );
};
