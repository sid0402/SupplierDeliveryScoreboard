import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data: suppliers, error: supplierError } = await supabase.from('suppliers').select('*');
  
  // Join orders with suppliers to get supplier names and only select needed columns
  const { data: orders, error: orderError } = await supabase
    .from('orders')
    .select(`
      suppliers(name),
      estimated_date,
      delivered_date
    `);

  if (supplierError || orderError) {
    return Response.json({
      error: supplierError?.message || orderError?.message || 'Unknown error'
    }, { status: 500 });
  }

  const transformedOrders = orders?.map(order => ({
    supplier_name: order.suppliers?.name || 'Unknown',
    estimated_date: order.estimated_date,
    delivered_date: order.delivered_date
  })) || [];

  return Response.json({ suppliers, orders: transformedOrders });
}
