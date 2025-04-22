#!/bin/bash

# Create directories
mkdir -p ~/student-connect/frontend ~/student-connect/backend ~/student-connect/data

# Clone frontend repository
cd ~/student-connect
git clone https://github.com/nikhil187/student-connect.git frontend

# Clone backend repository
git clone https://github.com/ICSI518/expressjs-and-rest-nikhil187.git backend

# Rename docker-compose file
mv ~/student-connect/ec2-docker-compose.yml ~/student-connect/docker-compose.yml

# Move Dockerfiles to appropriate locations
mv ~/student-connect/Dockerfile.backend ~/student-connect/backend/Dockerfile
mv ~/student-connect/Dockerfile.frontend ~/student-connect/frontend/Dockerfile.frontend

# Create .env file for frontend
cat > ~/student-connect/frontend/.env << EOL
REACT_APP_API_URL=http://ec2-3-145-69-196.us-east-2.compute.amazonaws.com:3000
PUBLIC_URL=/
EOL

# Build and run Docker containers
cd ~/student-connect
docker-compose up -d

# Show running containers
docker ps 