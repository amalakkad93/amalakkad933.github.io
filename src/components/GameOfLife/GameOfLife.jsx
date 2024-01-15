import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faPlus, faMinus, faTachometerAlt, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import { fadeIn, textVariant, staggerContainer } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import { styles } from '../../styles';
import patterns from './patterns';
import './GameOfLife.css';

const CELLSIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;
const MINSPEED = 10;
const MAXSPEED = 300;
const colors = ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8'];

function createEmptyGrid(rows, cols) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      // Randomly decide if the cell should be alive
      const isAlive = Math.random() < 0.2; // 20% chance
      row.push(createCell(isAlive));
    }
    grid.push(row);
  }
  return grid;
}


function createCell(alive = false) {
  return {
    alive: alive,
    age: alive ? 1 : 0,
    color: alive ? getRandomColor() : '#000000'
  };
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1],
  [1, 0], [-1, 0], [1, 1], [-1, -1]
];

function GameOfLife() {

  // const [grid, setGrid] = useState(createEmptyGrid);
  const [grid, setGrid] = useState(() => createEmptyGrid(HEIGHT / CELLSIZE, WIDTH / CELLSIZE));


  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [generation, setGeneration] = useState(0);
  const [generationsPerSecond, setGenerationsPerSecond] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [rows, setRows] = useState(HEIGHT / CELLSIZE);
  const [cols, setCols] = useState(WIDTH / CELLSIZE);
  const [cellSize, setCellSize] = useState(CELLSIZE);


  const runningRef = useRef(running);
  const simulationTimeoutRef = useRef();
  const fullscreenContainerRef = useRef(null);
  const canvasRef = useRef(null);

  runningRef.current = running;

  const drawGrid = (grid) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cells
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        ctx.fillStyle = cell.alive ? cell.color : 'black';
        ctx.fillRect(j * CELLSIZE, i * CELLSIZE, CELLSIZE, CELLSIZE);
      });
    });

    // Draw grid lines
    ctx.strokeStyle = 'white';
    for (let i = 0; i <= rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELLSIZE);
      ctx.lineTo(canvas.width, i * CELLSIZE);
      ctx.stroke();
    }
    for (let j = 0; j <= cols; j++) {
      ctx.beginPath();
      ctx.moveTo(j * CELLSIZE, 0);
      ctx.lineTo(j * CELLSIZE, canvas.height);
      ctx.stroke();
    }
  };


  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const i = Math.floor(y / CELLSIZE);
    const j = Math.floor(x / CELLSIZE);
    console.log(`Clicked cell at row ${i}, column ${j}`);
    toggleCellState(i, j);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    const timeoutInterval = Math.max(1000 - speed * 3, 100);
    setGrid(g => {

      if (!g || g.length !== rows || (g[0] && g[0].length !== cols)) {
        console.error("Grid is not properly initialized");
        return createEmptyGrid(rows, cols);
      }

      const newGrid = createEmptyGrid(rows, cols);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols) {
              neighbors += (g[newI] && g[newI][newJ] && g[newI][newJ].alive) ? 1 : 0;
            }
          });

          if (g[i][j].alive && (neighbors < 2 || neighbors > 3)) {
            newGrid[i][j] = createCell(false); // Cell dies
          } else if (!g[i][j].alive && neighbors === 3) {
            newGrid[i][j] = createCell(true); // Cell becomes alive
          } else {
            newGrid[i][j] = {
              ...g[i][j],
              color: g[i][j].alive ? getRandomColor() : '#000000'
            };
          }
        }
      }
      return newGrid;
    });

    setGeneration(g => g + 1);
    clearTimeout(simulationTimeoutRef.current);
    simulationTimeoutRef.current = setTimeout(runSimulation, timeoutInterval);
  }, [runningRef, speed, rows, cols]);


  const applyPattern = (patternName) => {
    const newGrid = createEmptyGrid(rows, cols);
    const pattern = patterns[patternName];

    for (const cell of pattern) {
      if (cell.x < cols && cell.y < rows) {
        newGrid[cell.y][cell.x] = createCell(true);
      }
    }

    setGrid(newGrid);
  };

  const toggleCellState = (i, j) => {
    setGrid(currentGrid => {
      const newGrid = [...currentGrid];
      const cell = newGrid[i][j];
      newGrid[i][j] = {
        ...cell,
        alive: !cell.alive,
        color: !cell.alive ? getRandomColor() : '#000000'
      };
      console.log(`Toggled cell at row ${i}, column ${j}: Alive = ${newGrid[i][j].alive}`);
      return newGrid;
    });
    drawGrid();
  };

  const handleFullScreen = () => {
    const elem = fullscreenContainerRef.current;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        setIsFullScreen(true);

        // Recalculate for full screen
        const marginSize = 10;

        // const newWidth = window.innerWidth - marginSize;
        // const newHeight = window.innerHeight - marginSize;
        let newWidth = window.innerWidth - marginSize * 2;
        let newHeight = window.innerHeight - marginSize * 2;

        // Adjust newWidth and newHeight to be multiples of CELLSIZE
        newWidth = Math.floor(newWidth / CELLSIZE) * CELLSIZE;
        newHeight = Math.floor(newHeight / CELLSIZE) * CELLSIZE;

        // const newRows = Math.floor(newHeight / CELLSIZE);
        // const newCols = Math.floor(newWidth / CELLSIZE);

        const newRows = newHeight / CELLSIZE;
        const newCols = newWidth / CELLSIZE;

        setRows(newRows);
        setCols(newCols);
        // setCellSize(CELLSIZE);
        setGrid(createEmptyGrid(newRows, newCols));

        const canvas = canvasRef.current;
        canvas.width = newWidth;
        canvas.height = newHeight;

      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);

        // Reset to original settings after a little bit of delay to ensure transitions complete
        setTimeout(() => {

          const canvas = canvasRef.current;
          canvas.width = WIDTH;
          canvas.height = HEIGHT;

          setRows(HEIGHT / CELLSIZE);
          setCols(WIDTH / CELLSIZE);
          setCellSize(CELLSIZE); // Reset cell size
          setGrid(createEmptyGrid(HEIGHT / CELLSIZE, WIDTH / CELLSIZE));
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (running) {
      runningRef.current = true;
      runSimulation();
    } else {
      clearTimeout(simulationTimeoutRef.current);
      runningRef.current = false;
    }
  }, [running, runSimulation, speed]);

  useEffect(() => {
    drawGrid(grid);
    // }, [grid]);
  }, [grid, rows, cols]); // Redraw the grid when rows or cols change

  useEffect(() => {
    const intervalInMilliseconds = Math.max(1000 - speed * 3, 100);
    const intervalInSeconds = intervalInMilliseconds / 1000;
    setGenerationsPerSecond((1 / intervalInSeconds).toFixed(2));
  }, [speed]);

  useEffect(() => {
    setGrid(createEmptyGrid(rows, cols));
  }, [rows, cols]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick
      );
    };
  }, []);


  return (
    <>
      <div className={`${styles.paddingX} max-w-7xl mx-auto`}>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText}`}>Interactive Simulation</p>
          <h2 className={`${styles.sectionHeadTextLight}`}>Game of Life.</h2>
        </motion.div>

        <motion.div variants={fadeIn('', '', 0.1, 1)}>
          <p className={`${styles.sectionSubText}`}>
            Experience a version of the classic Game of Life, which I implemented in JavaScript.
          </p>
        </motion.div>

        <div className="game-of-life">
          <div className="toggle-instructions-container">
            <motion.div
              variants={fadeIn('right', 'spring', 0.5, 0.75)}
              className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
            >
              <button
                className={`${showInstructions ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
                  } text-white font-bold py-2 px-4 rounded`}
                onClick={() => setShowInstructions(prevShow => !prevShow)}
              >
                {showInstructions ? "Hide Instructions" : "Show Instructions"}
              </button>

            </motion.div>

            {showInstructions && (
              <motion.div
                className="instructions-content"
                variants={fadeIn('', '', 0.1, 1)}
              >
                <h3 className="instructions-title">Welcome to the Game of Life!</h3>
                <div className="instructions-details">
                  <p className="instructions-heading">Instructions on how to play:</p>
                  <ul className="instructions-list">
                    <li>Click 'Start' to run the simulation.</li>
                    <li>Click on cells to toggle their state between alive and dead.</li>
                    <li>Use 'Increase Speed' and 'Decrease Speed' to control the simulation speed.</li>
                    <li>Select patterns from the dropdown to load predefined structures.</li>
                    <li>'Clear' button will reset the game board.</li>
                  </ul>
                </div>
                <div className="game-rules">
                  <p className="rules-heading">Rules of the Game:</p>
                  <ul className="rules-list">
                    <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>

          <div className="game-of-life max-w-7xl mx-auto p-4" ref={fullscreenContainerRef}>
            <div className={`game-container flex flex-col items-center justify-center ${isFullScreen ? 'fullscreen' : ''}`}>
              <div className="fullscreen-wrapper">
                <div className="grid-and-fullscreen">
                  <canvas
                    ref={canvasRef}
                    width={WIDTH}
                    height={HEIGHT}
                    className="game-canvas"
                  ></canvas>
                </div>
              </div>

              <div className="fullscreen-button-container">
                <button className="fullscreen-toggle" onClick={handleFullScreen}>
                  <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
                </button>
              </div>

              <div className="controls-container flex flex-wrap justify-center gap-4">
                <motion.div
                  variants={fadeIn('right', 'spring', 0.5, 0.75)}
                  className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
                >
                  <button
                    className={`text-white font-bold py-2 px-4 rounded ${running ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => {
                      setRunning(!running);
                      if (!running) {
                        runningRef.current = true;
                        runSimulation();
                      }
                    }}
                  >
                    {running ? 'Stop' : 'Start'}
                  </button>

                </motion.div>

                <motion.div
                  variants={fadeIn('right', 'spring', 0.5, 0.75)}
                  className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
                >
                  <button
                    className={`text-white font-bold py-2 px-4 rounded ${running ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => {
                      setGrid(createEmptyGrid(rows, cols));
                      setGeneration(0);
                      setSpeed(100);
                      if (running) {
                        setRunning(false);
                        clearTimeout(simulationTimeoutRef.current);
                      }
                    }}
                  >
                    Clear
                  </button>
                </motion.div>

                <motion.div
                  variants={fadeIn('right', 'spring', 0.5, 0.75)}
                  className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
                >
                  <button
                    className={`text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600`}
                    onClick={() => setSpeed(s => Math.min(MAXSPEED, Math.max(MINSPEED, s - 10)))}
                  >
                    <FontAwesomeIcon icon={faMinus} /> Decrease Speed
                  </button>
                </motion.div>
                {/*  */}
                <motion.div
                  variants={fadeIn('right', 'spring', 0.5, 0.75)}
                  //initial="hidden"
                  animate="show"
                  className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
                >


                  <div className={`text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600`}>
                    <FontAwesomeIcon icon={faTachometerAlt} />
                    Speed: {generationsPerSecond} gens/sec
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeIn('right', 'spring', 0.5, 0.75)}
                  //initial="hidden"
                  animate="show"
                  className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
                >
                  <button
                    className={`text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600`}
                    onClick={() => setSpeed(s => Math.min(MAXSPEED, Math.max(MINSPEED, s + 10)))}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Increase Speed
                  </button>
                </motion.div>
                {/*  */}
                <motion.div
                  variants={fadeIn('right', 'spring', 0.5, 0.75)}
                  className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
                >
                  
                  <select className="pattern-select text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600" onChange={(e) => applyPattern(e.target.value)}>
                    <option value="">Select Pattern</option>
                    {Object.keys(patterns).map((pattern) => (
                      <option key={pattern} value={pattern}>{pattern}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  variants={fadeIn('right', 'spring', 0.5, 0.75)}
                  //initial="hidden"
                  animate="show"
                  className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
                >
                  <div className="pattern-select text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600">Generation: {generation}</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
export default GameOfLife;

//   return (
//     <>

//       <div className={`${styles.paddingX} max-w-7xl mx-auto`}>
//         <motion.div variants={textVariant()}>
//           <p className={`${styles.sectionSubText}`}>Interactive Simulation</p>
//           <h2 className={`${styles.sectionHeadTextLight}`}>Game of Life.</h2>
//         </motion.div>

//         <motion.div variants={fadeIn('', '', 0.1, 1)}>
//           <p className={`${styles.sectionSubText}`}>
//             Experience a version of the classic Game of Life, which I implemented in JavaScript.
//           </p>
//         </motion.div>

//         <div className="game-of-life">

//           <div className="toggle-instructions-container">
//             <motion.div
//               variants={fadeIn('right', 'spring', 0.5, 0.75)}
//               className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
//             >
//               <button
//                 className={`${showInstructions ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
//                   } text-white font-bold py-2 px-4 rounded`}
//                 onClick={() => setShowInstructions(prevShow => !prevShow)}
//               >
//                 {showInstructions ? "Hide Instructions" : "Show Instructions"}
//               </button>

//             </motion.div>

//             {showInstructions && (
//               <motion.div
//                 className="instructions-content"
//                 variants={fadeIn('', '', 0.1, 1)}
//               >
//                 <h3 className="instructions-title">Welcome to the Game of Life!</h3>
//                 <div className="instructions-details">
//                   <p className="instructions-heading">Instructions on how to play:</p>
//                   <ul className="instructions-list">
//                     <li>Click 'Start' to run the simulation.</li>
//                     <li>Click on cells to toggle their state between alive and dead.</li>
//                     <li>Use 'Increase Speed' and 'Decrease Speed' to control the simulation speed.</li>
//                     <li>Select patterns from the dropdown to load predefined structures.</li>
//                     <li>'Clear' button will reset the game board.</li>
//                   </ul>
//                 </div>
//                 <div className="game-rules">
//                   <p className="rules-heading">Rules of the Game:</p>
//                   <ul className="rules-list">
//                     <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
//                     <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
//                     <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
//                     <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
//                   </ul>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           <div className="game-of-life max-w-7xl mx-auto p-4" ref={fullscreenContainerRef}>
//             <div className={`game-container flex flex-col items-center justify-center ${isFullScreen ? 'fullscreen' : ''}`}>
//               <div className="fullscreen-wrapper">
//                 <div className="grid-and-fullscreen">
//                   <canvas
//                     ref={canvasRef}
//                     width={WIDTH}
//                     height={HEIGHT}
//                     className="game-canvas"
//                   ></canvas>
//                 </div>
//               </div>


//               <div className="fullscreen-button-container">
//                 <button className="fullscreen-toggle" onClick={handleFullScreen}>
//                   <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
//                 </button>
//               </div>

//               <div className="controls-container">
//                 <motion.div
//                   variants={fadeIn('right', 'spring', 0.5, 0.75)}
//                   className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
//                 >
//                   <button
//                     className={`text-white font-bold py-2 px-4 rounded ${running ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`}
//                     onClick={() => {
//                       setRunning(!running);
//                       if (!running) {
//                         runningRef.current = true;
//                         runSimulation();
//                       }
//                     }}
//                   >
//                     {running ? 'Stop' : 'Start'}
//                   </button>

//                 </motion.div>

//                 <motion.div
//                   variants={fadeIn('right', 'spring', 0.5, 0.75)}
//                   //initial="hidden"
//                   animate="show"
//                   className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
//                 >
//                   <button
//                     className={`text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600`}
//                     onClick={() => {
//                       setGrid(createEmptyGrid(rows, cols));
//                       setGeneration(0);
//                       setSpeed(100);
//                       if (running) {
//                         setRunning(false);
//                         clearTimeout(simulationTimeoutRef.current);
//                       }
//                     }}
//                   >
//                     Clear
//                   </button>
//                 </motion.div>

//                 <motion.div
//                   variants={fadeIn('right', 'spring', 0.5, 0.75)}
//                   //initial="hidden"
//                   animate="show"
//                   className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
//                 >
//                   <button
//                     className={`text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600`}
//                     onClick={() => setSpeed(s => Math.min(MAXSPEED, Math.max(MINSPEED, s - 10)))}
//                   >
//                     <FontAwesomeIcon icon={faMinus} /> Decrease Speed
//                   </button>
//                 </motion.div>

//                 <motion.div
//                   variants={fadeIn('right', 'spring', 0.5, 0.75)}
//                   //initial="hidden"
//                   animate="show"
//                   className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
//                 >


//                   <div className={`text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600`}>
//                     <FontAwesomeIcon icon={faTachometerAlt} />
//                     Speed: {generationsPerSecond} gens/sec
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   variants={fadeIn('right', 'spring', 0.5, 0.75)}
//                   //initial="hidden"
//                   animate="show"
//                   className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
//                 >
//                   <button
//                     className={`text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600`}
//                     onClick={() => setSpeed(s => Math.min(MAXSPEED, Math.max(MINSPEED, s + 10)))}
//                   >
//                     <FontAwesomeIcon icon={faPlus} /> Increase Speed
//                   </button>
//                 </motion.div>

//                 <motion.div
//                   variants={fadeIn('right', 'spring', 0.5, 0.75)}
//                   //initial="hidden"
//                   animate="show"
//                   className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
//                 >
//                   <select className="pattern-select text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600" onChange={(e) => applyPattern(e.target.value)}>
//                     <option value="">Select Pattern</option>
//                     {Object.keys(patterns).map((pattern) => (
//                       <option key={pattern} value={pattern}>{pattern}</option>
//                     ))}
//                   </select>
//                 </motion.div>

//                 <motion.div
//                   variants={fadeIn('right', 'spring', 0.5, 0.75)}
//                   //initial="hidden"
//                   animate="show"
//                   className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
//                 >
//                   <div className="pattern-select text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600">Generation: {generation}</div>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div >
//     </>
//   );

// }
// export default GameOfLife;
