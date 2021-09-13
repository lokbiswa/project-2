// initialize tasks by reading localStorage
const tasks = getTasks("tasks");
const container = document.getElementById("list-container");
const newTaskInput = document.getElementById("new-task");

// template for every class
class Task {
  constructor(name) {
    let now = Date.now();
    this.name = name;
    this.id = `task-${now}`;
  }
}

// creates each div with task
function createElement(task) {
  // div that holds task
  let listItem = document.createElement("div");
  listItem.id = task.id;
  listItem.onclick = removeTask;
  listItem.className = "list-item";
  // task title+
  let label = document.createElement("label");
  label.htmlFor = task.name.replace(/\s/g, "-");
  label.innerHTML = task.name;
  // check box
  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = task.name.replace(/\s/g, "-");

  listItem.appendChild(input);
  listItem.appendChild(label);
  container.appendChild(listItem);
}

// display task when page load
function loadTasks() {
  for (let task of tasks) {
    createElement(task);
  }
}

// creates a taks using class Task
function addTask() {
  const newTask = newTaskInput.value;
  if (newTask) {
    let task = new Task(newTask);
    tasks.push(task);
    createElement(task);
    storeTasks(tasks);
    newTaskInput.value = "";
  }
}
// safe taks in localStorage for session persistency
function storeTasks(tasks) {
  let stringified = JSON.stringify(tasks);
  console.log(tasks);
  localStorage.setItem("tasks", stringified);
}
// read from localStorage
function getTasks() {
  let taskString = localStorage.getItem("tasks");
  if (taskString) {
    let tasks = JSON.parse(taskString);
    return tasks;
  }
  return [];
}
// remove taks
function removeTask(event) {
  let taskElement = event.srcElement;
  let taskContainer = taskElement.parentElement;
  container.removeChild(taskContainer);

  //  updating stored taks
  tasks.forEach((task, index) => {
    if (task.id == taskContainer.id) {
      console.log(index);
      tasks.splice(index, 1);
      storeTasks(tasks);
    }
  });
}
