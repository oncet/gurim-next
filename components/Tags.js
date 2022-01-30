import NextLink from "next/link";
import { HStack, Tag, Link } from "@chakra-ui/react";

const Tags = ({ tags }) => (
  <HStack spacing="2">
    {tags.map((tag) => (
      <Tag
        key={tag.slug}
        variant="ghost"
        color="gray.600"
        size="sm"
        fontWeight="200"
      >
        <NextLink passHref href={`/category/${tag.slug}`}>
          <Link>
            {tag.name}
          </Link>
        </NextLink>
      </Tag>
    ))}
  </HStack>
);

export default Tags;
