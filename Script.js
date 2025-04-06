const inputTarea = document.getElementById("myInput");
const btnAgregar = document.getElementById("btn");
const error = document.getElementById("error");
const listaTareas = document.getElementById("myUL");
const btnTareaMasRapida = document.getElementById("btnFastest");
const spanTareaMasRapida = document.getElementById("fastestTask");

let tareas = [];

function renderizarTareas() {
  listaTareas.innerHTML = "";

  tareas.forEach((tarea, index) => {

    let li = document.createElement("li");
    if (tarea.completada) {
      li.classList.add("checked");
    }
    
    let pTexto = document.createElement("p");
    pTexto.textContent = tarea.texto;
    li.appendChild(pTexto);

    let pCreada = document.createElement("p");
    pCreada.textContent = "Creada: " + tarea.creada.toLocaleString();
    li.appendChild(pCreada);
    
    if (tarea.completada && tarea.completadaEn) {
      let pCompletada = document.createElement("p");
      pCompletada.textContent = "Completada: " + tarea.completadaEn.toLocaleString();
      li.appendChild(pCompletada);
    }

    let spanCerrar = document.createElement("span");
    spanCerrar.textContent = "X";
    spanCerrar.className = "close";
    spanCerrar.addEventListener("click", (e) => {
      e.stopPropagation();
      tareas.splice(index, 1);
      renderizarTareas();
    });
    li.appendChild(spanCerrar);
    
    li.addEventListener("click", () => {
      if (!tarea.completada) {
        tarea.completada = true;
        tarea.completadaEn = new Date();
      } else {
        tarea.completada = false;
        tarea.completadaEn = null;
      }
      renderizarTareas();
    });
    
    listaTareas.appendChild(li);
  });
}

btnAgregar.addEventListener("click", () => {
  if (inputTarea.value.trim() === "") {
    error.textContent = "El campo está vacío";
    return;
  }
  error.textContent = "";
  
  let nuevaTarea = {
    texto: inputTarea.value,
    creada: new Date(),
    completada: false,
    completadaEn: null
  };
  
  tareas.push(nuevaTarea);
  inputTarea.value = "";
  renderizarTareas();
});

btnTareaMasRapida.addEventListener("click", () => {
  let tareasCompletadas = tareas.filter(tarea => tarea.completada && tarea.completadaEn);
  
  if (tareasCompletadas.length === 0) {
    spanTareaMasRapida.textContent = "No hay tareas completadas.";
    return;
  }
  
  let tareaMasRapida = tareasCompletadas.reduce((prev, curr) => {
    let prevTiempo = prev.completadaEn - prev.creada;
    let currTiempo = curr.completadaEn - curr.creada;
    return currTiempo < prevTiempo ? curr : prev;
  });
  
  let duracion = tareaMasRapida.completadaEn - tareaMasRapida.creada;
  let segundos = (duracion / 1000).toFixed(2);
  
  spanTareaMasRapida.textContent = `La tarea más rápida fue "${tareaMasRapida.texto}" en ${segundos} segundos.`;
});
