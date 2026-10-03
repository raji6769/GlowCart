// ================= SIGN UP =================

const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get form values
    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const terms =
        document.getElementById("terms").checked;


    // ================= VALIDATION =================

    if (!name || !email || !password || !confirmPassword) {

        showMessage(
            "Please fill in all fields.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showMessage(
            "Password must be at least 6 characters.",
            "error"
        );

        return;
    }


    if (password !== confirmPassword) {

        showMessage(
            "Passwords do not match.",
            "error"
        );

        return;
    }


    if (!terms) {

        showMessage(
            "Please agree to the terms and conditions.",
            "error"
        );

        return;
    }


    // ================= SAVE USER =================

    const user = {
        name: name,
        email: email,
        password: password
    };


    localStorage.setItem(
        "glowcartUser",
        JSON.stringify(user)
    );


    // ================= SUCCESS =================

    showMessage(
        "Account created successfully! Redirecting to Sign In...",
        "success"
    );


    signupForm.reset();


    setTimeout(() => {

        window.location.href = "signin.html";

    }, 1500);

});


// ================= MESSAGE =================

function showMessage(message, type) {

    signupMessage.textContent = message;

    signupMessage.className =
        "signup-message " + type;

    signupMessage.style.display = "block";
}