# Docker Setup for Student Connect

This project is configured to run in Docker containers. Here's how to use it.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

## Development Setup

1. Build and start the containers:

```bash
docker-compose up
```

2. To run in detached mode (in the background):

```bash
docker-compose up -d
```

3. To stop the containers:

```bash
docker-compose down
```

## Structure

- `Dockerfile.frontend`: Docker configuration for the React frontend
- `Dockerfile.backend`: Docker configuration for the Express backend
- `docker-compose.yml`: Orchestrates both services
- `.dockerignore`: Excludes unnecessary files from the Docker build
- `update-env.sh`: Helper script to update the backend URL for production

## Production Deployment

1. Update the backend URL by running:

```bash
./update-env.sh <YOUR_EC2_PUBLIC_IP>
```

2. Rebuild the frontend container:

```bash
docker-compose build frontend
```

3. Deploy to your EC2 instance (see DEPLOYMENT_INSTRUCTIONS.md)

## Accessing the Application

- Frontend: http://localhost (port 80)
- Backend API: http://localhost:3000 