if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
    afterLoaded();
}
let gamep5;

function afterLoaded() {
    gamep5 = new p5(gameSketch, 'gamep5div');
    let canvas = document.getElementById('gamep5div');
    canvas.addEventListener("touchstart", function (event) {
        event.preventDefault()
    });
    canvas.addEventListener("touchmove", function (event) {
        event.preventDefault()
    });
    canvas.addEventListener("touchend", function (event) {
        event.preventDefault()
    });
    canvas.addEventListener("touchcancel", function (event) {
        event.preventDefault()
    });
    console.log("done spawning p5");

}

function arraySwap(arr, i, j) {
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}


//from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/25984542
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



let gameSketch = function (sketch) {
    sketch.setup = function () {
        this.gameState = {
            advancedMove: false,
            offsetTouch: true,
            gameScreen: "play",
            numVerts: 4,
            playWidth: 0,
            winScreenClosed: false,
        };

        let height = sketch.windowHeight;
        let width = sketch.windowWidth;
        sketch.createCanvas(width, height);
        if (width >= height * .6) {
            this.gameState.playWidth = height * 0.6;
        } else {
            this.gameState.playWidth = width;
        }

        this.playScreen = new PlayScreen(sketch);
        this.menuScreen = new MenuScreen(sketch);
        this.helpScreen = new HelpScreen(sketch);
        this.winScreen = new WinScreen(sketch);


        sketch.textFont('Courier New');
        sketch.noLoop();


    };

    sketch.draw = function () {
        sketch.playScreen.draw(); //background so always draw

        if (sketch.gameState.gameScreen === "help") {
            sketch.helpScreen.draw();
        } else if (sketch.gameState.gameScreen === "menu") {
            sketch.menuScreen.draw();
        } else if (sketch.gameState.gameScreen === "win") {
            sketch.winScreen.draw();
        }
    };


    sketch.mousePressed = function () {
        sketch.loop();
        if (this.gameState.gameScreen === "play") {
            this.playScreen.mousePressed();
        }
    };



    sketch.mouseReleased = function () {
        if (this.gameState.gameScreen === "play") {
            this.playScreen.mouseReleased();
        } else if (this.gameState.gameScreen === "menu") {
            this.menuScreen.mouseReleased();
        } else if (this.gameState.gameScreen === "help") {
            this.helpScreen.mouseReleased();
        } else if (this.gameState.gameScreen === "win") {
            this.winScreen.mouseReleased();
        }

        sketch.noLoop();
    };
};