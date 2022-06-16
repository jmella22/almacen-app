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
import { INFORMATION } from "../app/constans";
import Head from "next/head";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Almacen App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
                src={INFORMATION.avatar}
              />
              <Heading>{INFORMATION.title}</Heading>
              <Text>{INFORMATION.description}</Text>
            </VStack>
            <Divider marginY={6} />
            <Component {...pageProps} />
          </Container>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
