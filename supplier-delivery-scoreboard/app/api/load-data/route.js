import { generateSuppliers, generateOrders } from '@/lib/dummyData';
import { supabase } from '@/lib/supabaseClient';

export async function POST() {
  const { error: orderDeleteError } = await supabase.from('orders').delete().not('id', 'is', null);
  if (orderDeleteError) {
    return Response.json({ success: false, error: orderDeleteError.message }, { status: 500 });
  }
  const { error: supplierDeleteError } = await supabase.from('suppliers').delete().not('id', 'is', null);
  console.log(supplierDeleteError);
  if (supplierDeleteError) {
    return Response.json({ success: false, error: supplierDeleteError.message }, { status: 500 });
  }

  // Always generate a fresh suppliers array (with just names)
  const suppliers = generateSuppliers();

  // Insert suppliers
  const { data: insertedSuppliers, error: supplierError } = await supabase.from('suppliers').insert(suppliers).select();
  if (supplierError) {
    return Response.json({ success: false, error: supplierError.message }, { status: 500 });
  }

  // Generate new random orders using the real UUIDs
  const orders = generateOrders(insertedSuppliers);

  // Insert orders
  const { error: orderError } = await supabase.from('orders').insert(orders);
  if (orderError) {
    return Response.json({ success: false, error: orderError.message }, { status: 500 });
  }

  return Response.json({ success: true });
}