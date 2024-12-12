window.onload = iniciar;

const NUM = 3;
let COLORS = ['green', 'yellow', 'blue', 'purple', 'orange', 'cyan', 'red', 'pink', 'brown', 'black'];
const TECNOLOGIES = ["JavaScript", "Python", "Java", "C++", "Ruby", "PHP", "TypeScript", "Rust", "C#", "HTML", "CSS", "SQL", "React", "Angular", "Node.js", "Django", "Spring", "Laravel", "Flutter", "Unity", "Docker", "AWS", "Azure", "GraphQL"];

function iniciar() {
    let dni = prompt("Por favor, ingresa tu DNI español:");

    // Validar DNI español
    if (!esDniValido(dni)) {
        alert("Usted no tiene DNI, coja el avion de retorno por favor.");
        window.location.href = "https://www.sepe.es/HomeSepe/prestaciones-desempleo/prestacion-contributiva/deseo-regresar-a-mi-pais.html";
        return; 
    }

    alert("ES USTED ESPAÑOL, MERECE JUGAR AL JUEGO!");
    createBalls();
    generatePlay();
}s

// Función para validar un DNI español
function esDniValido(dni) {
    //  Qu el DNI tenga 8 números + 1 letra
    const expresion = /^[0-9]{8}[A-Z]$/;
    if (!expresion.test(dni)) {
        return false;
    }

    // Validar la letra del DNI
    const letras = "TRWAGMYFPDXBNJZSQVHLCKET".split('');
    const numero = parseInt(dni.substring(0, 8), 10);
    const letra = dni.charAt(8);

    return letra === letras[numero % 23];
}

function clickAndPlay(ball) {
  let granBola = document.getElementById("granBola");
  const clickedColor = Array.from(ball.classList).find((cls) =>
    COLORS.includes(cls)
  );

  // Si el color coincide con granBola
  if (clickedColor && granBola.classList.contains(clickedColor)) {
    // Mostrar tecnología aleatoria
    var randomTECH =
      TECNOLOGIES[Math.floor(Math.random() * TECNOLOGIES.length)];
    alert(randomTECH);

    addTechnologyToList(randomTECH);

    // coger todas las bolas
    const allBalls = document.getElementsByClassName("ball");
    //Explotar todas las sbolas
    const ballsToExplode = [];
    for (let i = 0; i < allBalls.length; i++) {
      if (allBalls[i].classList.contains(clickedColor)) {
        ballsToExplode.push(allBalls[i]);
      }
    }

    // Añadir clase para animación de explosión a todas las bolas con el mismo color
    for (let i = 0; i < ballsToExplode.length; i++) {
      ballsToExplode[i].classList.add("exploding");
    }

    // Eliminar bolas después de la animación
    for (let i = 0; i < ballsToExplode.length; i++) {
      ballsToExplode[i].addEventListener("animationend", () => {
        ballsToExplode[i].remove();

        // Eliminar el color y actualizar el array
        COLORS = COLORS.filter((color) => color !== clickedColor);
      });
    }

    // Actualizar la gran bola para que no pueda usar el color eliminado
    generateIndicator();
  }
}

function addTechnologyToList(technology) {
  const technologiesList = document.getElementById("listaTECH");

  // Crear un nuevo elemento de lista
  const li = document.createElement("li");
  li.textContent = technology;
  technologiesList.appendChild(li);
}

function createBalls() {
  const box = document.getElementById("box");

  for (let i = 0; i < COLORS.length; i++) {
    for (let j = 0; j < NUM; j++) {
      let ball = document.createElement("div");
      ball.classList.add("ball");
      ball.classList.add(COLORS[i]);
      box.appendChild(ball);
      ball.onclick = function () {
        clickAndPlay(ball);
      };
    }
  }
}

/*NO ME VA EL ALERTA DE HA SGANADO */
function updateGenerator() {
  const granBola = document.getElementById("granBola");
  if (COLORS.length === 0) {
    alert("¡Has GANADO, misión todas las bolas han sido eliminadas, viva ESPAÑA!");
    return;
  }

  const bolaRandom = Math.floor(Math.random() * COLORS.length);
  granBola.className = ""; // Eliminar todas clases
  granBola.classList.add(COLORS[bolaRandom]);
}

function generatePlay() {
  setInterval(updateGenerator, 1500);

  const ballSize = document.getElementsByClassName("ball")[0].offsetWidth;
  const box = document.getElementById("box");
  const border = parseInt(getComputedStyle(box).borderWidth.slice(0, -2)) * 2;

  const maxWidth = box.offsetWidth - ballSize - border;
  const maxHeight = box.offsetHeight - ballSize - border;

  const balls = document.getElementsByClassName("ball");

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
/**MAYORÍA DE CODIGO LEIDO Y COMPRENDIDO DE https://developer.mozilla.org */
