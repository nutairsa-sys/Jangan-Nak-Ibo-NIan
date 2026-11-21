// KATALOG CONTOH: ganti dengan produk, harga, dan tautan file resmi sebelum toko dipublikasikan.
let products = [
 {id:1,name:'Excel Project Control',category:'Spreadsheet',format:'XLSX',price:89000,desc:'Template pemantauan progres, biaya, dan status pekerjaan proyek.',visual:'sheet',tone:'blue',tag:'PRODUCTIVITY'},
 {id:2,name:'Engineering Calculation Kit',category:'Engineering',format:'XLSX',price:129000,desc:'Paket lembar hitung teknik untuk membantu pekerjaan perencanaan.',visual:'symbol',tone:'green',tag:'ENGINEERING'},
 {id:3,name:'Business Finance Tracker',category:'Business',format:'XLSX',price:79000,desc:'Catat pemasukan, pengeluaran, anggaran, dan ringkasan keuangan.',visual:'sheet',tone:'sand',tag:'BUSINESS'},
 {id:4,name:'Proposal & Report Templates',category:'Dokumen',format:'DOCX · PDF',price:59000,desc:'Template dokumen profesional untuk proposal dan laporan kerja.',visual:'doc',tone:'purple',tag:'DOCUMENTS'},
 {id:5,name:'Excel Inventory Manager',category:'Spreadsheet',format:'XLSX',price:69000,desc:'Kelola stok, mutasi barang, dan kebutuhan inventaris sederhana.',visual:'sheet',tone:'green',tag:'SPREADSHEET'},
 {id:6,name:'Business Operations Planner',category:'Business',format:'XLSX · PDF',price:99000,desc:'Perencanaan aktivitas, target, dan evaluasi operasional bisnis.',visual:'symbol',tone:'blue',tag:'MANAGEMENT'}
];
let activeCategory='Semua'; let cart=JSON.parse(localStorage.getItem('rd-cart')||'{}');
const headerSearch=document.getElementById('headerSearch');
if(headerSearch){headerSearch.addEventListener('input',()=>{document.getElementById('searchInput').value=headerSearch.value;renderProducts();});}
document.getElementById('searchInput').addEventListener('input',e=>{if(headerSearch)headerSearch.value=e.target.value;});
const rupiah=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const grid=document.getElementById('productGrid'); const count=document.getElementById('resultCount');
function visual(p){if(p.visual==='sheet')return '<div class="mock-sheet"><div class="sheet-top"></div><div class="sheet-grid">'+Array.from({length:20},()=>'<i></i>').join('')+'</div></div>';if(p.visual==='doc')return '<div class="doc-mock">'+Array.from({length:7},()=>'<i></i>').join('')+'</div>';return `<div class="product-symbol">${p.category==='Engineering'?'∑': '◫'}</div>`}
function renderProducts(){const q=document.getElementById('searchInput').value.toLowerCase();const shown=products.filter(p=>(activeCategory==='Semua'||p.category===activeCategory)&&(`${p.name} ${p.category} ${p.desc}`).toLowerCase().includes(q));count.textContent=`${shown.length} produk`;document.getElementById('emptyState').hidden=shown.length>0;grid.innerHTML=shown.map(p=>`<article class="product-card"><div class="product-visual ${p.tone}"><span class="visual-tag">${p.tag}</span>${visual(p)}</div><div class="product-info"><div class="product-meta"><span>${p.category.toUpperCase()}</span><span>${p.format}</span></div><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${rupiah(p.price)}</span><div class="product-actions"><button class="detail-btn" data-detail="${p.id}">Detail</button><button class="add-btn" data-add="${p.id}">+ Keranjang</button></div></div></div></article>`).join('')}
function setCategory(cat){activeCategory=cat;document.querySelectorAll('[data-category]').forEach(el=>el.classList.toggle('selected',el.classList.contains('pill')&&el.dataset.category===cat));document.querySelectorAll('.category-card').forEach(el=>el.classList.toggle('active',el.dataset.category===cat));renderProducts()}
document.querySelectorAll('[data-category]').forEach(el=>el.addEventListener('click',()=>setCategory(el.dataset.category)));document.getElementById('searchInput').addEventListener('input',renderProducts);
function saveCart(){localStorage.setItem('rd-cart',JSON.stringify(cart));renderCart()}
function add(id){cart[id]=(cart[id]||0)+1;saveCart();toast('Produk ditambahkan ke keranjang')}
function renderCart(){const entries=Object.entries(cart).filter(([,qty])=>qty>0);const total=entries.reduce((s,[id,qty])=>s+products.find(p=>String(p.id)===String(id)).price*qty,0);document.getElementById('cartCount').textContent=entries.reduce((s,[,q])=>s+q,0);document.getElementById('cartTotal').textContent=rupiah(total);document.getElementById('cartItems').innerHTML=entries.length?entries.map(([id,qty])=>{const p=products.find(x=>String(x.id)===String(id));return `<div class="cart-line"><div><b>${p.name}</b><small>${rupiah(p.price)} · ${p.format}</small><div class="qty-controls"><button data-qty="${id}" data-delta="-1">−</button><span>${qty}</span><button data-qty="${id}" data-delta="1">+</button></div></div><span class="cart-line-price">${rupiah(p.price*qty)}</span></div>`}).join(''):'<div class="cart-empty">Keranjang masih kosong.<br>Yuk, temukan produk yang Anda butuhkan.</div>';document.getElementById('checkoutBtn').disabled=!entries.length;document.getElementById('checkoutBtn').style.opacity=entries.length?1:.45}
function drawer(open){document.body.classList.toggle('drawer-open',open);document.getElementById('cartDrawer').setAttribute('aria-hidden',String(!open))}
document.getElementById('openCart').onclick=()=>drawer(true);document.getElementById('closeCart').onclick=()=>drawer(false);document.getElementById('backdrop').onclick=()=>drawer(false);
grid.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b)add(b.dataset.add);const d=e.target.closest('[data-detail]');if(d)showProduct(d.dataset.detail)});document.getElementById('cartItems').addEventListener('click',e=>{const b=e.target.closest('[data-qty]');if(!b)return;const id=b.dataset.qty;cart[id]=(cart[id]||0)+(+b.dataset.delta);if(cart[id]<=0)delete cart[id];saveCart()});
const productModal=document.getElementById('productModal');const productModalBackdrop=document.getElementById('productModalBackdrop');
function closeProduct(){productModal.classList.remove('open');productModalBackdrop.classList.remove('open');productModal.setAttribute('aria-hidden','true')}
function showProduct(id){const p=products.find(x=>x.id===id);if(!p)return;document.getElementById('productModalContent').innerHTML=`<div class="eyebrow">${p.category.toUpperCase()} · ${p.format}</div><h2 id="modalProductName">${p.name}</h2><div class="modal-product-visual ${p.tone}">${visual(p)}</div><p>${p.desc}</p><div class="modal-price">${rupiah(p.price)}</div><p class="modal-disclaimer">Informasi ini masih merupakan data contoh untuk pengembangan. Spesifikasi dan file final harus dikonfirmasi penjual.</p><button class="btn btn-gold" data-modal-add="${p.id}">Tambahkan ke keranjang</button>`;productModal.classList.add('open');productModalBackdrop.classList.add('open');productModal.setAttribute('aria-hidden','false')}
document.getElementById('closeProductModal').onclick=closeProduct;productModalBackdrop.onclick=closeProduct;
document.getElementById('productModalContent').addEventListener('click',e=>{const b=e.target.closest('[data-modal-add]');if(b){add(b.dataset.modalAdd);closeProduct();drawer(true)}});
const checkoutModal=document.getElementById('checkoutModal');const checkoutBackdrop=document.getElementById('checkoutModalBackdrop');
function closeCheckout(){checkoutModal.classList.remove('open');checkoutBackdrop.classList.remove('open');checkoutModal.setAttribute('aria-hidden','true')}
function openCheckout(){const entries=Object.entries(cart).filter(([,q])=>q>0);if(!entries.length)return;const total=entries.reduce((sum,[id,q])=>sum+products.find(p=>String(p.id)===String(id)).price*q,0);document.getElementById('checkoutSummary').innerHTML=`<b>Ringkasan</b>${entries.map(([id,q])=>{const p=products.find(x=>String(x.id)===String(id));return `<div>${p.name} × ${q} <strong>${rupiah(p.price*q)}</strong></div>`}).join('')}<div class="summary-total"><b>Total</b><b>${rupiah(total)}</b></div>`;document.getElementById('orderResult').hidden=true;document.getElementById('checkoutForm').hidden=false;checkoutModal.classList.add('open');checkoutBackdrop.classList.add('open');checkoutModal.setAttribute('aria-hidden','false');drawer(false)}
document.getElementById('closeCheckoutModal').onclick=closeCheckout;checkoutBackdrop.onclick=closeCheckout;document.getElementById('checkoutBtn').onclick=openCheckout;
document.getElementById('checkoutForm').addEventListener('submit',async e=>{
 e.preventDefault();const form=e.currentTarget;const submit=form.querySelector('[type=submit]');submit.disabled=true;submit.textContent='Memproses…';
 try{
  const f=new FormData(form);const entries=Object.entries(cart).filter(([,q])=>q>0);
  if(!entries.length)throw new Error('Keranjang kosong.');
  let orderId,total,accessToken='',orderStatus='DEMO — BELUM TERSIMPAN';
  if(window.jniBackend?.ready){
   const result=await window.jniBackend.createOrder({name:f.get('customerName'),email:f.get('customerEmail'),phone:f.get('customerPhone'),note:f.get('customerNote')},entries);
   orderId=result.order_no;total=Number(result.total_amount);accessToken=result.access_token||'';orderStatus='TERSIMPAN DI SERVER — MENUNGGU PEMBAYARAN';
  }else{
   total=entries.reduce((sum,[id,q])=>sum+products.find(p=>String(p.id)===String(id)).price*q,0);orderId='DEMO-'+Date.now().toString().slice(-8);
  }
  const lines=entries.map(([id,q])=>{const p=products.find(x=>String(x.id)===String(id));return `- ${p.name} x${q}`});
  const order=`PESANAN ${orderId} — JANGAN NAK IBO NIAN\nToken akses unduhan: ${accessToken||'Tidak tersedia pada mode demo'}\nNama: ${f.get('customerName')}\nEmail: ${f.get('customerEmail')}\nWhatsApp: ${f.get('customerPhone')}\n\n${lines.join('\n')}\n\nTOTAL: ${rupiah(total)}\nStatus: ${orderStatus}`;
  const resultBox=document.getElementById('orderResult');resultBox.hidden=false;form.hidden=true;
  resultBox.innerHTML=`<h3>${window.jniBackend?.ready?'Pesanan berhasil dicatat':'Mode demo — backend belum aktif'}</h3><p>Nomor referensi: <b>${orderId}</b></p><p>${window.jniBackend?.ready?'Pesanan tersimpan di database dan menunggu verifikasi pembayaran admin. Unduhan baru aktif setelah status lunas diverifikasi.':'Pesanan ini hanya dibuat di browser dan tidak tersimpan di server. Konfigurasikan Supabase untuk mengaktifkan penyimpanan pesanan.'}</p>${accessToken?`<p><b>Simpan token akses unduhan ini.</b> Token hanya ditampilkan sekali dan diperlukan setelah pembayaran diverifikasi.</p><code class="access-token">${accessToken}</code><button class="btn btn-outline" id="copyToken">Salin token akses</button><button class="btn btn-outline" id="requestDownloads">Periksa unduhan</button><div id="downloadLinks"></div>`:''}<button class="btn btn-gold" id="copyOrder">Salin ringkasan</button> <button class="btn btn-outline" id="downloadOrder">Unduh TXT</button>`;
  if(accessToken){document.getElementById('copyToken').onclick=()=>navigator.clipboard?.writeText(accessToken).then(()=>toast('Token disalin. Simpan dengan aman.')).catch(()=>toast('Clipboard tidak tersedia'));document.getElementById('requestDownloads').onclick=async()=>{try{const files=await window.jniBackend.requestDownloads(orderId,accessToken);document.getElementById('downloadLinks').innerHTML=files.map(x=>`<p><b>${x.product_name}</b><br><a href="${x.url}" target="_blank" rel="noopener">Unduh file (tautan berlaku 5 menit)</a></p>`).join('')}catch(err){toast(err.message||'Unduhan belum tersedia.')}};}
  document.getElementById('copyOrder').onclick=()=>navigator.clipboard?.writeText(order).then(()=>toast('Ringkasan disalin')).catch(()=>toast('Clipboard tidak tersedia'));
  document.getElementById('downloadOrder').onclick=()=>{const blob=new Blob([order],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${orderId}.txt`;a.click();URL.revokeObjectURL(url)};
  if(window.jniBackend?.ready){cart={};saveCart();}
 }catch(err){toast(err.message||'Pesanan gagal diproses.');}
 finally{submit.disabled=false;submit.textContent='Buat ringkasan pesanan';}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeProduct();closeCheckout();drawer(false)}});
let toastTimer;function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
document.getElementById('year').textContent=new Date().getFullYear();
async function initMarketplace(){
 if(window.jniBackend?.ready){
  const {data,error}=await window.jniBackend.client.from('products').select('id,name,category,description,format,price').eq('is_active',true).order('created_at',{ascending:false});
  if(error){toast('Katalog online gagal dimuat: '+error.message);products=[];}
  else{products=(data||[]).map(p=>({id:p.id,name:p.name,category:p.category,format:p.format,price:Number(p.price),desc:p.description,visual:'sheet',tone:'blue',tag:String(p.category).toUpperCase()}));const validIds=new Set(products.map(p=>String(p.id)));cart=Object.fromEntries(Object.entries(cart).filter(([id])=>validIds.has(String(id))));localStorage.setItem('rd-cart',JSON.stringify(cart));}
 }
 renderProducts();renderCart();
}
initMarketplace();
