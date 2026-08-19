const _supabase = supabase.createClient("https://vicsvputuypcswsmgiuw.supabase.co", "Sb_publishable_JkHwXvnDcICOuBmSQJAN-w_pI0G3smt");

// পেজ নেভিগেশন
function goToAdmin() { window.location.href = "admin.html"; }
function goToDesigner() { window.location.href = "designer.html"; }
function goHome() { window.location.href = "index.html"; }

// কাস্টমার অর্ডার সাবমিট
async function submitOrder() {
  const name = document.getElementById('cust-name')?.value;
  const phone = document.getElementById('des-phone')?.value;
  const details = document.getElementById('order-details')?.value;
  
  if (!name || !phone) { alert("দয়া করে নাম ও ফোন নম্বর লিখুন"); return; }

  const { error } = await _supabase.from('orders').insert([{ 
    customer_name: name, 
    designer_phone: phone,
    details: details 
  }]);
  
  if (error) {
    alert("এরর: " + error.message);
  } else {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('chat-box').style.display = 'block';
    alert("অর্ডার সফল হয়েছে! এখন চ্যাট শুরু করতে পারেন।");
  }
}

// ডিজাইনার অর্ডার লোড
async function loadOrders() {
  const phone = document.getElementById('designer-phone')?.value;
  const list = document.getElementById('orders-list');
  
  if (!phone) { alert("আপনার ফোন নম্বরটি লিখুন"); return; }
  list.innerHTML = "লোড হচ্ছে...";

  const { data, error } = await _supabase.from('orders').select('*').eq('designer_phone', phone);
  
  if (error) {
    list.innerHTML = "এরর: " + error.message;
  } else {
    list.innerHTML = data.length === 0 ? "কোনো অর্ডার পাওয়া যায়নি।" : "";
    data.forEach(o => {
      list.innerHTML += `<div style="border:1px solid #ccc; padding:10px; margin:5px;">
        <strong>কাস্টমার:</strong> ${o.customer_name}<br>
        <strong>বিস্তারিত:</strong> ${o.details || 'নেই'}
      </div>`;
    });
  }
}
