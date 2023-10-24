// CustomCursor.js
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import css from "../css/owlcursol.css"
import 'owl.carousel';
import img1 from '../img/client-logo-1.png'
import img2 from '../img/client-logo-2.png'
import img3 from '../img/client-logo-3.png'
import img4 from '../img/client-logo-4.png'
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize the Owl Carousel for your custom cursor
    $(document).ready(function () {
      const $cursor = $('.custom-cursor');
      $cursor.owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 4 },
        },
      });

      // Listen to mousemove event to update the cursor's position
  
    });
  }, []);

  return (
    <div
      className="custom-cursor owl-carousel owl-theme"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Add your carousel items (images) here */}
      <div className="item">
        <img src={img1} alt="Image 1" />
      </div>
      <div className="item">
        <img src={img2} alt="Image 2" />
      </div>
      <div className="item">
        <img src={img4} alt="Image 3" />
      </div>
      <div className="item">
        <img src={img3} alt="Image 4" />
      </div>
    </div>
  );
};

export default CustomCursor;
