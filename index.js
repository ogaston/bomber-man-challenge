function bomberMan(n, grid) {
  var redo = true; // referencia de repeticion de procesos apartir del 4to segundo
  var memoArr = [];

  /**
   * Memoriza en la variable 'memo' las posiciones que serán afectadas por las bombas actualmente ubicadas
   *
   * @param {int} colum índice de la columna
   * @param {Array} columArr arreglo completo de la columna
   * @param {int} row índice de la fila
   * @param {Array} rowArr arreglo completo de la fila
   */

  function getPosState(colum, columArr, row, rowArr) {
    const validations = [
      rowArr[row] == "O",
      rowArr[row - 1] && rowArr[row - 1] == "O",
      rowArr[row + 1] && rowArr[row + 1] == "O",
      columArr[colum - 1] && columArr[colum - 1][row] == "O",
      columArr[colum + 1] && columArr[colum + 1][row] == "O"
    ];

    return validations.some(e => e) ? "." : "O";
  }

  /**
   * Llena los espacios vacíos con bombas
   *
   * @param {Array} positionsArray Matriz de valores
   */
  function fillEmptyWithBombs(positionsArray) {
    memoArr = [];
    return positionsArray.map((rowArray, colum, columArr) => {
      memoArr.push([]);
      return rowArray.map((state, row, rowArr) => {
        memoArr[colum].push(getPosState(colum, columArr, row, rowArr));
        return "O";
      });
    });
  }

  /**
   * Genera el efecto de detonar las bombas utilizando las posiciones memorizadas por la variable 'memo' y reinicializandola.
   *
   */
  function detonateBombs() {
    return memoArr;
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
