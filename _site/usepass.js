// Function to handle account creation
function createAccount(username, password) {
    const apiUrl = "http://127.0.0.1:8086/api/users/";

    // Prepare payload
    const payload = {
        username: username,
        password: password
    };

    // Make POST request to create account
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
            // Account created successfully
            alert("Registration successful. You can now log in.");
        } else if (response.status === 409) {
            // Username already taken
            alert("Username is already taken. Please choose a different one.");
        } else {
            // Registration failed
            alert("Registration failed.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
}

// Function to handle login
function login(username, password) {
    const apiUrl = "http://127.0.0.1:8086/api/users/authenticate";

    // Prepare payload
    const userData = {
        username: username,
        password: password
    };

    // Make POST request to login
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (response.status === 200) {
            // Login successful
            setCookie("username", username, 1);
            window.location.href = "https://lin-ct.github.io/demonstration/CRUD.html";
        } else if (response.status === 404) {
            // User not found
            displayError("User not found.");
        } else if (response.status === 401) {
            // Invalid password
            displayError("Invalid password.");
        } else {
            // Login failed
            displayError("Login failed.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
}

function handleSignupFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    
    // Call createAccount function with form data
    createAccount(username, password);
}

function handleLoginFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Call login function with form data
    login(username, password);
}

// Add event listeners to form submissions
document.getElementById("signupForm").addEventListener("submit", handleSignupFormSubmit);
document.getElementById("loginForm").addEventListener("submit", handleLoginFormSubmit);

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
