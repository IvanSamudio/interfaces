document.addEventListener("DOMContentLoaded", load );
let ancho;
var FPS = 60;
var intervalo;
var gameLoop;
var posicion;
let vida;
var bolas = new Array();
let contador = 0;
var pers = {
  posicion: personaje.offsetHeight,
  altura: 0,
  vy:0,
  gravedad:-1,
  salto:22,
  saltando:false,
  agachado: false
};
var nivel = {
  puntos:0,
  muerto:false,
  velocidad:4,
  aumento:300,
  vidaActual: 100
}

var obstaculo = {
  x:0,
  y:100,
  colision:false
}

var bonus = {
  x:-101,
  y:0,
  colision:false,
  activado:false,
  probabilidad:0
}

function iniciarJuego() {
  gameLoop = setInterval(function() {
    principal();
  },1000/FPS);
  animateprogress("#barraVida",100);
  setTimeout("document.querySelector('.tutorial').style.visibility='hidden'",5000);
}

function load() {
  personaje = document.querySelector("#personaje");
  posicion = personaje.getBoundingClientRect();
  ancho = document.querySelector("#fondo").offsetWidth;
  obstaculo.x = ancho;
  bonus.x = ancho;
  iniciarJuego();
}

function resetearObstaculo() {
  obstaculo.x=ancho;
  obstaculo.y=100;
  obstaculo.colision = false;
}

function resetearBonus() {
  bonus.x=ancho;
  bonus.y=100;
  bonus.colision = false;
  bonus.activado= false;
}

function resetearNivel() {
  nivel.puntos=0;
  nivel.muerto=false;
  nivel.velocidad = 4;
  nivel.vidaActual=100;
}


function crearDiv(nombreClase) {
    let nuevoDiv = document.createElement("div");
    nuevoDiv.classList.add(nombreClase);
    document.querySelector("#fondo").appendChild(nuevoDiv);
}

function logicaObstaculo() {
  bolas[contador] = obstaculo;
  if (bolas[contador].x  < -100) {
    resetearObstaculo();
    bolas[contador].y = probabilidadBonus(80,180);
    bolas[contador].x += probabilidadBonus(200,ancho/2);
    bonus.probabilidad = probabilidadBonus(1,6);
    document.querySelector(".bola").style.bottom = bolas[contador].y + "px";
  }else {
    bolas[contador].x -= nivel.velocidad;
    document.querySelector(".bola").style.left = bolas[contador].x + "px";
  }
}

function logicaBonus() {
  if (bonus.x < -100) {
    resetearBonus();
  }else if ( bonus.probabilidad >= 5 && bonus.activado == false){
    crearDiv("bonus");
    bonus.x += probabilidadBonus(200,ancho);
    bonus.y = probabilidadBonus(100,150);
    bonus.activado = true;
    document.querySelector(".bonus").style.bottom = bonus.y + "px";
  }else if (bonus.activado) {
    bonus.x -= nivel.velocidad;
    document.querySelector(".bonus").style.left = bonus.x + "px";
  }
}


