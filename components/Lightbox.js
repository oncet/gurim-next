import { Transition } from "@headlessui/react";
import { useCallback, useEffect } from "react";

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
    <div
      className="bg-black/80 fixed inset-0 flex items-center justify-center"
      onClick={onExit}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Transition
        key={selectedImage.index}
        show
        appear
        enter="transition-opacity"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="duration-300"
      >
        <img
          key={selectedImage.index}
          className="max-h-screen cursor-pointer"
          src={selectedImage.src}
          alt={selectedImage.alt}
          // fallback={<Spinner mx="auto" color="white" />}
          onClick={(event) => {
            event.stopPropagation();

            onNavigate(event.type);
          }}
        />
      </Transition>
    </div>
  );
};

export default Lightbox;
