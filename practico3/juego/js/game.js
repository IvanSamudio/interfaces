document.addEventListener("DOMContentLoaded", load);
let width, position, gameLoop, idtime;
let isPaused = false;
let FPS = 50;
let counter = 0;
const balls = [];
const character = {
  position: document.querySelector("#character").offsetHeight,
  height: 0,
  jumpYvalue: 0,
  gravity: -1,
  jumpRange: 22,
  jumping: false
};
const level = {
  points: 0,
  dead: true,
  speed: 10,
  increment: 1500,
  started: false,
  currentHealth: 0
};
const obstacle = { x: 0, y: 100, active: false, collision: false };
const bonus = { x: -101, y: 0, collision: false, active: false, probability: 0 };

//ESCUCHA CUANDO SE PRESIONA BOTON
document.addEventListener('keydown', function (e) {
  if (level.currentHealth > 0 && level.dead == false) {
    if (e.code === 'Space') {
      jump();
    }
  } else {
    if ((e.code === 'Space') && (level.started == false)) {
      document.querySelector(".main-menu").style.display = "none";
      level.started = true;
      restartGame();
    }
  }

});

document.querySelector("#screen").addEventListener('change',() =>{
  if (!isPaused) {
    clearInterval(gameLoop);
    isPaused = true;
  }else{
    gameLoop = setInterval(function() {
      mainLoop();
    },1000/FPS);
    isPaused = false;
  }
})

//FUNCION PRINCIPAL QUE INICIALIZA EL JUEGO
function load() {
  characterElement = document.querySelector("#character");
  position = characterElement.getBoundingClientRect();
  width = document.querySelector("#background-game").offsetWidth;
  obstacle.x = width;
  bonus.x = width;
  updateValues("paused", "block");
}

function updateValues(property, divProperty) {
  document.querySelector("#gameOver").style.display = divProperty;
  const elements = ["#mountain", "#clouds", "#fallingSnow", "#snow", "#character"];
  elements.forEach(id => document.querySelector(id).style.animationPlayState = property);
}

//INICIAR EL JUEGO
function restartGame() {
  updateValues("initial", "none");
  resetObstacle();
  balls[counter] = obstacle;
  resetLevel();
  resetBonus();
  runGame();
  
}

function resetLevel() {
  Object.assign(level, { points: 0, dead: false, speed: 10, currentHealth: 100, increment: 150, started: true });
}

function runGame() {
  gameLoop = setInterval(function() {
    mainLoop();
  },1000/FPS);
  animateProgress("#health-bar", 100);
  createElement("ball");
  createElement("bonus");
  setTimeout(() => document.querySelector('.tutorial').style.visibility = 'hidden', 5000);
}

function mainLoop() {
  obstacleLogic();
  bonusLogic();
  applyGravity();
  checkCharacterPosition();
  handleCollision();
  selectCharacterAnimation();
  characterElement.style.bottom = character.height + "px";
}

function createElement(name) {
  let newElement = document.createElement("div");
  newElement.classList.add(name);
  document.querySelector("#background-game").appendChild(newElement);
}

function removeElement(className) {
  const node = document.querySelector("." + className);
  node && node.remove();
}

function changeCharacterClass(add, remove) {
  remove.forEach(cls => characterElement.classList.remove(cls));
  characterElement.classList.add(add);
}

function animateProgress(id, val) {
  const getRequestAnimationFrame = () =>
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    (callback => window.setTimeout(callback, 1000 / 60));

  let i = 0;
  const animation = () => {
    if (i <= val) {
      document.querySelector(id).setAttribute("value", i);
      document.querySelector(`${id} + span`).textContent = i + "%";
      i++;
      getRequestAnimationFrame()(animation);
    }
  };
  getRequestAnimationFrame()(animation);
}

