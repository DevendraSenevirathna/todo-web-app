const API_BASE = "http://localhost:5000/api/auth";

function showError(message) {
  // Swap this for a nicer inline banner if you want, alert() is just the
  // fastest way to surface errors during development.
  alert(message);
}

// ---- Login (login.html: #loginForm, #email, #password) ----
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Dashboard lives at src/frontend/index.html, one level up from /pages
      window.location.href = "../index.html";
    } catch (error) {
      console.error(error);
      showError("Could not reach the server. Please try again.");
    }
  });
}

// ---- Sign up (signup.html: #signupForm, #name, #signupEmail, #signupPassword, #confirmPassword) ----
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Field names here match what authController.registerUser expects: name, email, password
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.message || "Registration failed");
        return;
      }

      alert("Account created! Please log in.");
      window.location.href = "login.html";
    } catch (error) {
      console.error(error);
      showError("Could not reach the server. Please try again.");
    }
  });
}
