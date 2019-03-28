$(document).ready(function(){
  //para que el main-titulo cambie de color constantemente
  matchGameColor1();
  //para inicicar el Juego
  $(".btn-reinicio").click(function() {
    if($(".btn-reinicio").text()=="Iniciar"){
      //para iniciar el programa
      iniciar();
    }
    if($(".btn-reinicio").text()=="Reiniciar"){
      //Para reiniciar
      reiniciar();
    }
    $(".btn-reinicio").text("Reiniciar");
  });

});/*fin del programa principal*/

/* VARIABLES */
//los dulces.
var candy1 = "<div class='elemento'><img id='candy1' class='candy' src='image/1.png'></img></div>";
var candy2 = "<div class='elemento'><img id='candy2' class='candy' src='image/2.png'></img></div>";
var candy3 = "<div class='elemento'><img id='candy3' class='candy' src='image/3.png'></img></div>";
var candy4 = "<div class='elemento'><img id='candy4' class='candy' src='image/4.png'></img></div>";
//arreglo para almacenar los que seran eliminados.
var candysEliminados = [];
//puntuacion (score-text).
var puntuacion=0;
//contador de movimientos (movimientos-text).
var contadorMovimientos=0;

//metodos para cambiar el color del main titulo.
function matchGameColor1(){
  $(".main-titulo").css("color", "#DCFF0E");
  setTimeout(matchGameColor2, 500);
}
function matchGameColor2(){
  $(".main-titulo").css("color", "#FFFFFF");
  setTimeout(matchGameColor1, 500);
}//fin de metodos para cambiar el color del main titulo.

//funcion para iniciar el juego
function iniciar() {
  //para llenar las columnas
  llenarColumnasAlInicio();

  //para que los candy tengan movimiento.
  moverCandy();

  //para iniciar la cuenta regresiva
  $("#timer").startTimer({
    onComplete: function(){
      finalizar();
    },
    //allowPause: true
  });
}//fin de la funcion para iniciar el juego

//funcion para reiniciar el Juego
function reiniciar() {
  //arreglo para almacenar los que seran eliminados.
  candysEliminados = [];
  //puntuacion (score-text).
  puntuacion=0;
  $("#score-text").text("0");
  //contador de movimientos (movimientos-text).
  contadorMovimientos=0;
  $("#movimientos-text").text("0");

  //mostramos el tablero
  if($(".panel-tablero").find("#titulo-fin")){
    //console.log("e.e");
    $("#titulo-fin").remove();
    //para mostrar el tablero
    $(".panel-tablero").show(1000, function() {
      //para ocultar el temporizador
      $(".time").show();
      //habilitamos el boton de reinicio
      $(".btn-reinicio").attr("disabled", false);
      $(".btn-reinicio").css("filter", "none");
    });
  }
  //para expandir el panel score
  $(".panel-score").animate({
    width: "25%"
  }, 1000);

  //para vaciar y volver a llenar los elementos
  $(".elemento").remove();
  llenarColumnasAlInicio();
  //para que los candy sean dragables.
  moverCandy();

  //para reiniciar el Tiempo
  $("#timer").remove();
  $(".time").append("<div class='data-info' id='timer' data-minutes-left='2'></div>");

  //para iniciar la cuenta regresiva
  $("#timer").startTimer({
    onComplete: function(){
      finalizar();
    },
    //allowPause: true
  });
}//fin de la funcion para reiniciar el Juego

//funcion para finalizar el Juego
function finalizar() {
  //inabilitamos el boton reinicio
  $(".btn-reinicio").attr("disabled", "true");
  $(".btn-reinicio").css("filter", "grayscale(100%)");
  //inabilitamos el ordenamiento
  $(".candy").draggable("disable");
  //para ocultar el temporizador
  $(".time").hide();
  //ocultamos el tablero
  $(".panel-tablero").hide(5000, function() {
    //eliminamos todos los candys
    $(".elemento").remove();
    //para añadir un de fin del Juego
    $(".panel-score").prepend("<h1 id='titulo-fin' class='main-titulo' style='text-align: center'>Juego terminado</h1>")
    //habilitamos el boton reinicio
    $(".btn-reinicio").attr("disabled", false);
    $(".btn-reinicio").css("filter", "none");;
  });
  //para expandir el panel score
  $(".panel-score").animate({
    width: "100%"
  }, 5000);
  //console.log('e.e');
}//funcion para finalizar el Juego

