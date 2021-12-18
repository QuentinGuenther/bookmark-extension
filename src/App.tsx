import { ChakraProvider, Box, Grid, theme, GridItem } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BookmarkList } from "./components/bookmark-list";
import { AddNewBookmark } from "./components/add-new-bookmark";
import { useBookmarkStore } from "./stores/use-bookmark-store";
import { useEffect } from "react";

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
        >
          <GridItem colSpan={2}>
            <ColorModeSwitcher float="right" />
            <Box float="left">
              <AddNewBookmark />
            </Box>
          </GridItem>
          <GridItem>
            <BookmarkList />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
