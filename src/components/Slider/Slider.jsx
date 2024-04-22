import React, { useEffect, useState } from "react";
import leftChevron from "../../assets/left-arrow.svg";
import rightChevron from "../../assets/right-arrow.svg";
import "./Slider.css";
import sliderData from "../../data/sliderData";

export default function Slider() {
  const [sliderIndex, setSliderIndex] = useState(1);

  const toggleImage = (indexPayload) => {
    // 1ere maniere de faire, pour un changement manuel des images
    /*
    let newState;
      // si je suis à la fin et que je next, je retourner sur le permier index
      if (indexPayload + sliderIndex > sliderData.length) {
        newState = 1;

        //si je suis au début et que je previous, je vais sur le dernier index
      } else if (indexPayload + sliderIndex < 1) {
        newState = sliderData.length;

        //si ce n'ai pas un cas de virgure comme ceux précécent, alors on avance ou recule normalement
      } else {
        newState = indexPayload + sliderIndex;
      }
      setSliderIndex(newState);
      */

    // pour rendre le défillement d'image (slider) en automatique
    // on peut metre une fonction callback dans un usestate
    setSliderIndex((state) => {
      if (indexPayload + state > sliderData.length) {
        return 1;
      } else if (indexPayload + state < 1) {
        return sliderData.length;
      } else {
        return state + indexPayload;
      }
    });
  };

  useEffect(() => {
    const intervalID = setInterval(() => toggleImage(1), 2000);
    return () => clearInterval(intervalID)
  }, []);
  return (
    <>
      <p className="index-info">
        {sliderIndex} / {sliderData.length}
      </p>
      <div className="slider">
        <p className="image-info">
          {sliderData.find((obj) => obj.id === sliderIndex).description}
        </p>
        <img
          src={`./images/img-${sliderIndex}.jpg`}
          alt="estate's rooms"
          className="slider-img"
        />
        <button
          onClick={() => toggleImage(-1)}
          className="navigation-button prev-button"
        >
          <img src={leftChevron} alt="previous image" />
        </button>
        <button
          onClick={() => toggleImage(1)}
          className="navigation-button next-button"
        >
          <img src={rightChevron} alt="next image" />
        </button>
      </div>
    </>
  );
}
