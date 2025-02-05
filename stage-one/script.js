let numSquares = 6;
let colors = [];
let pickedColor;
let squares = [];
let score = 0;
let round = 1;
let maxRounds = 10;

const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const easyBtn = document.querySelector(".easyBtn");
const hardBtn = document.querySelector(".hardBtn");
const container = document.getElementById("container");
const colorBox = document.getElementById("color-box");
const colorName = document.getElementById("color-name"); // This is still needed for the "Guess the Color" text
const scoreDisplay = document.getElementById("score");
const roundDisplay = document.getElementById("round");

function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {  // This function was missing!
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function pickColor() {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}


function reset() {
    numSquares = hardBtn.classList.contains("selected") ? 6 : 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorBox.style.backgroundColor = pickedColor;
    colorName.textContent = "Guess the Color"; // Keep this line to set the default text
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    container.innerHTML = "";
    squares = [];

    for (let i = 0; i < numSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.backgroundColor = colors[i];
        container.appendChild(square);
        squares.push(square);

        square.addEventListener("click", function() {
            const clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "🎯 Great job!";
                score++;
                scoreDisplay.textContent = `Score: ${score}`;

                if (round < maxRounds) {
                    round++;
                    roundDisplay.textContent = `Round: ${round}/${maxRounds}`;
                    reset(); // New round
                } else {
                    messageDisplay.textContent = "Game Over!";
                    resetButton.textContent = "Play Again?";
                    resetButton.removeEventListener("click", reset);
                    resetButton.addEventListener("click", function() {
                        score = 0;
                        round = 1;
                        scoreDisplay.textContent = `Score: ${score}`;
                        roundDisplay.textContent = `Round: ${round}/${maxRounds}`;
                        resetButton.textContent = "New Colors";
                        resetButton.removeEventListener("click", arguments.callee);
                        resetButton.addEventListener("click", reset);
                        reset();
                    });
                }
            } else {
                messageDisplay.textContent = "❌ Oops! That's incorrect. Try again!";
            }
        });
    }
}


resetButton.addEventListener("click", reset);
easyBtn.addEventListener("click", () => {
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    reset();
});

hardBtn.addEventListener("click", () => {
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    reset();
});

reset(); // Initial setup