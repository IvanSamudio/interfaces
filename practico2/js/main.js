document.addEventListener("DOMContentLoaded", load );
var contador = 0;
var contPol = 0;
var prim = 0;
let cir = [];
let pol = [];
var moviendo = false;
let canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');
function load() {
  document.querySelector(".unir").style.display = "none";
  document.querySelector(".limpiar").style.display = "none";
  fetch("html/navbar.html").then(
      function(response){
        response.text().then(
      function(texto){
        document.querySelector(".head").innerHTML = texto;
      }
    );
      }
    );
  canvas.addEventListener("click", ej1);
}

function ej1() {
  if (!moviendo) {
    var x = event.layerX;
    var y = event.layerY;
    var cor = "X coords: " + x + ", Y coords: " + y;
    console.log(cor);
    ej2(x,y);
  }else {
      moviendo = false;
  }
}

function ej2(x,y) {
  document.querySelector(".limpiar").style.display = "block";
  document.querySelector(".limpiar").addEventListener("click", limpiarCanvas);
  cir[contador] = new circulo(x,y,'rgb(255,0,0)' ,10);
  contador++;
  ctx.fillStyle = cir[contador-1].getColor();
  ctx.beginPath();
  ctx.arc(cir[contador-1].getPosX(), cir[contador-1].getPosY(), cir[contador-1].getRadius() ,0, Math.PI *2);
  ctx.fill();
  ctx.closePath();
  if (contador>1) {
    if (contador>=3) {
      document.querySelector(".unir").style.display = "block";
      document.querySelector(".unir").addEventListener("click", ej4);
    }
    ej3();
    }
}

function ej3() {
  ctx.strokeStyle = 'rgb(255, 255, 0)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cir[contador-2].getPosX(), cir[contador-2].getPosY());
  ctx.lineTo(cir[contador-1].getPosX(), cir[contador-1].getPosY());
  ctx.stroke();
}



function ej4() {
  ctx.beginPath();
  ctx.moveTo(cir[contador-1].getPosX(), cir[contador-1].getPosY());
  ctx.lineTo(cir[0].getPosX(), cir[0].getPosY());
  ctx.stroke();
  ej5();
}

function ej5() {
  var sumaX = 0;
  var sumaY = 0;
  for (var i = 0; i < contador; i++) {
    sumaX = sumaX + cir[i].getPosX();
    sumaY = sumaY + cir[i].getPosY();
  }
  pol[contPol] = new poligono(sumaX/contador,sumaY/contador,'rgb(255, 255, 0)' , 'rgb(0, 255,0)');
  dibujarCentro(contPol);
  cir = [];
  contPol++;
  contador = 0;
  document.querySelector(".unir").style.display = "none";
}


function dibujarPoligono() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (cir != []) {
        for (var i = 0; i < cir.length; i++) {
          redibujarPuntos(cir[i].posX,cir[i].posY,cir[i].radio,cir[i].color);
          if(i+1<cir.length){
            redibujarLineas(cir[i].posX,cir[i].posY,cir[i+1].posX,cir[i+1].posY,'rgb(255, 255, 0)');
          }
        }
      }
      for (var i = 0; i <pol.length; i++) {
        for (var j = 0; j < pol[i].cirArr.length; j++) {
          let cirl = pol[i].cirArr[j];
          redibujarPuntos(cirl.posX,cirl.posY,cirl.radio,cirl.color);
          if(j+1<pol[i].cirArr.length){
            redibujarLineas(cirl.posX,cirl.posY,pol[i].cirArr[j+1].posX,pol[i].cirArr[j+1].posY,pol[i].lineaColor);
          }else {
            redibujarLineas(pol[i].cirArr[0].posX,pol[i].cirArr[0].posY,cirl.posX,cirl.posY,pol[i].lineaColor);
          }
        }
        dibujarCentro(i);
        }
      }

function redibujarPuntos(x,y,radio,color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radio ,0, Math.PI *2);
  ctx.fill();
  ctx.closePath();
}

function redibujarLineas(x,y,dX,dY,color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(dX,dY);
  ctx.stroke();
}

function dibujarCentro(indice) {
  ctx.fillStyle = pol[indice].color;
  ctx.beginPath();
  ctx.arc(pol[indice].cenX,pol[indice].cenY, pol[indice].radio ,0, Math.PI *2);
  ctx.fill();
  ctx.closePath();
}

function limpiarCanvas() {
  centroActual = null;
  circuloActual = null;
  moviendo = false;
  objetoActual = [];
  indicePol = 0;
  indiceCirculo = 0;
  inicioCenX = 0;
  inicioCenY = 0;
  inicioX = [];
  inicioY = [];
  cir = [];
  pol = [];
  contPol=0;
  contador=0;
  document.querySelector(".unir").style.display = "none";
  document.querySelector(".limpiar").style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

class figura {
  constructor(x,y,clr) {
    this.posX = x;
    this.posY= y;
    this.color = clr;
  }
}

class circulo extends figura {
  constructor(x,y,clr,rad) {
    super(x,y,clr);
    this.radio = rad;
  }

   getPosX() {
    return this.posX;
  }

  getPosY() {
    return this.posY;
  }

  getColor() {
   return this.color;
 }

 getRadius() {
  return this.radio;
}
}

class poligono{
  constructor(centroX,centroY,clrLin,clr) {
    this.radio = 7;
    this.color = clr;
    this.lineaColor = clrLin;
    this.cenY= centroY;
    this.cenX= centroX;
    this.cirArr = cir;
  }

}
