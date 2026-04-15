let captcha = "";
let earnings = 0;
let correct = 0;
let total = 0;

// SWITCH SECTIONS
function showSection(id) {
    document.querySelectorAll(".main > div").forEach(div => {
        div.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
}

// GENERATE CAPTCHA
function generateCaptcha() {
    captcha = Math.random().toString(36).substring(2,7);
    document.getElementById("captcha").innerText = captcha;
}

// CHECK CAPTCHA
function checkCaptcha() {
    let val = document.getElementById("input").value;
    total++;

    if(val === captcha){
        correct++;
        earnings++;
        document.getElementById("result").innerText = "Correct!";
    } else {
        document.getElementById("result").innerText = "Wrong!";
    }

    let accuracy = ((correct / total) * 100).toFixed(1);

    document.getElementById("earnings").innerText = earnings;
    document.getElementById("tasks").innerText = total;
    document.getElementById("accuracy").innerText = accuracy;

    generateCaptcha();
}

// LOGOUT
function logout(){
    window.location.href = "index.html";
}

// INITIAL LOAD
generateCaptcha();
<script src="dashboard.js"></script>