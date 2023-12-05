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
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">L</span>
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">O</span>
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">A</span>
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">D</span>
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">I</span>
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">N</span>
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">G</span>
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">.</span>
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">.</span>
      <span ref={(el) => loadingAnimations.current.push(el)} className="loadingAnimation">.</span>
    </div>
  );
};

export default Loading;
