// patterns.js
const patterns = {
  glider: [{x: 1, y: 0}, {x: 2, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],
  blinker: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
  block: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
  beehive: [
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 0, y: 1},
    {x: 3, y: 1},
    {x: 1, y: 2},
    {x: 2, y: 2},
  ],
  loaf: [
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 0, y: 1},
    {x: 3, y: 1},
    {x: 1, y: 2},
    {x: 3, y: 2},
    {x: 2, y: 3},
  ],
  pulsar: [
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 8, y: 0},
    {x: 9, y: 0},
    {x: 10, y: 0},
    {x: 0, y: 2},
    {x: 5, y: 2},
    {x: 7, y: 2},
    {x: 12, y: 2},
    {x: 0, y: 3},
    {x: 5, y: 3},
    {x: 7, y: 3},
    {x: 12, y: 3},
    {x: 0, y: 4},
    {x: 5, y: 4},
    {x: 7, y: 4},
    {x: 12, y: 4},
    {x: 2, y: 5},
    {x: 3, y: 5},
    {x: 4, y: 5},
    {x: 8, y: 5},
    {x: 9, y: 5},
    {x: 10, y: 5},
    {x: 2, y: 7},
    {x: 3, y: 7},
    {x: 4, y: 7},
    {x: 8, y: 7},
    {x: 9, y: 7},
    {x: 10, y: 7},
    {x: 0, y: 8},
    {x: 5, y: 8},
    {x: 7, y: 8},
    {x: 12, y: 8},
    {x: 0, y: 9},
    {x: 5, y: 9},
    {x: 7, y: 9},
    {x: 12, y: 9},
    {x: 0, y: 10},
    {x: 5, y: 10},
    {x: 7, y: 10},
    {x: 12, y: 10},
    {x: 2, y: 12},
    {x: 3, y: 12},
    {x: 4, y: 12},
    {x: 8, y: 12},
    {x: 9, y: 12},
    {x: 10, y: 12},
  ],
  pentadecathlon: [
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 1, y: 2},
    {x: 2, y: 2},
    {x: 3, y: 2},
    {x: 1, y: 3},
    {x: 2, y: 3},
    {x: 3, y: 3},
    {x: 1, y: 4},
    {x: 2, y: 4},
    {x: 3, y: 4},
    {x: 1, y: 5},
    {x: 3, y: 5},
    {x: 1, y: 6},
    {x: 2, y: 6},
    {x: 3, y: 6},
    {x: 1, y: 7},
    {x: 3, y: 7},
    {x: 1, y: 8},
    {x: 2, y: 8},
    {x: 3, y: 8},
  ],
  gliderGun: [
    {x: 24, y: 0},
    {x: 22, y: 1},
    {x: 24, y: 1},
    {x: 12, y: 2},
    {x: 13, y: 2},
    {x: 20, y: 2},
    {x: 21, y: 2},
    {x: 34, y: 2},
    {x: 35, y: 2},
    {x: 11, y: 3},
    {x: 15, y: 3},
    {x: 20, y: 3},
    {x: 21, y: 3},
    {x: 34, y: 3},
    {x: 35, y: 3},
    {x: 0, y: 4},
    {x: 1, y: 4},
    {x: 10, y: 4},
    {x: 16, y: 4},
    {x: 20, y: 4},
    {x: 21, y: 4},
    {x: 0, y: 5},
    {x: 1, y: 5},
    {x: 10, y: 5},
    {x: 14, y: 5},
    {x: 16, y: 5},
    {x: 17, y: 5},
    {x: 22, y: 5},
    {x: 24, y: 5},
    {x: 10, y: 6},
    {x: 16, y: 6},
    {x: 24, y: 6},
    {x: 11, y: 7},
    {x: 15, y: 7},
    {x: 12, y: 8},
    {x: 13, y: 8},
  ],
};

export default patterns;




// const CELL_SIZE = 20;
// const WIDTH = 800;
// const HEIGHT = 600;

// const Cell = ({ x, y }) => (
//   <div className="Cell" style={{
//     left: `${CELL_SIZE * x + 1}px`,
//     top: `${CELL_SIZE * y + 1}px`,
//     width: `${CELL_SIZE - 1}px`,
//     height: `${CELL_SIZE - 1}px`,
//   }} />
// );

// const makeEmptyBoard = () => {
//   const rows = HEIGHT / CELL_SIZE;
//   const cols = WIDTH / CELL_SIZE;
//   return Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
// };

