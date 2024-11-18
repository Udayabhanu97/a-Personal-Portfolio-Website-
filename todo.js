// Get the DOM elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.dataset.index = index;
    taskList.appendChild(li);
  });
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener to add tasks
addTaskBtn.addEventListener("click", function () {
  const task = taskInput.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    saveTasks(tasks);
    taskInput.value = "";
    loadTasks();
  }
});

// Event listener to delete tasks
taskList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const index = event.target.dataset.index;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1); // Remove the task
    saveTasks(tasks);
    loadTasks();
  }
});
