import React, { useEffect, useRef } from 'react';
import Zdog from 'zdog';

const ZdogCanvas = ({ icon }) => {
  const canvasRef = useRef();
  const isSpinning = true; // Set to false to stop rotation

  useEffect(() => {
    const illustration = new Zdog.Illustration({
      element: canvasRef.current,
      dragRotate: true,
    });

    // Create a sphere
    new Zdog.Shape({
      addTo: illustration,
      stroke: 80, // Diameter of the sphere
      color: '#000000', // Sphere color
    });

    // Simulating an image on the sphere (basic approximation)
    new Zdog.Rect({
      addTo: illustration,
      width: 40,
      height: 40,
      translate: { z: 40 },
      color: '#FFF',
      // You can attempt to use fill with a pattern or SVG here
    });

    function animate() {
      if (isSpinning) {
        illustration.rotate.y += 0.03;
      }
      illustration.updateRenderGraph();
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      illustration.remove();
    };
  }, [isSpinning]);

  return <canvas ref={canvasRef} width="200" height="200"></canvas>;
};

export default ZdogCanvas;


// import React, { useEffect, useRef } from 'react';
// import Zdog from 'zdog';

// const ZdogCanvas = ({ icon }) => {
//   const canvasRef = useRef();

//   useEffect(() => {
//     // Create a new Zdog illustration
//     let illustration = new Zdog.Illustration({
//       element: canvasRef.current,
//       dragRotate: true,
//     });

//     // Add a shape to the illustration
//     new Zdog.Box({
//       addTo: illustration,
//       width: 100,
//       height: 100,
//       depth: 100,
//       stroke: false,
//       color: '#C25', // default face color
//       leftFace: '#EA0', // yellow
//       rightFace: '#E62', // orange
//       topFace: '#ED0', // yellow
//       bottomFace: '#636', // purple
//     });

//     // Update and render the illustration on each frame
//     function animate() {
//       illustration.updateRenderGraph();
//       requestAnimationFrame(animate);
//     }
//     animate();

//     // Clean up
//     return () => {
//       illustration.remove();
//     };
//   }, []);

//   return <canvas ref={canvasRef} width="200" height="200"></canvas>;
// };

// export default ZdogCanvas;
