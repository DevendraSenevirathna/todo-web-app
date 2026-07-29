const API_BASE = "http://localhost:5000/api/auth";

// Signup Form එක Submit වෙද්දී Backend එකට Data යැවීම
const signupForm = document.querySelector("form");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Form එකේ inputs ටික අරගන්න
        const nameInput = document.querySelector("#name") || document.querySelectorAll("input")[0];
        const emailInput = document.querySelector("#email") || document.querySelectorAll("input")[1];
        const passwordInput = document.querySelector("#password") || document.querySelectorAll("input")[2];

        const userData = {
            name: nameInput ? nameInput.value : "",
            email: emailInput ? emailInput.value : "",
            password: passwordInput ? passwordInput.value : ""
        };

        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Account created successfully! 🎉");
                window.location.href = "login.html"; // Login එකට යවන්න
            } else {
                alert("Error: " + (result.message || result.error));
            }
        } catch (err) {
            console.error(err);
            alert("Backend server එක connect කරගන්න බැහැ! Server එක run වෙනවද බලන්න.");
        }
    });
}