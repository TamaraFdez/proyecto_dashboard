const data = document.getElementById("data");
const btnAdd = document.getElementById("btn-add");
const form = document.getElementById("form");
const nopedidos = document.getElementById("nohaypedidos");
const tabla = document.getElementById("tablaPedidos");
const tbody = tabla.querySelector("tbody");

const pedidos = [];

data.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = new FormData(data);
  const pedido = Object.fromEntries(datos);
  pedido.id = crypto.randomUUID();
  pedidos.push(pedido);
  actualizarVisibilidad();
  renderTabla();
  form.reset();
});
btnAdd.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

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

    const campos = [
        "id",
      "origen",
      "destino",
      "paciente",
      "tipo",
      "temp-min",
      "temp-max"
    ];
    campos.forEach((campo) => {
      const celda = document.createElement("td");
      celda.textContent = pedido[campo] || "*";
      fila.appendChild(celda);
    });

    tbody.appendChild(fila);
  });
}


