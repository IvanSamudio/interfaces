var inicioX = [] , inicioY = [];inicioCenX = 0, inicioCenY =0;
window.onload = function(){
  let objetoActual = [];
  var centroActual = null;
  let indicePol = 0;
  let indiceCirculo = 0;
  let circuloActual = null;
  let cirl = 0;
  let sumaX = 0;
  let sumaY = 0;
  let verificado = false;
  let maxCol = 255;
  canvas.onmousedown = function(event){
  for (var i = 0; i < pol.length; i++){
    if((pol[i].cenX < event.layerX) && (pol[i].radio*2 + pol[i].cenX > event.layerX) && (pol[i].cenY < event.layerY) && (pol[i].radio*2 + pol[i].cenY > event.layerY)){
    moviendo = true;
    indicePol = i;
    centroActual = pol;
    inicioCenY = event.layerY - pol[indicePol].cenY;
    inicioCenX = event.layerX - pol[indicePol].cenX;
    for (var j = 0; j < pol[indicePol].cirArr.length; j++) {
        cirl = pol[indicePol].cirArr[j];
        objetoActual[j] = cirl;
        inicioY[j] = event.layerY - cirl.posY;
        inicioX[j] = event.layerX - cirl.posX;
    }
    break;
  }else {
    for (var j = 0; j < pol[i].cirArr.length; j++) {
      cirl = pol[i].cirArr[j];
      if((cirl.posX < event.layerX) && (cirl.radio*2 + cirl.posX > event.layerX) && (cirl.posY < event.layerY) && (cirl.radio*2 + cirl.posY > event.layerY)){
        moviendo = true;
        indicePol = i;
        indiceCirculo = j;
        circuloActual = pol[indicePol].cirArr[j];
        inicioX = event.layerX - cirl.posX;
        inicioY = event.layerY - cirl.posY;
        break;
      }
    }

  }
}
};

canvas.onmousemove = function(event){
if(centroActual != null){
  centroActual.cenX = event.layerX - inicioCenX;
  centroActual.cenY = event.layerY - inicioCenY;
  for (var i = 0; i < inicioX.length; i++) {
    objetoActual[i].posX = event.layerX - inicioX[i];
    objetoActual[i].posY = event.layerY - inicioY[i];
  }
  sumaX = 0;
  sumaY = 0;
  for (var j = 0; j < pol[indicePol].cirArr.length; j++) {
      cirl = pol[indicePol].cirArr[j];
      cirl.posX = objetoActual[j].posX;
      cirl.posY = objetoActual[j].posY;
      sumaX = sumaX + cirl.posX;
      sumaY = sumaY + cirl.posY;
  }
  pol[indicePol].cenX = sumaX/pol[indicePol].cirArr.length;
  pol[indicePol].cenY = sumaY/pol[indicePol].cirArr.length;
  dibujarPoligono();
}else if (circuloActual != null) {
  circuloActual.posX = event.layerX - inicioX;
  circuloActual.posY = event.layerY - inicioY;
  pol[indicePol].cirArr[indiceCirculo].posX = circuloActual.posX;
  pol[indicePol].cirArr[indiceCirculo].posY = circuloActual.posY;
  sumaX= 0;
  sumaY= 0;
  for (var j = 0; j < pol[indicePol].cirArr.length; j++) {
      cirl = pol[indicePol].cirArr[j];
      sumaX = sumaX + cirl.posX;
      sumaY = sumaY + cirl.posY;
  }
  pol[indicePol].cenX = sumaX/pol[indicePol].cirArr.length;
  pol[indicePol].cenY = sumaY/pol[indicePol].cirArr.length;
  dibujarPoligono();
}
};
canvas.onmouseup = function(event){
  centroActual = null;
  circuloActual = null;
  objetoActual = [];
  indicePol = 0;
  indiceCirculo = 0;
  inicioCenX = 0;
  inicioCenY = 0;
  inicioX = [];
  inicioY = [];
}

canvas.addEventListener("keydown",function() {
  var keyChar = String.fromCharCode(event.keyCode);
  if (((keyChar == "C")||(keyChar == "c"))){
      verificado = true;
      canvas.addEventListener("wheel",function(){
        if (verificado) {
          event.preventDefault();
          cambiarColor(event);
        }
      })
  }else {
    verificado = false;
  }
});


function cambiarColor(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pol.length; i++) {
      if ((e.deltaY < 0) && ((maxCol >= 0)&&((maxCol<255)))) {
          maxCol++;
      }
      if ((e.deltaY > 0) && ((maxCol > 0)&&((maxCol <=255)))){
          maxCol--;
      }
      for (var j = 0; j < pol[i].cirArr.length; j++) {
        cirl = pol[i].cirArr[j];
        cirl.color = "rgb(" + maxCol + ",0,0)";
      }
      if (cir != []) {
        for (var j = 0; j < cir.length; j++) {
          cir[j].color = "rgb(" + maxCol + ",0,0)";
        }
      }
        pol[i].color = "rgb(0," + maxCol + ",0)";
        pol[i].lineaColor = "rgb(" + maxCol + "," + maxCol + ",0)";
      }
      dibujarPoligono();
    }

    canvas.addEventListener("dblclick", function () {
      for (var i = 0; i < pol.length; i++) {
        for (var j = 0; j < pol[i].cirArr.length; j++) {
          if (pol[i].cirArr.length>3) {
            cirl = pol[i].cirArr[j];
            if((cirl.posX < event.layerX) && (cirl.radio*2 + cirl.posX > event.layerX) && (cirl.posY < event.layerY) && (cirl.radio*2 + cirl.posY > event.layerY)){
              delete pol[i].cirArr[j];
              pol[i].cirArr.splice(j,1);
              sumaX= 0;
              sumaY= 0;
              for (var x = 0; x < pol[i].cirArr.length; x++) {
                  sumaX = sumaX + pol[i].cirArr[x].posX;
                  sumaY = sumaY + pol[i].cirArr[x].posY;
              }
              pol[i].cenX = sumaX/pol[i].cirArr.length;
              pol[i].cenY = sumaY/pol[i].cirArr.length;
          }
          }
      }
    }
    dibujarPoligono();
    });


};
