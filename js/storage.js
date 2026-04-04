const PEDIDOS_MOCK = [
  { id: crypto.randomUUID(), origen: "Clínica Sol", destino: "Lab Central",
    paciente: "P-001", tipo: "sangre", "temp-min": "2", "temp-max": "8" },
  { id: crypto.randomUUID(), origen: "Hospital Norte", destino: "Lab BioTest",
    paciente: "P-002", tipo: "orina", "temp-min": "", "temp-max": "" },
  { id: crypto.randomUUID(), origen: "Clínica Mar", destino: "Lab Central",
    paciente: "P-003", tipo: "tejido", "temp-min": "-20", "temp-max": "-10" },
  { id: crypto.randomUUID(), origen: "Clínica Sol", destino: "Lab Norte",
    paciente: "P-004", tipo: "hisopo", "temp-min": "4", "temp-max": "8" },
]; 

const Storage = {
  KEY: "dashboard_pedidos",
 
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch {
      return [];
    }
  },
  init() {
    // solo carga los datos si no hay datos previos
    if (!localStorage.getItem(this.KEY)) {
      this.save(PEDIDOS_MOCK);
    }
  },
 
  save(pedidos) {
    localStorage.setItem(this.KEY, JSON.stringify(pedidos));
  },
 
  add(pedido) {
    const pedidos = this.getAll();
    pedidos.push(pedido);
    this.save(pedidos);
    return pedidos;
  },
 
  remove(id) {
    const pedidos = this.getAll().filter((p) => p.id !== id);
    this.save(pedidos);
    return pedidos;
  },
};
Storage.init(); 