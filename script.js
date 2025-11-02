// script.js
// Loads mobiles.json and renders a unified Bootstrap grid.
// Also inserts product JSON-LD snippets (generated from the JSON) for SEO consumption by crawlers that render JS.

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  loadProducts();
});

async function loadProducts(){
  try {
    const res = await fetch('mobiles.json', {cache: "no-store"});
    if(!res.ok) throw new Error('mobiles.json not found');
    const products = await res.json();
    renderGrid(products);
    injectJsonLd(products);
  } catch (err) {
    console.error(err);
    const grid = document.getElementById('grid');
    if(grid) grid.innerHTML = '<div class="col-12 text-danger">Unable to load product data. Please check mobiles.json</div>';
  }
}

function renderGrid(products){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  products.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <article class="card card-phone h-100 shadow-sm">
        <img loading="lazy" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.brand + ' ' + p.model)}" class="card-img-top">
        <div class="card-body d-flex flex-column">
          <div class="mb-2">
            <span class="badge bg-light text-dark badge-brand">${escapeHtml(p.brand)}</span>
          </div>
          <h5 class="card-title mb-1">${escapeHtml(p.model)}</h5>
          <p class="text-muted small mb-2">${escapeHtml(p.spec || '')}</p>
          <div class="mt-auto">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="fw-bold">₹${numberWithCommas(p.price_inr)}</div>
              <div class="text-muted small">${escapeHtml(p.emi || '')}</div>
            </div>
            <div class="d-flex gap-2">
              <a class="btn btn-outline-primary btn-sm" target="_blank" rel="noopener" href="${escapeHtml(p.source)}"><i class="fa-solid fa-link"></i> Official</a>
              <a class="btn btn-success btn-sm" href="https://wa.me/917074550550?text=${encodeURIComponent('Interested in '+p.brand+' '+p.model)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Ask</a>
            </div>
          </div>
        </div>
      </article>
    `;
    grid.appendChild(col);
  });
}

// inject lightweight product-level JSON-LD for SEO (multiple products)
function injectJsonLd(products){
  // Create one Product schema array (we'll add as a large JSON-LD block)
  const items = products.map(p => ({
    "@type": "Product",
    "name": `${p.brand} ${p.model}`,
    "image": p.image,
    "brand": { "@type": "Brand", "name": p.brand },
    "offers": {
      "@type": "Offer",
      "url": p.source,
      "priceCurrency": "INR",
      "price": String(p.price_inr),
      "availability": "https://schema.org/InStock"
    }
  }));
  const ld = {
    "@context": "https://schema.org",
    "@graph": items
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
}

// helpers
function numberWithCommas(x){ return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function escapeHtml(s){
  if(!s) return '';
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}