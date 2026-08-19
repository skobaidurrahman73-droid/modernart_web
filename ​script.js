
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu-YM6PVPXgSZ4aJEpu1tzga24Q84cx8A",
  authDomain: "modern-art-and.firebaseapp.com",
  projectId: "modern-art-and",
  storageBucket: "modern-art-and.firebasestorage.app",
  messagingSenderId: "649230411093",
  appId: "1:649230411093:web:c26937afb866e571c8fbdc",
  measurementId: "G-C723KKLWH3"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// ডিজাইনার প্যানেলের জন্য অর্ডার লোড করার ফাংশন
function loadOrders() {
  const name = document.getElementById('designer-name').value;
  const phone = document.getElementById('designer-phone').value;

  if (!name || !phone) {
    alert("অনুগ্রহ করে নাম এবং ফোন নম্বর দিন!");
    return;
  }

  const ordersList = document.getElementById('orders-list');
  ordersList.innerHTML = "<p>অর্ডার খোঁজা হচ্ছে...</p>";

  db.collection("orders")
    .where("designerPhone", "==", phone)
    .get()
    .then((querySnapshot) => {
      ordersList.innerHTML = "";
      if (querySnapshot.empty) {
        ordersList.innerHTML = "<p>আপনার নামে কোনো অর্ডার পাওয়া যায়নি।</p>";
        return;
      }

      querySnapshot.forEach((doc) => {
        const order = doc.data();
        ordersList.innerHTML += `
          <div style="border:1px solid #ccc; padding:10px; margin:10px 0; border-radius:5px;">
            <h4>কাস্টমার: ${order.customerName || 'অজানা'}</h4>
            <p>বিস্তারিত: ${order.details || 'নেই'}</p>
          </div>
        `;
      });
    })
    .catch((error) => {
      console.error("Error loading orders: ", error);
      ordersList.innerHTML = "<p>ডেটা লোড করতে সমস্যা হয়েছে।</p>";
    });
}

// মেসেজ পাঠানোর ফাংশন
function sendMessage() {
  const msgInput = document.getElementById('msg-input');
  if (msgInput && msgInput.value.trim() !== "") {
    alert("মেসেজ পাঠানো হয়েছে: " + msgInput.value);
    msgInput.value = "";
  }
}
