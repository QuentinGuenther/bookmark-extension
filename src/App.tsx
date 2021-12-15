import { ChakraProvider, Box, Grid, theme, GridItem } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BookmarkList } from "./components/bookmark-list";
import { AddNewBookmark } from "./components/add-new-bookmark";

export const App = () => (
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
