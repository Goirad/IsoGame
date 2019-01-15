function PlayScreen(context) {
    this.context = context;
    this.w = context.gameState.playWidth;
    this.h = context.height;
    let cx = context.width / 2;
    let cy = context.height / 2;

    let isIso = false;
    let moves = 0;
    let pastMoves = [];
    let currentMove = 0;
    let won = false;
    let moveGoal = false;
    let moveAns = true;

    let gameState = context.gameState;

    let buttons = [];

    let graph1 = new Graph(context, gameState.numVerts, cx, this.h * 0.6, this.w * 0.9);
    let graph2 = new staticGraph(graph1);
    
    let buttWidth = this.w / 5;
    let menuButton = new Button(this.context, 'MENU', buttWidth / 3, cx + buttWidth * 1.2, this.h * 0.20, buttWidth, buttWidth * .4);
    menuButton.mouseReleased = function() {
        if(this.clickedOn()) {
            gameState.gameScreen = "menu";
        }
    };
    buttons.push(menuButton);

    let resetButton = new Button(this.context,'RSET', buttWidth / 3, cx + buttWidth * 1.2, this.h * 0.12, buttWidth, buttWidth * .4);
    resetButton.mouseReleased = function() {
        if (this.clickedOn()) {
            won = false;
            graph1.perm = graph1.originalPerm.slice();
            graph2.perm = graph2.originalPerm.slice();
            moves = 0;
            pastMoves = [];
            currentMove = 0;
            gameState.gameScreen = "play";
            graph1.won = false;
            graph2.won = false;
            movesLabel.update();
        }
    };
    buttons.push(resetButton);

    let undoButton = new Button(this.context, 'UNDO', buttWidth / 3, cx, this.h * 0.28, buttWidth, buttWidth * .4);
    undoButton.color = '#c33c';
    undoButton.mouseReleased = function() {
        if (this.clickedOn()) {
            if (currentMove < pastMoves.length) {
                let pos = pastMoves.length - 1 - currentMove;
                let id = pastMoves[pos][0];
                if (id === 0) {
                    arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                } else if (id === 1) {
                    arraySwap(graph2.perm, pastMoves[pos][1], pastMoves[pos][2]);
                } else if (id === 2) {
                    arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                    arraySwap(graph2.perm, pastMoves[pos][1], pastMoves[pos][2]);
                }
                moves -= 1;
                currentMove += 1;
                if (won) {
                    graph1.won = false;
                    graph2.won = false;
                    won = false;
                }
            }
        }
    };
    buttons.push(undoButton);

    let redoButton = new Button(this.context, 'REDO', buttWidth / 3, cx + buttWidth * 1.2, this.h * 0.28, buttWidth, buttWidth * .4);
    redoButton.color = '#c33c';
    redoButton.mouseReleased = function() {
        if (this.clickedOn()) {
            if (currentMove > 0) {
                let pos = pastMoves.length - currentMove;
                let id = pastMoves[pos][0];
                if (id === 0) {
                    arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                } else if (id === 1) {
                    arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                } else if (id === 2) {
                    arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                    arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                }
                currentMove -= 1;
                moves += 1;
            }
        }
    };
    buttons.push(redoButton);

    let helpButton = new Button(this.context, 'HELP', buttWidth / 3, cx - buttWidth * 1.2, this.h * 0.28, buttWidth, buttWidth * 0.4);
    helpButton.mouseReleased = function() {
        if(this.clickedOn()) {
            gameState.gameScreen = "help";
        }
    };
    buttons.push(helpButton);

    let titleLabel = new Label(this.context, 'Iso Game', cx - this.w / 4, this.h * 0.05, this.w / 2, this.w * 0.1);
    titleLabel.center = true;
    let movesLabel = new Label(this.context, 'MOVES   ' + moves, cx - buttWidth * 1.7, this.h * 0.12, this.w * 0.44, buttWidth * 0.4);
    movesLabel.update = function() {
        this.text = 'MOVES   ' + moves;
    };
    let levelLabel = new Label(this.context, 'LEVEL   ' + gameState.numVerts, cx - buttWidth * 1.7, this.h * 0.2, this.w * 0.44, buttWidth * 0.4);
    levelLabel.update = function() {
        this.text = 'LEVEL   ' + gameState.numVerts;
    };
    let advancedMoveLabel1 = new Label(this.context, 'MOVE GOAL', cx - this.w / 2 + this.w / 20, this.h * 0.93, this.w * 0.3, buttWidth * 0.3);
    let advancedMoveLabel2 = new Label(this.context, 'MOVE GRPH', cx + this.w / 40, this.h * 0.93, this.w * 0.3, buttWidth * 0.3);

    let moveGoalCheckbox = new CheckBox(this.context, cx - this.w / 40 - this.w / 20, this.h * 0.93, this.w / 10);
    moveGoalCheckbox.checked = false;
    let moveAnsCheckbox = new CheckBox(this.context, cx + this.w / 2 - this.w / 10, this.h * 0.93, this.w / 10);
    moveAnsCheckbox.checked = true;

    this.newLevel = function() {
        won = false;
        gameState.gameScreen = "play";
        graph1 = new Graph(this.context, gameState.numVerts, cx, this.h * 0.6, gameState.playWidth * 0.9);
        graph2 = new staticGraph(graph1);
        moves = 0;
        currentMove = 0;
        pastMoves = [];
        gameState.winScreenClosed = false;
        levelLabel.update();
        movesLabel.update();
        undoButton.color = (pastMoves.length > 0 && currentMove < pastMoves.length) ? '#3c3c' : '#c33c';
        redoButton.color = (currentMove === 0) ? '#c33c' : '#3c3c';
    };

    this.draw = function() {
        this.context.background(230);
        this.context.rectMode(this.context.CENTER);
        this.context.strokeWeight(2);
        this.context.fill(220);
        this.context.rect(cx, cy, gameState.playWidth, this.h * 0.99, 5);
        graph2.draw();
        //console.log(graph2);
        graph1.draw();
        this.context.textAlign(this.context.CENTER, this.context.CENTER);
        this.context.textSize(40);
        this.context.fill('#444e');
        //this.context.text('IsoGame', this.context.width/2, this.context.height*0.05);
        titleLabel.draw();

        this.context.stroke('#444e');
        this.context.fill('#444e');
        movesLabel.draw();
        levelLabel.draw();
        for (let b of buttons) {
            //console.log(b);
            b.draw();
        }

        if (gameState.advancedMove) {
            advancedMoveLabel1.draw();
            advancedMoveLabel2.draw();
            moveGoalCheckbox.draw();
            moveAnsCheckbox.draw();
        }
    };

    this.mousePressed = function() {
        if (!won) {
            let v = graph1.isVertex(this.context.mouseX, this.context.mouseY);
            if (v != null) {
                if (moveAns) graph1.selected = v;
                if (moveGoal) graph2.selected = v;
            }
        }
    };

    this.mouseReleased = function() {
        if (!won) {
            let v;
            if (gameState.offsetTouch) {
                v = graph1.isVertex(this.context.mouseX, this.context.mouseY - this.context.height * 0.1);
            } else {
                v = graph1.isVertex(this.context.mouseX, this.context.mouseY);
            }
            let ansSwapped = null;
            let goalSwapped = null;
            if (moveAns) {
                if (v != null && v !== graph1.selected && graph1.selected != null) {
                    arraySwap(graph1.perm, v, graph1.selected);
                    ansSwapped = graph1.selected;
                    if (currentMove > 0) {
                        let newLength = pastMoves.length - currentMove;
                        pastMoves = pastMoves.slice(0, newLength);
                        currentMove = 0;
                    }
                }
            }
            if (moveGoal) {
                if (v != null && v !== graph2.selected && graph2.selected != null) {
                    arraySwap(graph2.perm, v, graph2.selected);
                    goalSwapped = graph2.selected;
                    if (currentMove > 0) {
                        let newLength = pastMoves.length - currentMove;
                        pastMoves = pastMoves.slice(0, newLength);
                        currentMove = 0;
                    }
                }
            }
            if (ansSwapped != null || goalSwapped != null) {
                let id;
                if (ansSwapped != null && goalSwapped == null) {
                    id = 0;
                    pastMoves.push([id, v, graph1.selected]);
                } else if (ansSwapped == null && goalSwapped != null) {
                    id = 1;
                    pastMoves.push([id, v, graph2.selected]);
                } else if (ansSwapped != null && goalSwapped != null) {
                    id = 2;
                    pastMoves.push([id, v, graph1.selected]);
                }
                moves += 1;
            }
        }
        if (graph1.selected == null && graph2.selected == null && gameState.advancedMove) {
            moveGoalCheckbox.clickedOn();
            moveGoal = moveGoalCheckbox.checked;
            moveAnsCheckbox.clickedOn();
            moveAns = moveAnsCheckbox.checked;
        }
        for (let b of buttons) {
            b.mouseReleased();
        }
        undoButton.color = (pastMoves.length > 0 && currentMove < pastMoves.length) ? '#3c3c' : '#c33c';
        redoButton.color = (currentMove === 0) ? '#c33c' : '#3c3c';

        graph1.selected = null;
        graph2.selected = null;
        isIso = graph1.isoTo(graph2);
        movesLabel.text = 'MOVES   ' + moves;

        if (isIso && gameState.gameScreen === "play") {
            if (!gameState.winScreenClosed) {
                gameState.gameScreen = "win";
            }
            won = true;
            graph1.won = true;
            graph2.won = true;
        }
    }
}