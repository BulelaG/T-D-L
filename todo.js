document.addEventListener("DOMContentLoaded", function () {

  const taskList = document.getElementById("task-list"); //getting the table-body element
  const newTaskTitleInput = document.getElementById("new-task-title"); //input element for title
  const newTaskDescriptionInput = document.getElementById("new-task-description"); //input element fo description
  const newTaskDueInput = document.getElementById("new-task-due"); //input element for due date
  const addTaskButton = document.getElementById("add-task"); //add task button
  const logoutButton = document.getElementById("logout"); // logout button
  const users = JSON.parse(localStorage.getItem("users")) || []; //
  const taskSection = document.getElementById("task-section"); //task section div
  const today = new Date();

  function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));   // where I save the user from the sign up
  }

  const currentUserIndex = users.findIndex((user) => user.isAuthenticated);
  const currentUser = currentUserIndex !== -1 ? users[currentUserIndex] : null;

  if (currentUser) {
    taskSection.style.display = "block";
    displayTasks(currentUser.tasks);
  } else {
    window.location.href = "signin.html";
  }

  addTaskButton.addEventListener("click", function () {
    const taskTitle = newTaskTitleInput.value;
    const taskDescription = newTaskDescriptionInput.value;
    const taskDue = today.toISOString().split('T')[0];
     
    newTaskDueInput.value = taskDue

    if (taskTitle) {
      if (!currentUser.tasks) {
        currentUser.tasks = [];
      }
      currentUser.tasks.unshift({
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

      if (currentUser && currentUser.tasks && index >= 0 && index < currentUser.tasks.length) {
        currentUser.tasks.splice(index, 1);
        saveUsers();
        displayTasks(currentUser.tasks);
      }
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
    if (currentUserIndex !== -1) {
      users[currentUserIndex].isAuthenticated = false;
      saveUsers();
      window.location.href = "signin.html";
    }
  });

  function displayTasks(userTasks) {
    taskList.innerHTML = `
      ${userTasks.map((task, index) => `
        <tr>
          <td class="text-success"><b>${task.title}</b></td>
          <td>${task.description}</td>
          <td>${task.dueDate}</td>
          <td>
            <button class="edit-task btn mx-2 text-primary" data-index="${index}"><i class="bi bi-pencil"></i></button>
            <button class="delete-task btn mx-2 text-danger" data-index="${index}"><i class="bi bi-trash"></i></button>
          </td>
        </tr>
      `).join("")}
    `;
  }
});
