const API_URL = "http://127.0.0.1:5000/api/tasks";

document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();

    const taskForm = document.querySelector("form");
    // ID එකෙන් හෝ Placeholder එකෙන් Input එක හරියටම අල්ලගමු
    const taskInput = document.querySelector("input[type='text']") || document.querySelector("input");
    const addTaskBtn = document.querySelector("button") || document.querySelector("button[type='submit']");

    if (taskForm) {
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (taskInput) addNewTask(taskInput);
        });
    }

    if (addTaskBtn) {
        addTaskBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (taskInput) addNewTask(taskInput);
        });
    }

    if (taskInput) {
        taskInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                addNewTask(taskInput);
            }
        });
    }
});

// Tasks Fetch කිරීම
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) return;
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Tasks UI එකේ පෙන්වීම
function renderTasks(tasks) {
    const existingTasks = document.querySelectorAll(".task-item");
    existingTasks.forEach(task => task.remove());

    const emptyState = document.querySelector(".app-container > div:has(.fa-check)");

    if (!Array.isArray(tasks) || tasks.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        return;
    }

    if (emptyState) emptyState.style.display = "none";

    const container = document.querySelector(".app-container");

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task-item";
        taskDiv.style.cssText = "display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 12px 16px; margin-top: 10px; border-radius: 8px; color: white;";
        
        taskDiv.innerHTML = `
            <span style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.title}</span>
        `;
        
        container.appendChild(taskDiv);
    });
}

// DB එකට Task එක යැවීම
async function addNewTask(inputElement) {
    const title = inputElement.value.trim();
    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title })
        });

        const data = await response.json();

        if (response.ok) {
            inputElement.value = ""; 
            fetchTasks(); 
        } else {
            alert("Error: " + (data.message || data.error));
        }
    } catch (error) {
        console.error("Error adding task:", error);
        alert("Server error: " + error.message);
    }
}