import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WingFeather from './WingFeather'; // Ensure you import the WingFeather component
import logoarz from '../logoArz.png'
const IntroAnimation = ({ onAnimationComplete }) => {
  const [showText, setShowText] = useState(false);
  const [fadeLogo, setFadeLogo] = useState(false); // New state to fade out the logo
  const [showFeathers, setShowFeathers] = useState(true); // New state to show/hide feathers

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500);

    const fadeTimer = setTimeout(() => {
      setShowFeathers(false); // Hide feathers before the logo fades in
    }, 500); // Adjust this timing so that feathers disappear before the logo

    const logoFadeTimer = setTimeout(() => {
      setFadeLogo(true); // Trigger logo fade-out after the feathers are hidden
      onAnimationComplete(); // Call onAnimationComplete after the animation is done
    }, 500); // Adjust based on when you want the logo to fade out

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
      clearTimeout(logoFadeTimer);
    };
  }, [onAnimationComplete]); // Make sure onAnimationComplete is in the dependencies

  const feathers = [
    { delay: 0, x: -500, y: 100, width: 300, height: 60, angle: -8 },
    { delay: 0.1, x: -400, y: 150, width: 270, height: 55, angle: -10 },
    { delay: 0.2, x: -300, y: 200, width: 240, height: 50, angle: -12 },
    { delay: 0.3, x: -200, y: 250, width: 210, height: 45, angle: -14 },
    { delay: 0.4, x: -100, y: 300, width: 180, height: 40, angle: -16 },
    { delay: 0.5, x: 0, y: 350, width: 150, height: 35, angle: -18 },
  ];

  return (
    <>
      <div className="absolute inset-0 bg-[#FFBD00]"></div>

      <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
        {showFeathers && (
          <motion.div
            className="relative"
            initial={{ scale: 2, y: -200 }}
            animate={{
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 1,
              type: 'spring',
              stiffness: 100,
            }}
          >
            {feathers.map((feather, index) => (
              <WingFeather key={index} {...feather} />
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: showText ? 1 : 0,
            y: showText ? 0 : 50,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="absolute top-full mt-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          {/* Logo or any other text you want to fade */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeLogo ? 0 : 1 }} // Fade the logo after animation
            transition={{ duration: 1 }}
          >
      </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#FFBD00]/80 to-transparent"
          initial={{ opacity: 1, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }} // The blur effect
          transition={{ duration: 2 }}
        />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-1/2 w-1 h-full bg-yellow-400/20"
            initial={{ opacity: 0, x: -100 * (i - 1) }}
            animate={{
              opacity: [0, 0.2, 0],
              x: [-100 * (i - 1), -90 * (i - 1)],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2 + 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default IntroAnimation;
