# Student Connect - Interactive Student Directory

## Overview
**Student Connect** is a full-stack interactive student directory application that allows users to create, edit, and manage profiles of classmates. Users can like profiles and view them in both card and table formats, making it easy to connect with peers.

## Features
- **Create, Edit, and Delete Profiles**: Users can add new classmates, modify existing profiles, or remove them entirely.
- **Like Functionality**: Users can like profiles, which updates the like count in real-time.
- **Responsive Design**: The application is built with Bootstrap, ensuring a mobile-friendly experience.
- **Search and Filter**: Easily find classmates by searching through names, favorite colors, or favorite foods.
- **Table View**: View all profiles in a sortable table format for better organization.

## Technologies Used
- **Frontend**: React.js, Bootstrap, Axios
- **Backend**: Node.js, Express.js, SQLite
- **Deployment**: Docker, Docker Compose, AWS EC2, Nginx

## Project Structure
```
student-connect/
├── public/              # Static files
├── src/                 # React frontend code
├── server/              # Node.js backend API
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile.frontend  # Frontend Docker configuration
├── nginx/               # Nginx configuration for production
└── ...
```

## Local Development
To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/nikhil187/student-connect.git
   cd student-connect
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

4. In a separate terminal, start the backend:
   ```bash
   cd server
   npm install
   node index.js
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Docker Deployment
This project can be deployed using Docker:

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

3. Access the application at `http://localhost`.

## AWS EC2 Deployment
To deploy on AWS EC2:

1. Launch an EC2 instance with Amazon Linux 2023.

2. Install Docker and Docker Compose on the instance:
   ```bash
   sudo yum update -y
   sudo yum install -y docker
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -a -G docker ec2-user
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. Clone the repository and start the application:
   ```bash
   git clone https://github.com/nikhil187/student-connect.git
   cd student-connect
   docker-compose up -d
   ```

4. Configure security groups to allow incoming traffic on ports 80 (HTTP) and 3000 (API).

## Use of Generative AI

In the development of **Student Connect**, I utilized Generative AI to enhance my coding process and deployment workflow:

### How I Used Generative AI
- I provided basic code snippets and concepts to the AI, which served as a foundation for the application.
- Through iterative refining prompts, I guided the AI to generate more structured and error-free code.
- The AI significantly helped with Docker configuration, Nginx setup, and troubleshooting deployment issues.

### AI-Generated vs. My Own Code
- **AI-Generated Code**: 
  - The initial structure and functionality of various components
  - Docker and Nginx configuration files
  - Deployment troubleshooting guidance
- **My Own Code**:
  - Core application logic and design decisions
  - Integration of frontend and backend components
  - Final deployment and configuration adjustments

This combination of my foundational work and AI assistance resulted in a well-structured, functional application that is properly deployed in the cloud.

