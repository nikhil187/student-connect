# Deployment Instructions for AWS EC2

## Prerequisites
- AWS Account
- Docker installed on your local machine

## Step 1: Create an EC2 Instance
1. Log in to the AWS Management Console
2. Navigate to EC2 service
3. Click "Launch Instance"
4. Choose Amazon Linux 2 AMI
5. Select t2.micro instance type (free tier eligible)
6. Configure instance settings (default settings are fine for now)
7. Add storage (default 8GB is fine)
8. Add tags (optional)
9. Configure security group:
   - Allow SSH (port 22) for your IP
   - Allow HTTP (port 80) for all traffic
   - Allow TCP (port 3000) for all traffic

## Step 2: Create and Download Key Pair
1. Create a new key pair if you don't have one
2. Download the .pem file
3. For macOS/Linux users: `chmod 400 your-key-pair.pem` to set the correct permissions

## Step 3: Connect to Your EC2 Instance
```bash
ssh -i your-key-pair.pem ec2-user@your-ec2-public-dns
```

## Step 4: Install Docker and Docker Compose on EC2
```bash
# Update packages
sudo yum update -y

# Install Docker
sudo amazon-linux-extras install docker -y

# Start Docker service
sudo service docker start

# Add ec2-user to docker group
sudo usermod -a -G docker ec2-user

# Enable Docker to start on boot
sudo systemctl enable docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Apply executable permissions to the binary
sudo chmod +x /usr/local/bin/docker-compose
```

## Step 5: Deploy Your Application

### Option 1: Clone your repository
```bash
# Install git
sudo yum install git -y

# Clone your repository
git clone https://github.com/yourusername/student-connect.git
cd student-connect

# Build and run with Docker Compose
docker-compose up -d
```

### Option 2: Transfer files using SCP
From your local machine:
```bash
scp -i your-key-pair.pem -r ./student-connect ec2-user@your-ec2-public-dns:~
```

Then on your EC2 instance:
```bash
cd student-connect
docker-compose up -d
```

## Step 6: Verify Your Deployment
1. Open a web browser
2. Navigate to the public DNS or IP of your EC2 instance (e.g., http://ec2-xx-xx-xx-xx.compute-1.amazonaws.com)
3. Verify that your application is running correctly

## Troubleshooting
- Check Docker container status: `docker ps -a`
- View container logs: `docker logs container_id`
- Check the security group rules to ensure ports 80 and 3000 are open
- Check that the backend URL in your frontend app is correctly configured to point to your EC2 instance 