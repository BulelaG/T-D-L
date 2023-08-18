
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
