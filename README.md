# Todo List Application - Assignment Project

A full-stack collaborative Todo List web application developed for university coursework, featuring automated CI/CD pipelines, modular frontend/backend architecture, and secure deployment.

---

## 👥 Project Team & Contributions

| Name | Student ID | Role / Core Responsibilities |
| :--- | :--- | :--- |
| **Devendra Senevirathna** | *ITBIN-2414-0016* | DevOps & Release Manager (CI/CD Pipelines, GitHub Actions, Branching Strategy, Deployment) |
| **Theekshana Didula** | *ITBIN-2414-0008* | Backend Developer (Node.js API, Database Setup, Task Management Routes) |
| **Shashinka Srimal** | *ITBIN-2414-0026* | Frontend Developer (UI/UX Design, Client-Side Logic, Component Integration) |

---

## 🚀 Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Responsive UI)
* **Backend:** Node.js, Express.js
* **Database:** MySQL (Relational database management for persistent task storage)
* **DevOps & CI/CD:** GitHub Actions (Automated build/test checks & Vercel deployment pipelines)

---

## 🛠️ Getting Started Locally

### **1. Clone the Repository**
\`\`\`bash
git clone https://github.com/DevendraSenevirathna/todo-web-app.git
cd todo-web-app
\`\`\`

### **2. Setup and Run Backend**
\`\`\`bash
cd src/backend
npm install
npm run dev
\`\`\`

### **3. Setup and Run Frontend**
Open the frontend files in your browser or serve them using a live server extension (like VS Code Live Server).

---

## 🔄 Git Workflow & CI/CD Architecture

* **`main` Branch:** Protected production branch. Code is automatically built and deployed to production via `deploy.yml` only after thorough testing.
* **`develop` Branch:** Integration branch where all completed features from team member branches are merged and verified.
* **Feature Branches (`feature/*`):** Isolated branches used by developers to build specific components. Every push and Pull Request triggers the automated `ci.yml` build pipeline to catch errors early.