/* // initialize tasks by reading localStorage
const tasks = getTasks();

const container = document.getElementById("tasks-container");
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
  listItem.className = "task";

  // label for checkbox
  let label = document.createElement("label");
  //So that Hover effect and click effect works both the ways wether its checkbox or its label 
  label.htmlFor = task.name.replace(/\s/g, "-");
  label.innerHTML = task.name;

  // check box
  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = task.name.replace(/\s/g, "-");
  input.onclick = () => removeTask(task);

  listItem.appendChild(input);
  listItem.appendChild(label);
  container.appendChild(listItem);
}

// display task when page load
function loadTasks() {
  tasks.forEach((task) => createElement(task));
}

// creates a task using class Task
function addTask() {
  const taskName = newTaskInput.value;
  if (taskName) {
    let task = new Task(taskName);
    tasks.push(task);
    createElement(task);
    storeTasks(tasks);
    newTaskInput.value = "";
  }
}
// safe tasks in localStorage for session persistency
function storeTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// read from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
// remove task
function removeTask(task) {
  index = tasks.indexOf(task);
  tasks.splice(index, 1);
  //updating stored task
  storeTasks(tasks);
  location.reload();
}

Exercise one from JS course
design a stop watch that has methods start, stop and duration.
The start can only be fun once before stoping. 
if the watch is not started you cannot stop. 
the duration will give the total number of 
second from the start methode is invoked.*/

class Stopwatch {
  #startTime = 0;
  #stopTime = 0;
  duration = 0;
  #started = false;

  start() {
    if (!this.#started) {
      this.#started = true;
      this.#startTime = Date.now();
      console.log(this.#startTime);
    } else throw new Error("watch already started");
  }
  stop() {
    if (this.#started) {
      this.#started = false;
      this.#stopTime = Date.now();
      this.duration += (this.#stopTime - this.#startTime) / 1000;
      console.log(this.duration);
    } else throw new Error("watch not started");
  }
  reset() {
    this.duration = 0;
  }
}
