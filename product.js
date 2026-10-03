// ================= GET PRODUCT ID =================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id") || "lipstick";


// ================= PRODUCT DATA =================

const products = {

    lipstick: {
        name: "Matte Lipstick",
        category: "MAKEUP",
        price: 499,
        oldPrice: 625,
        discount: "20% OFF",
        rating: "4.5",
        ratingsCount: "120+ ratings",
        image: "image/lipstick.jpg",
        description:
            "A smooth and comfortable matte lipstick designed to give your lips rich colour with a beautiful long-lasting finish."
    },

    serum: {
        name: "Glow Face Serum",
        category: "SKINCARE",
        price: 699,
        oldPrice: 820,
        discount: "15% OFF",
        rating: "4.6",
        ratingsCount: "150+ ratings",
        image: "image/serum.jpg",
        description:
            "A lightweight face serum designed to give your skin a fresh, hydrated and healthy-looking glow."
    },

    facewash: {
        name: "Gentle Face Wash",
        category: "SKINCARE",
        price: 349,
        oldPrice: 399,
        discount: "10% OFF",
        rating: "4.4",
        ratingsCount: "100+ ratings",
        image: "image/facewash.jpg",
        description:
            "A gentle daily face wash that helps remove dirt and excess oil while keeping your skin feeling fresh and clean."
    },

    haircare: {
        name: "Hair Care Kit",
        category: "HAIRCARE",
        price: 799,
        oldPrice: 999,
        discount: "25% OFF",
        rating: "4.7",
        ratingsCount: "180+ ratings",
        image: "image/haircare.jpg",
        description:
            "A complete hair care kit designed for an easy everyday hair care routine and healthy-looking hair."
    }

};


// ================= CURRENT PRODUCT =================

const currentProduct = products[productId] || products.lipstick;


// ================= DISPLAY PRODUCT =================

document.getElementById("productName").textContent =
    currentProduct.name;

document.getElementById("productCategory").textContent =
    currentProduct.category;

document.getElementById("productPrice").textContent =
    `₹${currentProduct.price}`;

document.getElementById("productOldPrice").textContent =
    `₹${currentProduct.oldPrice}`;

document.getElementById("productDiscount").textContent =
    currentProduct.discount;

document.getElementById("productRating").textContent =
    currentProduct.rating;

document.getElementById("productRatingsCount").textContent =
    currentProduct.ratingsCount;

document.getElementById("productDescription").textContent =
    currentProduct.description;

document.getElementById("productImage").src =
    currentProduct.image;

document.getElementById("productImage").alt =
    currentProduct.name;


// ================= QUANTITY =================

let quantity = 1;

const quantityValue = document.getElementById("quantity");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");

increaseButton.addEventListener("click", () => {

    quantity++;

    quantityValue.textContent = quantity;

});


decreaseButton.addEventListener("click", () => {

    if (quantity > 1) {
        quantity--;
    }

    quantityValue.textContent = quantity;

});


// ================= ADD TO BAG =================

const addToBagButton = document.getElementById("addToBag");

addToBagButton.addEventListener("click", () => {

    let cart =
        JSON.parse(localStorage.getItem("glowcartCart")) || [];

    const existingProduct = cart.find(
        item => item.name === currentProduct.name
    );

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            category: currentProduct.category,
            quantity: quantity

        });

    }

    localStorage.setItem(
        "glowcartCart",
        JSON.stringify(cart)
    );

    alert(
        `${currentProduct.name} added to your bag 🛍️`
    );

});


// ================= BUY NOW =================

const buyNowButton = document.getElementById("buyNow");

buyNowButton.addEventListener("click", () => {

    const buyNowProduct = {

        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        category: currentProduct.category,
        quantity: quantity

    };

    localStorage.setItem(
        "glowcartBuyNow",
        JSON.stringify(buyNowProduct)
    );

    alert(
        `Buying ${currentProduct.name} 🛍️`
    );

});


// ================= WISHLIST =================
// ================= WISHLIST =================

const wishlistButton =
    document.getElementById("detailWishlist");


// LOAD WISHLIST

let wishlist =
    JSON.parse(
        localStorage.getItem("glowcartWishlist")
    ) || [];


// CHECK IF PRODUCT IS ALREADY IN WISHLIST

function updateWishlistButton() {

    const exists =
        wishlist.some(
            item =>
                item.name === currentProduct.name
        );


    if (exists) {

        wishlistButton.textContent =
            "♥ Added to Wishlist";

    } else {

        wishlistButton.textContent =
            "♡ Add to Wishlist";

    }

}


// SHOW CURRENT WISHLIST STATUS

updateWishlistButton();


// TOGGLE WISHLIST

wishlistButton.addEventListener("click", () => {

    const existingIndex =
        wishlist.findIndex(
            item =>
                item.name === currentProduct.name
        );


    if (existingIndex !== -1) {

        // REMOVE

        wishlist.splice(existingIndex, 1);

        wishlistButton.textContent =
            "♡ Add to Wishlist";

        alert("Removed from wishlist");

    } else {

        // ADD

        wishlist.push({

            name: currentProduct.name,

            price: `₹${currentProduct.price}`,

            image: currentProduct.image,

            category: currentProduct.category

        });

        wishlistButton.textContent =
            "♥ Added to Wishlist";

        alert("Added to wishlist ❤️");

    }


    // SAVE

    localStorage.setItem(
        "glowcartWishlist",
        JSON.stringify(wishlist)
    );

});