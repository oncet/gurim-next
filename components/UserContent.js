import { Box } from "@chakra-ui/react";
import { forwardRef } from "react";

const UserContent = forwardRef(({ content }, ref) => {
  const createMarkup = () => {
    return { __html: content };
  };

  return (
    <Box
      className="user-content"
      overflow="auto"
      dangerouslySetInnerHTML={createMarkup()}
      ref={ref}
    />
  );
});
UserContent.displayName = "UserContent";

export default UserContent;
