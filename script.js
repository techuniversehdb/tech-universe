// Simple JS to load products from data/mobiles.json and show fade-in

document.addEventListener('DOMContentLoaded', () => {
  // current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  fetch('data/mobiles.json')
    .then(res => {
      if(!res.ok) throw new Error('Failed to load mobiles.json');
      return res.json();
    })
    .then(products => renderProducts(products))
    .catch(err => {
      console.error(err);
      const grid = document.getElementById('product-grid');
      grid.innerHTML = '<p class="muted">Unable to load products at the moment.</p>';
    });

  // reveal cards when appended
  function renderProducts(products){
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // clear
    products.forEach((p, idx) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img class="product-img" src="${p.image}" alt="${escapeHtml(p.brand+' '+p.model)}" />
        <div class="mobile-title">${escapeHtml(p.brand)} ${escapeHtml(p.model)}</div>
        <div class="muted">${escapeHtml(p.desc || '')}</div>
        <div class="price-row">
          <div class="price">${escapeHtml(p.price)}</div>
          <div class="emi">${escapeHtml(p.emi)}</div>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;">
          <a class="btn call-btn" href="tel:+917074550550"><i class="fa-solid fa-phone"></i> Call</a>
          <a class="btn wa-btn" href="https://wa.me/917074550550?text=I%20am%20interested%20in%20${encodeURIComponent(p.brand+' '+p.model)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
        </div>
      `;
      grid.appendChild(card);

      // small timeout to create staggered reveal
      setTimeout(() => card.classList.add('visible'), idx * 80);
    });
  }

  // basic XSS-safe text insertion
  function escapeHtml(text){
    if(!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});