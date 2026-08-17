let currentProduct = null;

function generatePin() {
  const name = document.getElementById("productName").value;
  const affiliate = document.getElementById("affiliateUrl").value;
  const image = document.getElementById("productImage").value;
  const category = document.getElementById("category").value;

  if (!name) {
    alert("Enter a product name first.");
    return;
  }

  const title = `${name} | Trending ${category} Find`;

  const description =
    `Discover this stylish ${category.toLowerCase()} find. ` +
    `Perfect for anyone looking for affordable and trending fashion. ` +
    `Check the product here: ${affiliate || "Add your EarnKaro link"}`;

  currentProduct = {
    name,
    affiliate,
    image,
    category,
    title,
    description,
    date: new Date().toLocaleString()
  };

  document.getElementById("preview").innerHTML = `
    <div class="pin">
      ${image ? `<img src="${image}" onerror="this.style.display='none'">` : ""}
      <div class="pin-content">
        <h2>${title}</h2>
        <p>${description}</p>
        ${affiliate ? `<a href="${affiliate}" target="_blank">View Product</a>` : ""}
      </div>
    </div>
  `;
}

function saveProduct() {
  if (!currentProduct) {
    alert("Generate a Pin first.");
    return;
  }

  let products =
    JSON.parse(localStorage.getItem("fashionProducts")) || [];

  products.unshift(currentProduct);

  localStorage.setItem(
    "fashionProducts",
    JSON.stringify(products)
  );

  loadHistory();

  alert("Product saved!");
}

function loadHistory() {
  const box = document.getElementById("history");

  let products =
    JSON.parse(localStorage.getItem("fashionProducts")) || [];

  if (products.length === 0) {
    box.innerHTML = "<p>No products saved yet.</p>";
    return;
  }

  box.innerHTML = products.map((p, i) => `
    <div class="history-item">
      <strong>${i + 1}. ${p.name}</strong>
      <p>${p.category}</p>
      <small>${p.date}</small>
      ${p.affiliate
        ? `<br><a href="${p.affiliate}" target="_blank">EarnKaro Link</a>`
        : ""}
    </div>
  `).join("");
}

loadHistory();
