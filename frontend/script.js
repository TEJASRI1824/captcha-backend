// SWITCH FORMS
function showRegister() {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
}

function showLogin() {
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
}

// REGISTER (LOCAL STORAGE FOR NOW)
function register() {
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPass").value;

    localStorage.setItem(email, pass);
    alert("Registered successfully!");
    showLogin();
}

// LOGIN
async function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPass").value;

    let res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    let data = await res.json();

    if (data.message === "Login success") {
        localStorage.setItem("currentUser", email);
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
}