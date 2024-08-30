document.addEventListener("DOMContentLoaded", load);
let timeInterval= null;
async function load() {
  let renderPromises = [
    partialRender("navbar.html", ".head"),
    partialRender("doc.html","#main-section"),
  ];
  await Promise.all(renderPromises);
  attachEventListeners();
}

async function attachEventListeners() {
  // Esperar a que se cargue el contenido de la sección principal
  // Agregar los manejadores de eventos
  document.querySelector(".docPage").addEventListener("click", async () => {
    await partialRender("doc.html", "#main-section");
  });
  document.querySelector(".ej1").addEventListener("click", async () => {
    await partialRender("ej1.html", "#main-section");
  });
  document.querySelector(".ej2").addEventListener("click", async () => {
    await partialRender("ej2.html", "#main-section");
    document.querySelector(".ej2Div").addEventListener("click", calcularRandom);
  });
  document.querySelector(".ej3").addEventListener("click", async () => {
    await partialRender("ej3.html", "#main-section");
    startInterval(); 
  });
  document.querySelector(".ej4").addEventListener("click", async () => {
    await partialRender("ej4.html", "#main-section");
  });
  document.querySelector(".ej5").addEventListener("click", async () => {
    await partialRender("ej5.html", "#main-section");
    document.querySelector(".characterSpace").addEventListener("mousemove",moverPersonaje);
  });
}


function startInterval() {
  // Verifica si el intervalo ya está en ejecución
  if (timeInterval) {
    console.log("Intervalo ya está en ejecución.");
    return;
  }
  // Inicia un intervalo que llama a la función reloj cada segundo
  timeInterval = setInterval(reloj, 1000);
}

function partialRender(htmlName, domContentName) {
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }
  return fetch("html/" + htmlName)
    .then(response => response.text())
    .then(data => {
      document.querySelector(domContentName).innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el contenido:', error));
}

function calcularRandom() {
  let dom = document.querySelector(".ej2Div");
  let num = Math.floor(Math.random() * 4) + 1;
  switch (num) {
    case 1:
      dom.id = "filRotar";
      break;
    case 2:
      dom.id = "filTrans";
      break;
    case 3:
      dom.id = "filScale";
      break;
    case 4:
      dom.id = "filMatrix";
      break;
  }

}

function reloj() {
  time = new Date();
  horas = time.getHours();
  minutos = time.getMinutes();
  segundos = time.getSeconds();
  if (horas >= 12) {
    porcentajeHoras = horas / 12 * 360;
  } else {
    porcentajeHoras = horas / 24 * 360;
  }

  porcentajeHoras += minutos / 60 * 30;
  porcentajeMinutos = minutos / 60 * 360;
  porcentajeSegundos = segundos / 60 * 360;
  document.getElementById("agujaHoras").style.transform = "rotate(" + porcentajeHoras + "deg)";
  document.getElementById("agujaMinutos").style.transform = "rotate(" + porcentajeMinutos + "deg)";
  document.getElementById("agujaSegundos").style.transform = "rotate(" + porcentajeSegundos + "deg)";
  document.getElementById("p-content").innerHTML = horas + ":" + minutos + ":" + segundos;
}

function moverPersonaje() {
  let personaje = document.querySelector("#personajeMover");
  personaje.style.left = `${event.clientX+20}px`;
  personaje.style.top = `${event.clientY-40}px`;
}
