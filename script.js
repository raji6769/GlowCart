let cart =
    JSON.parse(localStorage.getItem("glowcartCart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("glowcartWishlist")) || [];


// ================= ELEMENTS =================

const cartIcon = document.getElementById("cartIcon");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.querySelector(".cart-count");

const wishlistIcon = document.getElementById("wishlistIcon");

const searchIcon = document.getElementById("searchIcon");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.getElementById("closeSearch");
const searchResults = document.getElementById("searchResults");


// ================= CART OPEN =================

cartIcon.addEventListener("click", () => {

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

});

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


function closeCartPanel() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

}


// ================= GET PRODUCT =================

function getProductInfo(card) {

    const image =
        card.querySelector(".product-image img");

    return {

        name:
            card.querySelector("h3").textContent.trim(),

        price:
            Number(
                card
                    .querySelector(".current-price")
                    .textContent
                    .replace("₹", "")
                    .replace(",", "")
            ),

        image:
            image.getAttribute("src"),

        category:
            card
                .querySelector(".product-category")
                .textContent
                .trim()

    };

}


// ================= ADD TO BAG =================

document
    .querySelectorAll(".bag-button")
    .forEach(button => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const card =
                button.closest(".product-card");

            const product =
                getProductInfo(card);

            const existing =
                cart.find(
                    item =>
                        item.name === product.name
                );


            if (existing) {

                existing.quantity++;

            } else {

                cart.push({

                    name: product.name,

                    price: product.price,

                    image: product.image,

                    category: product.category,

                    quantity: 1

                });

            }


            updateCart();


            cartPanel.classList.add("active");

            cartOverlay.classList.add("active");

        });

    });


// ================= UPDATE CART =================

function updateCart() {

    localStorage.setItem(
        "glowcartCart",
        JSON.stringify(cart)
    );

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <h3>Your bag is empty</h3>

                <p>Add some beauty products!</p>

            </div>

        `;

        cartTotal.textContent = "₹0";

        cartCount.textContent = "0";

        return;

    }


    let total = 0;

    let count = 0;


    cart.forEach((item, index) => {

        total +=
            item.price * item.quantity;

        count += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <div class="cart-product-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-product-info">

                <p class="cart-category">
                    ${item.category}
                </p>

                <h3>
                    ${item.name}
                </h3>

                <strong>
                    ₹${item.price}
                </strong>


                <div class="quantity-controls">

                    <button class="quantity-minus">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button class="quantity-plus">
                        +
                    </button>

                </div>

            </div>


            <button class="remove-item">
                ✕
            </button>

        `;


        cartItems.appendChild(div);


        // MINUS

        div
            .querySelector(".quantity-minus")
            .addEventListener("click", () => {

                if (item.quantity > 1) {

                    item.quantity--;

                } else {

                    cart.splice(index, 1);

                }

                updateCart();

            });


        // PLUS

        div
            .querySelector(".quantity-plus")
            .addEventListener("click", () => {

                item.quantity++;

                updateCart();

            });


        // REMOVE

        div
            .querySelector(".remove-item")
            .addEventListener("click", () => {

                cart.splice(index, 1);

                updateCart();

            });

    });


    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

    cartCount.textContent = count;

}


// ================= WISHLIST =================

document
    .querySelectorAll(".wishlist")
    .forEach(button => {

        const card =
            button.closest(".product-card");

        const product =
            getProductInfo(card);


        if (
            wishlist.some(
                item =>
                    item.name === product.name
            )
        ) {

            button.textContent = "♥";

        }


        button.addEventListener("click", (event) => {

           event.stopPropagation();

            const index =
                wishlist.findIndex(
                    item =>
                        item.name === product.name
                );


            if (index === -1) {

                wishlist.push({

                    name: product.name,

                    price: `₹${product.price}`,

                    image: product.image,

                    category: product.category

                });

                button.textContent = "♥";

            } else {

                wishlist.splice(index, 1);

                button.textContent = "♡";

            }


            localStorage.setItem(
                "glowcartWishlist",
                JSON.stringify(wishlist)
            );

        });

    });


// ================= SHOW WISHLIST =================

wishlistIcon.addEventListener(
    "click",
    showWishlist
);


function showWishlist() {

    const old =
        document.querySelector(".wishlist-popup");

    if (old) {
        old.remove();
    }


    const popup =
        document.createElement("div");

    popup.className =
        "wishlist-popup";


    popup.innerHTML = `

        <div class="wishlist-popup-content">

            <div class="wishlist-header">

                <h2>
                    My Wishlist 💗
                </h2>

                <button class="close-wishlist">
                    ✕
                </button>

            </div>

            <div class="wishlist-products"></div>

        </div>

    `;


    document.body.appendChild(popup);


    const container =
        popup.querySelector(".wishlist-products");


    if (wishlist.length === 0) {

        container.innerHTML = `

            <div class="wishlist-empty">

                <div style="font-size:60px;">
                    ♡
                </div>

                <h3>
                    Your wishlist is empty
                </h3>

                <p>
                    Save your favourite products here.
                </p>

            </div>

        `;

    } else {

        wishlist.forEach((item, index) => {

            const div =
                document.createElement("div");

            div.className =
                "wishlist-item";


            div.innerHTML = `

                <div class="wishlist-product-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="wishlist-product-info">

                    <p class="wishlist-category">
                        ${item.category}
                    </p>

                    <h3>
                        ${item.name}
                    </h3>

                    <strong>
                        ${item.price}
                    </strong>

                    <button class="wishlist-add-cart">
                        Add to Bag
                    </button>

                </div>


                <button class="wishlist-remove">
                    ♥
                </button>

            `;


            container.appendChild(div);


            // ADD WISHLIST ITEM TO CART

            div
                .querySelector(".wishlist-add-cart")
                .addEventListener("click", () => {

                    const price =
                        Number(
                            item.price
                                .replace("₹", "")
                                .replace(",", "")
                        );


                    const existing =
                        cart.find(
                            product =>
                                product.name === item.name
                        );


                    if (existing) {

                        existing.quantity++;

                    } else {

                        cart.push({

                            name: item.name,

                            price: price,

                            image: item.image,

                            category: item.category,

                            quantity: 1

                        });

                    }


                    updateCart();


                    cartPanel.classList.add("active");

                    cartOverlay.classList.add("active");

                });


            // REMOVE WISHLIST

            div
                .querySelector(".wishlist-remove")
                .addEventListener("click", () => {

                    wishlist.splice(index, 1);


                    localStorage.setItem(
                        "glowcartWishlist",
                        JSON.stringify(wishlist)
                    );


                    showWishlist();

                });

        });

    }


    popup
        .querySelector(".close-wishlist")
        .addEventListener(
            "click",
            () => popup.remove()
        );


    popup.addEventListener("click", event => {

        if (event.target === popup) {

            popup.remove();

        }

    });

}

