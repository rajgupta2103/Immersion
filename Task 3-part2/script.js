let allProducts = [];
let filteredProducts = [];
let cart = [];

window.onload = () => {
  fetchAllProducts();
};

function fetchAllProducts() {
  fetch("https://dummyjson.com/products?limit=100")
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
      filteredProducts = [...allProducts];
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
      <button class="addToCartBtn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    list.appendChild(card);
  });
}

function searchProduct() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const errorDiv = document.getElementById("searchError");

  if (!query) {
    errorDiv.textContent = "Search field cannot be empty!";
    filteredProducts = [...allProducts];
    sortAndDisplay();
    return;
  }

  errorDiv.textContent = "";
  filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );

  sortAndDisplay();
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

function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const count = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = total.toFixed(2);
}
