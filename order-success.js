// =========================================================
// GLOWCART — ORDER SUCCESS
// =========================================================


// ================= GET ORDER =================

const order =
    JSON.parse(
        localStorage.getItem("glowcartOrder")
    );


// ================= ELEMENTS =================

const orderId =
    document.getElementById("orderId");

const customerName =
    document.getElementById("customerName");

const paymentMethod =
    document.getElementById("paymentMethod");

const orderTotal =
    document.getElementById("orderTotal");

const orderDate =
    document.getElementById("orderDate");

const orderedItems =
    document.getElementById("orderedItems");


// ================= NO ORDER =================

if (!order) {

    orderId.textContent = "No order found";

    customerName.textContent = "—";

    paymentMethod.textContent = "—";

    orderTotal.textContent = "₹0";

    orderDate.textContent = "—";

    orderedItems.innerHTML = `
        <div class="checkout-empty">

            <h3>No recent order found</h3>

            <p>
                Please place an order first.
            </p>

        </div>
    `;

} else {


    // ================= ORDER DETAILS =================

    orderId.textContent =
        order.orderId;


    customerName.textContent =
        order.customer.fullName;


    const paymentNames = {

        cod: "Cash on Delivery",

        upi: "UPI",

        card: "Card"

    };


    paymentMethod.textContent =
        paymentNames[order.payment] ||
        order.payment;


    orderTotal.textContent =
        `₹${order.total.toLocaleString("en-IN")}`;


    const date =
        new Date(order.date);


    orderDate.textContent =
        date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    // ================= ORDER ITEMS =================

    orderedItems.innerHTML = "";


    order.products.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        const div =
            document.createElement("div");


        div.className =
            "ordered-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="ordered-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.category}
                    · Qty: ${item.quantity}
                </p>

            </div>


            <div class="ordered-item-price">

                ₹${itemTotal.toLocaleString("en-IN")}

            </div>

        `;


        orderedItems.appendChild(div);

    });

}


/// =========================================================
// ORDER STATUS — DEMO TRACKING
// =========================================================

const statusSteps =
    document.querySelectorAll(".status-step");


// 0 = Confirmed
// 1 = Processing
// 2 = Shipped
// 3 = Delivered

let currentStatus = 0;


// ================= UPDATE STATUS =================

function updateOrderStatus() {

    statusSteps.forEach((step, index) => {

        const dot =
            step.querySelector(".status-dot");

        if (index <= currentStatus) {

            step.classList.add("active");

            dot.textContent = "✓";

        } else {

            step.classList.remove("active");

            dot.textContent = index + 1;

        }

    });

}


// ================= INITIAL STATUS =================

updateOrderStatus();


// =========================================================
// DEMO STATUS PROGRESSION
// =========================================================

// Processing after 5 seconds

setTimeout(() => {

    currentStatus = 1;

    updateOrderStatus();

}, 5000);


// Shipped after 10 seconds

setTimeout(() => {

    currentStatus = 2;

    updateOrderStatus();

}, 10000);


// Delivered after 15 seconds

setTimeout(() => {

    currentStatus = 3;

    updateOrderStatus();

}, 15000);