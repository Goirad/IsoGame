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

    sketch.setup = function() {
        sketch.createCanvas(540, 960);
        graph1 = new Graph(sketch.width/2, 2.5*sketch.height/4, numVerts);
        graph2 = new staticGraph(graph1);
        graph2.y = sketch.height/4;
        lessButton = new Button(sketch, 'LESS', sketch.width/2 - 120, 865, 100, 40);
        sameButton = new Button(sketch, 'SAME', sketch.width/2, 865, 100, 40);
        moreButton = new Button(sketch, 'MORE', sketch.width/2 + 120, 865, 100, 40);
        menuButton = new Button(sketch, 'MENU', sketch.width/2 + 120, 815, 100, 40);
        resetButton = new Button(sketch, 'RSET', sketch.width/2 - 120, 815,100, 40);
        lvlButtons = [];
        for (let i = 0; i < 5; i++) {
            let row = [];
            for (let j = 0; j < 4; j++) {
                let n = 4 * i + j + 3;
                let b = new Button(sketch, '' + n, 50 + 32 + 35 + j * 102, 200 + i * 100, 70, 70);
                row.push(b);
            }
            lvlButtons.push(row);
        }
    };

    sketch.draw = function() {
        sketch.background(220);
        graph1.draw(sketch);
        graph2.draw(sketch);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.textSize(40);

        menuButton.draw();

        resetButton.draw();
        sketch.text(moves, sketch.width/2, 815);
        if(screen === "won") {
            sketch.rectMode(sketch.CENTER, sketch.CENTER);
            sketch.fill('#9b9e');
            sketch.stroke('#444e');
            sketch.strokeWeight(2);
            sketch.rect(sketch.width/2, 40, sketch.width - 100, 50, 10);

            sketch.stroke('#444e');
            sketch.fill('#444e');
            sketch.text('Good Job!', sketch.width/2, 40);

            lessButton.draw();
            sameButton.draw();
            moreButton.draw();
        }else if(screen ==="play"){
            sketch.stroke('#444e');
            sketch.fill('#444e');
            sketch.text('GOAL', sketch.width/2, 45);
        }else if(screen === "menu") {
            sketch.rectMode(sketch.CENTER, sketch.CENTER);
            sketch.fill('#b99e');
            sketch.stroke('#444e');
            sketch.strokeWeight(2);
            sketch.rect(sketch.width/2, sketch.height/2, sketch.width - 100, sketch.height-100, 10);

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
            /*if(menuButton.clickedOn()) {
                screen = "menu";
            }
            if(resetButton.clickedOn()) {
                graph1.perm = graph1.originalPerm.slice();
                moves = 0;
            }*/
            let v = graph1.isVertex(sketch.mouseX, sketch.mouseY);
            if (v != null) {
                graph1.selected = v;
            }
        }/*else if(screen === "won") {
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
                numVerts += 1;
                sketch.reset();
            }
        }else if(screen === "menu") {
            for (let row of lvlButtons) {
                for (let b of row) {
                    if(b.clickedOn()) {
                        numVerts = b.text;
                        sketch.reset();
                    }
                }
            }
        }*/
    };

    sketch.reset = function() {
        screen = "play";
        graph1 = new Graph(sketch.width/2, 2.5*sketch.height/4, numVerts);
        graph2 = new staticGraph(graph1);
        graph2.y = sketch.height/4;
        moves = 0;
    };

    sketch.mouseReleased = function() {
        let v = graph1.isVertex(sketch.mouseX, sketch.mouseY);
        if (v != null && v != graph1.selected && graph1.selected != null) {
            let t = graph1.perm[v];
            graph1.perm[v] = graph1.perm[graph1.selected];
            graph1.perm[graph1.selected] = t;
            moves += 1;
        }
        graph1.selected = null;
        isIso = graph1.isoTo(graph2);
        if (isIso && screen === "play") {
            screen = "won";
            graph1.won = true;
            graph2.won = true;
        }

        if (screen === "play") {
            if(menuButton.clickedOn()) {
                screen = "menu";
            }
            if(resetButton.clickedOn()) {
                graph1.perm = graph1.originalPerm.slice();
                moves = 0;
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
        }else if(screen === "menu") {
            for (let row of lvlButtons) {
                for (let b of row) {
                    if(b.clickedOn()) {
                        numVerts = parseInt(b.text);
                        sketch.reset();
                    }
                }
            }
        }
    };
};

