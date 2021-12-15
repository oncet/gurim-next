import { useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import {
  Box,
  Button,
  Center,
  Text,
  Image,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { getCategory } from "../lib/api";

const AnimatedGridItem = motion(GridItem);

const ItemsGrid = ({ initialItems, slug }) => {
  const [endCursor, setEndCursor] = useState(initialItems.pageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState(
    initialItems.pageInfo.hasNextPage
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState(initialItems.edges);

  const showMoreHandler = async () => {
    setIsSubmitting(true);

    const response = await getCategory(slug, endCursor);

    setIsSubmitting(false);

    setItems([...items, ...response.products.edges]);
    setEndCursor(response.products.pageInfo.endCursor);
    setHasNextPage(response.products.pageInfo.hasNextPage);
  };

  return (
    <>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={6}
      >
        {items.map(({ node }) => (
          <AnimatedGridItem
            key={node.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <Link as={NextLink} href={`/product/${node.slug}`}>
              <a>
                <Box rounded="md" overflow="hidden">
                  <NextImage
                    src={node.featuredImage.node.sourceUrl}
                    alt={node.title}
                    width={350}
                    height={350}
                    layout="responsive"
                  />
                </Box>
                <Text mt="2">{node.title}</Text>
              </a>
            </Link>
          </AnimatedGridItem>
        ))}
      </Grid>
      {hasNextPage && (
        <Center mt="2">
          <Button
            isLoading={isSubmitting}
            variant="ghost"
            onClick={showMoreHandler}
            disabled={isSubmitting}
            fontWeight="400"
          >
            Mostrar mas
          </Button>
        </Center>
      )}
    </>
  );
};

export default ItemsGrid;
