document.addEventListener("DOMContentLoaded", function () {
    const taskSection = document.getElementById("task-section");
    const taskList = document.getElementById("task-list");
    const newTaskTitleInput = document.getElementById("new-task-title");
    const newTaskDescriptionInput = document.getElementById("new-task-description");
    const newTaskDueInput = document.getElementById("new-task-due");
    const addTaskButton = document.getElementById("add-task");
    const logoutButton = document.getElementById("logout");
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    function saveUsers() {
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    const currentUser = users.find(user => user.isAuthenticated);
    if (currentUser) {
      taskSection.style.display = "block";
      displayTasks(currentUser.tasks);
    } else {
      window.location.href = "signin.html";
    }
  
    addTaskButton.addEventListener("click", function () {
      const taskTitle = newTaskTitleInput.value;
      const taskDescription = newTaskDescriptionInput.value;
      const taskDue = newTaskDueInput.value;
      
      if (taskTitle) {
        currentUser.tasks.push({
          title: taskTitle,
          description: taskDescription,
          dueDate: taskDue,
        });
        saveUsers();
        displayTasks(currentUser.tasks);
        newTaskTitleInput.value = "";
        newTaskDescriptionInput.value = "";
        newTaskDueInput.value = "";
      }
    });
  
    taskList.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-task")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        currentUser.tasks.splice(index, 1);
        saveUsers();
        displayTasks(currentUser.tasks);
      }
      
      if (e.target.classList.contains("edit-task")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        const taskToEdit = currentUser.tasks[index];
        
        const editedTitle = prompt("Enter new title:", taskToEdit.title);
        if (editedTitle !== null) {
          taskToEdit.title = editedTitle;
          const editedDescription = prompt("Enter new description:", taskToEdit.description);
          if (editedDescription !== null) {
            taskToEdit.description = editedDescription;
            saveUsers();
            displayTasks(currentUser.tasks);
          }
        }
      }
    });
  
    logoutButton.addEventListener("click", function () {
      const currentUser = users.find(user => user.isAuthenticated);
      if (currentUser) {
        currentUser.isAuthenticated = false;
        saveUsers();
        window.location.href = "signin.html";
      }
    });
  
    function displayTasks(userTasks) {
      taskList.innerHTML = "";
      userTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <div>
            <span class="task-title">${task.title}</span>
            <hr>
            <span class="task-description">${task.description}</span>
            <span class="task-due">${task.dueDate}</span>
          </div>
          <div>
            <button class="edit-task" data-index="${index}">Edit</button>
            <button class="delete-task" data-index="${index}">Delete</button>
          </div>
        `;
        taskList.appendChild(taskItem);
      });
    }
  });
  