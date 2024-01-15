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
                  //initial="hidden"
                  animate="show"
                  className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
                >
                  <button
                    className={`text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600`}
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
                  //initial="hidden"
                  animate="show"
                  className="card-toggle-gradient p-[1px] rounded-[20px] shadow-card"
                >
                  <button
                    className={`text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-600`}
                    onClick={() => setSpeed(s => Math.min(MAXSPEED, Math.max(MINSPEED, s - 10)))}
                  >
                    <FontAwesomeIcon icon={faMinus} /> Decrease Speed
                  </button>
                </motion.div>

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

                <motion.div
                  variants={fadeIn('right', 'spring', 0.5, 0.75)}
                  //initial="hidden"
                  animate="show"
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
};
export default GameOfLife;
