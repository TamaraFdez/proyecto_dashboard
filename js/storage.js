 
const Storage = {
  KEY: "dashboard_pedidos",
 
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch {
      return [];
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