const API_BASE = "http://localhost:5000/api/tasks";

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
    headers: { Authorization: `Bearer ${token}` }
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
    headers: { Authorization: `Bearer ${token}` }
  });
}

async function deleteTask(id) {
  const token = requireAuth();
  if (!token) return;

  await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
}

function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `<li class="empty-state">No tasks yet. Add one above!</li>`;
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    li.innerHTML = `
      <label class="task-check">
        <input type="checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}">
        <span>${task.title}</span>
      </label>
      <button class="delete-btn" data-id="${task.id}" aria-label="Delete task">✕</button>
    `;

    list.appendChild(li);
  });
}

async function refreshTasks() {
  const tasks = await fetchTasks();
  renderTasks(tasks);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!requireAuth()) return;

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const greeting = document.getElementById("userGreeting");
  if (greeting && user) {
    greeting.textContent = `Hi, ${user.name}`;
  }

  refreshTasks();

  const taskForm = document.getElementById("taskForm");
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("taskInput");
    const title = input.value.trim();
    if (!title) return;

    await addTask(title);
    input.value = "";
    refreshTasks();
  });

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

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
