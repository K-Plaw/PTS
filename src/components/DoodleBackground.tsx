// DoodleBackground.tsx
import React, { useEffect } from 'react';
import 'css-doodle'; // Import the css-doodle package

const DoodleBackground: React.FC = () => {
  useEffect(() => {
    const cssDoodleElement = document.createElement('css-doodle');
    cssDoodleElement.innerHTML = `
      :doodle {
        @grid: 10x10;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }

      :after {
        content: '';
        width: 10px;
        height: 10px;
        background: @pick(#f0426a, #6a0dad, #3498db, #27ae60);
        transform: scale(@rand(0.5, 1.5));
        animation: fadeInOut @rand(1s, 3s) infinite alternate ease-in-out;
      }

      @keyframes fadeInOut {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1.5); }
      }
    `;
    document.body.appendChild(cssDoodleElement);

    return () => {
      document.body.removeChild(cssDoodleElement); // Cleanup on unmount
    };
  }, []);

  return null; // No actual JSX needed, doodle is added directly to the body
};

export default DoodleBackground;
