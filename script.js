// Load Products
fetch('mobiles.json')
  .then(res => res.json())
  .then(data => {
    const productList = document.getElementById('product-list');
    data.forEach(mobile => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${mobile.image}" alt="${mobile.name}">
        <h3>${mobile.name}</h3>
        <p>₹${mobile.price}</p>
        <p><b>EMI:</b> ${mobile.emi}</p>
      `;
      productList.appendChild(card);
    });
  });

// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => preloader.style.display = "none", 500);
});

// Dark Mode
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = toggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});
