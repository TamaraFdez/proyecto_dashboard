// PEDIDOS

const data = document.getElementById("data");
const btnAdd = document.getElementById("btn-add");
const form = document.getElementById("form");
const nopedidos = document.getElementById("nohaypedidos");
const tabla = document.getElementById("tablaPedidos");
const tbody = tabla.querySelector("tbody");

// Carga inicial desde localStorage
let pedidos = Storage.getAll();

// INICIAR
actualizarVisibilidad();
renderTabla();

// EVENTOS
data.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = new FormData(data);
  const pedido = Object.fromEntries(datos);
  pedido.id = crypto.randomUUID();
  // guardar y devolver array actualizado
  pedidos = Storage.add(pedido); 
  // refrescar vista
  actualizarVisibilidad();
  renderTabla();
  data.reset();
  form.classList.add("hidden");
});

//Evento para hacer aparecer y desaparecer el formulario
btnAdd.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

// FUNCIONES
function actualizarVisibilidad() {
  if (pedidos.length === 0) {
    nopedidos.classList.remove("hidden");
  } else {
    nopedidos.classList.add("hidden");
  }
}

function renderTabla() {
  tbody.innerHTML = "";

  if (pedidos.length === 0) {
    tabla.classList.add("hidden");
    return;
  }

  tabla.classList.remove("hidden");

  pedidos.forEach((pedido) => {
    const fila = document.createElement("tr");
    const campos = ["id", "origen", "destino", "paciente", "tipo", "temp-min", "temp-max"];
    campos.forEach((campo) => {
      const celda = document.createElement("td");
      // Truncar UUID para legibilidad
      if (campo === "id") {
        celda.textContent = pedido[campo].slice(0, 8) + "…";
        celda.title = pedido[campo];
      } else {
        celda.textContent = pedido[campo] || "—";
      }
      fila.appendChild(celda);
    });
    const celdaEliminar = document.createElement("td");
    const btnEliminar = document.createElement("button");

    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");

    btnEliminar.addEventListener("click", () => {
      // eliminar del localStorage
      pedidos = Storage.remove(pedido.id); 
      actualizarVisibilidad();
      renderTabla(); 
      renderResumen(); 
    });

    celdaEliminar.appendChild(btnEliminar);
    fila.appendChild(celdaEliminar);

    tbody.appendChild(fila);
  });
}


