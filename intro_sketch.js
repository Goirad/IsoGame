let gameSketch = function(sketch) {
    let numVerts = 4;
    let graph1;
    let graph2;
    let isIso = false;
    let moves = 0;

    let screen = "play";
    let sameButton;
    let lessButton;
    let moreButton;
    let menuButton;
    let resetButton;
    let lvlButtons;
    let menuCloseButton;
    let undoButton, redoButton;
    let pastMoves = [];
    let currentMove = 0;
    let playWidth;

    sketch.setup = function() {
        //let height = Math.min(sketch.windowHeight, 960);
        //let width = Math.min(sketch.windowWidth, 540);
        let height  = sketch.windowHeight;
        //let width = height * .5625;
        let width = sketch.windowWidth;
        sketch.createCanvas(width, height);
        playWidth = width*0.8;
        if (width >= height) {
            playWidth = height * 0.5;
        }
        graph1 = new Graph(numVerts, sketch.width/2, 2.9*sketch.height/4, playWidth*0.8);
        graph2 = new staticGraph(graph1);
        //graph2.y = sketch.height/4;
        let buttWidth = playWidth/5;
        lessButton      = new Button(sketch, 'LESS', buttWidth/3, sketch.width/2 - buttWidth*1.2    , height*0.25, buttWidth, buttWidth*.4);
        sameButton      = new Button(sketch, 'SAME', buttWidth/3, sketch.width/2                    , height*0.25, buttWidth, buttWidth*.4);
        moreButton      = new Button(sketch, 'MORE', buttWidth/3, sketch.width/2 + buttWidth*1.2    , height*0.25, buttWidth, buttWidth*.4);
        menuButton      = new Button(sketch, 'MENU', buttWidth/3, sketch.width/2 + buttWidth*1.2    , height*0.20, buttWidth, buttWidth*.4);
        resetButton     = new Button(sketch, 'RSET', buttWidth/3, sketch.width/2 - buttWidth*1.2    , height*0.20, buttWidth,buttWidth*.4);
        menuCloseButton = new Button(sketch, 'X'   ,          40, sketch.width/2 + playWidth*0.75/2  ,          70,  50, 50);
        undoButton      = new Button(sketch, 'UNDO', buttWidth/3, sketch.width/2 - buttWidth*1.2    , height*0.3, buttWidth, buttWidth*.4);
        undoButton.color = '#c33c';
        redoButton      = new Button(sketch, 'REDO', buttWidth/3, sketch.width/2 + buttWidth*1.2   , height*0.3, buttWidth, buttWidth*.4);
        redoButton.color = '#c33c';

        lvlButtons = [];
        buttWidth = (playWidth*0.8)/(4.5);
        let xSpace = buttWidth*0.1;

        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 4; j++) {
                let n = 4 * i + j + 3;
                let b = new Button(sketch,
                    '' + n, buttWidth/2,
                    sketch.width/2 - playWidth/2 + 0.1*playWidth + xSpace + buttWidth/2 + j * (xSpace + buttWidth),
                    sketch.height/5 + i * (xSpace + buttWidth),
                    buttWidth,
                    buttWidth);
                row.push(b);
            }
            lvlButtons.push(row);
        }
        sketch.textFont('Courier New')
    };

    sketch.draw = function() {
        sketch.background(220);
        graph2.draw(sketch);
        graph1.draw(sketch);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.textSize(40);

        menuButton.draw();

        resetButton.draw();
        sketch.stroke('#444e');
        sketch.fill('#444e');
        sketch.text(moves, sketch.width/2, sketch.height*0.2);

        undoButton.draw();
        redoButton.draw();
        if(screen === "won") {
            sketch.rectMode(sketch.CENTER, sketch.CENTER);
            sketch.fill('#9b9e');
            sketch.stroke('#444e');
            sketch.strokeWeight(2);
            sketch.rect(sketch.width/2, 40, playWidth*0.8, 50, 10);

            sketch.stroke('#444e');
            sketch.fill('#444e');
            sketch.text('Good Job!', sketch.width/2, 40);

            lessButton.draw();
            sameButton.draw();
            moreButton.draw();
        }else if(screen ==="play"){

        }else if(screen === "menu") {
            sketch.rectMode(sketch.CENTER, sketch.CENTER);
            sketch.fill('#b99e');
            sketch.stroke('#444e');
            sketch.strokeWeight(2);
            sketch.rect(sketch.width/2, sketch.height/2, playWidth*0.8, sketch.height-100, 10);
            menuCloseButton.draw();
            sketch.stroke('#444e');
            sketch.fill('#444e');
            sketch.text('MENU', sketch.width/2, 100);

            for (let row of lvlButtons) {
                for (let b of row) {
                    b.draw();
                }
            }
        }

    };


    sketch.mousePressed = function() {
        if (screen === "play") {
            let v = graph1.isVertex(sketch.mouseX, sketch.mouseY);
            if (v != null) {
                graph1.selected = v;
            }
        }
    };

    sketch.reset = function() {
        screen = "play";
        graph1 = new Graph(numVerts, sketch.width/2, 2.9*sketch.height/4, playWidth*0.8);
        graph2 = new staticGraph(graph1);
        //graph2.y = sketch.height/4;
        moves = 0;
        currentMove = 0;
        pastMoves = [];
    };

    sketch.mouseReleased = function() {
        let v = graph1.isVertex(sketch.mouseX, sketch.mouseY);
        if (v != null && v != graph1.selected && graph1.selected != null) {
            arraySwap(graph1.perm, v, graph1.selected);
            if (currentMove > 0) {
                let newLength = pastMoves.length - currentMove;
                //console.log("slicing at " + currentMove);
                //console.log("slicing from 0 to " + newLength);
                pastMoves = pastMoves.slice(0, pastMoves.length - currentMove);
                currentMove = 0;
            }
            pastMoves.push([v, graph1.selected]);
            console.log(pastMoves);
            moves += 1;
        }


        if (screen === "play") {
            if(menuButton.clickedOn()) {
                screen = "menu";
            }
            if(resetButton.clickedOn()) {
                graph1.perm = graph1.originalPerm.slice();
                moves = 0;
                pastMoves = [];
            }
            if(undoButton.clickedOn()) {
                if (currentMove < pastMoves.length) {
                    arraySwap(graph1.perm, pastMoves[pastMoves.length - 1 - currentMove][0], pastMoves[pastMoves.length - 1 - currentMove][1]);
                    moves -= 1;
                    currentMove += 1;
                }
            }
            if (redoButton.clickedOn()) {
                if (currentMove > 0) {
                    arraySwap(graph1.perm, pastMoves[pastMoves.length - currentMove][0], pastMoves[pastMoves.length - currentMove][1]);
                    currentMove -= 1;
                    moves += 1;
                }
            }
        }else if(screen === "won") {
            if(menuButton.clickedOn()) {
                screen = "menu";
            }
            if(resetButton.clickedOn()) {
                graph1.perm = graph1.originalPerm.slice();
                moves = 0;
                screen = "play";
                graph1.won = false;
                graph2.won = false;
            }
            if(sameButton.clickedOn()) {
                sketch.reset();
            }
            if(lessButton.clickedOn()) {
                numVerts -= 1;
                sketch.reset();
            }
            if(moreButton.clickedOn()) {
                console.log("before " + numVerts);
                numVerts += 1;
                console.log("after " + numVerts);
                sketch.reset();
            }

            if(undoButton.clickedOn()) {
                if (currentMove < pastMoves.length) {
                    arraySwap(graph1.perm, pastMoves[pastMoves.length - 1 - currentMove][0], pastMoves[pastMoves.length - 1 - currentMove][1]);
                    moves -= 1;
                    currentMove += 1;
                    graph1.won = false;
                    graph2.won = false;
                    screen = "play";
                }
            }
            if (redoButton.clickedOn()) {
                if (currentMove > 0) {
                    arraySwap(graph1.perm, pastMoves[pastMoves.length - currentMove][0], pastMoves[pastMoves.length - currentMove][1]);
                    currentMove -= 1;
                    moves += 1;
                }
            }
        }else if(screen === "menu") {
            for (let row of lvlButtons) {
                for (let b of row) {
                    if(b.clickedOn()) {
                        numVerts = parseInt(b.text);
                        sketch.reset();
                    }
                }
            }
            if (menuCloseButton.clickedOn()) {
                screen = "play";
            }
        }
        if(pastMoves.length > 0 && currentMove < pastMoves.length) {
            undoButton.color = '#3c3c';
        }else{
            undoButton.color = '#c33c';
        }        if (currentMove == 0) {
            redoButton.color = '#c33c';
        }else if (pastMoves.length > 0){
            redoButton.color = '#3c3c';
        }

        graph1.selected = null;
        isIso = graph1.isoTo(graph2);


        if (isIso && screen === "play") {
            screen = "won";
            graph1.won = true;
            graph2.won = true;
        }
    };

};