// const GameOfLife = () => {
//   const [cells, setCells] = useState([]);
//   const [board, setBoard] = useState(makeEmptyBoard());
//   const [isRunning, setIsRunning] = useState(false);
//   const [interval, setInterval] = useState(100);
//   const timeoutRef = useRef();

//   const calculateNeighbors = (board, x, y) => {
//     let count = 0;
//     for (let i = -1; i <= 1; i++) {
//       for (let j = -1; j <= 1; j++) {
//         if (i === 0 && j === 0) continue;
//         const newX = x + i;
//         const newY = y + j;

//         if (newX >= 0 && newX < WIDTH / CELL_SIZE && newY >= 0 && newY < HEIGHT / CELL_SIZE) {
//           count += board[newY][newX] ? 1 : 0;
//         }
//       }
//     }
//     return count;
//   };

//   const makeCells = (newBoard) => {
//     let newCells = [];
//     for (let y = 0; y < HEIGHT / CELL_SIZE; y++) {
//       for (let x = 0; x < WIDTH / CELL_SIZE; x++) {
//         if (newBoard[y][x]) {
//           newCells.push({ x, y });
//         }
//       }
//     }
//     return newCells;
//   };

//   const getElementOffset = () => {
//     const rect = document.getElementsByClassName('Board')[0].getBoundingClientRect();
//     const doc = document.documentElement;

//     return {
//       x: (rect.left + window.pageXOffset) - doc.clientLeft,
//       y: (rect.top + window.pageYOffset) - doc.clientTop,
//     };
//   };

//   const handleClick = (event) => {
//     const elemOffset = getElementOffset();
//     const offsetX = event.clientX - elemOffset.x;
//     const offsetY = event.clientY - elemOffset.y;
//     const x = Math.floor(offsetX / CELL_SIZE);
//     const y = Math.floor(offsetY / CELL_SIZE);

//     if (x >= 0 && x < WIDTH / CELL_SIZE && y >= 0 && y < HEIGHT / CELL_SIZE) {
//       const newBoard = board.map(row => [...row]);
//       newBoard[y][x] = !newBoard[y][x];
//       setBoard(newBoard);
//       setCells(makeCells(newBoard));
//     }
//   };

//   const runIteration = useCallback(() => {
//     setBoard(currentBoard => {
//       const newBoard = makeEmptyBoard();
//       for (let y = 0; y < HEIGHT / CELL_SIZE; y++) {
//         for (let x = 0; x < WIDTH / CELL_SIZE; x++) {
//           const neighbors = calculateNeighbors(currentBoard, x, y);
//           if (currentBoard[y][x]) {
//             newBoard[y][x] = neighbors === 2 || neighbors === 3;
//           } else {
//             newBoard[y][x] = neighbors === 3;
//           }
//         }
//       }
//       setCells(makeCells(newBoard));
//       return newBoard;
//     });

//     timeoutRef.current = setTimeout(runIteration, interval);
//   }, [interval]);

//   useEffect(() => {
//     if (isRunning) {
//       runIteration();
//     }
//     return () => clearTimeout(timeoutRef.current);
//   }, [isRunning, runIteration]);


//   const handleRun = () => setIsRunning(true);
//   const handleStop = () => setIsRunning(false);
//   const handleClear = () => {
//     const newBoard = makeEmptyBoard();
//     setBoard(newBoard);
//     setCells([]);
//     };
//     const handleRandom = () => {
//     const newBoard = makeEmptyBoard();
//     for (let y = 0; y < HEIGHT / CELL_SIZE; y++) {
//     for (let x = 0; x < WIDTH / CELL_SIZE; x++) {
//     newBoard[y][x] = Math.random() >= 0.5;
//     }
//     }
//     setBoard(newBoard);
//     setCells(makeCells(newBoard));
//     };

//     const handleIntervalChange = (event) => {
//     setInterval(Number(event.target.value));
//     };

//     return (
//       <div>
//         <div className="Board"
//              style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
//              onClick={handleClick}>
//           {cells.map(cell => <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />)}
//         </div>

//         <div className="controls">
//           Update every <input value={interval} onChange={handleIntervalChange} /> msec
//           {isRunning ?
//             <button className="button" onClick={handleStop}>Stop</button> :
//             <button className="button" onClick={handleRun}>Run</button>
//           }
//           <button className="button" onClick={handleRandom}>Random</button>
//           <button className="button" onClick={handleClear}>Clear</button>
//         </div>
//       </div>
//     );
//   };

//   export default GameOfLife;