// ================= SEARCH =================

searchIcon.addEventListener("click", () => {

    searchBox.classList.add("active");

    searchInput.focus();

});


closeSearch.addEventListener("click", () => {

    searchBox.classList.remove("active");

    searchInput.value = "";

    searchResults.innerHTML = "";

});


searchInput.addEventListener("input", () => {

    const text =
        searchInput.value
            .toLowerCase()
            .trim();


    searchResults.innerHTML = "";


    if (!text) {
        return;
    }


    let found = false;


    document
        .querySelectorAll(".product-card")
        .forEach(card => {

            const name =
                card
                    .querySelector("h3")
                    .textContent
                    .trim();


            const category =
                card
                    .querySelector(".product-category")
                    .textContent
                    .trim();


            if (
                name.toLowerCase().includes(text) ||
                category.toLowerCase().includes(text)
            ) {

                found = true;


                const result =
                    document.createElement("div");

                result.className =
                    "search-result-item";


                const image =
                    card
                        .querySelector(".product-image img")
                        .getAttribute("src");


                const price =
                    card
                        .querySelector(".current-price")
                        .textContent;


                // GET PRODUCT ID

                let productId = "";


                if (
                    card
                        .getAttribute("onclick")
                        .includes("lipstick")
                ) {

                    productId = "lipstick";

                } else if (
                    card
                        .getAttribute("onclick")
                        .includes("serum")
                ) {

                    productId = "serum";

                } else if (
                    card
                        .getAttribute("onclick")
                        .includes("facewash")
                ) {

                    productId = "facewash";

                } else if (
                    card
                        .getAttribute("onclick")
                        .includes("haircare")
                ) {

                    productId = "haircare";

                }


                result.innerHTML = `

                    <img
                        src="${image}"
                        alt="${name}"
                    >

                    <div>

                        <strong>
                            ${name}
                        </strong>

                        <p>
                            ${category}
                        </p>

                        <span>
                            ${price}
                        </span>

                    </div>

                `;


                // OPEN PRODUCT DETAILS

                result.addEventListener("click", () => {

                    window.location.href =
                        `product.html?id=${productId}`;

                });


                searchResults.appendChild(result);

            }

        });


    if (!found) {

        searchResults.innerHTML = `

            <div class="search-no-result">

                <div style="font-size:40px;">
                    🔍
                </div>

                <h3>
                    No products found
                </h3>

                <p>
                    Try searching for lipstick, serum,
                    face wash or haircare.
                </p>

            </div>

        `;

    }

});

// ================= CHECKOUT =================

// ================= CHECKOUT =================

document
    .getElementById("checkoutButton")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your bag is empty!");

            return;

        }


        window.location.href =
            "checkout.html";

    });

// ================= START =================

updateCart();
// ================= CATEGORY FILTER =================

document
    .querySelectorAll(".category-card")
    .forEach(categoryCard => {

        categoryCard.addEventListener("click", () => {

            const selectedCategory =
                categoryCard
                    .getAttribute("data-filter");

            const products =
                document.querySelectorAll(".product-card");


            products.forEach(product => {

                const productCategory =
                    product.getAttribute("data-category");


                if (
                    productCategory === selectedCategory
                ) {

                    product.style.display = "";

                } else {

                    product.style.display = "none";

                }

            });


            // Scroll to products

            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });
    // ================= USER LOGIN =================

const userGreeting =
    document.getElementById("userGreeting");

const signInLink =
    document.getElementById("signInLink");

const signUpLink =
    document.getElementById("signUpLink");

const logoutButton =
    document.getElementById("logoutButton");


const savedUser =
    JSON.parse(
        localStorage.getItem("glowcartUser")
    );

const isLoggedIn =
    localStorage.getItem("glowcartLoggedIn") === "true";


if (isLoggedIn && savedUser) {

    userGreeting.textContent =
        `Hi, ${savedUser.name} 👋`;

    signInLink.style.display = "none";
    signUpLink.style.display = "none";
    logoutButton.style.display = "inline-block";

} else {

    userGreeting.style.display = "none";
    logoutButton.style.display = "none";

}


// ================= LOGOUT =================

logoutButton.addEventListener("click", () => {

    localStorage.removeItem("glowcartLoggedIn");

    window.location.reload();

});