const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

// On Register Submit
registerForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    alert("Username already taken!");
  } else {
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");

    // Slide to Login Form
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  }

  this.reset();
});

// On Login Submit
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const errorMsg = document.getElementById("login-error");

  if (users[username] && users[username] === password) {
    localStorage.setItem("loggedInUser", username);
    alert("Login successful!");
    window.location.href = "dashboard.html"; // optional redirect
  } else {
    errorMsg.textContent = "Invalid username or password.";
  }
});
