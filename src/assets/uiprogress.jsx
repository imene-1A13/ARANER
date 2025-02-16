// src/components/ui/progress.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './progress.css';

const Progress = ({ value = 0, className = '', label = '', ariaLabel = 'Progress bar' }) => {
  // Clamp the value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  // Optional dynamic styling based on progress (e.g., color change)
  const progressBarStyle = {
    width: `${clampedValue}%`,
    backgroundColor: clampedValue > 80 ? '#22c55e' : clampedValue > 50 ? '#4ade80' : '#60a5fa', // Dynamic color change
  };

  return (
    <div 
      className={`progress-container ${className}`} 
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={ariaLabel}
    >
      {label && (
        <div className="progress-label">{label}</div> 
      )}
      <div 
        className="progress-bar"
        style={progressBarStyle}
      />
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  label: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export { Progress };
