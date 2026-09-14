// SHOPORA - CART SYSTEM
// =====================


// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("shoporaCart")) || [];


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    if (!product) {
        alert("Product not found!");
        return;
    }

    const existingProduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1
        });

    }

    localStorage.setItem("shoporaCart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");
}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    const cartCount = document.querySelector(".cart-count");

    if (!cartCount) {
        return;
    }

    const totalItems = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
}


// ==========================================
// REMOVE PRODUCT FROM CART
// ==========================================

function removeFromCart(productId) {

    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    localStorage.setItem("shoporaCart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(productId, change) {

    const product = cart.find(function(item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    product.quantity += change;

    if (product.quantity <= 0) {

        removeFromCart(productId);

        return;
    }

    localStorage.setItem("shoporaCart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}


// ==========================================
// DISPLAY CART PRODUCTS
// ==========================================

function displayCart() {

    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) {
        return;
    }


    // EMPTY CART
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">

                <h3>Your cart is empty 🛒</h3>

                <p>Add some products to your cart.</p>

                <a href="products.html">
                    Continue Shopping
                </a>

            </div>
        `;

        updateCartSummary();

        return;
    }


    // CART PRODUCTS
    cartContainer.innerHTML = cart.map(function(item) {

        return `
            <div class="cart-item">

                <img 
                    src="${item.image}" 
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>$${Number(item.price).toFixed(2)}</p>


                    <div class="quantity-controls">

                        <button 
                            onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button 
                            onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>


                    <p>
                        Item Total:
                        <strong>
                            $${(Number(item.price) * item.quantity).toFixed(2)}
                        </strong>
                    </p>


                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})">

                        Remove

                    </button>

                </div>

            </div>
        `;

    }).join("");


    updateCartSummary();
}


// ==========================================
// UPDATE CART SUMMARY
// ==========================================

function updateCartSummary() {

    const totalItemsElement =
        document.getElementById("cart-total-items");

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const totalElement =
        document.getElementById("cart-total");


    // TOTAL ITEMS
    const totalItems = cart.reduce(function(total, item) {

        return total + item.quantity;

    }, 0);


    // SUBTOTAL
    const subtotal = cart.reduce(function(total, item) {

        return total + (Number(item.price) * item.quantity);

    }, 0);


    // DISPLAY TOTAL ITEMS
    if (totalItemsElement) {

        totalItemsElement.textContent = totalItems;

    }


    // DISPLAY SUBTOTAL
    if (subtotalElement) {

        subtotalElement.textContent =
            "$" + subtotal.toFixed(2);

    }


    // DISPLAY TOTAL
    if (totalElement) {

        totalElement.textContent =
            "$" + subtotal.toFixed(2);

    }
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();

    displayCart();

});
