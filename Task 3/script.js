let allProducts = [];
let filteredProducts = [];

window.onload = () => {
  fetchAllProducts();
};

function fetchAllProducts() {
  fetch("https://dummyjson.com/products?limit=100")
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
      filteredProducts = [...allProducts]; // Initially, same as all
      displayProducts(filteredProducts);
    })
    .catch(err => {
      console.error("Error fetching products:", err);
      document.getElementById("productList").textContent = "Failed to load products.";
    });
}

function displayProducts(products) {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  if (products.length === 0) {
    list.textContent = "No products found.";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "productCard";
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p><strong>Price:</strong> $${product.price}</p>
    `;
    list.appendChild(card);
  });
}

function searchProduct() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const errorDiv = document.getElementById("searchError");

  if (!query) {
    errorDiv.textContent = "Search field cannot be empty!";
    filteredProducts = [...allProducts]; // Reset to all products
    sortAndDisplay();
    return;
  }

  errorDiv.textContent = "";
  filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );

  sortAndDisplay(); // Will display filtered + sorted
}

function sortAndDisplay() {
  const sortValue = document.getElementById("sortSelect").value;

  let sorted = [...filteredProducts];

  if (sortValue === "lowToHigh") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortValue === "highToLow") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayProducts(sorted);
}
