import type { AppProps } from "next/app";
import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import theme from "../theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          borderRadius={"sm"}
          backgroundColor={"white"}
          boxShadow="md"
          // marginY={4}
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginBottom={6}>
            <Image
              w={128}
              h="auto"
              borderRadius={9999}
              src="https://png.pngtree.com/png-vector/20210322/ourlarge/pngtree-the-online-shop-logo-uses-a-colorful-house-concept-png-image_3096020.jpg"
            />
            <Heading>Almacen App</Heading>
            <Text>todo a su alcance</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
