fetch("data.json")
  .then(response => response.json())
  .then(products => {
    const grid = document.querySelector(".grid");
    grid.innerHTML = products.map(p => `
      <div class="card">
        <h3>${p.name}</h3>
        <p><strong>${p.price}</strong></p>
      </div>
    `).join("");
  })
  .catch(error => console.error("Error loading data:", error));
