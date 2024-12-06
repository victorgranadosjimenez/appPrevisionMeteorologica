
            //Nuestra clave de Visual Crossing
            const MICLAVE = "CA25BZWZEZHTL8UV5W5FNNUA7";


//para el boton 1

$(function() { 
        $("#button1").click(function() { 



            var location = $("#localizacion").val();
            


            var cadena = "";

            $("#today").html("<img src='./img/loader.gif'>");      // Gif de carga
            
            
            // El método ajax recibe un objeto literal
            $.ajax({
                url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "/today?unitGroup=us&key=" + MICLAVE + "&lang=es",    
                type: "GET",
                dataType: "json",
                async : true,
               
                success: function(data) {  

                    $("#today").html("<br />");    // Si es exitoso quitamos el gif
                   
                    $("#today").append("PREVISIÓN METEREOLÓGICA DE " + data.resolvedAddress + "<br />");

                    switch (data.days[0].icon) {
                        case "rain":
                            $("#today").append("<img src='./img/rain.png'/><br />");
                            break;
                        case "partly-cloudy-day":
                            $("#today").append("<img src='./img/partly-cloudy-night.png'/><br />");
                            break;
                        case "cloudy":
                            $("#today").append("<img src='./img/cloudy.png'/><br />");
                            break;
                        case "snow":
                            $("#today").append("<img src='./img/snow.png'/><br />");
                            break;
                        case "thunder":
                            $("#today").append("<img src='./img/thunder.png'/><br />");
                            break;
                        default:
                            $("#today").append("<img src='./img/clear-day.png'/><br />");
 
                      }
                   



                    for (var i = 0; i < data.days.length; i++) {    
                        $("#today").append("Fecha: " + data.days[i].datetime + "<br /> Previsión: " + data.days[i].conditions + "<br /> Humedad: " + data.days[i].humidity +
                         "<br /> Probabilidad de lluvia: " + data.days[i].precipprob + "<br /> Tipo de lluvia: " + data.days[i].preciptype +"<br />" +
                          "Temperatura Máxima: " + data.days[i].tempmax
                         + "<br /> Temperatura Mínima: " + data.days[i].tempmin + "<br /> Velocidad del viento: " + data.days[i].windspeed 
                         + " <br />Dirección del viento: " + data.days[i].winddir + "<br /> Visibilidad: " + data.days[i].visibility)
                    }



                    console.log(data);

                },
               
                error: function(xhr, estado, error_producido) {    
                    console.warn("Error producido: " + error_producido);
                    console.warn("Estado: " + estado);

                },
                

                complete: function(xhr, estado) {       //FUNCION cuando la solicitud fue completada Tanto si falla como si funciona
                    console.log("Petición completa");
                }

            });

        });
});








//para el boton 2

$(function() { 
    $("#button2").click(function() { 



        var location = $("#localizacion").val();
        


        var cadena = "";

        $("#next10days").html("<img src='./img/loader.gif'>");      // Gif de carga

        //2 consultas
        //Primera consulta
        $.ajax({
            url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "/today?unitGroup=us&key=" + MICLAVE + "&lang=es",    
            type: "GET",
            dataType: "json",
            async : true,
           
            success: function(data) {  

                $("#next10days").html("<br />");    // Si es exitoso quitamos el gif
               
                $("#next10days").append("PREVISIÓN METEREOLÓGICA DE " + data.resolvedAddress + "<br />");
                $("#next10days").append("<tr><th>DÍA</th><th>PREVISIÓN</th><th>TEMPERATURA MAX.</th><th>TEMPERATURA MIN.</th></tr>");


      

                $("#next10days").append("<tr><td>  " + data.days[0].datetime + "</td><td> " + data.days[0].conditions + " </td><td>" + data.days[0].tempmax 
                + "</td><td>" +  data.days[0].tempmin  +"</td></tr>");  



                console.log(data);

            },
           
            error: function(xhr, estado, error_producido) {    
                console.warn("Error producido: " + error_producido);
                console.warn("Estado: " + estado);

            },
            

            complete: function(xhr, estado) {       //FUNCION cuando la solicitud fue completada Tanto si falla como si funciona
                console.log("Petición completa");
            }
        });





        
        
       //segunda consulta
        $.ajax({
            url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "/next10days?unitGroup=us&key=" + MICLAVE + "&lang=es",    
            type: "GET",
            dataType: "json",
            async : true,
           
            success: function(data) {  


                
                   
                

                for (var i = 1; i < data.days.length; i++) {    
                        $("#next10days").append("<b> <tr><td>  " + data.days[i].datetime + "</td><td> " + data.days[i].conditions + " </td><td>" + data.days[i].tempmax 
                + "</td><td>" +  data.days[i].tempmin  +"</td></tr>");   
                    
                }

                console.log(data);

            },
           
            error: function(xhr, estado, error_producido) {    
                console.warn("Error producido: " + error_producido);
                console.warn("Estado: " + estado);

            },
            

            complete: function(xhr, estado) {       //FUNCION cuando la solicitud fue completada Tanto si falla como si funciona
                console.log("Petición completa");
            }

        });

    });
});








