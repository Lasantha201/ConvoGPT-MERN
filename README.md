# ConvoGPT

ConvoGPT is a full-stack MERN (MongoDB, Express, React, Node.js) web application with Docker support. It includes a backend server and a frontend client, designed to provide a conversational AI experience.

---

## Table of Contents
- [Features](#features)  
- [Technologies](#technologies)  
- [Setup & Run](#setup--run)  
- [Docker Deployment](#docker-deployment)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features
- Real-time chat interface with AI responses  
- Backend API built with Node.js & Express  
- Frontend interface built with React and Vite  
- MongoDB database integration  
- Dockerized for easy deployment  

---

## Technologies
- **Frontend:** React, Vite, JavaScript, CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas)  
- **Containerization:** Docker, Docker Compose  
- **Version Control:** Git, GitHub  

---

## Setup & Run (Locally)
1. Clone the repository:
```bash
git clone https://github.com/Lasantha201/ConvoGPT-MERN.git
cd ConvoGPT
Build Docker images for backend and frontend:

bash
Copy code
docker-compose up --build
Start the containers:

bash
Copy code
docker-compose up
Access the app in your browser:

Backend: http://localhost:5000

Frontend: http://localhost:3000

Docker Deployment
If you want to push your Docker images to DockerHub and deploy:

Tag your images:

bash
Copy code
docker tag convogpt-server lasantha738/convogpt-server:latest
docker tag convogpt-frontend lasantha738/convogpt-frontend:latest
Login to DockerHub:

bash
Copy code
docker login
Push the images:

bash
Copy code
docker push lasantha738/convogpt-server:latest
docker push lasantha738/convogpt-frontend:latest
Pull and run the images on any machine:

bash
Copy code
docker pull lasantha738/convogpt-server:latest
docker pull lasantha738/convogpt-frontend:latest
docker run -p 5000:3000 lasantha738/convogpt-server:latest
docker run -p 3000:3000 lasantha738/convogpt-frontend:latest
Usage
Open the frontend in your browser.

Start chatting with ConvoGPT.

Backend handles API requests, and MongoDB stores chat data.

Contributing
Fork the repository.

Create a new branch for your feature/fix:

bash
Copy code
git checkout -b feature/your-feature-name
Commit your changes:

bash
Copy code
git commit -m "Add your message here"
Push to your branch:

bash
Copy code
git push origin feature/your-feature-name
Open a Pull Request on the main repository.
