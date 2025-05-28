import React, { useEffect, useRef } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    // Function to move images to the left
    const moveSlider = () => {
      const firstImage = slider.children[0];
      slider.appendChild(firstImage); // Move the first image to the end
    };

    // Set an interval to move the slider every 2 seconds
    const interval = setInterval(moveSlider, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="im-body">
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        <img className='i' src="../../public/html-5.png" alt="Image 1" />
        <img className='i' src="../../public/css-3.png" alt="Image 2" />
        <img className='i' src="../../public/java-script.png" alt="Image 3" />
        <img className='i' src="../../public/nodejs.png" alt="Image 4" />
      </div>
    </div>
    </div>
  );
};

export default ImageSlider;
