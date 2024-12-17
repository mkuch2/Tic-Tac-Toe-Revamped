const Gameboard = (function(){
  const ROWS = 3;
  const COLS = 3;
  const gameboard = [];

  //set gameboard with ROWS x COLS tiles
  const setGameboard = ()=>{
  for(let i = 0; i < ROWS; i++){
    gameboard[i] = [];
    for(let j = 0; j < COLS; j++){
      gameboard[i].push(null);
    }
  }
}

//display board
  const displayBoard = ()=>{
    for(let i = 0; i < ROWS; i++){
      console.log(gameboard[i]);
    }
  }


  //return value at tile
  const getTile = (row, col)=>{
    return gameboard[row][col];
  }

  //add player marker to tile if not tile already taken
  const addMarker = (marker, row, col) =>{
    if(gameboard[row][col] === null){
      gameboard[row][col] = marker;
      return true;
    }
    return false;
  }

  //check board for winning conditions, return true if found and false otherwise
  const checkBoard = () => {
      // Check rows
      for (let i = 0; i < 3; i++) {
        if (gameboard[i][0] !== null && gameboard[i][0] === gameboard[i][1] && gameboard[i][0] === gameboard[i][2]) {
          return true;
        }
      }
    
      // Check columns
      for (let i = 0; i < 3; i++) {
        if (gameboard[0][i] !== null && gameboard[0][i] === gameboard[1][i] && gameboard[0][i] === gameboard[2][i]) {
          return true;
        }
      }
    
      // Check diagonals
      if (gameboard[0][0] !== null  && gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2]) {
        return true;
      }
      if (gameboard[0][2] !== null  && gameboard[0][2] === gameboard[1][1] && gameboard[0][2] === gameboard[2][0]) {
        return true;
      }

      return false;

    }


  return {setGameboard, displayBoard, getTile, addMarker, checkBoard};
})();

function Player(name, marker){

  const getName = ()=>{
    return name;
  }
  const getMarker = ()=>{
    return marker;
  }

  //place marker on selected tile
  const setMarker = (row, col) => {
    return Gameboard.addMarker(marker, row, col);
  };
  
  return {getName, getMarker, setMarker};
}

function Game(){
  const players = [];
  let turns = 0;
  Gameboard.setGameboard();

  const playerOne = Player("Player One", "x");
  const playerTwo = Player("Player Two", "o");
  let activePlayer = playerOne;

  players.push(playerOne, playerTwo);

  const switchActivePlayer = ()=>{
    activePlayer = activePlayer===players[0] ? players[1] : players[0];
  }

  const printNewRound = ()=>{
    console.log(`${activePlayer.getName()}'s turn!`);
    Gameboard.displayBoard();
  }

  const resetGame = () =>{
    turns = 0;
    activePlayer = playerOne;
    Gameboard.setGameboard();
    console.log("Board has been reset.");
  }



  const playRound = (row, col)=>{
    //check if player added tile to a valid spot
    while(!activePlayer.setMarker(row, col)){
      console.log("Invalid spot! Try again!");
      return;
    }
    turns++;


    //check for win or tie, continue game otherwise
    if(turns >= 5 && turns <= 9 && Gameboard.checkBoard()){
      Gameboard.displayBoard();
      console.log(`${activePlayer.getName()} wins!`);
      resetGame();
      return;
    }
    else if(turns >= 9 && !Gameboard.checkBoard()){
      Gameboard.displayBoard();
      console.log("It's a tie!");
      resetGame();
      return;
    }
    else{
      switchActivePlayer();
      console.log(turns, "turns without win or tie");
    }

    printNewRound();
  }

  printNewRound();

  return {playRound};

}