//funcion realizar el movimiento de los candys.
function moverCandy() {
  //para que los elementos sean propeables
  $(".elemento").droppable({
    acept: ".candy",
    //metodo drop
    drop: function(event, ui) {
      //para optener el id del candy que ya esta en el elemento
      var thisCandyID = $(this).find("img").attr("id");
      //para optener el id del nuevo candy y añadirlo
      var idDragg = $(ui.draggable).attr("id");

      //para añadir viejo al elemento del candy draggeado
      switch (thisCandyID) {
        case "candy1":{
          $(ui.draggable).parent().html("<img id='candy1' class='candy' src='image/1.png'>");
          break;
        }
        case "candy2":{
          $(ui.draggable).parent().html("<img id='candy2' class='candy' src='image/2.png'>");
          break;
        }
        case "candy3":{
          $(ui.draggable).parent().html("<img id='candy3' class='candy' src='image/3.png'>");
          break;
        }
        case "candy4":{
          $(ui.draggable).parent().html("<img id='candy4' class='candy' src='image/4.png'>");
          break;
        }
        default:{
          //
        }
      }
      //para añdir el candy nuevo al elemento.
      switch (idDragg) {
        case "candy1":{
          $(this).html("<img id='candy1' class='candy' src='image/1.png'>");
          break;
        }
        case "candy2":{
          $(this).html("<img id='candy2' class='candy' src='image/2.png'>");
          break;
        }
        case "candy3":{
          $(this).html("<img id='candy3' class='candy' src='image/3.png'>");
          break;
        }
        case "candy4":{
          $(this).html("<img id='candy4' class='candy' src='image/4.png'>");
          break;
        }
        default:{
          //
        }
      }

      //para que los candy sean draggable.
      $(".candy").draggable({
        start: function () {
          //aqui creamos los contenedores para limitar el candy.
          var pos = $(this).parent().offset();
          $(".limitacion").css("border", "5px solid orange");
          $(".limitacion").offset({
            top: (pos.top-100),
            left: (pos.left-100)
          });
        },
        revert: true,
        containment: ".limitacion",
        stop: function () {
          //aqui ponemos invisible el contenedor.
          $(".limitacion").css("border", "none");
          $(".limitacion").offset({
            top: 10,
            left: 1100
          });
        },
        snap: true,
        snapMode: "inner"
      });//fin para que los candy sean draggable.

      //aqui va la validacion de los candys
      contadorMovimientos++;
      $("#movimientos-text").text(contadorMovimientos);
      validarCandys();
    }//fin del metodo drop
  });

  //para que los candy sean draggable.
  $(".candy").draggable({
    start: function () {
      //aqui creamos los contenedores para limitar el candy.
      var pos = $(this).parent().offset();
      $(".limitacion").css("border", "5px solid orange");
      $(".limitacion").offset({
        top: (pos.top-100),
        left: (pos.left-100)
      });
    },
    revert: true,
    containment: ".limitacion",
    stop: function () {
      //aqui ponemos invisible el contenedor.
      $(".limitacion").css("border", "none");
      $(".limitacion").offset({
        top: 10,
        left: 1100
      });
    },
    snap: true,
    snapMode: "inner"
  });//fin para que los candy sean draggable.
}//Fin de la funcion realizar el movimiento de los candys.

