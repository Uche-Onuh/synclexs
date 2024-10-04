import React from "react";
import "./LoadingSpinner.css"; // Import the CSS file

const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
