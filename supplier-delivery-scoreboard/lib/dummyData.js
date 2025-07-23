// lib/dummyData.js

function pad(n) {
  return n < 10 ? '0' + n : n;
}

function randomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const supplierNames = [
  'Alpha Corp', 'Beta Ltd', 'Gamma Inc', 'Delta LLC', 'Epsilon PLC',
  'Zeta Group', 'Eta Co', 'Theta Enterprises', 'Iota Partners', 'Kappa Solutions'
];

function generateSuppliers() {
  // Always return a new array of supplier objects (with just names)
  return supplierNames.map(name => ({ name }));
}

function generateOrders(insertedSuppliers) {
  const orders = [];
  for (let s = 0; s < insertedSuppliers.length; s++) {
    for (let o = 0; o < 5; o++) {
      // Estimated date in 2023
      const estimated = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      // Delivered date offset by -5 to +15 days
      const delivered = new Date(estimated);
      delivered.setDate(estimated.getDate() + Math.floor(Math.random() * 21) - 5);
      orders.push({
        supplier_id: insertedSuppliers[s].id,
        estimated_date: randomDate(estimated, estimated),
        delivered_date: randomDate(delivered, delivered)
      });
    }
  }
  return orders;
}

export { generateSuppliers, generateOrders };
