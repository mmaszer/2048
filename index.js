import Game from "game.js"

let game = new Game(4);

/*export const renderGame = function(game) {
    return `
        <div id="board">
            <div style="display: grid; grid-gap: 10px 10px; grid-template-columns: auto auto; width: 730px">
                <div style=" height: 80px; align-items: center; margin-bottom: 10px"><p style="font-size: 30px; font-family: Arial">2048</p></div>
                <div style= "
                    background-color: #B2AB9F;      
                    width: 200px;  
                    height: 60px;
                    align-items: center   
                ">
                    <p id="score" style="color: #FFF; font-size: 20px; text-align: center">SCORE: ${game.score}</p>    
                </div>
            </div>
            <div style="
                display: grid; 
                grid-template-columns: auto auto auto auto;
                background-color: #B2AB9F;
                padding-left: 20px;
                padding-top: 20px;
                width: 490px;  
                height: 490px;     
            ">            
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[0]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[1]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[2]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[3]}</p></div>

                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[4]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[5]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[6]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[7]}</p></div>

                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[8]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[9]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[10]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[11]}</p></div>

                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[12]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[13]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[14]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[15]}</p></div>    
            </div>
        </div>
    `
}*/
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

/*
export const updateBoard = function(game) {
    return `
        <div id="board">
            <div style="display: grid; grid-gap: 10px 10px; grid-template-columns: auto auto; width: 730px">
                <div style=" height: 80px; align-items: center; margin-bottom: 10px"><p style="font-size: 30px; font-family: Arial">2048</p></div>
                <div style= "
                    background-color: #B2AB9F;      
                    width: 200px;  
                    height: 60px;
                    align-items: center   
                ">
                    <p id="score" style="color: #FFF; font-size: 20px; text-align: center">SCORE: ${game.board.score}</p>    
                </div>
            </div>
            <div style="
                display: grid; 
                grid-template-columns: auto auto auto auto;
                background-color: #B2AB9F;
                padding-left: 20px;
                padding-top: 20px;
                width: 490px;  
                height: 490px;     
            ">            
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[0]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[1]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[2]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[3]}</p></div>

                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[4]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[5]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[6]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[7]}</p></div>

                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[8]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[9]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[10]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[11]}</p></div>

                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[12]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[13]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[14]}</p></div>
                    <div style="width: 100px; height: 100px; background-color: #E0D7C7; align-items: center; font-size: 30px;"><p style="text-align: center">${game.board[15]}</p></div>    
            </div>
        </div>
    `
};
*/

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
