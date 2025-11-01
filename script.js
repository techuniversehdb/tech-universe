fetch('mobiles.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('mobiles');
    data.forEach(phone => {
      const card = document.createElement('div');
      card.classList.add('mobile-card');
      card.innerHTML = `
        <img src="${phone.logo}" alt="${phone.brand} Logo" class="brand-logo">
        <h3>${phone.brand} ${phone.model}</h3>
        <p><strong>Price:</strong> ${phone.price}</p>
        <p><strong>EMI:</strong> ${phone.emi}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading mobiles.json", err));
