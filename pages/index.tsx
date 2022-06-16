import React, { useMemo, useState } from "react";
import type { GetStaticProps } from "next";
import api from "../product/api";
import { Product } from "../product/types";
import { Button, Flex, Grid, Img, Link, Stack, Text } from "@chakra-ui/react";
import { INFORMATION } from "../app/constans";

interface Props {
  products: Array<Product>;
}

const parseCurrency = (value: number): string => {
  return value.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};

const Home: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Array<Product>>([]);

  const handleAddToCart = (product: Product) => {
    setCart((cart) => cart.concat(product));
  };

  const text = useMemo(() => {
    return cart
      .reduce(
        (message, product) =>
          message.concat(
            `* ${product.title} - ${parseCurrency(product.price)}\n`
          ),
        ``
      )
      .concat(
        `\nTotal: ${parseCurrency(
          cart.reduce((total, product) => total + product.price, 0)
        )}`
      );
  }, [cart]);

  return (
    <Stack spacing={6}>
      <Grid
        gridGap={6}
        templateColumns={"repeat(auto-fill,minmax(240px, 1fr))"}
      >
        {products.map((product) => (
          <Stack
            key={product.id}
            backgroundColor="gray.100"
            borderRadius={"md"}
            padding={4}
            spacing={3}
          >
            <Flex justifyContent={"center"} overflow="hidden">
              <Img src={product.image} h={200} w={"auto"} />
            </Flex>
            <Stack spacing={1}>
              <Text>{product.title}</Text>
              <Text color={"green.500"} fontSize="sm" fontWeight={"500"}>
                {parseCurrency(product.price)}
              </Text>
            </Stack>
            <Button
              colorScheme={"primary"}
              variant="outline"
              borderRadius={50}
              size="sm"
              onClick={() => handleAddToCart(product)}
            >
              Agregar
            </Button>
          </Stack>
        ))}
      </Grid>
      {Boolean(cart.length) && (
        <Flex
          position={"sticky"}
          bottom={4}
          padding={4}
          justifyContent="center"
          alignItems={"center"}
        >
          <Button
            width={"fit-content"}
            isExternal
            as={Link}
            href={`https://wa.me/${INFORMATION.phone}?text=${encodeURIComponent(
              text
            )}`}
            colorScheme="whatsapp"
          >
            Confirmar compra ( {cart.length} productos)
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products: products,
    },
    revalidate: 10,
  };
};

export default Home;
