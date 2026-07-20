let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

addBtn.addEventListener("click", addTask);

// Press Enter to add task
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Load tasks when page opens
loadTasks();

// Add Task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

// Render Tasks
function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task) => {

        const index = tasks.indexOf(task);

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </div>
        `;

        // Complete Task
        li.querySelector("span").addEventListener("click", function () {

            task.completed = !task.completed;

            saveTasks();
            renderTasks();

        });

        // Edit Task
        li.querySelector(".edit-btn").addEventListener("click", function () {

            const newTask = prompt("Edit your task:", task.text);

            if (newTask !== null && newTask.trim() !== "") {

                task.text = newTask.trim();

                saveTasks();
                renderTasks();

            }

        });

        // Delete Task
        li.querySelector(".delete-btn").addEventListener("click", function () {

            tasks.splice(index, 1);

            saveTasks();
            renderTasks();

        });

        taskList.appendChild(li);

    });

    updateTaskCount();

}

// Update Counter
function updateTaskCount() {

    taskCount.textContent = tasks.length;

}

// Save Tasks
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Load Tasks
function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {

        tasks = JSON.parse(savedTasks);

    }

    renderTasks();

}

// Filter Buttons
filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        renderTasks();

    });

});