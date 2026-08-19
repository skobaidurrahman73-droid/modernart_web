const _supabase = supabase.createClient("https://vicsvputuypcswsmgiuw.supabase.co", "Sb_publishable_JkHwXvnDcICOuBmSQJAN-w_pI0G3smt");

// ================= এডমিন প্যানেল =================
// এডমিন: সব ডাটা ও এক্সেস দেখা
async function loadAllOrders() {
  const list = document.getElementById('all-orders');
  if (!list) return;
  list.innerHTML = "লোড হচ্ছে...";
  
  const { data, error } = await _supabase.from('orders').select('*');
  if (error) return list.innerHTML = "এরর: " + error.message;
  
  list.innerHTML = data.length === 0 ? "কোনো ডাটা নেই।" : "";
  data.forEach(o => {
    list.innerHTML += `<div class="order-card">
      <strong>কাস্টমার:</strong> ${o.customer_name || 'নেই'} | 
      <strong>রিসিট:</strong> ${o.details || 'নেই'} | 
      <strong>ডিজাইনার ফোন:</strong> ${o.designer_phone || 'নেই'}
    </div>`;
  });
}

// এডমিন পেজ ওপেন হলে অটো লোড করার জন্য
window.onload = function() {
  if (document.getElementById('all-orders')) {
    loadAllOrders();
  }
};

  loadAllOrders(); // লগিন হলেই সব অর্ডার দেখাবে
}

async function createOrder() {
  const name = document.getElementById('new-name')?.value;
  const desPhone = document.getElementById('new-designer-phone')?.value;
  
  if (!name || !desPhone) return alert("কাস্টমারের নাম এবং ডিজাইনারের ফোন নম্বর দিন!");
  
  const { error } = await _supabase.from('orders').insert([{ customer_name: name, designer_phone: desPhone }]);
  if (error) alert("এরর: " + error.message);
  else {
    alert("অর্ডার সফলভাবে যোগ হয়েছে!");
    loadAllOrders();
  }
}

async function loadAllOrders() {
  const list = document.getElementById('all-orders');
  if (!list) return;
  
  list.innerHTML = "ডাটা লোড হচ্ছে...";
  const { data, error } = await _supabase.from('orders').select('*');
  
  if (error) { list.innerHTML = "এরর: " + error.message; return; }
  list.innerHTML = data.length === 0 ? "কোনো অর্ডার নেই।" : "";
  
  data.forEach(o => {
    list.innerHTML += `<div style="border:1px solid #333; padding:10px; margin:5px;">
      <strong>কাস্টমার:</strong> ${o.customer_name} | <strong>ডিজাইনার:</strong> ${o.designer_phone}
    </div>`;
  });
}

// ================= ডিজাইনার প্যানেল =================
async function loadOrders() {
  const phone = document.getElementById('designer-phone')?.value;
  const list = document.getElementById('orders-list');
  
  if (!phone) return alert("ফোন নম্বরটি লিখুন!");
  if (!list) return;

  list.innerHTML = "অর্ডার লোড হচ্ছে...";
  const { data, error } = await _supabase.from('orders').select('*').eq('designer_phone', phone);

  if (error) { list.innerHTML = "এরর: " + error.message; return; }
  list.innerHTML = data.length === 0 ? "আপনার নম্বরে কোনো অর্ডার পাওয়া যায়নি।" : "";
  
  data.forEach(o => {
    list.innerHTML += `<div style="border:1px solid #007bff; padding:10px; margin:5px;">
      <strong>কাস্টমার:</strong> ${o.customer_name}
    </div>`;
  });
}
