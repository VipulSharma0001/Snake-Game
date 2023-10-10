// Constants
let food = new Audio('music/food.mp3');
let gameover = new Audio('music/gameover.mp3');
let move = new Audio('music/move.mp3');
let music = new Audio('music/music.mp3');
let lastPrintTime = 0;
let speed = .3;
let score = 0;
let snakearr = [
    { x: 10, y: 15 }
];
let foods = { x: 13, y: 6 };
let inputdir = { x: 0, y: 0 }; // Define inputdir

// Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPrintTime)/1000 < speed) {
        return
    }
    lastPrintTime=ctime;
    gameEngine();
    // music.play();
}

function iscollide(sarr) {
    for(let i =1 ; i<snakearr.length;i++){
        if(snakearr[i].x==snakearr[0].x&&snakearr[i].y==snakearr[0].y){
            return true;
        }
    }
        if(snakearr[0].x>=18||snakearr[0].x<=0||snakearr[0].y>=18||snakearr[0].y<=0){
            return true;
        }
}

function gameEngine() {
    //update snake array and food
    if (iscollide(snakearr)) {
        move.pause();
        gameover.play();
        music.pause();
        inputDir = { x: 0, y: 0 };
        alert("your game is over to play again press any key");
        snakearr = [{ x: 10, y: 15 }];
        move.play();
        music.play();
        score = 0;
    }
    //if snake eten the food then regenerate the food
    if (snakearr[0].x === foods.x && snakearr[0].y === foods.y) {
        food.play();
        let newHead = { x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y };
        snakearr.unshift(newHead);
        let a = 2;
        let b = 16;
        foods = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //move element

    for (let index = snakearr.length - 2; index >= 0; index--) {
        snakearr[index + 1] = {...snakearr[index]};
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    //display the snake and food
    // board = document.getElementById("board")
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakElement = document.createElement("div");
        snakElement.style.gridRowStart = e.y;
        snakElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakElement.classList.add("head");
        } else {
            snakElement.classList.add("snake_body")
        }
        board.appendChild(snakElement)
    });
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = foods.y;
    foodElement.style.gridColumnStart = foods.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);
}

// Game logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }; // Reset inputdir
    move.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowup");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            console.log("arrowdown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            console.log("arrowleft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            console.log("arrowright")
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
})
