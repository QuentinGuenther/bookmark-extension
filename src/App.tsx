import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  GridItem,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { BookmarkList } from "./components/bookmark-list";

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
        </GridItem>
        <GridItem>
          <BookmarkList />
        </GridItem>
      </Grid>
    </Box>
  </ChakraProvider>
);
