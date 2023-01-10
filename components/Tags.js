import NextLink from "next/link";

const Tags = ({ tags }) => (
  <ul className="flex gap-2">
    {tags.map((tag) => (
      <li
        key={tag.slug}
        className="text-gray-800 hover:text-black text-xs font-light px-2"
      >
        <NextLink passHref href={`/category/${tag.slug}`}>
          <a className="hover:underline-offset-4 hover:underline decoration-2">
            {tag.name}
          </a>
        </NextLink>
      </li>
    ))}
  </ul>
);

export default Tags;
