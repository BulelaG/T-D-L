document.addEventListener("DOMContentLoaded", function () {
    const signinForm = document.getElementById("signin-form");
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    signinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("signin-username").value;
      const password = document.getElementById("signin-password").value;
  
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        user.isAuthenticated = true;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signed in successfully!");
        window.location.href = "index.html";
      } else {
        alert("Invalid username or password.");
      }
    });
  });

  
  