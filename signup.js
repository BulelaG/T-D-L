document.addEventListener("DOMContentLoaded", function () {
    
    const signupForm = document.getElementById("signup-form");
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    function saveUsers() {
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("signup-username").value;
      const password = document.getElementById("signup-password").value;
      const confirmedPassword = document.getElementById("confirm-signup-password").value;

      if (password !== confirmedPassword) {
        alert("Passwords do not match. Please make sure your passwords match.");
        return; // Stop execution if passwords don't match
      }
    
      const userExists = users.some(user => user.username === username);
      if (!userExists) {
        users.push({ username, password, tasks: [], isAuthenticated: true });
        saveUsers();
        alert("User registered successfully!");
        window.location.href = "signin.html"; // Redirect to sign-in page
      } else {
        alert("Username already exists. Please choose a different one.");
      }
    });
  });
  