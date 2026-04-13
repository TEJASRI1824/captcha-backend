<!DOCTYPE html>
<html>
<head>
<title>Admin Panel</title>

<style>
body {
    font-family: Arial;
    background:#0f172a;
    color:white;
    padding:20px;
}

table {
    width:100%;
    border-collapse: collapse;
    margin-top:20px;
}

th, td {
    padding:10px;
    border:1px solid #1e293b;
}

th {
    background:#1e293b;
}
</style>

</head>
<body>

<h1>Admin Dashboard</h1>

<table>
    <thead>
        <tr>
            <th>Email</th>
            <th>Earnings</th>
            <th>Tasks</th>
        </tr>
    </thead>
    <tbody id="userTable"></tbody>
</table>

<script>
async function loadUsers() {
    let res = await fetch("http://localhost:5000/users");
    let data = await res.json();

    let html = "";

    data.forEach(user => {
        html += `
        <tr>
            <td>${user.email}</td>
            <td>₹${user.earnings}</td>
            <td>${user.tasks}</td>
        </tr>
        `;
    });

    document.getElementById("userTable").innerHTML = html;
}

loadUsers();
</script>

</body>
</html>