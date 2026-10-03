// ================= LOAD CART =================

let cart =
    JSON.parse(
        localStorage.getItem("glowcartCart")
    ) || [];


// ================= ELEMENTS =================

const checkoutItems =
    document.getElementById("checkoutItems");

const subtotalElement =
    document.getElementById("subtotal");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const placeOrderButton =
    document.getElementById("placeOrder");


// ================= DISPLAY CART =================

function displayCheckout() {

    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="checkout-empty">

                <div>🛍️</div>

                <h3>
                    Your bag is empty
                </h3>

                <p>
                    Add products before checkout.
                </p>

            </div>

        `;

        subtotalElement.textContent = "₹0";
        checkoutTotal.textContent = "₹0";

        placeOrderButton.disabled = true;

        placeOrderButton.style.opacity = "0.5";

        placeOrderButton.style.cursor = "not-allowed";

        return;

    }


    let subtotal = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;


        const div =
            document.createElement("div");

        div.className =
            "checkout-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.category}
                    · Qty: ${item.quantity}
                </p>

            </div>


            <div class="checkout-item-price">
                ₹${itemTotal.toLocaleString("en-IN")}
            </div>

        `;


        checkoutItems.appendChild(div);

    });


    subtotalElement.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;


    checkoutTotal.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;

}


// ================= PLACE ORDER =================

placeOrderButton.addEventListener(
    "click",
    () => {

        const fullName =
            document
                .getElementById("fullName")
                .value
                .trim();

        const phone =
            document
                .getElementById("phone")
                .value
                .trim();

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const address =
            document
                .getElementById("address")
                .value
                .trim();

        const city =
            document
                .getElementById("city")
                .value
                .trim();

        const pincode =
            document
                .getElementById("pincode")
                .value
                .trim();


        // ================= VALIDATION =================

        if (!fullName) {

            alert("Please enter your full name.");

            return;

        }


        if (!phone) {

            alert("Please enter your phone number.");

            return;

        }


        if (!email) {

            alert("Please enter your email address.");

            return;

        }


        if (!address) {

            alert("Please enter your delivery address.");

            return;

        }


        if (!city) {

            alert("Please enter your city.");

            return;

        }


        if (
            !pincode ||
            pincode.length !== 6 ||
            isNaN(pincode)
        ) {

            alert("Please enter a valid 6-digit PIN code.");

            return;

        }


        if (cart.length === 0) {

            alert("Your bag is empty.");

            return;

        }


        // ================= SAVE ORDER =================

        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        const order = {

            orderId:
                "GC" +
                Date.now()
                    .toString()
                    .slice(-8),

            customer: {

                fullName,
                phone,
                email,
                address,
                city,
                pincode

            },

            payment,

            products: cart,

            total:
                cart.reduce(
                    (sum, item) =>
                        sum +
                        item.price * item.quantity,
                    0
                ),

            date:
                new Date().toISOString()

        };


        localStorage.setItem(
            "glowcartOrder",
            JSON.stringify(order)
        );


        // Clear cart

        localStorage.removeItem(
            "glowcartCart"
        );


        // Go to confirmation

        window.location.href =
            "order-success.html";

    }
);


// ================= START =================

displayCheckout();