export const cellSize = 10;
export const maxAge = 5;

export const create2DArray = (cols, rows) => {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = { alive: false, age: 0, color: '#000000' };
    }
  }
  return arr;
};

export const initCells = (cols, rows) => {
  let cells = create2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cells[i][j].alive = Math.random() < 0.5;
      cells[i][j].age = cells[i][j].alive ? 1 : 0;
      cells[i][j].color = getRandomColor();
    }
  }
  return cells;
};

export const getRandomColor = () => {
  const colors = ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const countNeighbors = (cells, x, y, cols, rows) => {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += cells[col][row].alive ? 1 : 0;
    }
  }
  sum -= cells[x][y].alive ? 1 : 0;
  return sum;
};

export const updateSimulation = (cells, cols, rows) => {
  let next = create2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = cells[i][j];
      let neighbors = countNeighbors(cells, i, j, cols, rows);
      if (cell.alive && (neighbors < 2 || neighbors > 3)) {
        next[i][j].alive = false;
      } else if (!cell.alive && neighbors === 3) {
        next[i][j].alive = true;
        next[i][j].age = 1;
      } else if (cell.alive) {
        next[i][j].age = cell.age + 1;
      }
    }
  }
  return next;
};
