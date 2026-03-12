import React from 'react';
import './Button.css';

const Button = ({ label, type = 'primary', onClick, disabled = false }) => {
  return (
    <button 
      className={`btn btn-${type}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
