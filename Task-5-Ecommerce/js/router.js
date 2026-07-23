const container =
document.getElementById("productDetails");

const params =
new URLSearchParams(window.location.search);

const id =
Number(params.get("id"));

const product =
products.find(p=>p.id===id);

if(product){

container.innerHTML=`

<div
style="
display:flex;
gap:50px;
flex-wrap:wrap;
align-items:center;
">

<img
src="${product.image}"
alt="${product.name}"
style="
width:450px;
max-width:100%;
border-radius:20px;
box-shadow:0 10px 30px rgba(0,0,0,.2);
">

<div>

<h1>

${product.name}

</h1>

<h2
style="
margin:20px 0;
color:#2563eb;
">

₹${product.price.toLocaleString()}

</h2>

<p>

<strong>

Category:

</strong>

${product.category}

</p>

<p
style="margin-top:20px;">

${product.description}

</p>

<p
style="margin-top:20px;">

⭐ ${product.rating}

</p>

<button
onclick="addToCart(${product.id})"
style="
margin-top:30px;
padding:15px 30px;
background:#2563eb;
color:white;
border:none;
border-radius:10px;
cursor:pointer;
">

Add to Cart

</button>

</div>

</div>

`;

}

function addToCart(id){

let cart=

JSON.parse(

localStorage.getItem("cart")

)||[];

const existing=

cart.find(item=>item.id===id);

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

alert("Added to cart!");

}