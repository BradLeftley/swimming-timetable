import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { useEffect, useState } from 'react';

import SwimTimesCalendar from './DayCal';
function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <DayCalendarView events={events} />;
        </Grid>
      </Box> */}
      <SwimTimesCalendar />
    </ChakraProvider>
  );
}

export default App;
