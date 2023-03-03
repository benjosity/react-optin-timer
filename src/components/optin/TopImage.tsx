import React from 'react';
import retinaImg from '../../img/top_image_scale_2x.png';
import nonRetinaImg from '../../img/top_image_scale_1x.png';

/**
 * Returns an image with relevant src property using srcSet attribute to provide responsive images
 */
const TopImage: React.FC = () => {
  return (
    <img
      className="top-image"
      // Use srcSet to provide different image sources for different screen resolutions and pixel densities
      srcSet={`${retinaImg} 2x, ${nonRetinaImg} 1x`}
      // Use sizes to specify image dimensions relative to the viewport size
      sizes="(max-width: 600px) 100vw, 50vw"
      alt=""
    />
  );
};

export default TopImage;
