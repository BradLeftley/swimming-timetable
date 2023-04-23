import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import SwimTimesCalendar from './DayCal';
function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
        
          <DayCalendarView events={events} />;
        </Grid>
      </Box> */}
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <SwimTimesCalendar />
    </ChakraProvider>
  );
}

export default App;
