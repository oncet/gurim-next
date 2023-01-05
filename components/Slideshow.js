import Image from "next/image";
import { useEffect, useState } from "react";

import imageEscritorio from "../public/images/slideshow/escritorio.jpg";
import imageTelas2 from "../public/images/slideshow/telas-2.jpg";
import imageTelas from "../public/images/slideshow/telas.jpg";

const images = [imageEscritorio, imageTelas, imageTelas2];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (currentSlide === images.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide((currentSlideValue) => currentSlideValue + 1);
      }
    }, 10000);

    return () => clearInterval(timerId);
  }, [currentSlide]);

  return (
    <div className="max-h-[600px] overflow-hidden rounded-md flex items-center justify-center bg-black">
      <div className="w-full">
        <Image
          src={images[currentSlide]}
          alt="Image"
          layout="responsive"
          priority
        />
      </div>
    </div>
  );
};

export default Slideshow;
