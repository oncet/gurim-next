import { forwardRef } from "react";

const UserContent = forwardRef(({ content }, ref) => {
  const createMarkup = () => {
    return { __html: content };
  };

  return (
    <div
      className="user-content overflow-auto"
      dangerouslySetInnerHTML={createMarkup()}
      ref={ref}
    />
  );
});
UserContent.displayName = "UserContent";

export default UserContent;
