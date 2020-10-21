/*
Add your code for Game here
 */
export default class Game {
  constructor(len) {
      this.len = len;
      this.size = (len * len);
      this.board = this.buildBoard(this.size);
      this.score = 0;
      this.won = false;
      this.over = false;
      this.moves = [];
      this.winVar = [];
      this.loseVar = [];
  }

  buildBoard(size) {
      let board = [];

      // create empty board
      for (let i = 0; i < size; i++) {
          board[i] = 0;
      }

      // add first tile
      let index = this.generateIndex(board);
      board[index] = this.generateTile();

      // add second tile
      index = this.generateIndex(board);
      board[index] = this.generateTile();

      return board;
  }

  // get random index from all open spot on board
  generateIndex(array) {
      let a = []
      for (let i = 0; i < array.length; i++) {
          if((array[i] === 0) || (array[i] === undefined)) {
              a.push(i);
          }
      }

      let index = Math.floor(Math.random() * a.length);
      
      return a[index];
  }

  generateTile() {
      var notRandomNumbers = [2,2,2,2,2,2,2,2,2,4];
      var i = Math.floor(Math.random() * notRandomNumbers.length);
      return notRandomNumbers[i];
  }

  setupNewGame() {
      this.board = this.buildBoard(this.size);
      this.score = 0;
      this.won = false;
      this.over = false;
  }

  loadGame(gameState) {
      this.len = Math.sqrt(gameState.board.length);
      this.size = gameState.board.length;
      this.board = gameState.board;
      this.score = gameState.score;
      this.won = gameState.won;
      this.over = gameState.over;
      this.moves = gameState.moves;
      this.winVar = gameState.winVar;
      this.loseVar = gameState.loseVar;
  }
  
  move(direction) {
      let board2D = this.to2D(this.board);
      let b = board2D;

          b = this.flipBoard(direction, board2D);

          /// apply move to all rows on board
          for (let i = 0; i < this.len; i++) {
              this.combineRowTiles(b, i);
          }

          // unflip board
          b = this.unflipBoard(direction, b);

          // re linearize board
          let linearB = this.toLinear(b);

          // did the board change?
          if (this.boardValuesMatch(this.board, linearB) === false) {
            // board becomes changed board
            this.board = linearB;
            // add new tile
            this.board[this.generateIndex(this.board)] = this.generateTile();

            //this.moves.forEach(elem => elem(this.getGameState()));
          }

          // is game won?
          /*if (this.won === true) {
              this.winVar.forEach(elem => elem(this.getGameState()));
          }*/

          // are there more moves
          if (this.hasMovesLeft(this.to2D(this.board), this.board) === false) {
              // if no: game over
              this.over = true;
              //this.loseVar.forEach(elem => elem(this.getGameState()));
          }

  }

  boardValuesMatch(linB1, linB2) {
    for (let i = 0; i < this.size; i++) {
      if (linB1[i] !== linB2[i]) {
        return false;
      }
    }
    return true;
  }

  hasMovesLeft(board2D, linearB) {
    if (linearB.includes(0)) {
      return true;
    }

    for(let i = 0; i < this.len-1; i++) {
      for(let j = 0; j < this.len-1; j++) {
        if (board2D[j][i] === board2D[j+1][i]) { // tile matches down
          return true;
        }    
        if (board2D[j][i] === board2D[j][i+1]) { // tile matches right
          return true;
        }
        if (board2D[j][i+1] === board2D[j+1][i+1]) {
          return true;
        }
        if (board2D[j+1][i] === board2D[j+1][i+1]) {
          return true;
        }
      }
    }
    return false;
  }

  combineRowTiles(board2D, rowIndex) {
      this.preShiftTiles(board2D, rowIndex);
      for (let i = this.len - 1; i > 0; i--) {
          if ((board2D[rowIndex][i] === board2D[rowIndex][i-1])) { // if tile matches one to left of it, combine them to right
            if (board2D[rowIndex][i] !== undefined) { // dont add undefineds
              if ( (board2D[rowIndex][i] * 2) === 2048 ) { this.won = true; }
              board2D[rowIndex][i] = 2 * board2D[rowIndex][i];
              this.score = this.score + board2D[rowIndex][i];
            }     
            this.shiftRowTiles(board2D, rowIndex, i - 1);
          }
      }
      return board2D;
  }

  shiftRowTiles(board2D, rowIndex, location) {
      for (let i = location; i >= 0; i--) {
          board2D[rowIndex][i] = board2D[rowIndex][i-1];
      }
      board2D[rowIndex][0] = 0;
      
      return board2D;
  }

  preShiftTiles(board2D, rowIndex) {
    if (board2D[rowIndex].some(item => item !== 0)) {
      
      let source = this.len - 1;
      let dest = this.len - 1;
      
      while (source >= 0) {
        if (board2D[rowIndex][source] != 0) {
          board2D[rowIndex][dest--] = board2D[rowIndex][source];
        }
        source--;
      }
      while (dest >= 0) {
        board2D[rowIndex][dest--] = 0;
      }
    }
  }

  unflipBoard(direction, board2D) {
      if (direction === "up") {
          return this.flipBoard("down", board2D);
      } else if (direction === "down") {
          return this.flipBoard("up", board2D);
      } else if (direction === "left") {
          return this.flipBoard("left", board2D);
      } else {
          return this.flipBoard("right", board2D);
      }
  }

  flipBoard(direction, board2D) {
      let newBoard = [];
      let row = [];
      let index = 0;
      if (direction === "up") {
          for (let i = 0; i < this.len; i++) {
              for (let j = 0; j < this.len; j++) {
                  row.push(board2D[j][i]);
              }
              row.reverse();
              newBoard.push(row);
              index = this.len * (i+1);
              row = [];
          }
          return newBoard;
      }

      if (direction === "down") {
          for (let i = this.len - 1; i >= 0; i--) {
              for (let j = 0; j < this.len; j++) {
                  row.push(board2D[j][i]);
              }
              newBoard.push(row);
              index = this.len * (i+1);
              row = [];
          }
          return newBoard;
      }

      if (direction === "left") {
          for (let i = 0; i < this.len; i ++) {
            newBoard[i] = board2D[i].reverse();
          }
          return newBoard;
      }

      if (direction === "right") {
          return board2D;
      }

  }

  to2D(board) {
      let board2D = [];
      let row =[];
      let index = 0;
      for(let j = 0; j < this.len; j++) {
          for(let i = index; i < this.len + index; i++) {
              row.push(board[i]);
          }
          board2D[j] = row;
          index = this.len * (j+1);
          row = [];
      }
      return board2D;
  }

  toLinear(board2D) {
      let linearB = [];
      for (let i = 0; i < this.len; i++) {
          for (let j = 0; j < this.len; j++) {
              linearB.push(board2D[i][j])
          }
      }
      return linearB;
  }
  
  toString() {
      let string = "";
      let index = 0;
      for(let j = 0; j < this.len; j++) {
          for(let i = index; i < this.len + index; i++) {
              string = string + "[" + this.board[i] + "] ";
          }
          index = this.len * (j+1);
          console.log(string);
          string = ""; 
      }
  }

  onMove(callback) {
    this.moves.push(callback);
  }

  onWin(callback) {
    this.winVar.push(callback);
  }

  onLose(callback) {
    this.loseVar.push(callback);
  }

  getGameState() {
      return{
          board: this.board,
          score: this.score,
          won: this.won,
          over: this.over
      }
  }
}