document.addEventListener('DOMContentLoaded', function () {
    const cartItemsElement = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItemsElement.innerHTML = ''; 
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="item-img">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-category">${item.category}</div>
                    <div class="item-description">${item.description}</div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                    <button class="remove-btn" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);
            total += item.price;
        });

        cartTotalElement.textContent = `$${total.toFixed(2)}`;

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = button.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        cart.splice(index, 1); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        renderCart();
    }

    renderCart();
});