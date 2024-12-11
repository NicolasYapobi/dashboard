# dashboard

# Project Setup and Documentation

## Prerequisites
Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Setup Environment Variables

#### Backend:
Create a `.env` file in the backend folder and add the following:
```env
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=nestjs_db
DATABASE_URL=<Your URL>
```

#### Frontend:
If applicable, create a `.env.local` file in the frontend folder and add necessary variables (e.g., API URL):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

### 3. Start the Backend with Docker Compose
Navigate to the backend folder and run:
```bash
docker-compose up --build
```

This will:
- Build and run the backend service using Nest.js.
- Start a PostgreSQL database container.

#### Access:
- Backend API: `http://localhost:4000`

---

### 4. Start the Frontend with Next.js
Navigate to the frontend folder and run:

#### Install Dependencies:
```bash
npm install
```

#### Start the Development Server:
```bash
npm run dev
```

#### Access:
- Frontend: `http://localhost:3000`

---

## Backend API Routes

### Base URL:
`http://localhost:4000`

### Routes:

#### 1. **Get All Tasks**
- **Endpoint:** `/Tasks`
- **Method:** `GET`
- **Description:** Fetch all tasks from the database.

#### 2. **Create a New Task**
- **Endpoint:** `/Tasks`
- **Method:** `POST`
- **Description:** Add a new task to the database.
- **Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "string"
  }
  ```

#### 3. **Update a Task**
- **Endpoint:** `/Tasks/:id`
- **Method:** `PATCH`
- **Description:** Update an existing task.
- **Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "string"
  }
  ```

#### 4. **Delete a Task**
- **Endpoint:** `/Tasks/:id`
- **Method:** `DELETE`
- **Description:** Remove a task by ID from the database.

---
