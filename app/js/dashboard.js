document.addEventListener("DOMContentLoaded", async function () {
    const cartCountElement = document.querySelector(".cart-count");
    const productGrid = document.getElementById("product-grid");
  
    try {
      // Obtener los productos desde el servidor
      const response = await fetch("http://127.0.0.1:4000/shoes");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const products = await response.json();
  
      // Renderizar los productos
      renderProducts(products);
  
      // Configurar el filtro de categorías
      document
        .getElementById("category-filter")
        .addEventListener("change", function () {
          const selectedCategory = this.value;
          filterProductsByCategory(selectedCategory);
        });
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      alert("Hubo un problema al cargar los productos.");
    }
  
    /**
     * Renderiza los productos en la cuadrícula.
     * @param {Array} products - Lista de productos.
     */
    function renderProducts(products) {
      productGrid.innerHTML = ""; // Limpiar el contenido actual
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.setAttribute("data-category", product.category);
        productCard.innerHTML = `
          <div class="product-img">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-info">
            <div class="product-category">${product.category}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price-container">
              <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
            <button class="product-btn">Añadir al Carrito</button>
          </div>
        `;
        productGrid.appendChild(productCard);
      });
  
      // Agregar eventos a los botones "Añadir al Carrito"
      document.querySelectorAll(".product-btn").forEach((button) => {
        button.addEventListener("click", function () {
          addProductToCart(button);
        });
      });
    }
  
    /**
     * Filtra los productos por categoría.
     * @param {string} category - Categoría seleccionada.
     */
    function filterProductsByCategory(category) {
      const products = document.querySelectorAll(".product-card");
      products.forEach((product) => {
        if (
          category === "all" ||
          product.getAttribute("data-category") === category
        ) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    }
  
    /**
     * Añade un producto al carrito.
     * @param {HTMLElement} button - Botón que desencadenó el evento.
     */
    function addProductToCart(button) {
      const productCard = button.closest(".product-card");
      const product = {
        name: productCard.querySelector(".product-name").textContent,
        price: parseFloat(
          productCard.querySelector(".product-price").textContent.replace("$", "")
        ),
        category: productCard.querySelector(".product-category").textContent,
        description: productCard.querySelector(".product-description").textContent,
        image: productCard.querySelector(".product-img img").src,
      };
  
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Actualizar el contador del carrito
      cartCountElement.textContent = cart.length;
    }
  });