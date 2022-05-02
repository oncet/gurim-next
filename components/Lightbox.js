import { useEffect } from "react";
import { Box, Image, Spinner } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedBox = motion(Box);

const Lightbox = ({ selectedImage, onNavigate, onExit }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onExit();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onExit]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        onNavigate(event.key);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    let touchstartX = 0;
    let touchendX = 0;

    const slider = document.getElementById("slider");

    const onSwipe = () => {
      if (touchendX < touchstartX) onNavigate("ArrowLeft");
      if (touchendX > touchstartX) onNavigate("ArrowRight");
    };

    const onTouchstart = (event) => {
      touchstartX = event.changedTouches[0].screenX;
    };

    document.addEventListener("touchstart", onTouchstart);

    const onTouchend = (event) => {
      touchendX = event.changedTouches[0].screenX;
      onSwipe();
    };

    document.addEventListener("touchend", onTouchend);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchstart", onTouchstart);
      document.removeEventListener("touchend", onTouchend);
    };
  }, [onNavigate]);

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
