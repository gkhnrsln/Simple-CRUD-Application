# (WIP) Simple-CRUD-Application
This project is a simple CRUD application that allows users to create, read, update and delete data. It was developed using Angular for the frontend and Go (Gin Framework) for the backend. This is a personal project to deepen my skills in Angular and Go.

- **Frontend**: Angular, Bootstrap
- **Backend**: Go, Gin Framework
- **Database**: MariaDB
- **Containerization**: Docker

**Demo-Login-Credentials**

| User  | Password  |
|---|---|
| `Admin`  | `AdminPass`  |

### Images
<img width="1840" alt="Screenshot 1 - Persons (Admin View)" src="https://github.com/user-attachments/assets/aa0b23ee-1f9f-455f-8be0-c75fade92824" />
<img width="1840" alt="Screenshot 2 - Person Detail" src="https://github.com/user-attachments/assets/df12dcb6-a77e-4f7b-a308-ed226f57c5ea" />
<img width="1838" alt="Screenshot 3 - Also in Dark Mode" src="https://github.com/user-attachments/assets/ad0f6b40-005a-4b66-ac13-e30de6adbe8c" />

## How to Run
### Prerequisites
Make sure you have the following installed on your system:
- [Docker](https://www.docker.com)

### Command
Run `docker compose up -d`.

### Running in your Browser
Once the Docker containers are successfully built and started, you can access the application in your browser:
1. Open your browser and navigate to: `http://localhost:4200/Simple-CRUD-Application`
2. The application should now be available, and you can start interacting with it.

## Planned
- Search/Filter Function
- Form Validation
- Unit Tests (Backend)
- E2E Tests with Cypress
- Animations(?)
- Accessibility

## Demo
Live Demo on GitHub Pages: https://gkhnrsln.github.io/Simple-CRUD-Application (Only Frontend)
