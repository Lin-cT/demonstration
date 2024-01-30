//const apiUrl = "https://asianunited.stu.nighthawkcodingsociety.com/api/scores"; // Update with the correct API URL
const apiUrl = "http:127.0.0.1:8640/api/scores";
const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
];
function authenticateUser() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const userData = {
        "username": usernameInput,
        "password": passwordInput
    };

    //fetch("https://asianunited.stu.nighthawkcodingsociety.com/api/login/login", {
    fetch("http://127.0.0.1:8640/api/login/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.status === 200) {
            setCookie("username", usernameInput, 30);
            window.location.href = "https://joshthinh.github.io/Asian-United-Frontend/game.html";
        } else if (response.status === 404) {
            displayError("User not found.");
        } else if (response.status === 401) {
            displayError("Invalid password.");
        } else {
            displayError("Login failed.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function isUsernameTaken(username) {
    // Check if the username already exists in your list of users
    return users.some(u => u.username === username);
}
function registerUser() {
    const usernameInput = document.getElementById("signupuser").value;
    const passwordInput = document.getElementById("signuppass").value;

    const userData = {
        "username": usernameInput,
        "password": passwordInput
    };

    //fetch("https://asianunited.stu.nighthawkcodingsociety.com/api/login/register", {
    fetch("http://127.0.0.1:8640/api/login/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.status === 201) {
            alert("Registration successful. You can now log in.");
        } else if (response.status === 409) {
            alert("Username is already taken. Please choose a different one.");
        } else {
            alert("Registration failed.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function displayError(errorMessage) {
    const output = document.getElementById("output");
    output.innerHTML = `<p style="color: red">${errorMessage}</p>`;
}