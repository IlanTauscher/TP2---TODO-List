let txt = document.getElementById("myInput");
let btn = document.getElementById("btn");
let error = document.getElementById("error");
let tarea = document.getElementById("tarea");
let myUL = document.getElementById("myUL");

let arraidTareas = [];

btn.addEventListener("click", (e) => {
    myUL.innerHTML = ""
    if(txt.value == ""){
        error.innerHTML = "El campo esta vacío";
    }
    else {
        error.innerHTML = "";
        tarea.innerHTML = txt.value
    }
})