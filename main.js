import Game from "game.js"

let game = new Game(4);

export const renderGame = function(game) {
    let g = document.createElement("div");
    g.className = "g";

    let header = document.createElement("div");
    header.className = "header";

    let cont = document.createElement("p");
    let title = document.createTextNode("2048");
    cont.className = "title";
    cont.appendChild(title);

    let p = document.createElement("p");
    let instr = document.createTextNode("Use your arrow keys to move the tiles!");
    p.className = "instr";
    p.appendChild(instr);

    let scorebox = document.createElement("div");
    let s = document.createElement("p");
    let sVal = document.createTextNode("SCORE: " + game.score);

    s.appendChild(sVal);

    let txt = "";

    if (game.won) {
        txt = "Game Status: You won!";
    } else if (game.over) {
        txt = "Game Status: You lost :(";
    } else {
        txt = "Game Status: Ongoing";
        console.log("!");
    }

    let statusCont = document.createElement("p");
    let status = document.createTextNode(txt);

    statusCont.appendChild(status);

    scorebox.className = "scorebox";
    s.className = "text";
    status.className = "text"

    scorebox.appendChild(s);
    scorebox.appendChild(statusCont);

    let words = document.createElement("div");
    words.appendChild(cont);
    words.appendChild(p);

    header.appendChild(words);

    let board = document.createElement("div");
    board.className = "board";

    for (let i = 0; i < game.size; i++) {
        let tile = document.createElement("div");
        tile.className = "tile";

        let p = document.createElement("p");
        p.className = "numCont";

        let val = document.createTextNode(game.board[i]);
        val.className = "num";

        p.appendChild(val);

        if (game.board[i] !== 0) { tile.appendChild(p); }

        board.appendChild(tile);
    }

    let reset = document.createElement("button");
    let buttonTxt = document.createTextNode("Reset Game")
    reset.appendChild(buttonTxt);
    reset.className = "reset";

    scorebox.appendChild(reset);

    let gameContain = document.createElement("div");
    gameContain.className = "gameContain";
    
    gameContain.appendChild(board);
    gameContain.appendChild(scorebox);

    g.appendChild(header);
    g.appendChild(gameContain);
    return g;
}

export const updateBoard = function(game) {
    let g = document.createElement("div");
    g.className = "g";

    let header = document.createElement("div");
    header.className = "header";

    let cont = document.createElement("p");
    let title = document.createTextNode("2048");
    cont.className = "title";
    cont.appendChild(title);

    let p = document.createElement("p");
    let instr = document.createTextNode("Use your arrow keys to move the tiles!");
    p.className = "instr";
    p.appendChild(instr);

    let scorebox = document.createElement("div");
    let s = document.createElement("p");
    let sVal = document.createTextNode("SCORE: " + game.score);

    s.appendChild(sVal);

    let txt = "";

    if (game.won) {
        txt = "Game Status: You won!";
    } else if (game.over) {
        txt = "Game Status: You lost :(";
    } else {
        txt = "Game Status: Ongoing";
        console.log("!");
    }

    let statusCont = document.createElement("p");
    let status = document.createTextNode(txt);

    statusCont.appendChild(status);

    scorebox.className = "scorebox";
    s.className = "text";
    status.className = "text"

    scorebox.appendChild(s);
    scorebox.appendChild(statusCont);

    let words = document.createElement("div");
    words.appendChild(cont);
    words.appendChild(p);

    header.appendChild(words);

    let board = document.createElement("div");
    board.className = "board";

    for (let i = 0; i < game.size; i++) {
        let tile = document.createElement("div");
        tile.className = "tile";

        let p = document.createElement("p");
        p.className = "numCont";

        let val = document.createTextNode(game.board[i]);
        val.className = "num";

        p.appendChild(val);

        if (game.board[i] !== 0) { tile.appendChild(p); }

        board.appendChild(tile);
    }

    let reset = document.createElement("button");
    let buttonTxt = document.createTextNode("Reset Game")
    reset.appendChild(buttonTxt);
    reset.className = "reset";

    scorebox.appendChild(reset);

    let gameContain = document.createElement("div");
    gameContain.className = "gameContain";
    
    gameContain.appendChild(board);
    gameContain.appendChild(scorebox);

    g.appendChild(header);
    g.appendChild(gameContain);
    return g;
}

export const handleArrowKeyPress = function(event) {
    console.log("!");
    if (event.keyCode === 38) { // up
        console.log("up");
        game.move("up");
        $('.g').replaceWith(updateBoard(game));
    }

    if (event.keyCode === 40) { // down
        console.log("down");
        game.move("down");
        $('.g').replaceWith(updateBoard(game));
    }

    if (event.keyCode === 37) { // left
        console.log("left");
        game.move("left");
        $('.g').replaceWith(updateBoard(game));
    }

    if (event.keyCode === 39) { // right
        console.log("right");
        game.move("right");
        $('.g').replaceWith(updateBoard(game));
    }

    console.log(game.board);
};

export const handleReset = function(event) {
    game.setupNewGame();
    $('.g').replaceWith(updateBoard(game));
};

export const loadBoardIntoDOM = function(game) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    $root.append(renderGame(game));

    $(document).keydown(handleArrowKeyPress);
    
    $root.on("click", ".reset", handleReset);
};


$(function() {
    //let game = new Game(4);
    /*let game = {
        board: [
            0, 0, 2,  0, 0, 2,
            0, 0, 0,  0, 0, 0,
            0, 0, 0, 0
          ],
          score: 80,
          won: false,
          over: false
    }*/
    loadBoardIntoDOM(game);
});
