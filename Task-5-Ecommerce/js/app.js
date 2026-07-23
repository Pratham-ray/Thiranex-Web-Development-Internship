const featuredContainer = document.getElementById("featuredProducts");

if (featuredContainer) {

    const featuredProducts = products.slice(0, 4);

    featuredProducts.forEach(product => {

        featuredContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}"
                 alt="${product.name}"
                 loading="lazy">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p class="price">₹${product.price.toLocaleString()}</p>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <button onclick="location.href='products.html'">

                    View Product

                </button>

            </div>

        </div>

        `;

    });

}