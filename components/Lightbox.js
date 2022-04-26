import { Box, Image, Spinner } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedBox = motion(Box);

const Lightbox = ({ selectedImage, onClick, onBackgroundClick }) => {
  return (
    <Box
      background="rgba(0, 0, 0, 0.8)"
      position="fixed"
      top={0}
      left={0}
      height="100%"
      width="100%"
      onClick={onBackgroundClick}
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
            onClick={onClick}
          />
        </AnimatedBox>
      </AnimatePresence>
    </Box>
  );
};

export default Lightbox;
