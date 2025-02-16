import React from 'react';
import { motion } from 'framer-motion';

const WingFeather = ({ delay, x, y, width, height, angle }) => (
  <motion.div
    initial={{ x: 1000, rotate: -45, opacity: 0 }}  // Start from the right
    animate={{
      x: x,
      y: y,
      rotate: angle,
      opacity: 1,
    }}
    transition={{
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: delay,
    }}
    className="absolute"
    style={{
      width: width,
      height: height,
      backgroundColor: '#FEBD00', 
      clipPath: 'polygon(0 0, 100% 20%, 85% 100%, 0% 100%)',
    }}
  />
);

export default WingFeather;
