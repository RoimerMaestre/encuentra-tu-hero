# Desafio fundamentos de la programacion.

### Lo primero que se realizo es acomodar el entorno de trabajo, incorporando los CDN con los que se trabajaran, en este caso se incorporo bootstrap, script de javascript, los respectivos script de bootstrap, script de jquery, script de canvas.

### Se hace primero la estructura, a la cual se le dara la logica, se hicieron los estilos segun la imagen de referencia a seguir.

### En el input se trabajo con la validacion de la informacion para que el usuario no pudiera ingresas numeros negativos, letras o cualquier otro cararter que no fueran numeros positivos

### Se crea una variable con .value(), que es un metodo utilizado en javascript el cual guarda la informacion de un input en una variable, a esta variable la llamamos inputValue

### Al final de la url agregamos el numero que la persona solicita, lo hicimos de la siguiente manera https://superheroapi.com/api.php/3033707663582647/${inputValue}, de esta manera aseguramos que el numero al final de la url sera el numero ingresado en el input.

### Nos guiamos por la estructura que se nos brindo en el bootcamp para consumir una api, este daria succes si la respuesta era valida y error si la respuesta era invalida.

### una vez que se tiene la respuesta valida guardamos en una variable la informacion que queremos mostrar, en este caso una carta de bootstrap con las diferentes estadisticas del superhero, se coloco un div en el html para contener toda la informacion.  $("#card-hero").html(postCard);

### luego se busca en canvas una forma forma de mostrar los porcentajes de poderes en una grafica tipo pie de porcentajes, se copio literalmente todos los datos del grafico, incuyendo su contenedor para el html. como la tabla solicita numeros enteros, creamos un objeto usando parseint para convertir los numeros de string a numeros reales,a esta variable se le llamo estadisticas :   const stats = {durability: parseInt(post.powerstats.durability) ,speed: parseInt(post.powerstats.speed),strength: parseInt(post.powerstats.strength),intelligence: parseInt(post.powerstats.intelligence), combat: parseInt(post.powerstats.combat), power: parseInt(post.powerstats.power),};

###  una vez obtenidos los datos en numeros reales simplemente se le agregaron a la grafica en el lugar correspondiente y con ello esta funcionaria correctamente.

### Habian ciertos errores en la api, algunos datos  no cargaban por falta de informacion, se utilizo la inteligencia artificial para ayudarme a entender como resolver dicho problema.  fue un reto para mi entender esta parte
 