//para el boton 3
//Lo hacemos con Fetch

$(function () {
    $("#button3").click(function () {
        
        var location = $("#localizacion").val();
      
      $("#map").html("<img src='./img/loader.gif'>");   
     
      fetch("http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=8&offset=0&types=CITY&namePrefix=" + location + "&languageCode=es")
        .then((result) => {  
          return result.json(); 
        })
        .then((data) => {
            
          console.log("la latitud con fetch es " + data.data[0].latitude);
          console.log("la longitud con fetch es " + data.data[0].longitude);
          console.log("El código del pais es " + data.data[0].countryCode);
          console.log("Numero de ciudades con este nombre en diferente paises: " + data.metadata.totalCount);


            var latitud;
            var longitud;
            var numCiudades = data.metadata.totalCount;

            latitud = data.data[0].latitude;
            longitud = data.data[0].longitude;


            for (var i=0 ; i < numCiudades ; i++){
                
                var pais = data.data[i].countryCode;
                //Si hay en España siempre será la ciudad Española
                if (pais == "ES"){
                    latitud = data.data[i].latitude;
                    longitud = data.data[i].longitude;
                }

            }



          $("#map").html("<br />");    // Si es exitoso quitamos el gif
    

          var linkMap = "https://www.openstreetmap.org/#map=10/"+ latitud + "/" + longitud;


          //creo 2 nuevas referencias para el mapa dentro del frame, que sinceramente es lo que mas quebraderos de cabeza me ha dado
          var nuevaLongitud = longitud - 1.10;
          var nuevaLongitud2 = longitud + 1.10;
          var nuevaLatitud = latitud -0.450;
          var nuevaLatitud2 = latitud + +0.450;


          var frameMap = "https://www.openstreetmap.org/export/embed.html?bbox="+ nuevaLongitud + "%2C" + nuevaLatitud + "%2C" +
          nuevaLongitud2 + "%2C" + nuevaLatitud2 + "&amp;layer=mapnik";
          var frame = '<iframe width="425" height="350" src=' + frameMap + ' style="border: 1px solid black"> </iframe>';

          var verMasGrande = "<a href=" + linkMap +  ">Ver el mapa mas grande</a>" ;
            
          $("#map").append(frame);
          $("#map").append("</br>");
          $("#map").append(verMasGrande);
        })
        .catch(console.warn)
        .finally(console.warn(`La consulta ha finalizado`));
    });
  });



/*
//OTRA FORMA DE HACERLO CON ASYNC AWAIT
async function mifuncionawait() {    
    let respuesta = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=5&offset=0&types=CITY&namePrefix=" + location + "&languageCode=es");
    let data = await respuesta.json();


    console.log("la latitud con async await es " +  data.data[1].latitude);
    console.log("la longitud con async await es " +  data.data[1].longitude);

    return true;
  };

  $("#button3").click(function () {
    var location = $("#localizacion").val();
  mifuncionawait();
  });


*/



