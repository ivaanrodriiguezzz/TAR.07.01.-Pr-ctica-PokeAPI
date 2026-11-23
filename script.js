
/**
 * Ejercicio 1: Buscar y mostrar información del Pokemon con FETCH
 *
 * Ejercicio 2: Utilizar promesas y controlar errores.
 */

// Array donde guardaremos los Pokemon capturados.
let coleccion = [];

// Funcion para buscar Pokemon.
function buscarPokemon() {

    let nombre = document.getElementById("pokemon-input").value.toLowerCase();

    let url = "https://pokeapi.co/api/v2/pokemon/" + nombre;

    fetch(url)
        .then(function(respuesta) {

            if (!respuesta.ok) {
                throw new Error("Pokemon no encontrado");
            }

            return respuesta.json();

        })
        .then(function(datos) {

            document.getElementById("result-section").classList.remove("hidden");

            document.getElementById("pokemon-data").innerHTML =
                "<p><strong>Nombre:</strong> " + datos.name + "</p>" +
                "<p><strong>ID:</strong> " + datos.id + "</p>" +
                "<img src='" + datos.sprites.front_default + "' alt='" + datos.name + "'>" +
                "<br>" +
                "<button id='add-to-collection-btn'>Agregar a la colección</button>";

            // Boton para agregar el Pokemon a la coleccion.
            document.getElementById("add-to-collection-btn").addEventListener("click", function() {

                agregarPokemon(datos.name, datos.sprites.front_default);

            });

        })
        .catch(function(error) {

            document.getElementById("result-section").classList.remove("hidden");

            document.getElementById("pokemon-data").innerHTML =
                "<p>Pokemon no encontrado. Intentalo de nuevo.</p>";

        });

}


/**
 * VERSION DEL EJERCICIO 1 CON ASYNC/AWAIT
 *
 * Para probar esta version, sustituye la funcion buscarPokemon
 * anterior por esta y utiliza el mismo evento del boton.
 */

/*
async function buscarPokemon() {

    let nombre = document.getElementById("pokemon-input").value.toLowerCase();

    if (nombre == "") {
        alert("Introduce el nombre de un Pokemon");
        return;
    }

    try {

        let respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + nombre);

        if (!respuesta.ok) {
            throw new Error("Pokemon no encontrado");
        }

        let datos = await respuesta.json();

        document.getElementById("result-section").classList.remove("hidden");

        document.getElementById("pokemon-data").innerHTML =
            "<p><strong>Nombre:</strong> " + datos.name + "</p>" +
            "<p><strong>ID:</strong> " + datos.id + "</p>" +
            "<img src='" + datos.sprites.front_default + "'>" +
            "<br>" +
            "<button id='add-to-collection-btn'>Agregar a la colección</button>";

        document.getElementById("add-to-collection-btn").addEventListener("click", function() {

            agregarPokemon(datos.name, datos.sprites.front_default);

        });

    } catch (error) {

        document.getElementById("result-section").classList.remove("hidden");

        document.getElementById("pokemon-data").innerHTML =
            "<p>Pokemon no encontrado. Intentalo de nuevo.</p>";

    }

}
*/


// Activamos el boton de busqueda.
document.getElementById("search-btn").addEventListener("click", buscarPokemon);


/**
 * Ejercicio 3: Buscar Pokemon con JQuery AJAX.
 */

function buscarPokemonJQueryAJAX() {

    let nombre = $("#pokemon-input").val().toLowerCase();

    if (nombre == "") {
        alert("Introduce el nombre de un Pokemon");
        return;
    }

    $.ajax({

        url: "https://pokeapi.co/api/v2/pokemon/" + nombre,

        method: "GET",

        success: function(datos) {

            $("#result-section").removeClass("hidden");

            $("#pokemon-data").html(
                "<p><strong>Nombre:</strong> " + datos.name + "</p>" +
                "<p><strong>ID:</strong> " + datos.id + "</p>" +
                "<img src='" + datos.sprites.front_default + "'>" +
                "<br>" +
                "<button id='add-to-collection-btn'>Agregar a la colección</button>"
            );

            $("#add-to-collection-btn").on("click", function() {

                agregarPokemon(datos.name, datos.sprites.front_default);

            });

        },

        error: function() {

            $("#result-section").removeClass("hidden");

            $("#pokemon-data").html(
                "<p>Pokemon no encontrado. Intentalo de nuevo.</p>"
            );

        }

    });

}


/**
 * Para utilizar JQuery AJAX:
 *
 * Comenta el evento de buscarPokemon de arriba
 * y descomenta estas dos lineas.
 */

/*
$(document).ready(function() {

    $("#search-btn").on("click", buscarPokemonJQueryAJAX);

});
*/


/**
 * Ejercicio 4: Crear una lista de Pokemon capturados.
 */

// Funcion para agregar Pokemon a la coleccion.
function agregarPokemon(nombre, imagen) {

    let pokemon = {
        nombre: nombre,
        imagen: imagen
    };

    coleccion.push(pokemon);

    alert(nombre + " añadido a tu colección");

}


// Funcion para mostrar la coleccion.
function verColeccion() {

    document.getElementById("collection-section").classList.remove("hidden");

    document.getElementById("collection-list").innerHTML = "";

    for (let i = 0; i < coleccion.length; i++) {

        document.getElementById("collection-list").innerHTML +=
            "<div class='collection-item'>" +
                "<p>" + coleccion[i].nombre + "</p>" +
                "<img src='" + coleccion[i].imagen + "'>" +
            "</div>";

    }

    if (coleccion.length == 0) {

        document.getElementById("collection-list").innerHTML =
            "<p>Todavía no tienes Pokemon en tu colección.</p>";

    }

}


// Activamos el boton de ver coleccion.
document.getElementById("view-collection-btn").addEventListener("click", verColeccion);
