const SUPABASE_URL = "https://vicsvputuypcswsmgiuw.supabase.co";
const SUPABASE_ANON_KEY = "Sb_publishable_JkHwXvnDcICOuBmSQJAN-w_pI0G3smt"; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// এডমিন থেকে অর্ডার যোগ করার ফাংশন
async function addOrder() {
  const customerName = document.getElementById('cust-name')?.value;
  const designerPhone = document.getElementById('des-phone')?.value;
  const details = document.getElementById('order-details')?.value;

  if (!customerName || !designerPhone) {
    alert("কাস্টমারের নাম এবং ডিজাইনারের ফোন নম্বর দিন!");
    return;
  }

  const { error } = await _supabase
    .from('orders')
    .insert([{ customer_name: customerName, designer_phone: designerPhone, details: details }]);

  if (error) {
    alert("এরর: " + error.message);
  } else {
    alert("অর্ডার সফলভাবে যোগ হয়েছে!");
    location.reload();
  }
}

// ডিজাইনার প্যানেলে অর্ডার দেখার ফাংশন
async function loadOrders() {
  const phone = document.getElementById('designer-phone')?.value;
  const list = document.getElementById('orders-list');

  if (!phone) {
    alert("ফোন নম্বরটি লিখুন!");
    return;
  }

  list.innerHTML = "ডাটা লোড হচ্ছে...";

  const { data: orders, error } = await _supabase
    .from('orders')
    .select('*')
    .eq('designer_phone', phone);

  if (error) {
    list.innerHTML = "এরর: " + error.message;
    return;
  }

  list.innerHTML = orders.length === 0 ? "<p>আপনার নম্বরে কোনো অর্ডার পাওয়া যায়নি।</p>" : "";
  
  orders.forEach(order => {
    list.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px 0; border-radius:5px;">
        <p><strong>কাস্টমার:</strong> ${order.customer_name}</p>
        <p><strong>বিস্তারিত:</strong> ${order.details || 'নেই'}</p>
      </div>`;
  });
}
