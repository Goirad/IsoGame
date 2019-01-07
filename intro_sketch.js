let gameSketch = function(sketch) {
    //state
    let graph1;
    let graph2;
    let isIso = false;
    let moves = 0;
    let pastMoves = [];
    let currentMove = 0;
    let graphWidth;
    let won = false;

    //menu
    let menuCloseButton;


    //play
    let menuButton;
    let resetButton;
    let undoButton, redoButton;
    let helpButton;

    //options
    let menuScreen;
    let helpScreen;
    let winScreen;
    let moveGoal = false;
    let moveGoalCheckbox;
    let moveAns = true;
    let moveAnsCheckbox;
    let advancedMoveLabel1;
    let advancedMoveLabel2;
    let movesLabel;
    let titleLabel;

    sketch.setup = function() {
        this.advancedMove = false; //whether to display advanced move checkboxes
        this.gameScreen = "play";
        this.offsetTouch = true;
        this.numVerts = 4;
        this.winScreenClosed = false;
        let height  = sketch.windowHeight;
        let width = sketch.windowWidth;
        sketch.createCanvas(width, height);
        if (width >= height*.6) {
            this.playWidth = height * 0.6;
            graphWidth = this.playWidth * 0.9;
        }else{
            this.playWidth = width;
            graphWidth = width*0.9;
        }

        graph1 = new Graph(this.numVerts, sketch.width/2, sketch.height*0.6, graphWidth);
        graph2 = new staticGraph(graph1);
        //graph2.y = sketch.height/4;
        let buttWidth = this.playWidth/5;

        menuButton      = new Button(sketch, 'MENU', buttWidth/3, sketch.width/2 + buttWidth*1.2    , height*0.20, buttWidth, buttWidth*.4);
        resetButton     = new Button(sketch, 'RSET', buttWidth/3, sketch.width/2 + buttWidth*1.2    , height*0.12, buttWidth,buttWidth*.4);
        undoButton      = new Button(sketch, 'UNDO', buttWidth/3, sketch.width/2     , height*0.28, buttWidth, buttWidth*.4);
        undoButton.color = '#c33c';
        redoButton      = new Button(sketch, 'REDO', buttWidth/3, sketch.width/2 + buttWidth*1.2    , height*0.28, buttWidth, buttWidth*.4);
        redoButton.color = '#c33c';
        helpButton      = new Button(sketch, 'HELP', buttWidth/3, sketch.width/2 - buttWidth*1.2, height*0.28, buttWidth, buttWidth*0.4);

        menuScreen = new MenuScreen(sketch, this.playWidth);
        helpScreen = new HelpScreen(sketch);
        winScreen = new WinScreen(sketch);
        titleLabel = new Label(sketch, 'Iso Game', sketch.width/2 - this.playWidth/4, sketch.height*0.05, this.playWidth/2, this.playWidth*0.1);
        titleLabel.center = true;
        movesLabel        = new Label(sketch, 'MOVES   ' + moves, sketch.width/2 - buttWidth*1.7, height*0.12, this.playWidth*0.44, buttWidth*0.4);
        this.levelLabel = new Label(sketch, 'LEVEL   ' + this.numVerts, sketch.width/2 - buttWidth*1.7, height*0.2, this.playWidth*0.44, buttWidth*0.4);
        advancedMoveLabel1 = new Label(sketch, 'MOVE GOAL', sketch.width/2 - this.playWidth/2 + this.playWidth/20, height*0.93, this.playWidth*0.3, buttWidth*0.3);
        advancedMoveLabel2 = new Label(sketch, 'MOVE GRPH', sketch.width/2  + this.playWidth/40, height*0.93, this.playWidth*0.3, buttWidth*0.3);

        moveGoalCheckbox = new CheckBox(sketch, sketch.width/2 - this.playWidth/40 - this.playWidth/20, height * 0.93, this.playWidth/10);
        moveGoalCheckbox.checked = false;
        moveAnsCheckbox = new CheckBox(sketch, sketch.width/2 + this.playWidth/2 - this.playWidth/10, height * 0.93, this.playWidth/10);
        moveAnsCheckbox.checked = true;

        sketch.textFont('Courier New')
    };

    sketch.draw = function() {

        sketch.background(230);
        sketch.rectMode(sketch.CENTER);
        sketch.strokeWeight(2);
        sketch.fill(220);
        sketch.rect(sketch.width/2, sketch.height/2, sketch.playWidth, sketch.height*0.99, 5);
        graph2.draw(sketch);
        graph1.draw(sketch);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.textSize(40);
        sketch.fill('#444e');
        //sketch.text('IsoGame', sketch.width/2, sketch.height*0.05);

        menuButton.draw();
        titleLabel.draw();
        resetButton.draw();
        sketch.stroke('#444e');
        sketch.fill('#444e');
        movesLabel.draw();
        sketch.levelLabel.draw();

        undoButton.draw();
        helpButton.draw();
        redoButton.draw();
        if(sketch.advancedMove) {
            advancedMoveLabel1.draw();
            advancedMoveLabel2.draw();
            moveGoalCheckbox.draw();
            moveAnsCheckbox.draw();
        }


        if(sketch.gameScreen === "play") {
            if (won) {
                sketch.rectMode(sketch.CENTER, sketch.CENTER);
                sketch.fill('#9b9e');
                sketch.stroke('#444e');
                sketch.strokeWeight(2);
                sketch.rect(sketch.width/2, 40, this.playWidth*0.8, 50, 10);

                sketch.stroke('#444e');
                sketch.fill('#444e');
               // sketch.text('Good Job!', sketch.width/2, 40);

            }
        }else if(sketch.gameScreen === "help"){
            helpScreen.draw();
        }else if(sketch.gameScreen === "menu") {
            menuScreen.draw();
        }else if(sketch.gameScreen === 'win') {
            winScreen.draw();
        }

    };


    sketch.mousePressed = function() {
        if (this.gameScreen === "play" && !won) {
            let v = graph1.isVertex(sketch.mouseX, sketch.mouseY);
            if (v != null) {
                if(moveAns) graph1.selected = v;
                if(moveGoal) graph2.selected = v;
            }
        }
    };

    sketch.reset = function() {
        won = false;
        this.gameScreen = "play";
        graph1 = new Graph(this.numVerts, sketch.width/2, sketch.height*0.6, graphWidth);
        graph2 = new staticGraph(graph1);
        moves = 0;
        currentMove = 0;
        pastMoves = [];
        this.winScreenClosed = false;
    };

    sketch.mouseReleased = function() {
        console.log(pastMoves);
        console.log(currentMove);
        if (this.gameScreen === "play") {
            if(won) {

            }else {
                let v;
                if (sketch.offsetTouch) {
                    v = graph1.isVertex(sketch.mouseX, sketch.mouseY - sketch.height*0.1);
                }else{
                    v = graph1.isVertex(sketch.mouseX, sketch.mouseY);
                }
                let ansSwapped = null;
                let goalSwapped = null;
                if (moveAns) {
                    if (v != null && v != graph1.selected && graph1.selected != null) {
                        arraySwap(graph1.perm, v, graph1.selected);
                        ansSwapped = graph1.selected;
                        if (currentMove > 0) {
                            let newLength = pastMoves.length - currentMove;
                            pastMoves = pastMoves.slice(0, newLength);
                            currentMove = 0;
                        }
                    }
                }
                if(moveGoal) {
                    if (v != null && v != graph2.selected && graph2.selected != null) {
                        arraySwap(graph2.perm, v, graph2.selected);
                        goalSwapped = graph2.selected;
                        if (currentMove > 0) {
                            let newLength = pastMoves.length - currentMove;
                            pastMoves = pastMoves.slice(0, newLength);
                            currentMove = 0;
                        }
                    }
                }
                if(ansSwapped != null|| goalSwapped != null) {
                    let id;
                    if (ansSwapped != null && goalSwapped == null) {
                        id = 0;
                        pastMoves.push([id, v, graph1.selected]);
                    }else if(ansSwapped == null && goalSwapped != null) {
                        id = 1;
                        pastMoves.push([id, v, graph2.selected]);
                    }else if(ansSwapped != null && goalSwapped != null) {
                        id = 2;
                        pastMoves.push([id, v, graph1.selected]);
                    }
                    moves += 1;
                }
            }
            if (graph1.selected == null && graph2.selected == null && this.advancedMove) {
                moveGoalCheckbox.clickedOn();
                moveGoal = moveGoalCheckbox.checked;
                moveAnsCheckbox.clickedOn();
                moveAns = moveAnsCheckbox.checked;
            }
            if(menuButton.clickedOn()) {
                this.gameScreen = "menu";
            }
            if(helpButton.clickedOn()) {
                this.gameScreen = "help";
            }
            if(resetButton.clickedOn()) {
                won = false;
                graph1.perm = graph1.originalPerm.slice();
                graph2.perm = graph2.originalPerm.slice();
                moves = 0;
                pastMoves = [];
                currentMove = 0;
                this.gameScreen = "play";
                graph1.won = false;
                graph2.won = false;
            }
            if(undoButton.clickedOn()) {
                if (currentMove < pastMoves.length) {
                    let pos = pastMoves.length - 1 - currentMove;
                    let id = pastMoves[pos][0];
                    if (id === 0) {
                        arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                    }else if (id === 1) {
                        arraySwap(graph2.perm, pastMoves[pos][1], pastMoves[pos][2]);
                    }else if (id === 2) {
                        arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                        arraySwap(graph2.perm, pastMoves[pos][1], pastMoves[pos][2]);
                    }
                    moves -= 1;
                    currentMove += 1;
                    if(won) {
                        graph1.won = false;
                        graph2.won = false;
                        won = false;
                    }
                }
            }
            if (redoButton.clickedOn()) {
                if (currentMove > 0) {
                    let pos = pastMoves.length - currentMove;
                    let id = pastMoves[pos][0];
                    if (id === 0) {
                        arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                    }else if (id === 1) {
                        arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                    }else if (id === 2) {
                        arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                        arraySwap(graph1.perm, pastMoves[pos][1], pastMoves[pos][2]);
                    }
                    currentMove -= 1;
                    moves += 1;
                }
            }
        }else if(this.gameScreen === "menu") {
            menuScreen.mouseReleased();
        }else if(this.gameScreen === "help") {
            helpScreen.mouseReleased();
        }else if(this.gameScreen === "win") {
            winScreen.mouseReleased();
        }
        if(pastMoves.length > 0 && currentMove < pastMoves.length) {
            undoButton.color = '#3c3c';
        }else{
            undoButton.color = '#c33c';
        }
        if (currentMove === 0) {
            redoButton.color = '#c33c';
        }else {
            redoButton.color = '#3c3c';
        }

        graph1.selected = null;
        graph2.selected = null;
        isIso = graph1.isoTo(graph2);
        movesLabel.text = 'MOVES   ' + moves;



        if (isIso && this.gameScreen === "play") {
            if (!this.winScreenClosed) {
                this.gameScreen = "win";
            }
            won = true;
            graph1.won = true;
            graph2.won = true;
        }
    };

};

