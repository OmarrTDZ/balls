window.onload = main;

const NUM = 5;
const COLORS = ['green', 'yellow', 'blue', 'purple', 'orange', 'cyan', 'red', 'pink', 'brown', 'black'];

function main() {
    createBalls();
    generatePlay();
}

function clickAndPlay(ball) {
    let granBola = document.getElementById("granBola");
    // Comparar la clase de la bola clickeada con la clase de granBola
    if (ball.classList.contains(granBola.classList.item(0))) {
        alert("¡Has encontrado la bola correcta!");
        ball.classList.classList.remove(granBola.classList.item(0))
    }
}

function createBalls() {
    const box = document.getElementById('box');

    for (let i = 0; i < COLORS.length; i++) {
        for (let j = 0; j < NUM; j++) {
            let ball = document.createElement('div');
            ball.classList.add('ball');
            ball.classList.add(COLORS[i]);
            box.appendChild(ball);
            ball.onclick = function () {
                clickAndPlay(ball);
            };
        }
    }
}

function generateIndicator() {
    const granBola = document.getElementById('granBola');
    // Seleccionar una clase aleatoria
    const bolaRandom = Math.floor(Math.random() * COLORS.length);
    granBola.classList.remove(granBola.classList.item(0));
    granBola.classList.add(COLORS[bolaRandom]);
}

function generatePlay() {
    const granBola = document.getElementById('granBola');
    setInterval(generateIndicator, 1500);

    const ballSize = document.getElementsByClassName('ball')[0].offsetWidth;
    const border = parseInt(getComputedStyle(box).borderWidth.slice(0, -2)) * 2;

    const maxWidth = box.offsetWidth - ballSize - border;
    const maxHeight = box.offsetHeight - ballSize - border;

    const balls = document.getElementsByClassName('ball');

    for (let ball of balls) {
        let x = Math.random() * (maxWidth - ballSize);
        let y = Math.random() * (maxHeight - ballSize);

        let xSpeed = Math.random() * (5 - 1) + 1;
        let ySpeed = Math.random() * (5 - 1) + 1;

        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;

        function moveBall() {
            if (x <= 0 || x >= maxWidth) xSpeed = -xSpeed;
            if (y <= 0 || y >= maxHeight) ySpeed = -ySpeed;

            x += xSpeed;
            y += ySpeed;

            ball.style.left = `${x}px`;
            ball.style.top = `${y}px`;
        }

        setInterval(moveBall, 20);
    }
}
