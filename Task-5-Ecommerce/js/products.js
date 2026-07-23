const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let filteredProducts = [...products];

// Display Products
function displayProducts(productList) {

    productsContainer.innerHTML = "";

    if (productList.length === 0) {

        productsContainer.innerHTML = `
            <h2 style="text-align:center;grid-column:1/-1;">
                No products found.
            </h2>
        `;

        return;
    }

    productList.forEach(product => {

        productsContainer.innerHTML += `

        <div class="product-card">

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p class="price">
                    ₹${product.price.toLocaleString()}
                </p>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <button onclick="viewProduct(${product.id})">
                    View Details
                </button>

                <button
                    style="margin-top:10px;background:#16a34a;"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        </div>

        `;

    });

}

// Search
searchInput.addEventListener("input", filterProducts);

// Category Filter
categoryFilter.addEventListener("change", filterProducts);

function filterProducts() {

    const search = searchInput.value.toLowerCase();

    const category = categoryFilter.value;

    filteredProducts = products.filter(product => {

        const matchSearch =
            product.name.toLowerCase().includes(search);

        const matchCategory =
            category === "All" ||
            product.category === category;

        return matchSearch && matchCategory;

    });

    displayProducts(filteredProducts);

}

// View Product
function viewProduct(id){

    window.location.href =
        `product.html?id=${id}`;

}

// Add to Cart
function addToCart(id){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existing =
        cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    }
    else{

        cart.push({

            id:id,

            quantity:1

        });

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    alert("Product added to cart!");

}

// Initial Load
displayProducts(products);