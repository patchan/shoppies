import * as React from 'react';
import {
  Box,
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Nominations from './containers/Nominations';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box justifyContent='center' maxW='1200px'>
      <Nominations />
    </Box>
  </ChakraProvider>
);