function bonusProbability(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*PERSONAJE*/
function jump() {
  character.jumping = true;
}

function applyGravity() {
  character.height += character.jumpYvalue;
  if (character.height <= 0) {
    character.height = 0;
    character.jumpYvalue = 0;
  }
}

function checkCharacterPosition() {
  
  if (character.height !== 0) {
    character.jumpYvalue += character.gravity; 
  }
  if (character.jumping && character.height === 0) {
    character.jumpYvalue = character.jumpRange;
    character.jumping = false;
  }
}

function handleCollision() {
  if (isColliding(balls[counter]) && balls[counter].active) {
      balls[counter].collision = true;
      balls[counter].active = false;
      balls[counter] = "";
      level.dead = true;
      console.log(level.currentHealth);
      if (level.currentHealth > 0) {
          level.currentHealth -= 25;
          animateProgress("#health-bar", level.currentHealth);
          if (level.currentHealth === 0) {
              cancelGame();
          }
      }
  } else if (isColliding(bonus)) {
      if (level.currentHealth < 100) {
          level.currentHealth += 25;
          animateProgress("#health-bar", level.currentHealth);
      }
      bonus.collision = true;
  } else {
      level.points++;
      if (level.points >= level.increment) {
          level.increment += level.increment;
          level.speed++;
      }
      document.querySelector(".points").textContent = "Score = " + level.points;
  }
}

function isColliding(obstac) {
  // Calcula las posiciones y dimensiones relevantes
  const characterBottom = character.height;  // Altura actual del personaje desde el suelo
  const characterTop = character.height + character.position; // La parte superior del personaje

  const obstacleBottom = obstac.y; // Posición del obstáculo desde el suelo
  const obstacleTop = obstac.y + 20; // Altura del obstáculo (asumiendo una altura de 20px)
  
  // Verifica si hay solapamiento horizontal

  const horizontalCollision = obstac.x >= 0 && obstac.x <= 50; // Ajusta el 50px al ancho del personaje
  // Verifica si hay solapamiento vertical
  const verticalCollision = characterBottom <= obstacleTop && characterTop >= obstacleBottom;

  // Retorna verdadero si ambos solapamientos ocurren
  return horizontalCollision && verticalCollision;
}


function cancelGame() {
  clearInterval(gameLoop);
  level.started = false;
  updateValues("paused", "block");
  removeElement("bonus");
  removeElement("ball");
  document.querySelector(".max-points").textContent = "Score = " + level.points;
}

function selectCharacterAnimation() {
  if (level.dead) {
    deathAnimation();
    changeCharacterClass("dead", ["running", "jumping"]);
  }else if (character.jumpYvalue > 0) {
    changeCharacterClass("jumping", ["running", "falling"]);
  } else if (character.jumpYvalue < 0) {
    changeCharacterClass("falling", ["jumping"]);
  } else if (!characterElement.classList.contains("running") && character.height === 0) {
    if (characterElement.classList.contains("dead")) {
      characterElement.classList.remove("dead");
      clearTimeout(idtime);
    }
    changeCharacterClass("running", ["falling"]);
  }
}

function deathAnimation() {
  idtime = setTimeout(() => level.dead = false, 900);
}

//LOGICA DE OBJETOS 
function obstacleLogic() {
  balls[counter] = obstacle;
  if (balls[counter].x < -100) {
    resetObstacle();
    balls[counter].y = bonusProbability(80, 180);
    balls[counter].x += bonusProbability(200, width / 2);
    bonus.probability = bonusProbability(1,6);
    balls[counter].active = true;
    document.querySelector(".ball").style.bottom = balls[counter].y + "px";
  } else {
    if(level.currentHealth > 0){
      balls[counter].x -= level.speed;
      document.querySelector(".ball").style.left = balls[counter].x + "px";
    }
  }
}

function bonusLogic() {
  if (bonus.x < -100) {
    resetBonus();
  } else if (bonus.probability >= 5 && bonus.active == false) {
    bonus.x += bonusProbability(200, width);
    bonus.y = bonusProbability(100, 150);
    bonus.active = true;
    document.querySelector(".bonus").style.bottom = bonus.y + "px";
    
  } else if (bonus.active) {
    bonus.x -= level.speed;
    document.querySelector(".bonus").style.left = bonus.x + "px";
  }
}

function resetObstacle() {
  Object.assign(obstacle, { x: width, y: 100, colision: false });
}

function resetBonus() {
  Object.assign(bonus, { x: width, y: 100, colision: false, active: false });
}

