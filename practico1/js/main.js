document.addEventListener("DOMContentLoaded", load );

function load() {
  document.getElementById('canvasTrabajo').style.display = "none";
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
        document.querySelector(".ej6").addEventListener("click", mostrarEj6);

      }
    );
      }
    );

  fetch("html/presentacion.html").then(
      function(response){
        response.text().then(
      function(texto){
        document.querySelector(".menu").innerHTML = texto;
      }
    );
      }
    );


}

function mostrarEj1() {
  fetch("html/ej1.html").then(
      function(response){
        response.text().then(
      function(texto){
        document.querySelector(".menu").innerHTML = texto;
        document.getElementById("canvasTrabajo").style.display = "none";

      }
    );
      }
    );

  let maxFil = 3;
  let maxCol = 3;
  let maxNum = 100;
  let mat = [];
  let prom = [];
  cargarMatriz(mat,maxFil,maxCol,maxNum);
  console.clear();
  console.table(mat);
  console.log("El mayor numero de la matriz es = " + buscarMayorMatriz(mat,maxFil,maxCol));
  buscarEnFila(mat,maxFil,maxCol,maxNum);
  buscarPromedio(mat,prom,maxFil,maxCol);
  console.table(prom);
}
function cargarMatriz(mat,maxFil,maxCol,maxNum){
  for (var i = 0; i < maxFil; i++) {
    mat[i] = [] ;
    for (var j = 0; j < maxCol; j++) {
      mat[i][j]= Math.floor(Math.random()*maxNum);
    }
  }
}
function buscarMayorMatriz(mat,maxFil,maxCol) {

  let may = mat[0][0];
  for (var i = 0; i < maxFil; i++) {
    for (var j = 0; j < maxCol; j++) {
      if(mat[i][j]>may){
        may = mat[i][j];
      }
    }
  }
  return may;
}

function buscarEnFila(mat,maxFil,maxCol,maxNum) {
  for (var i = 0; i < maxFil; i++) {
    if(i%2==0){
        console.log("maximo de " + i + " es = " + buscarMayorFila(mat,i,maxCol));
    }else {
      console.log("minimo de " + i + " es = " + buscarMenorFila(mat,i,maxCol,maxNum));
    }
  }
}

function buscarMenorFila(mat,i,maxCol,maxNum){
let men = maxNum;
  for (var j = 0; j < maxCol; j++) {
    if((mat[i][j]<men)&&(i%2!=0)){
      men = mat[i][j];
    }
  }
  return men;
}


function buscarMayorFila(mat,i,maxCol){
  let may = 0;
  for (var j = 0; j < maxCol; j++) {
    if((mat[i][j]>may)&&(i%2==0)){
      may = mat[i][j];
    }
  }
  return may;
}

function buscarPromedio(mat,prom,maxFil,maxCol) {
  let suma;
  for (var i = 0; i < maxFil; i++) {
    suma = 0;
    for (var j = 0; j < maxCol; j++) {
      suma= suma + mat[i][j];
    }
  prom[i] = suma/maxFil;
  }
}

// EJERCICIO 2

function mostrarEj2() {
  fetch("html/formColores.html").then(
      function(response){
        response.text().then(
      function(texto){
        document.querySelector(".menu").innerHTML = texto;
        document.getElementById("canvasTrabajo").style.display = "block";
        document.querySelector(".enviar").addEventListener("click", crearEj2);
      }
    );
      }
    );
}

function crearEj2() {
  var ctx = document.getElementById("canvas").getContext("2d");
  var color = document.querySelector(".color").value;
  var height = document.querySelector(".alto").value;
  var width = document.querySelector(".largo").value;
  ctx.fillStyle = color;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, width, height);
  ctx.beginPath();
  ctx.stroke();
}

// EJERCICIO 3

function mostrarEj3() {
  fetch("html/formColores.html").then(
      function(response){
        response.text().then(
      function(texto){
        document.querySelector(".menu").innerHTML = texto;
        document.getElementById("canvasTrabajo").style.display = "block";
        document.querySelector(".enviar").addEventListener("click", crearEj3);
      }
    );
      }
    );
}

