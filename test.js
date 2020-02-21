const grid = [".......", "...O...", "....O..", ".......", "OO.....", "OO....."];
const n = 3;

bomberMan(n, grid);

function bomberMan(n, grid) {
  var memo = {}; // memorizador de posiciones
  var redo = true; // referencia de repeticion de procesos apartir del 4to segundo

  /**
   * Memoriza en la variable 'memo' las posiciones que serán afectadas por las bombas actualmente ubicadas
   *
   * @param {int} colum índice de la columna
   * @param {Array} columArr arreglo completo de la columna
   * @param {int} row índice de la fila
   * @param {Array} rowArr arreglo completo de la fila
   */
  function memoDamangePositions(colum, columArr, row, rowArr) {
    memo[colum + "-" + row] = ".";
    if (colum != columArr.length - 1) memo[colum + 1 + "-" + row] = ".";
    if (colum != 0) memo[colum - 1 + "-" + row] = ".";
    if (row != rowArr.length - 1) memo[colum + "-" + (row + 1)] = ".";
    if (row != 0) memo[colum + "-" + (row - 1)] = ".";
  }

  /**
   * Llena los espacios vacíos con bombas
   *
   * @param {Array} positionsArray Matriz de valores
   */
  function fillEmptyWithBombs(positionsArray) {
    return positionsArray.map((rowArray, colum, columArr) =>
      rowArray.map((state, row, rowArr) => {
        if (state == "O") {
          memoDamangePositions(colum, columArr, row, rowArr);
        }
        return "O";
      })
    );
  }

  /**
   * Genera el efecto de detonar las bombas utilizando las posiciones memorizadas por la variable 'memo' y reinicializandola.
   *
   * @param {Array} positionsArray Matriz de valores
   */
  function detonateBombs(positionsArray) {
    const result = positionsArray.map((c, columIndex) =>
      c.map((r, rowIndex) => memo[columIndex + "-" + rowIndex] || "O")
    );
    memo = {};
    return result;
  }

  /**
   * Devuelve una matriz de valores
   *
   * @param {Array} grid
   */
  function getPositionArray(grid) {
    return grid.map(e => e.split(""));
  }

  /**
   * Utiliza la variable 'redo' como referencia para repetir el paso de llenar las bombas y en su próxima ejecución explotarlas.
   *
   * @param {Array} result
   */
  function repeatProcess(result) {
    if (redo) {
      redo = !redo;
      return fillEmptyWithBombs(result);
    }
    redo = !redo;
    return detonateBombs(result);
  }

  let result = getPositionArray(grid); // convierte la variable grid en una matriz.

  for (let i = 1; i <= n; i++) {
    if (i == 1) result = result; // el primer segundo las posiciones se mantienen intactas
    if (i == 2) result = fillEmptyWithBombs(result); // el segundo segundo llena las posiciones vacias con bombas
    if (i == 3) result = detonateBombs(result); // el tercer segundo explotan las primeras bombas insertadas
    // a partir del segundo repiten cada proceso de los dos anteriores cada segundo.
    if (i > 3) {
      result = repeatProcess(result);
    }
  }

  return result.map(e => e.join("")); // se retorna el resultado en formato inicial de grid.
}
