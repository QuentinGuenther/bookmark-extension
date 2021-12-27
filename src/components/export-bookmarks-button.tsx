import { ArrowDownIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useBookmarkStore } from "../stores/use-bookmark-store";

export const ExportBookmarksButton: React.FC = () => {
  const bookmarks = useBookmarkStore((state) => state.bookmarkList);

  const downloadFile = React.useCallback(async () => {
    const fileName = `bookmark_${Date.now()}`;
    const json = JSON.stringify({ bookmarks }, undefined, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [bookmarks]);

  return (
    <Button
      leftIcon={<ArrowDownIcon />}
      variant="outline"
      size="xs"
      onClick={downloadFile}
    >
      Export Bookmarks
    </Button>
  );
};
