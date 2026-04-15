// SWITCH SECTIONS
function showSection(id) {
    document.querySelectorAll(".main > div").forEach(div => {
        div.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
}

// LOAD USERS FROM LOCAL STORAGE
function loadUsers() {
    let userList = document.getElementById("userList");
    userList.innerHTML = "";

    let totalUsers = 0;
    let totalEarnings = 0;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        // skip non-user keys if needed
        if (key.includes("@")) {
            let li = document.createElement("li");
            li.innerText = key;
            userList.appendChild(li);

            totalUsers++;
        }

        if (key === "earnings") {
            totalEarnings = localStorage.getItem("earnings");
        }
    }

    document.getElementById("totalUsers").innerText = totalUsers;
    document.getElementById("totalEarnings").innerText = totalEarnings || 0;
}

// RESET EARNINGS
function resetEarnings() {
    localStorage.setItem("earnings", 0);
    alert("Earnings reset!");
    loadUsers();
}

// INIT
loadUsers();
document.body.style.background = "#1e293b";
document.body.style.color = "white";
let adminPass = prompt("Enter admin password:");

if(adminPass !== "admin123"){
    alert("Access denied");
    window.location.href = "index.html";
} else {
    document.body.style.background = "#1e293b";
    document.body.style.color = "white";
}