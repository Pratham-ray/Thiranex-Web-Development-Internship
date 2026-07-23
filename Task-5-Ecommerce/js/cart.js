const cartContainer = document.getElementById("cartContainer");
const totalPrice = document.getElementById("totalPrice");
const clearCartBtn = document.getElementById("clearCartBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

    cartContainer.innerHTML = `
        <h2 style="text-align:center;">
            🛒 Your cart is empty.
            <br><br>

            <a href="products.html">
                <button>Continue Shopping</button>
            </a>
        </h2>
    `;

    totalPrice.textContent = "";

    return;

}

    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);

        const subtotal = product.price * item.quantity;

        total += subtotal;

        cartContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>₹${product.price.toLocaleString()}</p>

                <p>

                    Quantity :

                    ${item.quantity}

                </p>

                <button onclick="increase(${item.id})">

                    +

                </button>

                <button onclick="decrease(${item.id})">

                    -

                </button>

                <button onclick="removeItem(${item.id})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    totalPrice.textContent =
        "Total : ₹" + total.toLocaleString();

}

function saveCart() {

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    displayCart();

}

function increase(id) {

    const item = cart.find(i => i.id === id);

    item.quantity++;

    saveCart();

}

function decrease(id) {

    const item = cart.find(i => i.id === id);

    if (item.quantity > 1) {

        item.quantity--;

    }

    saveCart();

}

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

}

clearCartBtn.onclick = () => {

    if (confirm("Clear cart?")) {

        cart = [];

        saveCart();

    }

};

displayCart();