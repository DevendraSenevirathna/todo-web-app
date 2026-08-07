# TaskFlow - Collaborative To-Do Web Application

## Group Information

* **Student 1:** Devendra Senevirathna - ITBIN-2414-0016 - Role: DevOps & Release Manager
* **Student 2:** Theekshana Didula - ITBIN-2414-0008 - Role: Backend Developer
* **Student 3:** Shashinka Srimal - ITBIN-2414-0026 - Role: Frontend Developer

## Project Description

TaskFlow is a full-stack collaborative To-Do web application developed as a university coursework project. The application allows users to create accounts, securely log in, and manage their daily tasks through a simple and responsive interface.

The project follows modern software development and DevOps practices, including a modular frontend/backend architecture, Git-based collaboration, Docker containerization, automated Continuous Integration using GitHub Actions, and cloud deployment using Render with Aiven MySQL as the production database.

## Live Deployment

🔗 **Live URL:** https://todo-web-app-ktv9.onrender.com/pages/welcome.html

## Technologies Used

* **Frontend:** HTML5, CSS3, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Production Database:** Aiven MySQL
* **Containerization:** Docker
* **Version Control:** Git & GitHub
* **CI:** GitHub Actions
* **CD / Deployment:** Render Auto-Deploy
* **Deployment Architecture:** Docker-based deployment on Render with Aiven MySQL

## Features

* **User Authentication:** Users can create accounts and securely log in to the application.
* **Task Management:** Users can create and manage their personal To-Do tasks.
* **Persistent Database Storage:** Task and user data are stored in a MySQL relational database.
* **Responsive Interface:** A simple and responsive frontend built with HTML, CSS, and JavaScript.
* **REST API:** The Node.js/Express.js backend provides API endpoints for application functionality.
* **Dockerized Application:** The backend application can be run consistently using Docker.
* **Cloud Deployment:** The application is deployed to Render and connected to an Aiven MySQL production database.
* **Automated CI:** GitHub Actions automatically performs CI checks when code is pushed or submitted through pull requests.

## Branch Strategy

We follow a Git Flow-inspired branching model:

* `main` - Production branch containing stable code and connected to the live Render deployment.
* `develop` - Development and integration branch used for combining completed features before production release.
* `feature/*` - Individual developer branches used to develop specific features or fixes.

## Individual Contributions

### Devendra Senevirathna

* Established the initial repository structure and Git branching strategy.
* Configured the project's DevOps and deployment workflow.
* Configured Docker-based deployment for the Node.js backend.
* Configured the production deployment on Render.
* Configured the Aiven MySQL production database connection.
* Configured secure environment variables and SSL database connectivity.
* Configured GitHub Actions Continuous Integration workflow.
* Managed the GitHub repository and release/deployment process.
* Verified the GitHub-to-Render automated deployment workflow.

### Theekshana Didula

* Developed the Node.js and Express.js backend architecture.
* Implemented REST API endpoints for application functionality.
* Developed task management routes and server-side logic.
* Implemented user authentication and account-related functionality.
* Integrated the backend with the MySQL database.
* Implemented database operations for users and tasks.
* Tested and debugged backend API functionality.

### Shashinka Srimal

* Designed and developed the frontend user interface.
* Implemented HTML page structures and CSS styling.
* Developed client-side JavaScript functionality.
* Implemented user login and registration interface components.
* Integrated frontend functionality with the backend API.
* Developed task management interface components.
* Improved responsive layout and overall user experience.
* Tested and refined frontend functionality across the application.


## Setup & Installation Instructions

### Prerequisites

* Node.js 20 or higher
* npm
* Git
* Docker and Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DevendraSenevirathna/todo-web-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd todo-web-app
   ```

3. Install backend dependencies:

   ```bash
   cd src/backend
   npm install
   ```

4. Configure the required environment variables using a local `.env` file.

5. Run the application locally using Docker Compose from the project root:

   ```bash
   docker compose up --build
   ```

6. Open the application in your browser:

   ```text
   http://localhost:5000
   ```

### CI/CD Deployment Process

#### Continuous Integration

The project uses **GitHub Actions** for Continuous Integration.

The CI pipeline automatically runs when changes are pushed to relevant branches or when pull requests are created. It is responsible for installing project dependencies and performing automated code validation, including linting, testing, and build verification.

The CI workflow is defined in:

```text
.github/workflows/ci.yml
```

#### Continuous Deployment

Currently, Continuous Deployment is handled by **Render's built-in Auto-Deploy functionality** rather than a separate GitHub Actions deployment workflow.

When changes are pushed to the production `main` branch, Render automatically detects the new commit, builds the Docker-based application, and deploys the updated version.

The current deployment flow is:

```text
Developer
    ↓
Git Push
    ↓
GitHub (main)
    ↓
GitHub Actions CI
    ↓
Render Auto-Deploy
    ↓
Docker Build
    ↓
Live Application
    ↓
Aiven MySQL
```

A dedicated GitHub Actions CD workflow (`deploy.yml`) may be introduced in a future iteration if the project requires GitHub Actions to control the deployment process directly.

## Challenges & Resolutions

### Production Database Migration

The local development environment uses MySQL through Docker Compose, while the production environment uses Aiven MySQL. The application was configured to use environment variables so that the database connection can be changed between local and production environments without modifying the application architecture.

### Secure Database Connectivity

Aiven requires SSL connections for the production MySQL database. The backend was configured to use the Aiven CA certificate through an environment variable, allowing the production database connection to remain secure without committing sensitive credentials or certificates to the repository.

### Localhost API Configuration

During production testing, the frontend initially attempted to communicate with the backend using a hardcoded `localhost` API URL. This worked locally but failed in the deployed environment.

The API configuration was changed to use a relative API path, allowing the frontend to communicate with the backend correctly in both local and production environments.

### Automated Deployment

Render's Auto-Deploy functionality was configured to automatically rebuild and deploy the application when changes are pushed to the production branch. This allows the project to maintain a continuous deployment process without requiring a separate GitHub Actions CD workflow at the current stage.

## Build Status

**CI Pipeline:** Configured with GitHub Actions

**Deployment:** Render Auto-Deploy

**Production Database:** Aiven MySQL

**Containerization:** Docker
