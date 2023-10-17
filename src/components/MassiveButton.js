import React from 'react';
import './MassiveButton.css'; // Import your CSS file

const MassiveButton = ({ text, onClick }) => {
  return (
    <button className="massive-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default MassiveButton;