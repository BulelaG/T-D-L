document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const signinForm = document.getElementById("signin-form");
    const taskSection = document.getElementById("task-section");
    const taskList = document.getElementById("task-list");
    const newTaskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");

    // Initialize users and tasks from local storage or set to empty arrays
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveUsers() {
      localStorage.setItem("users", JSON.stringify(users));
    }

    
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }


    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("signup-username").value;
      const password = document.getElementById("signup-password").value;



      // Check if user already exists
      const userExists = users.some(user => user.username === username);
      if (!userExists) {
        users.push({ username, password });
        saveUsers();
        alert("User registered successfully!");
        taskSection.style.display = "block"; // Show the task section
      } else {
        alert("Username already exists. Please choose a different one.");
      }
    });



    signinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("signin-username").value;
      const password = document.getElementById("signin-password").value;

      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        alert("Signed in successfully!");
        taskSection.style.display = "block"; // Show the task section
      } else {
        alert("Invalid username or password.");
      }
    });

    addTaskButton.addEventListener("click", function () {
      const taskText = newTaskInput.value;
      if (taskText) {
        tasks.push(taskText);
        saveTasks();
        displayTasks();
        newTaskInput.value = "";
      }
    });

    function displayTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span>${task}</span>
          <button class="delete-task" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(taskItem);
      });
    }


    // Display initial tasks if the user is already authenticated
    if (users.some(user => user.isAuthenticated)) {
      taskSection.style.display = "block";
      displayTasks();
    }
  });