function crearEj3() {
  var color = document.querySelector(".color").value;
  var ctx = document.getElementById("canvas").getContext("2d");
  var width=document.querySelector(".largo").value;
  var height=document.querySelector(".alto").value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var imageData= ctx.createImageData(width,height);
  for (var x = 0; x < width; x++){
    for (var y = 0; y < height; y++) {
      setPixel(imageData, x, y,hexToRgb(color), 255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, color, a){
  index=(x+y *imageData.width)*4;
  imageData.data[index+0]= color.r;
  imageData.data[index+1]= color.g;
  imageData.data[index+2]= color.b;
  imageData.data[index+3]= a;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

//EJERCICIO 4

function mostrarEj4() {
    document.querySelector(".menu").innerHTML= " ";
    document.getElementById("canvasTrabajo").style.display = "block";
    var r = 0;
    var g = 0;
    var b = 0;
    var a = 255;
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var imageData = ctx.createImageData(canvas.width,canvas.height);
      for(x=0; x<canvas.height; x++){
        for(y=0; y<canvas.width; y++){
          setPixelRGB(imageData, y, x, r, g, b, a);
        }
        if (x%2==0) {
          r++;
          g++;
          b++;
        }

      }

    ctx.putImageData(imageData, 0, 0);
}
function setPixelRGB(imageData, x, y,r,g,b, a){
  index=(x+y *imageData.width)*4;
  imageData.data[index+0]= r;
  imageData.data[index+1]= g;
  imageData.data[index+2]= b;
  imageData.data[index+3]= a;
}

//EJERCICIO 5

function mostrarEj5() {
    document.querySelector(".menu").innerHTML= " ";
    document.getElementById("canvasTrabajo").style.display = "block";
    var r = 0;
    var g = 0;
    var b = 0;
    var a = 255;
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var imageData = ctx.createImageData(canvas.width,canvas.height);
      for(x=0; x<canvas.width; x++){
        for(y=0; y<canvas.height; y++){
          setPixelRGB(imageData,x,y, r, g, b, a);
        }
        if (x<= canvas.width/2) {
          r++;
          g++;
          b--;
        }else{
          g--;
        }

      }
    ctx.putImageData(imageData, 0, 0);
}


// EJERCICIO 6

function mostrarEj6() {
  fetch("html/ej6.html").then(
      function(response){
        response.text().then(
      function(texto){
        document.querySelector(".menu").innerHTML = texto;
        document.getElementById("canvasTrabajo").style.display = "block";
        document.querySelector(".filtro").addEventListener('click', aplicarFiltro);
        prepararImg();

      }
    );
      }
    );

}

function prepararImg() {
  var archivo = document.querySelector(".datos");
  archivo.addEventListener('change', handleFileSelect, false);
  function handleFileSelect(event){
  var files = event.target.files;
  if(files.length === 0){
    return;
  }
  var file = files[0];
  if(file.type !== '' && !file.type.match('image.*')){
    return;
  }
   window.URL = window.URL || window.webkitURL;
   var imgURL = window.URL.createObjectURL(file);
   cargarImagen(imgURL);
   }
}

function cargarImagen(url) {
  var ctx = document.getElementById("canvas").getContext("2d");
  var msj = document.querySelector(".mensaje");
  var imageData;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var imagen1 = new Image();
  imagen1.src = url;
  imagen1.onload = function() {
    if (imagen1.width < canvas.width) {
        msj.innerHTML = "Error, Imagen muy pequeña";
      }else {
        if(imagen1.width > imagen1.height){
          myDrawImageMethod(this, ctx, imagen1);
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          ctx.putImageData(imageData, 0, 0);
        }else{
          let aux = canvas.width;
          canvas.width = canvas.height;
          canvas.height = aux;
          myDrawImageMethod(this, ctx, imagen1);
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          ctx.putImageData(imageData, 0, 0);
        }
        msj.innerHTML = "Exito al subir imagen";
      }
    }
}


function myDrawImageMethod(image,ctx,imagen1){
  ctx.drawImage(imagen1, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
}

function aplicarFiltro() {
  var ctx = document.getElementById("canvas").getContext("2d");
  var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    for(x=0; x<canvas.height; x++){
      for(y=0; y<canvas.width; y++){
        setPixelBlack(imageData, y,x,255);
      }
    }

  ctx.putImageData(imageData, 0, 0);
}

function setPixelBlack(imageData, x, y, a){
  index=(x+y *imageData.width)*4;
  promedio = (imageData.data[index+0]+imageData.data[index+1]+imageData.data[index+2])/3;
  imageData.data[index+0]= promedio;
  imageData.data[index+1]= promedio;
  imageData.data[index+2]= promedio;
  imageData.data[index+3]= a;
}
