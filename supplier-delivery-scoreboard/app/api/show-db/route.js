import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data: suppliers, error: supplierError } = await supabase.from('suppliers').select('*');
  const { data: orders, error: orderError } = await supabase.from('orders').select('*');

  if (supplierError || orderError) {
    return Response.json({
      error: supplierError?.message || orderError?.message || 'Unknown error'
    }, { status: 500 });
  }

  return Response.json({ suppliers, orders });
}
