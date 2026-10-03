// GlowCart Sign In

const signinForm = document.getElementById("signinForm");
const forgotPassword = document.getElementById("forgotPassword");
const googleButton = document.querySelector(".google-button");


// ================= SIGN IN =================

signinForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();


    // Check empty fields

    if (email === "" || password === "") {

        showMessage(
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    // Get registered user

    const savedUser =
        JSON.parse(
            localStorage.getItem("glowcartUser")
        );


    // No account found

    if (!savedUser) {

        showMessage(
            "No account found. Please create an account first.",
            "error"
        );

        return;
    }


    // Check email

    if (
        email.toLowerCase() !==
        savedUser.email.toLowerCase()
    ) {

        showMessage(
            "Email address does not match.",
            "error"
        );

        return;
    }


    // Check password

    if (password !== savedUser.password) {

        showMessage(
            "Incorrect password. Please try again.",
            "error"
        );

        return;
    }


    // Successful login

    localStorage.setItem(
        "glowcartLoggedIn",
        "true"
    );

    showMessage(
        "Sign in successful! Welcome to GlowCart ✨",
        "success"
    );


    setTimeout(function () {

        window.location.href = "index.html";

    }, 1500);

});


// ================= FORGOT PASSWORD =================

forgotPassword.addEventListener("click", function (event) {

    event.preventDefault();

    showMessage(
        "Password reset feature will be added soon.",
        "info"
    );

});


// ================= GOOGLE SIGN IN =================

googleButton.addEventListener("click", function () {

    showMessage(
        "Google Sign In will be added soon.",
        "info"
    );

});


// ================= MESSAGE FUNCTION =================

function showMessage(message, type) {

    const oldMessage =
        document.querySelector(".signin-message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const messageBox =
        document.createElement("div");

    messageBox.className =
        "signin-message " + type;

    messageBox.textContent =
        message;


    document
        .querySelector(".signin-content")
        .prepend(messageBox);


    setTimeout(function () {

        messageBox.remove();

    }, 3000);

}