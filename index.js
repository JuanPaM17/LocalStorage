const btnGuardar = document.getElementById('btnGuardar');
const inputTarea = document.getElementById('inputTarea');
const divAlerta = document.getElementById('divAlerta');
const listaTareas = document.getElementById('listaTareas');
let arrayTarea = [];

btnGuardar.addEventListener('click', function(event) {
    event.preventDefault();
    if (inputTarea.value === "") {
        divAlerta.style.display = "";
    }
});
