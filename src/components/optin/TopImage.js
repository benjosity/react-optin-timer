import React from "react";
import retinaImg from "../../img/top_image_scale_2x.png";
import nonRetinaImg from "../../img/top_image_scale_1x.png";

// Return Image with relevant src property using ternary condition
const TopImage = () => {
  return (
    <img
      className="top-image"
      src={window.devicePixelRatio > 2 ? retinaImg : nonRetinaImg}
      alt=""
    />
  );
};

export default TopImage;
