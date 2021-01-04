import * as React from "react"
import {
  ChakraProvider,
  Container,
  theme,
} from "@chakra-ui/react"
import Home from './containers/Home'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container minH="100vh" p={3}>
      <Home />
    </Container>
  </ChakraProvider>
)
