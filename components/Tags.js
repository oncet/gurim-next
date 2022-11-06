import NextLink from "next/link";
import { HStack, Tag, Link } from "@chakra-ui/react";

const Tags = ({ urlPrefix = "/category/", tags }) => (
  <HStack spacing="2">
    {tags.map((tag) => (
      <Tag
        key={tag.slug}
        variant="ghost"
        color="gray.800"
        size="sm"
        fontWeight="300"
        _hover={{
          color: "black",
        }}
      >
        <NextLink passHref href={urlPrefix + tag.slug}>
          <Link>{tag.name}</Link>
        </NextLink>
      </Tag>
    ))}
  </HStack>
);

export default Tags;
