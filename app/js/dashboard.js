document.addEventListener('DOMContentLoaded', function () {
    const cartCountElement = document.querySelector('.cart-count');
    let cartCount = parseInt(cartCountElement.textContent);

    const addToCartButtons = document.querySelectorAll('.product-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            cartCount++;
            cartCountElement.textContent = cartCount;
        });
    });

    // Obtener productos desde la base de datos o usar productos por defecto
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            return response.json();
        })
        .then(products => {
            renderProducts(products);
        })
        .catch(error => {
            console.error('Error:', error);
            // Usar productos por defecto si la API falla
            const defaultProducts = [
                {
                    id: 1,
                    name: "Zapatilla Runner Pro",
                    category: "Deportivos",
                    description: "Zapatillas deportivas ultraligeras para correr, con amortiguación superior.",
                    price: 89.99,
                    image: "https://th.bing.com/th/id/R.171741ec8df0e69b17f34b40b79c197b?rik=DdTkI8G0n2MH9A&pid=ImgRaw&r=0"
                },
                {
                    id: 2,
                    name: "Mocasín Urbano Classic",
                    category: "Casual",
                    description: "Mocasines elegantes y cómodos para uso diario, cuero genuino.",
                    price: 75.50,
                    image: "https://img.kwcdn.com/product/fancy/a294d3d8-3636-4506-a6de-52a017cd0d86.jpg"
                },
                {
                    id: 3,
                    name: "Oxford Elegance",
                    category: "Formal",
                    description: "Zapatos formales con diseño clásico, perfectos para eventos especiales.",
                    price: 120.00,
                    image: "https://img.kwcdn.com/product/fancy/92d18497-f406-4c3d-9200-2c9079faaeb2.jpg"
                },
                {
                    id: 4,
                    name: "Bota Adventure Trek",
                    category: "Botas",
                    description: "Botas resistentes al agua, ideal para aventuras al aire libre.",
                    price: 149.99,
                    image: "https://img.kwcdn.com/product/fancy/17a55294-5096-4460-8dda-f31aed0f1b97.jpg"
                }
            ];
            renderProducts(defaultProducts);
        });

    // Función para renderizar productos
    function renderProducts(products) {
        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('data-category', product.category);
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

        // Agregar eventos a los botones de "Añadir al Carrito" después de renderizar
        document.querySelectorAll('.product-btn').forEach(button => {
            button.addEventListener('click', function () {
                cartCount++;
                cartCountElement.textContent = cartCount;
            });
        });
    }

    // Filtro de categorías
    document.getElementById('category-filter').addEventListener('change', function () {
        const selectedCategory = this.value;
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            if (selectedCategory === 'all' || product.getAttribute('data-category') === selectedCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});