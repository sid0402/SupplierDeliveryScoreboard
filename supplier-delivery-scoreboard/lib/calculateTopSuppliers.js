function calculateTopSuppliers(suppliers, orders) {
    const supplierScores = suppliers.map(supplier => {
      const supplierOrders = orders.filter(o => o.supplier_id === supplier.id);
      const onTime = supplierOrders.filter(
        o => new Date(o.delivered_date) <= new Date(o.estimated_date)
      ).length;
      const score = supplierOrders.length > 0 ? (onTime / supplierOrders.length) * 100 : 0;
      return { name: supplier.name, score: Math.round(score) };
    });
  
    // Sort and return top 3
    return supplierScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }
  
  module.exports = { calculateTopSuppliers };