//funcion para eliminar los dulces que coinciden
function eliminarCandy() {
  if(candysEliminados.length != 0){
    for(var i=0; i<candysEliminados.length; i++){
      $(candysEliminados[i]).addClass("eliminados");
    }
    $(".eliminados").css("filter", "grayscale(100%)");
    setTimeout(function() {
      $(".eliminados").css("filter", "none");
      setTimeout(function() {
        $(".eliminados").css("filter", "grayscale(100%)");
        setTimeout(function() {
          $(".eliminados").css("filter", "none");
          setTimeout(function() {
            $(".eliminados").css("filter", "grayscale(100%)");
            setTimeout(function() {
              //eliminamos los candys seleccionados
              $(".eliminados").remove();
              //enviamos la puntuacion
              puntuacion = puntuacion+(candysEliminados.length*10);
              $("#score-text").text(puntuacion);
              //vaciamos el arreglo con los candys
              candysEliminados = [];
              //añadimos los candys
              añadirCandys();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }, 300);
  }
}//fin de la funcion para eliminar los dulces que coinciden

//funcion para añadir los candy
function añadirCandys() {
  setTimeout(function() {
    añadirCandyCol(".col-1");
    añadirCandyCol(".col-2");
    añadirCandyCol(".col-3");
    añadirCandyCol(".col-4");
    añadirCandyCol(".col-5");
    añadirCandyCol(".col-6");
    añadirCandyCol(".col-7");

    //habilitamos el boton reinicio
    console.log(eliminadosFi.length+", "+eliminadosCol.length);
    if((eliminadosFi.length == 0)&&(eliminadosCol.length == 0)){
      $(".btn-reinicio").attr("disabled", false);
      $(".btn-reinicio").css("filter", "none");
      //habilitamos el ordenamiento
      $(".candy").draggable("enable");
    }
    //validamos los nuevos candys
    validarCandys();
  }, 500);
}//fin de la funcion para añadir los candy

//funcion para añadir candys a las columnas
function añadirCandyCol(id) {
  var arrAn = $(id).find(".elemento");
  if(arrAn.length<7){
    for(var i=0; i<(7-arrAn.length); i++){
      switch (Math.floor(Math.random() * 4)+1) {
        case 1:{
          $(id).prepend(candy1);
          break;
        }
        case 2:{
          $(id).prepend(candy2);
          break;
        }
        case 3:{
          $(id).prepend(candy3);
          break;
        }
        case 4:{
          $(id).prepend(candy4);
          break;
        }
        default:{
          //
        }
      }
    }
    //para que los candy sean dragables.
    moverCandy();
  }
}//funcion para añadir candys a las columnas

//funciones para validar si hay dulces que coinciden
//funcion para validar si los candys son iguales
function validarCandys() {
  //validamos las filas
  validarFila(0);
  validarFila(1);
  validarFila(2);
  validarFila(3);
  validarFila(4);
  validarFila(5);
  validarFila(6);
  eliminadosFi = [];

  //validamos las columnas
  validarColumna(".col-1");
  validarColumna(".col-2");
  validarColumna(".col-3");
  validarColumna(".col-4");
  validarColumna(".col-5");
  validarColumna(".col-6");
  validarColumna(".col-7");
  eliminadosCol = [];

  //eliminamos los candys seleccionados
  eliminarCandy();
}//fin de la funcion para validar si los candys son iguales

//funcion para validar la fila
var eliminadosFi = [];
function validarFila(id) {
  var arr = [
    $(".col-1").find(".candy")[id], $(".col-2").find(".candy")[id], $(".col-3").find(".candy")[id],
    $(".col-4").find(".candy")[id], $(".col-5").find(".candy")[id], $(".col-6").find(".candy")[id],
    $(".col-7").find(".candy")[id]
  ];

  var el1 = $(arr[0]).attr("id");
  var el2 = $(arr[1]).attr("id");
  var el3 = $(arr[2]).attr("id");
  var el4 = $(arr[3]).attr("id");
  var el5 = $(arr[4]).attr("id");
  var el6 = $(arr[5]).attr("id");
  var el7 = $(arr[6]).attr("id");

  eliminadosFi = [];

  //valida si 3 son iguales
  if((el1==el2) && (el2==el3)){
    eliminadosFi = [$(".col-1").find(".elemento")[id], $(".col-2").find(".elemento")[id], $(".col-3").find(".elemento")[id]];
  }
  if((el2==el3) && (el3==el4)){
    eliminadosFi = [$(".col-2").find(".elemento")[id], $(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id]];
  }
  if((el3==el4) && (el4==el5)){
    eliminadosFi = [$(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id]];
  }
  if((el4==el5) && (el5==el6)){
    eliminadosFi = [$(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id], $(".col-6").find(".elemento")[id]];
  }
  if((el5==el6) && (el6==el7)){
    eliminadosFi = [$(".col-5").find(".elemento")[id], $(".col-6").find(".elemento")[id], $(".col-7").find(".elemento")[id]];
  }

  //valida si 4 son iguales
  if((el1==el2) && (el2==el3) && (el3==el4)){
    eliminadosFi = [$(".col-1").find(".elemento")[id], $(".col-2").find(".elemento")[id], $(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id]];
  }
  if((el2==el3) && (el3==el4) && (el4==el5)){
    eliminadosFi = [$(".col-2").find(".elemento")[id], $(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id]];
  }
  if((el3==el4) && (el4==el5) && (el5==el6)){
    eliminadosFi = [$(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id], $(".col-6").find(".elemento")[id]];
  }
  if((el4==el5) && (el5==el6) && (el6==el7)){
    eliminadosFi = [$(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id], $(".col-6").find(".elemento")[id], $(".col-7").find(".elemento")[id]];
  }

  //valida si 5 son iguales
  if((el1==el2) && (el2==el3) && (el3==el4) && (el4==el5)){
    eliminadosFi = [$(".col-1").find(".elemento")[id], $(".col-2").find(".elemento")[id], $(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id]];
  }
  if((el2==el3) && (el3==el4) && (el4==el5) && (el5==el6)){
    eliminadosFi = [$(".col-2").find(".elemento")[id], $(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id], $(".col-6").find(".elemento")[id]];
  }
  if((el3==el4) && (el4==el5) && (el5==el6) && (el6==el7)){
    eliminadosFi = [$(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id], $(".col-6").find(".elemento")[id], $(".col-7").find(".elemento")[id]];
  }

  //valida si 6 son iguales
  if((el1==el2) && (el2==el3) && (el3==el4) && (el4==el5) && (el5==el6)){
    eliminadosFi = [$(".col-1").find(".elemento")[id], $(".col-2").find(".elemento")[id], $(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id], $(".col-6").find(".elemento")[id]];
  }
  if((el2==el3) && (el3==el4) && (el4==el5) && (el5==el6) && (el6==el7)){
    eliminadosFi = [$(".col-2").find(".elemento")[id], $(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id], $(".col-5").find(".elemento")[id], $(".col-6").find(".elemento")[id], $(".col-7").find(".elemento")[id]];
  }

  //valida si los 7 son iguales
  if((el1==el2) && (el2==el3) && (el3==el4) && (el4==el5) && (el5==el6) && (el6==el7)){
    eliminadosFi = [
      $(".col-1").find(".elemento")[id], $(".col-2").find(".elemento")[id],
      $(".col-3").find(".elemento")[id], $(".col-4").find(".elemento")[id],
      $(".col-5").find(".elemento")[id], $(".col-6").find(".elemento")[id],
      $(".col-7").find(".elemento")[id]
    ];
  }

  //para enviar los candys seleccionados al arrelgo para eliminar
  if(eliminadosFi.length != 0){
    for(var i=0; i<eliminadosFi.length; i++){
      candysEliminados.push(eliminadosFi[i]);
    }
    //inabilitamos el boton reinicio
    $(".btn-reinicio").attr("disabled", "true");
    $(".btn-reinicio").css("filter", "grayscale(100%)");

    //inabilitamos el ordenamiento
    $(".candy").draggable("disable");
  }
}//fin de la funcion para validar la fila
//funcion para validar la columna
var eliminadosCol = [];
function validarColumna(id){
  var arr = $(id).find(".candy");
  var el1 = $(arr[0]).attr("id");
  var el2 = $(arr[1]).attr("id");
  var el3 = $(arr[2]).attr("id");
  var el4 = $(arr[3]).attr("id");
  var el5 = $(arr[4]).attr("id");
  var el6 = $(arr[5]).attr("id");
  var el7 = $(arr[6]).attr("id");

  eliminadosCol = [];

  //validar si 3 son iguales
  if((el1==el2) && (el2==el3)){
    eliminadosCol = [$(id).find(".elemento")[0], $(id).find(".elemento")[1], $(id).find(".elemento")[2]];
  }
  if((el2==el3) && (el3==el4)){
    eliminadosCol = [$(id).find(".elemento")[1], $(id).find(".elemento")[2], $(id).find(".elemento")[3]];
  }
  if((el3==el4) && (el4==el5)){
    eliminadosCol = [$(id).find(".elemento")[2], $(id).find(".elemento")[3], $(id).find(".elemento")[4]];
  }
  if((el4==el5) && (el5==el6)){
    eliminadosCol = [$(id).find(".elemento")[3], $(id).find(".elemento")[4], $(id).find(".elemento")[5]];
  }
  if((el5==el6) && (el6==el7)){
    eliminadosCol = [$(id).find(".elemento")[4], $(id).find(".elemento")[5], $(id).find(".elemento")[6]];
  }

  //validar si 4 son iguales
  if((el1==el2) && (el2==el3) && (el3==el4)){
    eliminadosCol = [$(id).find(".elemento")[0], $(id).find(".elemento")[1], $(id).find(".elemento")[2], $(id).find(".elemento")[3]];
  }
  if((el2==el3) && (el3==el4) && (el4==el5)){
    eliminadosCol = [$(id).find(".elemento")[1], $(id).find(".elemento")[2], $(id).find(".elemento")[3], $(id).find(".elemento")[4]];
  }
  if((el3==el4) && (el4==el5) && (el5==el6)){
    eliminadosCol = [$(id).find(".elemento")[2], $(id).find(".elemento")[3], $(id).find(".elemento")[4], $(id).find(".elemento")[5]];
  }
  if((el4==el5) && (el5==el6) && (el6==el7)){
    eliminadosCol = [$(id).find(".elemento")[3], $(id).find(".elemento")[4], $(id).find(".elemento")[5], $(id).find(".elemento")[6]];
  }

  //valida si 5 son iguales
  if((el1==el2) && (el2==el3) && (el3==el4) && (el4==el5)){
    eliminadosCol = [$(id).find(".elemento")[0], $(id).find(".elemento")[1], $(id).find(".elemento")[2], $(id).find(".elemento")[3], $(id).find(".elemento")[4]];
  }
  if((el2==el3) && (el3==el4) && (el4==el5) && (el5==el6)){
    eliminadosCol = [$(id).find(".elemento")[1], $(id).find(".elemento")[2], $(id).find(".elemento")[3], $(id).find(".elemento")[4], $(id).find(".elemento")[5]];
  }
  if((el3==el4) && (el4==el5) && (el5==el6) && (el6==el7)){
    eliminadosCol = [$(id).find(".elemento")[2], $(id).find(".elemento")[3], $(id).find(".elemento")[4], $(id).find(".elemento")[5], $(id).find(".elemento")[6]];
  }

  //valida si 6 son iguales
  if((el1==el2) && (el2==el3) && (el3==el4) && (el4==el5) && (el5==el6)){
    eliminadosCol = [$(id).find(".elemento")[0], $(id).find(".elemento")[1], $(id).find(".elemento")[2], $(id).find(".elemento")[3], $(id).find(".elemento")[4], $(id).find(".elemento")[5]];
  }
  if((el2==el3) && (el3==el4) && (el4==el5) && (el5==el6) && (el6==el7)){
    eliminadosCol = [
      $(id).find(".elemento")[1], $(id).find(".elemento")[2], $(id).find(".elemento")[3],
      $(id).find(".elemento")[4], $(id).find(".elemento")[5], $(id).find(".elemento")[6]
    ];
  }

  //valida si los 7 son iguales
  if((el1==el2) && (el2==el3) && (el3==el4) && (el4==el5) && (el5==el6) && (el6==el7)){
    eliminadosCol = [
      $(id).find(".elemento")[0], $(id).find(".elemento")[1], $(id).find(".elemento")[2],
      $(id).find(".elemento")[3], $(id).find(".elemento")[4], $(id).find(".elemento")[5],
      $(id).find(".elemento")[6]
    ];
  }

  //para enviar los candys seleccionados al arrelgo para eliminar
  if(eliminadosCol.length != 0){
    for(var i=0; i<eliminadosCol.length; i++){
      candysEliminados.push(eliminadosCol[i]);
    }
    //inabilitamos el boton reinicio
    $(".btn-reinicio").attr("disabled", "true");
    $(".btn-reinicio").css("filter", "grayscale(100%)");

    //inabilitamos el ordenamiento
    $(".candy").draggable("disable");
  }
}//fin de la funcion para validar la columnna
//fin de la funcion para validar si hay dulces que coinciden

//funcion para llenar las columnas
function llenarColumnasAlInicio() {
  llenarColumnaAlInicio(".col-1");
  llenarColumnaAlInicio(".col-2");
  llenarColumnaAlInicio(".col-3");
  llenarColumnaAlInicio(".col-4");
  llenarColumnaAlInicio(".col-5");
  llenarColumnaAlInicio(".col-6");
  llenarColumnaAlInicio(".col-7");

  //para que los candy sean draggable.
  $(".candy").draggable({
    start: function () {
      //aqui creamos los contenedores para limitar el candy.
      var pos = $(this).parent().offset();
      $(".limitacion").css("border", "5px solid orange");
      $(".limitacion").offset({
        top: (pos.top-100),
        left: (pos.left-100)
      });
    },
    revert: true,
    containment: ".limitacion",
    stop: function () {
      //aqui ponemos invisible el contenedor.
      $(".limitacion").css("border", "none");
      $(".limitacion").offset({
        top: 10,
        left: 1100
      });
    },
    snap: true,
    snapMode: "inner"
  });//fin para que los candy sean draggable.
}//fin de la funcion para llenar las columnas

//funcion para llenar una columna
function llenarColumnaAlInicio(id) {
  for(var i=0; i<7; i++){
    //para llenar la columna 1
    switch (Math.floor(Math.random() * 4)+1) {
      case 1:{
        $(id).prepend(candy1);
        break;
      }
      case 2:{
        $(id).prepend(candy2);
        break;
      }
      case 3:{
        $(id).prepend(candy3);
        break;
      }
      case 4:{
        $(id).prepend(candy4);
        break;
      }
      default:{
        //
      }
    }
  }
}//fin de la funcion para llenar una columna
