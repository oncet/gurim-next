import { Box } from "@chakra-ui/react";

const UserContent = ({ content }) => {
  const createMarkup = () => {
    return { __html: content };
  };

  return (
    <Box className="user-content" dangerouslySetInnerHTML={createMarkup()} />
  );
};

export default UserContent;
