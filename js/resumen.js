// RESUMEN


const TIPOS = ["sangre", "orina", "tejido", "hisopo", "otros"];

function renderResumen() {
  const pedidos = Storage.getAll();

  // KPIs en esta parte le estuve preguntando a la IA Claude como hacer la idea que tenia en mente
  // Me recomendo usar Set porque no permite duplicados
  document.getElementById("kpi-total").textContent = pedidos.length;

  const tiposUsados = new Set(pedidos.map((pedido) => pedido.tipo).filter(Boolean));
  document.getElementById("kpi-tipos").textContent = tiposUsados.size;

  const origenes = new Set(pedidos.map((pedido) => pedido.origen).filter(Boolean));
  document.getElementById("kpi-origenes").textContent = origenes.size;

  const conTemp = pedidos.filter((pedido) => pedido["temp-min"] !== "" || pedido["temp-max"] !== ""
  ).length;
  document.getElementById("kpi-temps").textContent = conTemp;

  // ultimos pedidos (max 5, mas reciente primero)
  const tbody = document.getElementById("resumen-tbody");
  const tabla = document.getElementById("resumen-tabla");
  const emptyPedidos = document.getElementById("resumen-empty-pedidos");

  tbody.innerHTML = "";

  if (pedidos.length === 0) {
    emptyPedidos.classList.remove("hidden");
    tabla.classList.add("hidden");
  } else {
    emptyPedidos.classList.add("hidden");
    tabla.classList.remove("hidden");
        
    const ultimos = [...pedidos].reverse().slice(0, 5);
    ultimos.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.paciente || "—"}</td>
        <td>${p.origen || "—"}</td>
        <td>${p.destino || "—"}</td>
        <td><span class="badge badge-${p.tipo || "otros"}">${p.tipo || "otros"}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // GRAFICO DE BARRAS
  const container = document.getElementById("bar-chart-container");
  container.innerHTML = "";

  if (pedidos.length === 0) {
    container.innerHTML = '<div class="empty-state">Aún no hay pedidos registrados</div>';
    return;
  }

  const conteo = {};
  TIPOS.forEach((tipo) => (conteo[tipo] = 0));
  pedidos.forEach((pedido) => {
    const tipo = pedido.tipo && conteo[pedido.tipo] !== undefined ? pedido.tipo : "otros";
    conteo[tipo]++;
  });

  // Spread ...le pregunte el nombre a la IA y una explicacion de como funcionaba
  const max = Math.max(...Object.values(conteo), 1);

  TIPOS.forEach((tipo) => {
    const n = conteo[tipo];
    const pct = Math.round((n / max) * 100);

    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <span class="bar-label">${tipo}</span>
      <div class="bar-track">
        <div class="bar-fill" style="width: 0%" data-target="${pct}"></div>
      </div>
      <span class="bar-count">${n}</span>
    `;
    container.appendChild(row);
  });

  // Animacion de entrada, uso de requestAnimationFrame por reocmendacion de Claude
  requestAnimationFrame(() => {
    container.querySelectorAll(".bar-fill").forEach((bar) => {
      bar.style.width = bar.dataset.target + "%";
    });
  });
}
// Actualizar el resumen si se modifican pedidos desde otra pestaña
window.addEventListener("storage", (e) => {
  if (e.key === "dashboard_pedidos") {
    renderResumen();
  }
});

renderResumen();