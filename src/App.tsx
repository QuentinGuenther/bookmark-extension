import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BookmarkList } from "./components/bookmark-list";
import { AddNewBookmark } from "./components/add-new-bookmark";
import { useBookmarkStore } from "./stores/use-bookmark-store";
import { useEffect } from "react";
import { ExportBookmarksButton } from "./components/export-bookmarks-button";

export const App: React.FC = () => {
  const fetchBookmarkState = useBookmarkStore((state) => state.fetch);
  useEffect(() => {
    fetchBookmarkState();
  }, [fetchBookmarkState]);

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid
          minH="100vh"
          p={3}
          templateColumns="repeat(2, 1fr)"
          templateRows="48px 1fr"
          rowGap={3}
        >
          <GridItem colSpan={2}>
            <ColorModeSwitcher float="right" />
            <Box float="left">
              <AddNewBookmark />
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <VStack align="flex-start">
              <ExportBookmarksButton />
              <Box width="100%">
                <BookmarkList />
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
