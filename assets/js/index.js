$("#searchForm").submit(function (event) {
  event.preventDefault();
  let inputValue = $("#validar-input").val();
  let regex = /^[1-9]\d*$/;

  // Si el valor es un número mayor a 0, realizar la solicitud AJAX.
  if (regex.test(inputValue)) {
    let requestConfig = {
      url: `https://superheroapi.com/api.php/3033707663582647/${inputValue}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        const post = response;
        // Limpiar el contenido del contenedor del gráfico
        $("#chartContainer").html("");

        // Crear un nuevo elemento de imagen para verificar la carga
        let img = new Image();

        img.onload = function () {
          // Si la imagen se carga correctamente, mostrar la tarjeta
          let postCard = `<div class="card mb-3 m-auto" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${post.image.url}" alt="${
            post.name
          }" class="w-100 h-100">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <p class="card-title">Nombre: ${post.name}</p> 
                  <p class="card-title">Conexión: ${
                    post.connections["group-affiliation"]
                  }, ${post.connections.relatives}</p> 
                  <p class="card-text">Publicado por: ${
                    post.biography.publisher
                  }</p>
                  <p class="card-text">Primera aparición: ${
                    post.biography["first-appearance"]
                  }</p>
                  <p class="card-text">Ocupación: ${post.work.occupation}</p>
                  <p class="card-text">Altura: ${post.appearance.height[1]}</p>
                  <p class="card-text">Peso: ${
                    post.appearance.weight[1]
                  }</p>            
                  <p class="card-text">Alianzas: ${post.biography.aliases.join(
                    ", "
                  )}</p>
                </div>
              </div>
            </div>
          </div>`;

          // Mostrar el contenido en el HTML
          $("#card-hero").html(postCard);

          // Datos para el gráfico - convertir los string en números para que el gráfico pastel se pueda ver, en caso contrario no aparece
          const stats = {
            durability: parseInt(post.powerstats.durability) || 0 ,
            speed: parseInt(post.powerstats.speed) || 0 ,
            strength: parseInt(post.powerstats.strength) || 0,
            intelligence: parseInt(post.powerstats.intelligence) || 0,
            combat: parseInt(post.powerstats.combat) || 0,
            power: parseInt(post.powerstats.power) || 0,
          };

          // Verificar si los valores son válidos
          //Object.values es una función que toma un objeto como argumento y devuelve un array con los valores de las propiedades del objeto.
          //En este caso, el objeto pasado es stats, que es la variable que esta arriba.
          //some es un método de array en JavaScript que verifica si al menos uno de los elementos del array cumple con una condición especificada en una función de callback. en este caso se esta solicitando que sea mayor a 0, some devuelve un valor boleano si al entrar a las estadisticas de la api no encuentra valores validos  arrojara false.
          const validStats = Object.values(stats).some((stat) => stat > 0);

          //se coloca una condicion informando que si las estadisticas son diferentes a las solicitadas en validStas arroje un html informando que las estadisticas no estan disponible.
          if (!validStats) {
            $("#chartContainer").html("<h3>Estadísticas no disponibles</h3>");
          } else {
            const statsHero = [
              { y: stats.durability, label: "Durabilidad" },
              { y: stats.speed, label: "Velocidad" },
              { y: stats.strength, label: "Fuerza" },
              { y: stats.intelligence, label: "Inteligencia" },
              { y: stats.combat, label: "Combate" },
              { y: stats.power, label: "Poder" },
            ];

            var options = {
              title: {
                text: "Estadísticas del Superhéroe",
              },
              subtitles: [
                {
                  text: `Héroe: ${post.name}`,
                },
              ],
              theme: "light2",
              animationEnabled: true,
              data: [
                {
                  type: "pie",
                  startAngle: 40,
                  toolTipContent: "<b>{label}</b>: {y}%",
                  showInLegend: "true",
                  legendText: "{label}",
                  indexLabelFontSize: 16,
                  indexLabel: "{label} - {y}%",
                  dataPoints: statsHero,
                },
              ],
            };

            $("#chartContainer").CanvasJSChart(options);
          }
        };

        // Si la imagen no se carga, mostrar un mensaje de error
        img.onerror = function () {
          $("#card-hero").html(
            "<h3 class='text-center'>Héroe no disponible</h3>"
          );
        };
        // Establecer la URL de la imagen para iniciar la carga
        img.src = post.image.url;
      },

      error: function (error) {
        console.log("¡Ha ocurrido un error!", error);
        alert("¡PELIGRO! Ha ocurrido un error.");
      },
    };


    $.ajax(requestConfig);
  } else {
    alert("Por favor, ingresa un número positivo válido.");
  }
});
