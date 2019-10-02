document.addEventListener("DOMContentLoaded", load );

function load() {
  fetch("html/navbar.html").then(
      function(response){
        response.text().then(
      function(texto){
        document.querySelector(".head").innerHTML = texto;
        document.querySelector(".ej1").addEventListener("click", mostrarEj1);
        document.querySelector(".ej2").addEventListener("click", mostrarEj2);
        document.querySelector(".ej3").addEventListener("click", mostrarEj3);
        document.querySelector(".ej4").addEventListener("click", mostrarEj4);
        document.querySelector(".ej5").addEventListener("click", mostrarEj5);
        // document.querySelector(".ej6").addEventListener("click", mostrarEj6);

      }
    );
      }
    );

    function mostrarEj1() {
      fetch("html/ej1.html").then(
          function(response){
            response.text().then(
          function(texto){
            document.querySelector("#cajas").innerHTML = texto;

          }
        );
          }
        );
    }

    function mostrarEj2() {
      fetch("html/ej2.html").then(
          function(response){
            response.text().then(
          function(texto){
            document.querySelector("#cajas").innerHTML = texto;
            document.querySelector(".ej2Div").addEventListener("click", calcularRandom);
          }
        );
          }
        );
    }

    function mostrarEj3() {
      fetch("html/ej3.html").then(
          function(response){
            response.text().then(
          function(texto){
            document.querySelector("#cajas").innerHTML = texto;
            setInterval(reloj, 1000);
          }
        );
          }
        );
    }

    function mostrarEj4() {
      fetch("html/ej4.html").then(
          function(response){
            response.text().then(
          function(texto){
            document.querySelector("#cajas").innerHTML = texto;
          }
        );
          }
        );
    }

    function mostrarEj5() {
      fetch("html/ej5.html").then(
          function(response){
            response.text().then(
          function(texto){
            document.querySelector("#cajas").innerHTML = texto;
            document.querySelector("#cajas").addEventListener("mousemove", moverPersonaje);
          }
        );
          }
        );
    }
}

function calcularRandom() {
  let dom = document.querySelector(".ej2Div");
  let num = Math.floor(Math.random() * 4)+1;
  console.log(num);
  switch(num) {
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
    }  else {
    	porcentajeHoras = horas / 24 * 360;
    }

    porcentajeHoras += minutos / 60 * 30;
    porcentajeMinutos = minutos / 60 * 360;
    porcentajeSegundos = segundos / 60 * 360;
    document.getElementById("agujaHoras").style.transform = "rotate("+ porcentajeHoras +"deg)";
    document.getElementById("agujaMinutos").style.transform = "rotate("+ porcentajeMinutos +"deg)";
    document.getElementById("agujaSegundos").style.transform = "rotate("+ porcentajeSegundos +"deg)";
    document.getElementById("p-content").innerHTML = horas + ":" + minutos + ":" + segundos;
}

function moverPersonaje() {
  let personaje = document.querySelector("#personajeMover");
  personaje.style.left = event.clientX + "px";
  personaje.style.top = event.clientY + "px";
}
