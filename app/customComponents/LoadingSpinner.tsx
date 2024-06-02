import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner = () => {
 return (
    <div className="spinner-container">
      <ClipLoader color="#FFAF45" loading={true} size={150} />
      <style jsx>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 85vh;
        }
      `}</style>
    </div>
 );
};

export default LoadingSpinner;