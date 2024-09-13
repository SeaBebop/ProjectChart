# ChartAPI

## Description

ChartAPI is a Next.js project that uses Django to serve data via a REST API. It integrates four models from the Django backend to provide data to the Next.js frontend.

## Thought Process
For this project, my approach was to streamline the learning and development process to complete it as efficiently as possible. I evaluated multiple libraries for solving the same problem and chose the one that was the easiest to use, allowing me to move to the next step quickly. If a library proved too difficult to integrate or didn’t meet my needs, I would abandon it in favor of a more compatible option rather than reworking my entire codebase. 

The internet was a valuable resource for quickly finding solutions to issues like file locations, CORS headers, or TypeScript errors. Before diving into coding, I approached the project with a focus on how to break it down into containers and how these components should connect. This planning helped me identify the tools I needed, such as Axios or a reverse proxy, to facilitate these connections.

## Setup Instructions

### Local Development

1. **Backend (Django)**

   - Navigate to the Django backend directory:
     ```bash
     cd chartAPI
     ```
   - Install requirement.txt:
     ```bash
     pip install -r requirements.txt
     ```
   - Initialize the dataset and Start the Django development server:
     ```bash
     python manage.py makemigrations
     python manage.py migrate 
     python manage.py runserver 0.0.0.0:8000

     ```
   - Open a new terminal 
      ```bash
      cd chartAPI
      python manage.py loaddata fixtures.json 
      ```
   - Test the backend at `http://localhost:8000/api/bar-chart-data`.
   
   - If nothing try python manage.py loaddata fixtures.json again should see a:
      - Installed 16 object(s) from 1 fixture(s)

2. **Frontend (Next.js)**

   - Open a new terminal and navigate to the frontend directory:
     ```bash
     cd chartfrontend
     ```
     
   - Start the Next.js development server:
     ```bash
     npm i
     npm run dev
     ```
   - Wait until you see `✓ Ready in x time` in the terminal, then open `http://localhost:3000` in your browser. Wait until you see `✓ Compiled / in x time`.

### Using Docker

1. **Run with Docker Compose**

   - At the moment the data is not init for django. From the base folder, start all services:
     ```bash
     docker compose up
     docker container ls
     ```
   - Then you will find something like "projecthcart-main-web" and copy the CONTAINER ID and 
     ```bash
     docker exec -it <CONTAINER ID> python manage.py loaddata fixtures.json
     ```
   - Then open/refresh `http://localhost:3000` so it can be compiled. And wait till it loads

2. **Run Separately**

   - Start the Django backend container:
     ```bash
     docker run -d -p 8000:8000 seabebop/chartapi:web
     ```
   - Start the Next.js frontend container:
     ```bash
     docker run -d -p 3000:3000 seabebop/chartapi:frontend
     ```
   - Then open `http://localhost:3000` so it can be compiled. And wait till it loads

   - If the dataset is missing, initialize it in the Django container:
     ```bash
     docker container ls
     docker exec -it <django-container-id> python manage.py loaddata fixtures.json
     ```
    - Then open `http://localhost:3000` so it can be compiled. And wait till it loads
