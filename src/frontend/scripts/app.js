const API_BASE = "/api/tasks";

let allTasks = [];
let currentFilter = "all";
let searchQuery = "";

function getToken() {
  return localStorage.getItem("token");
}

function requireAuth() {
  const token = getToken();

  if (!token) {
    window.location.href = "pages/login.html";
    return null;
  }

  return token;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "pages/login.html";
}

async function fetchTasks() {
  const token = requireAuth();

  if (!token) return [];

  const res = await fetch(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.status === 401) {
    logout();
    return [];
  }

  const data = await res.json();

  return data.tasks || [];
}

async function addTask(title) {
  const token = requireAuth();

  if (!token) return;

  await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  });
}

async function toggleTask(id) {
  const token = requireAuth();

  if (!token) return;

  await fetch(`${API_BASE}/${id}/toggle`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

async function deleteTask(id) {
  const token = requireAuth();

  if (!token) return;

  await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function updateTaskCount() {
  const countElement = document.getElementById("taskCount");

  if (countElement) {
    countElement.textContent = allTasks.length;
  }
}

function getFilteredTasks() {
  let tasks = allTasks;

  // Filter
  if (currentFilter === "active") {
    tasks = tasks.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    tasks = tasks.filter((task) => task.completed);
  }

  // Search
  if (searchQuery) {
    tasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery)
    );
  }

  return tasks;
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const tasks = getFilteredTasks();

  list.innerHTML = "";

  updateTaskCount();

  if (tasks.length === 0) {
    let message = "No tasks yet.";
    let subMessage = "Add a task above and get started!";

    if (searchQuery) {
      message = "No matching tasks";
      subMessage = "Try a different search term.";
    } else if (currentFilter === "active") {
      message = "No active tasks";
      subMessage = "You're all caught up!";
    } else if (currentFilter === "completed") {
      message = "No completed tasks";
      subMessage = "Complete a task to see it here.";
    }

    list.innerHTML = `
      <li class="empty-state">
        <div class="empty-icon">✓</div>
        <strong>${message}</strong>
        <span>${subMessage}</span>
      </li>
    `;

    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");

    li.className = "task-item" + (task.completed ? " completed" : "");

    li.innerHTML = `
      <label class="task-check">
        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
          data-id="${task.id}"
        >

        <span>${task.title}</span>
      </label>

      <button
        class="delete-btn"
        data-id="${task.id}"
        aria-label="Delete task"
        title="Delete task"
      >
        ✕
      </button>
    `;

    list.appendChild(li);
  });
}

async function refreshTasks() {
  allTasks = await fetchTasks();

  renderTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!requireAuth()) return;

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const greeting = document.getElementById("userGreeting");

  if (greeting && user) {
    greeting.textContent = `Hi, ${user.name}`;
  }

  refreshTasks();

  // Add task
  const taskForm = document.getElementById("taskForm");

  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) return;

    await addTask(title);

    input.value = "";
    input.focus();

    refreshTasks();
  });

  // Search
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim().toLowerCase();

    renderTasks();
  });

  // Task actions
  const list = document.getElementById("taskList");

  list.addEventListener("click", async (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      await toggleTask(e.target.dataset.id);

      refreshTasks();
    }

    if (e.target.matches(".delete-btn")) {
      await deleteTask(e.target.dataset.id);

      refreshTasks();
    }
  });

  // Filters
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      renderTasks();
    });
  });

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});