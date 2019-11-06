document.addEventListener("DOMContentLoaded", load );

function load() {
  mostrarLogin();
  

      function mostrarLogin(){
        fetch("html/login.html").then(
          function(response){
            response.text().then(
          function(texto){
            document.querySelector("#main-section").innerHTML = texto;
            document.querySelector(".crearCuenta").addEventListener("click", mostrarPlanes);
            document.querySelector(".iniciarSesion").addEventListener("click", mostrarNav);
              }
            );
              }
            );
      }


      function mostrarNav() {
        fetch("html/navbar.html").then(
          function(response){
            response.text().then(
          function(texto){
            document.querySelector(".head").innerHTML = texto;
            document.querySelector("#miListaResponsive").addEventListener("click", mostrarMiLista);
            document.querySelector("#miLista").addEventListener("click", mostrarMiLista);
            document.querySelector("#logo").addEventListener("click", mostrarHome);
            document.querySelector(".miCuentaDesktop").addEventListener("click", mostrarCuenta);
            document.querySelector(".miCuentaResponsive").addEventListener("click", mostrarCuenta);
            document.querySelector("#pelis").addEventListener("click", mostrarPelis);
            document.querySelector("#pelisResponsive").addEventListener("click", mostrarPelis);
            document.querySelector("#pelisHome").addEventListener("click", mostrarPelis);
            document.querySelector("#lupaResponsive").addEventListener("click", buscar);
            document.querySelector("#lupa").addEventListener("click", buscar);
            document.querySelector("#tv").addEventListener("click", mostrarSeries);
            document.querySelector("#tvResponsive").addEventListener("click", mostrarSeries);
            document.querySelector(".tvHome").addEventListener("click", mostrarSeries);
            mostrarHome();
          }
        );
          }
        );
        }

        function buscar(){
          let input_bus = document.getElementById('busqueda-input');
          busqueda.classList.toggle("busqueda-novisible");
          input_bus.focus();
          busqueda.addEventListener("focusout", ocultar);
          document.querySelector(".busqueda-input").addEventListener('keydown' , function(evento){
            if(evento.keyCode == 13){
              mostrarResultados();
            }
          });
        }

        
          
        function ocultar(){
          busqueda.classList.toggle("busqueda-novisible");
        }
        


        function mostrarHome(){
          fetch("html/home.html").then(
            function(response){
              response.text().then(
            function(texto){
              document.querySelector("#main-section").innerHTML = texto;
              document.querySelector(".pelicula").addEventListener("click", mostrarPelicula);
              document.querySelector(".serie").addEventListener("click", mostrarSerie);
            }
            );
          }
          );
        }


        function mostrarPelicula() {
          fetch("html/pelicula.html").then(
            function(response){
              response.text().then(
                function(texto){
                  document.querySelector("#main-section").innerHTML = texto;
                  document.getElementById('mostrarMas').addEventListener('click', mostrarMas);
                }
                );
             }
          );
      }

      function mostrarPelis() {
        fetch("html/peliculas.html").then(
          function(response){
            response.text().then(
              function(texto){
                document.querySelector("#main-section").innerHTML = texto;
                document.querySelector(".pelicula").addEventListener("click", mostrarPelicula);
              }
              );
           }
        );
    }

      function mostrarCuenta() {
        fetch("html/miCuenta.html").then(
          function(response){
            response.text().then(
              function(texto){
                document.querySelector("#main-section").innerHTML = texto;
                document.querySelector('.Eliminar').addEventListener('click', mostrarLogin);
              }
              );
           }
        );
  }


      function mostrarSerie() {
        fetch("html/serie.html").then(
          function(response){
            response.text().then(
              function(texto){
                document.querySelector("#main-section").innerHTML = texto;
                document.querySelector('#mostrarMas').addEventListener('click', mostrarMas);
                document.querySelector('.botonEpisodios').addEventListener('click', mostrarEpisodios);
              }
              );
           }
        );
      }

      function mostrarResultados() {
        fetch("html/resultados.html").then(
          function(response){
            response.text().then(
              function(texto){
                document.querySelector("#main-section").innerHTML = texto;
              }
              );
           }
        );
      }

      function mostrarSeries() {
        fetch("html/series.html").then(
          function(response){
            response.text().then(
              function(texto){
                document.querySelector("#main-section").innerHTML = texto;
                document.querySelector('.serie').addEventListener('click', mostrarSerie);
              }
              );
           }
        );
      }

    
    function mostrarPlanes() {
        fetch("html/planes.html").then(
          function(response){
            response.text().then(
              function(texto){
                document.querySelector("#main-section").innerHTML = texto;
                document.querySelector('.botonContinuar').addEventListener('click', mostrarNav);
                document.querySelector('.volverSesion').addEventListener('click', mostrarLogin);
              }
              );
           }
        );
    }
    
        


    function mostrarMiLista() {
      fetch("html/miLista.html").then(
        function(response){
          response.text().then(
            function(texto){
              document.querySelector("#main-section").innerHTML = texto;
            }
            );
         }
      );
    }

      function mostrarMas(){
        let dots = document.getElementById("dots");
        let moreText = document.getElementById("more");
        let btnText = document.getElementById("mostrarMas");
      
        if (dots.style.display === "none") {
          dots.style.display = "inline";
          btnText.innerHTML = "Leer Más"; 
          moreText.style.display = "none";
        } else {
          dots.style.display = "none";
          btnText.innerHTML = "Leer Menos"; 
          moreText.style.display = "inline";
        }
      }


      function mostrarEpisodios(){
        let dots = document.querySelector(".celdas");
        if (dots.style.display === "none") {
          dots.style.display = "inline";
        } else {
          dots.style.display = "none";
        }
      }

      
}