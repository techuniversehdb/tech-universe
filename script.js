// Safe DOM helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// Set year
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;
});

// =====================
// Load product cards
// =====================
fetch('mobiles.json')
  .then(r => {
    if (!r.ok) throw new Error('mobiles.json not found');
    return r.json();
  })
  .then(products => {
    const grid = document.getElementById('product-grid');
    if(!grid) return;
    products.forEach((p, i) => {
      const div = document.createElement('article');
      div.className = 'card';
      // image fallback: if image missing, use a neutral unsplash
      const img = p.image ? p.image : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b7a3b0b2f5b8a437d3a0b12f5e6f9a0';
      div.innerHTML = `
        <img src="${img}" alt="${escapeHtml(p.name)}">
        <h3>${escapeHtml(p.name)}</h3>
        <div class="muted">${escapeHtml(p.spec || '')}</div>
        <p style="margin:6px 0"><strong>Price:</strong> ₹${escapeHtml(String(p.price))}</p>
        <p style="margin:0 0 8px"><strong>EMI:</strong> ${escapeHtml(p.emi)}</p>
        <div style="display:flex;gap:8px;justify-content:center;">
          <a class="btn call-btn" href="tel:+917074550550"><i class="fa-solid fa-phone"></i> Call</a>
          <a class="btn wa-btn" href="https://wa.me/917074550550?text=${encodeURIComponent('Interested in '+p.name)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
        </div>
      `;
      grid.appendChild(div);
      // small reveal stagger
      setTimeout(()=>div.style.opacity = 1, 80 * i);
    });
  })
  .catch(err => {
    console.error(err);
    const grid = document.getElementById('product-grid');
    if(grid) grid.innerHTML = '<p class="muted">Products could not be loaded. Please check mobiles.json</p>';
  });

// simple html escape
function escapeHtml(s){ return String(s || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#039;'); }

// =====================
// Preloader hide
// =====================
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  pre.style.opacity = '0';
  setTimeout(()=> pre.remove(), 550);
});

// =====================
// Dark mode toggle
// =====================
(function(){
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = btn.querySelector('i');
    if(icon){
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
    }
    // persist preference (optional)
    try{ localStorage.setItem('tu-dark', document.body.classList.contains('dark-mode') ? '1' : '0'); }catch(e){}
  });
  // restore
  try{
    if(localStorage.getItem('tu-dark') === '1') document.body.classList.add('dark-mode');
  }catch(e){}
})();
