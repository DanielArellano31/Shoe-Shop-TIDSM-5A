document.addEventListener('DOMContentLoaded', function () {
    const cartCountElement = document.querySelector('.cart-count');
    const cartItemsElement = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartCountElement.textContent = cart.length;
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            `;
            cartItemsElement.appendChild(itemElement);
            total += item.price;
        });

        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    updateCart();
});