import { useCallback, useEffect } from "react";
import { Box, Image, Spinner } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedBox = motion(Box);

const Lightbox = ({
  imageCount,
  selectedImage,
  onSelectedImageChange,
  onExit,
}) => {
  const onNavigate = useCallback(
    (key) => {
      let nextIndex;

      if (key === "ArrowLeft") {
        nextIndex =
          selectedImage.index > 0 ? selectedImage.index - 1 : imageCount - 1;
      } else if (key === "ArrowRight" || key === "click") {
        nextIndex =
          selectedImage.index < imageCount - 1 ? selectedImage.index + 1 : 0;
      }

      if (nextIndex === undefined) return;

      onSelectedImageChange(nextIndex);
    },
    [imageCount, selectedImage, onSelectedImageChange]
  );

  useEffect(() => {
    // Handle keyboard navigation
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        onNavigate(event.key);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // Handle swipe navigation
    let touchstartX = 0;

    const onTouchstart = (event) => {
      touchstartX = event.changedTouches[0].screenX;
    };

    const onTouchend = (event) => {
      const touchendX = event.changedTouches[0].screenX;

      if (touchendX < touchstartX) onNavigate("ArrowRight");
      if (touchendX > touchstartX) onNavigate("ArrowLeft");
    };

    document.addEventListener("touchstart", onTouchstart);
    document.addEventListener("touchend", onTouchend);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchstart", onTouchstart);
      document.removeEventListener("touchend", onTouchend);
    };
  }, [onNavigate]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onExit();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onExit]);

  return (
    <Box
      background="rgba(0, 0, 0, 0.8)"
      position="fixed"
      top={0}
      left={0}
      height="100%"
      width="100%"
      onClick={onExit}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <AnimatePresence>
        <AnimatedBox
          key={selectedImage.index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          position="absolute"
        >
          <Image
            maxH="100vh"
            cursor="pointer"
            src={selectedImage.src}
            alt={selectedImage.alt}
            fallback={<Spinner mx="auto" color="white" />}
            onClick={(event) => {
              event.stopPropagation();

              onNavigate(event.type);
            }}
          />
        </AnimatedBox>
      </AnimatePresence>
    </Box>
  );
};

export default Lightbox;
