// Get HTML elements
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const taskCounter = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter-btn");

// Todo data
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// Save todos
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Display todos
function displayTodos() {

    todoList.innerHTML = "";

    let filteredTodos = todos.filter(todo => {

        if (currentFilter === "active") {
            return !todo.completed;
        }

        if (currentFilter === "completed") {
            return todo.completed;
        }

        return true;
    });

    // Empty message
    if (filteredTodos.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    // Create todo items
    filteredTodos.forEach(todo => {

        const todoItem = document.createElement("div");

        todoItem.className = "todo-item";

        if (todo.completed) {
            todoItem.classList.add("completed");
        }

        todoItem.innerHTML = `
            <input 
                type="checkbox"
                class="todo-checkbox"
                ${todo.completed ? "checked" : ""}
            >

            <span class="todo-text">
                ${todo.text}
            </span>

            <button class="edit-btn" title="Edit task">
                ✏️
            </button>

            <button class="delete-btn" title="Delete task">
                🗑️
            </button>
        `;

        // Complete task
        const checkbox = todoItem.querySelector(".todo-checkbox");

        checkbox.addEventListener("change", () => {
            toggleTodo(todo.id);
        });

        // Edit task
        const editBtn = todoItem.querySelector(".edit-btn");

        editBtn.addEventListener("click", () => {
            editTodo(todo.id);
        });

        // Delete task
        const deleteBtn = todoItem.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {
            deleteTodo(todo.id);
        });

        todoList.appendChild(todoItem);
    });

    updateCounter();
}

// Add todo
function addTodo() {

    const text = todoInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);

    saveTodos();

    displayTodos();

    todoInput.value = "";

    todoInput.focus();
}

// Edit todo
function editTodo(id) {

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return;
    }

    const updatedText = prompt(
        "Edit your task:",
        todo.text
    );

    // Cancel button
    if (updatedText === null) {
        return;
    }

    // Empty input
    if (updatedText.trim() === "") {
        alert("Task cannot be empty.");
        return;
    }

    // Update task
    todo.text = updatedText.trim();

    saveTodos();

    displayTodos();
}

// Toggle complete
function toggleTodo(id) {

    todos = todos.map(todo => {

        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }

        return todo;
    });

    saveTodos();

    displayTodos();
}

// Delete todo
function deleteTodo(id) {

    todos = todos.filter(todo => {
        return todo.id !== id;
    });

    saveTodos();

    displayTodos();
}

// Update counter
function updateCounter() {

    const remainingTasks =
        todos.filter(todo => !todo.completed).length;

    if (remainingTasks === 1) {

        taskCounter.textContent = "1 task remaining";

    } else {

        taskCounter.textContent =
            `${remainingTasks} tasks remaining`;
    }
}

// Filter buttons
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTodos();
    });
});

// Clear completed
clearCompletedBtn.addEventListener("click", () => {

    todos = todos.filter(todo => {
        return !todo.completed;
    });

    saveTodos();

    displayTodos();
});

// Add button
addTodoBtn.addEventListener("click", addTodo);

// Enter key
todoInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        addTodo();
    }
});

// Load todos
displayTodos();