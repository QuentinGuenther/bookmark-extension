import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/modal";
import React from "react";
import { BookmarkElement } from "../models/bookmark";
import { CreateBookmarkForm } from "./create-bookmark-form";

interface AddNewBookmarkProps {
  useOpenButton?: boolean;
  show?: boolean;
  data?: {
    bookmarkElement: BookmarkElement;
    group?: string;
    subGroup?: string;
  };
}
export const AddNewBookmark: React.FC<AddNewBookmarkProps> = ({
  useOpenButton = true,
  show,
  data,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    if (show) {
      onOpen();
    }
  }, [onOpen, show]);

  return (
    <>
      {useOpenButton && (
        <Button onClick={onOpen} colorScheme="blue">
          Create New Bookmark
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {data ? "Update Bookmark" : "Create New Bookmark"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateBookmarkForm data={data} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