function probabilidadBonus(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function saltar() {
  pers.saltando = true;
}
function agracharse() {
  pers.agachado = true;
}

function gravedad() {
    pers.altura += pers.vy;
    if(pers.altura <= 0){
        pers.altura = 0;
        pers.vy = 0;
    }
}

function estaChocando(objeto) {
  return (!(objeto.y > pers.altura + pers.posicion) && !(objeto.y + 20 < pers.altura) && (objeto.x >= posicion.x ) && (objeto.x <= 50) && objeto.colision == false)
}

function colision() {
  if (bolas!= "") {
    if (estaChocando(bolas[contador]))  {
      bolas[contador].colision = true;
      nivel.muerto = true;
      if (nivel.vidaActual  > 0) {
        nivel.vidaActual -= 25;
        animateprogress("#barraVida",nivel.vidaActual);
        if (nivel.vidaActual == 0) {
          clearInterval(gameLoop);
          actualizarValores("paused","block");
          document.querySelector(".puntosTotales").innerHTML= "Score = " + nivel.puntos;
        }
      }
    }else if (estaChocando(bonus)) {
      if (nivel.vidaActual < 100) {
        nivel.vidaActual += 25;
        animateprogress("#barraVida",nivel.vidaActual);
      }
      bonus.colision = true;
    }else{
      nivel.puntos++;
      if (nivel.puntos >= nivel.aumento) {
        nivel.aumento = nivel.aumento + nivel.aumento;
        nivel.velocidad++;
      }
      document.querySelector(".puntos").innerHTML= "Score = " + nivel.puntos;
    }
  }
}


function actualizarValores(propiedad,propiedadDiv) {
  document.querySelector("#gameOver").style.display = propiedadDiv;
  document.getElementById("sierra").style.animationPlayState = propiedad;
  document.getElementById("nubes").style.animationPlayState = propiedad;
  document.getElementById("nieveCayendo").style.animationPlayState = propiedad;
  document.getElementById("nieve").style.animationPlayState = propiedad;
  document.getElementById("personaje").style.animationPlayState = propiedad;
}


function comprobar() {
  if(!pers.altura == 0){
      pers.vy += pers.gravedad;
  }
  if(pers.saltando && pers.altura == 0){
      pers.vy = pers.salto;
      pers.saltando = false;
  }
}

document.addEventListener('keydown' , function(evento){
    if (nivel.vidaActual > 0) {
      if(evento.keyCode == 32){
        saltar();
      }
    }else {
      if(evento.keyCode == 32){
        reiniciarJuego();
      }
    }

});


function redibujar(){
    if (nivel.muerto == true) {
      personaje.classList.remove("corriendo");
      personaje.classList.remove("saltando");
      personaje.classList.add("muerte");
      animacionMuerte();
    }else{
      if(pers.vy > 0){
        personaje.classList.remove("corriendo");
        personaje.classList.remove("cayendo");
        personaje.classList.add("saltando");
      }
      else if(pers.vy < 0){
        personaje.classList.remove("saltando");
        personaje.classList.add("cayendo");
      }
      else if(!personaje.classList.contains("corriendo") && pers.altura == 0){
        if (personaje.classList.contains("muerte")) {
          personaje.classList.remove("muerte");
        }
        personaje.classList.remove("cayendo");
        personaje.classList.add("corriendo");
      }
    }

}

function animacionMuerte() {
  setTimeout(function(){ nivel.muerto = false;}, 0900);
}

function reiniciarJuego() {
  actualizarValores("initial","none");
  resetearObstaculo();
  resetearNivel();
  resetearBonus();
  iniciarJuego();
}


function principal() {
  comprobar();
  gravedad();
  crearDiv("bola");
  logicaObstaculo();
  logicaBonus();
  colision();
  redibujar();
  personaje.style.bottom = pers.altura + "px";

}




function animateprogress (id, val){

    var getRequestAnimationFrame = function () {  /* <------- Declaro getRequestAnimationFrame intentando obtener la máxima compatibilidad con todos los navegadores */
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function ( callback ){
            window.setTimeout(enroute, 1 / 60 * 1000);
        };

    };

    var fpAnimationFrame = getRequestAnimationFrame();   /* <--- Declaro una instancia de getRequestAnimationFrame para llamar a la función animación */
    var i = 0;
    var animacion = function () {

    if (i<=val)
        {
            document.querySelector(id).setAttribute("value",i);      /* <----  Incremento el valor de la barra de progreso */
            document.querySelector(id+"+ span").innerHTML = i+"%";     /* <---- Incremento el porcentaje y lo muestro en la etiqueta span */
            i++;
            fpAnimationFrame(animacion);          /* <------------------ Mientras que el contador no llega al porcentaje fijado la función vuelve a llamarse con fpAnimationFrame     */
        }

    }

        fpAnimationFrame(animacion);   /*  <---- Llamo la función animación por primera vez usando fpAnimationFrame para que se ejecute a 60fps  */

}
