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

    sketch.setup = function() {
        sketch.createCanvas(540, 960);
        graph1 = new Graph(sketch.width/2, 2.5*sketch.height/4, numVerts);
        graph2 = new staticGraph(graph1);
        graph2.y = sketch.height/4;
        lessButton = new Button(sketch, 'LESS', sketch.width/2 - 120, 820, 60, 40);
        sameButton = new Button(sketch, 'SAME', sketch.width/2, 820, 60, 40);
        moreButton = new Button(sketch, 'MORE', sketch.width/2 + 120, 820, 60, 40);

    };

    sketch.draw = function() {
        sketch.background(220);
        graph1.draw(sketch);
        graph2.draw(sketch);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.textSize(40);
        sketch.stroke('#444e');
        sketch.fill('#444e');
        sketch.text('GOAL', sketch.width/2, 45);

        sketch.text(moves, sketch.width/2, 820);
        if(screen === "win") {
            sketch.rectMode(sketch.CENTER);
            sketch.fill('#9b9e');
            sketch.stroke('#444e');
            sketch.strokeWeight(2);
            sketch.rect(sketch.width/2, sketch.height/2, sketch.width - 100, sketch.height - 100, 10);
            lessButton.draw();
            sameButton.draw();
            moreButton.draw();
        }
    };


    sketch.mousePressed = function() {
        if (screen === "play") {
            let v = graph1.isVertex(sketch.mouseX, sketch.mouseY);
            if (v != null) {
                graph1.selected = v;
            }
        }else if(screen == "win"){
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
        }
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
        if (isIso) {
            screen = "win";
        }
    };
};

