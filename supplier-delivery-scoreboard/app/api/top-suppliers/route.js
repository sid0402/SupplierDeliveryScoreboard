import { calculateTopSuppliers } from '@/lib/calculateTopSuppliers';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  // Fetch all suppliers
  const { data: suppliers, error: supplierError } = await supabase
    .from('suppliers')
    .select('id, name');
  if (supplierError) {
    return Response.json({ error: supplierError.message }, { status: 500 });
  }

  // Fetch all orders
  const { data: orders, error: orderError } = await supabase
    .from('orders')
    .select('supplier_id, estimated_date, delivered_date');
  if (orderError) {
    return Response.json({ error: orderError.message }, { status: 500 });
  }

  // Use the helper function
  const top3 = calculateTopSuppliers(suppliers, orders);

  return Response.json(top3);
}