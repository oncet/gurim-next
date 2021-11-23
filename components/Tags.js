import NextLink from "next/link";
import { HStack, Tag, Link } from "@chakra-ui/react";

const Tags = ({ tags }) => (
  <HStack mb="2" spacing="2">
    {tags.map((tag) => (
      <Tag key={tag.slug} variant="ghost" size="sm" fontWeight="200">
        <Link as={NextLink} href={`/category/${tag.slug}`}>
          {tag.name}
        </Link>
      </Tag>
    ))}
  </HStack>
);

export default Tags;
