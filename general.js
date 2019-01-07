if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
    afterLoaded();
}
let gamep5;

function afterLoaded() {
    gamep5 = new p5(gameSketch, 'gamep5div');
    let canvas = document.getElementById('gamep5div');
    canvas.addEventListener("touchstart",  function(event) {event.preventDefault()});
    canvas.addEventListener("touchmove",   function(event) {event.preventDefault()});
    canvas.addEventListener("touchend",    function(event) {event.preventDefault()});
    canvas.addEventListener("touchcancel", function(event) {event.preventDefault()});
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


