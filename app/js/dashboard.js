document.addEventListener('DOMContentLoaded', function () {
    const cartCountElement = document.querySelector('.cart-count');
    const productGrid = document.getElementById('product-grid');

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

    
    function renderProducts(products) {
        productGrid.innerHTML = '';
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

       
        document.querySelectorAll('.product-btn').forEach(button => {
            button.addEventListener('click', function () {
                const productCard = button.closest('.product-card');
                const product = {
                    name: productCard.querySelector('.product-name').textContent,
                    price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '')),
                    category: productCard.querySelector('.product-category').textContent,
                    description: productCard.querySelector('.product-description').textContent,
                    image: productCard.querySelector('.product-img img').src,
                };

                
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));

                
                cartCountElement.textContent = cart.length;

                
                alert(`${product.name} se ha añadido al carrito.`);
            });
        });
    }

    renderProducts(defaultProducts);

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