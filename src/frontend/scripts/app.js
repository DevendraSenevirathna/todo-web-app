const API_BASE = "http://localhost:5000/api/tasks";

let allTasks = [];
let currentFilter = "all";

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

  try {
    const res = await fetch(API_BASE, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      logout();
      return [];
    }

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await res.json();
    return data.tasks || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

async function addTask(title) {
  const token = requireAuth();
  if (!token) return;

  try {
    await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

async function toggleTask(id) {
  const token = requireAuth();
  if (!token) return;

  try {
    await fetch(`${API_BASE}/${id}/toggle`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

async function deleteTask(id) {
  const token = requireAuth();
  if (!token) return;

  try {
    await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

/* ---------- Helpers ---------- */

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function updateTaskCount() {
  const countElement = document.getElementById("taskCount");

  if (countElement) {
    const activeTasks = allTasks.filter(
      (task) => !task.completed
    ).length;

    countElement.textContent = activeTasks;
  }
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return allTasks.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    return allTasks.filter((task) => task.completed);
  }

  return allTasks;
}

/* ---------- Render Tasks ---------- */

function renderTasks() {
  const list = document.getElementById("taskList");

  if (!list) return;

  const tasks = getFilteredTasks();

  list.innerHTML = "";

  updateTaskCount();

  if (tasks.length === 0) {
    let message = "No tasks yet.";
    let subMessage = "Add a task above and get started!";

    if (currentFilter === "active") {
      message = "No active tasks";
      subMessage = "You're all caught up! 🎉";
    }

    if (currentFilter === "completed") {
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

    li.className = "task-item";

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <label class="task-check">
        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
          data-id="${task.id}"
          aria-label="Mark task as ${
            task.completed ? "active" : "completed"
          }"
        >

        <span class="task-title">
          ${escapeHTML(task.title)}
        </span>
      </label>

      <button
        class="delete-btn"
        type="button"
        data-id="${task.id}"
        aria-label="Delete task"
        title="Delete task"
      >
        <span>🗑</span>
      </button>
    `;

    list.appendChild(li);
  });
}

/* ---------- Refresh ---------- */

async function refreshTasks() {
  allTasks = await fetchTasks();
  renderTasks();
}

/* ---------- App ---------- */

document.addEventListener("DOMContentLoaded", () => {
  if (!requireAuth()) return;

  /* User greeting */

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const greeting = document.getElementById("userGreeting");

  if (greeting && user) {
    greeting.textContent = `Hi, ${user.name}`;
  }

  refreshTasks();

  /* Add task */

  const taskForm = document.getElementById("taskForm");

  if (taskForm) {
    taskForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const input = document.getElementById("taskInput");
      const title = input.value.trim();

      if (!title) return;

      await addTask(title);

      input.value = "";
      input.focus();

      await refreshTasks();
    });
  }

  /* Task actions */

  const list = document.getElementById("taskList");

  if (list) {
    list.addEventListener("click", async (e) => {

      /* Delete */

      const deleteButton = e.target.closest(".delete-btn");

      if (deleteButton) {
        const taskId = deleteButton.dataset.id;

        const confirmed = confirm(
          "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        deleteButton.disabled = true;

        await deleteTask(taskId);
        await refreshTasks();

        return;
      }
    });

    list.addEventListener("change", async (e) => {

      /* Complete / Uncomplete */

      if (e.target.matches('input[type="checkbox"]')) {
        const taskId = e.target.dataset.id;

        await toggleTask(taskId);
        await refreshTasks();
      }
    });
  }

  /* Filters */

  const filterButtons =
    document.querySelectorAll(".filter-btn");

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

  /* Logout */

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});