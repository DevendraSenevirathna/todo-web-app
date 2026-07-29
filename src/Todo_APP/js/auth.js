// ================================
// SIGNUP
// ================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }

        const user = {

            name: name,
            email: email,
            password: password

        };

        localStorage.setItem(
            "taskflowUser",
            JSON.stringify(user)
        );

        alert("Account created successfully!");

        window.location.href = "login.html";

    });

}


// ================================
// LOGIN
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        // Get saved user
        const savedUser =
            JSON.parse(
                localStorage.getItem("taskflowUser")
            );


        // Check user exists
        if (!savedUser) {

            alert("No account found. Please create an account first.");

            return;

        }


        // Check email and password
        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            // Save login status
            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            alert("Login successful!");

            // Go to Todo App
            window.location.href = "../index.html";

        } else {

            alert("Invalid email or password!");

        }

    });

}