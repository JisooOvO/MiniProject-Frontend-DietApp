import React, { useEffect, useRef } from 'react';
import "../../style/animation.css";

const Loading = () => {
  let wHeight = window.innerHeight;
  let interval = 100;
  const dynamicStyle = {
    height: wHeight
  };

  const animate = (target) => {
    setTimeout(() => { target.classList.add("bounceAnimation");}, interval);
    interval = interval + 100;
    if (interval > 1000) interval = 100;
  };

  const loadingAnimations = useRef([]);

  useEffect(() => {
    loadingAnimations.current.forEach((loadingAnimation) => {
      animate(loadingAnimation);
    });
    // eslint-disable-next-line
  }, [loadingAnimations]);

  window.addEventListener('resize', () => {
    wHeight = window.innerHeight;
  });

  return (
    <div style={dynamicStyle} className="flex justify-center items-center text-5xl sm:text-6xl">
      {
        ["L","O","A","D","I","N","G",".",".","."].map((item,idx) => <span key={`key${idx}`} ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">{item}</span>)
      }
    </div>
  );
};

export default Loading;
