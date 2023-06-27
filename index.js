
// Variables globales
const btnGuardar = document.getElementById('btnGuardar');
const inputTarea = document.getElementById('inputTarea');
const divAlerta = document.getElementById('divAlerta');
const listaTareas = document.getElementById('listaTareas');
const btnEliminar = document.getElementsByClassName('btnEliminar');
const btnHecho = document.getElementsByClassName('btnHecho');
let arrayTareas = [];

// Funciones
function eliminarTarea(tarea) {
    return function () {
        eliminarLocalStorage(tarea);
    }
};


function tareaHecha(tarea) {
    return function () {
        editarLocalStorage(tarea);
    }

};

// ---> Creamos un objeto tipo tarea y lo añadimos al array
function crearTarea(nombre_tarea) {
    let tarea = {
        tarea: nombre_tarea,
        estado: false
    };
    arrayTareas.push(tarea);
};

// ---> Eliminar la tarea del LocalStorage
function eliminarLocalStorage(tarea) {
    let indexTarea = 0;
    arrayTareas.forEach((element, index) => {
        if (element.tarea === tarea) {
            indexTarea = index;
        }
    });
    arrayTareas.splice(indexTarea, 1);
    guardarLocalStorage();
};

// ---> Editar la tarea del LocalStorage
function editarLocalStorage(tarea) {
    let indexTarea = arrayTareas.findIndex((element)=>element.tarea===tarea)
    arrayTareas[indexTarea].estado = true;
    guardarLocalStorage();
}

// ---> Guardamos el array de tareas en el LocalStorage
function guardarLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(arrayTareas));
    listarLocalStorage();
};

// ---> Toma el array de tareas del LocalStorage y lo pone en el html
function listarLocalStorage() {
    listaTareas.innerHTML = "";
    arrayTareas = JSON.parse(localStorage.getItem('tareas'));
    if (arrayTareas === null) {
        arrayTareas = [];
    }
    arrayTareas.forEach(element => {
        if (element.estado === false) {
            listaTareas.innerHTML += `<div class="alert alert-light" role="alert">
            <b>${element.tarea}</b>
            <span class="acciones">
                <button class="btn btn-success btnHecho" data-params="${element.tarea}">Hecho</button>
                <button class="btn btn-danger btnEliminar" data-params="${element.tarea}">Eliminar</button></span></div>`;
        } else {
            listaTareas.innerHTML += `<div class="alert alert-success" role="alert">
            <b>${element.tarea}</b>
            <span class="acciones">
                <button class="btn btn-danger btnEliminar" data-params="${element.tarea}">Eliminar</button></span></div>`;
        }
    });


    // ---> Asignar evento para marcar la tarea como realizada
    for (var i = 0; i < btnHecho.length; i++) {
        const datos = btnHecho[i].getAttribute('data-params').split(',');
        btnHecho[i].addEventListener('click', tareaHecha(datos[0]));
    };

    // ---> Asignar evento  para eliminar la tarea
    for (var i = 0; i < btnEliminar.length; i++) {
        const datos = btnEliminar[i].getAttribute('data-params').split(',');
        btnEliminar[i].addEventListener('click', eliminarTarea(datos[0]));
    };
};


// EventListener
// ---> Click en el boton añadir tarea
btnGuardar.addEventListener('click', function (event) {
    event.preventDefault();
    if (inputTarea.value === "") {
        divAlerta.style.display = "";
    } else {
        divAlerta.style.display = "none";
        crearTarea(inputTarea.value);
        guardarLocalStorage();
        inputTarea.value = "";
    }
});

listarLocalStorage();

