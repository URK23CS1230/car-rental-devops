# DevOps Project: Cloud-Native Car Rental Platform 

You are an expert DevOps engineer and full-stack architect.

Your task is to design and implement a production-grade, cloud-native car rental web application using microservices architecture and complete DevOps automation.

---

## 🌐 Application Features

### 👤 User Features:
- User registration and login (JWT-based authentication)
- Browse available cars
- Filter cars by:
  - Price
  - Car type (SUV, Sedan, etc.)
  - Location
- 📍 Location-based car search (integrate maps API such as Google Maps or OpenStreetMap)
- Book cars with date and time selection
- ⏱️ Real-time availability checking (prevent double booking)
- View booking history

---

### 🧑‍💼 Admin Features:
- Add, update, and delete cars
- Manage bookings
- View all users
- Monitor car availability status

---

### ⚙️ Business Logic:
- Prevent double booking using availability validation
- Dynamic pricing based on rental duration
- Maintain real-time car status (Available / Booked / Maintenance)

---

## 🧠 Architecture

- Use Microservices Architecture (STRICTLY NO monolithic design)

### Services:
- Frontend (React)
- API Gateway
- Auth Service (Node.js)
- Car Service (Python - FastAPI)
- Booking Service (Java - Spring Boot)

### Communication:
- REST APIs (or optional event-driven using Kafka)

### Database:
- PostgreSQL or MongoDB (separate DB per service preferred)

---

## ⚙️ DevOps Implementation

### 🔹 Version Control:
- Use Git and GitHub
- Follow proper branching strategy (main/dev)

---

### 🔹 Containerization:
- Create Dockerfile for each service
- Use Docker Compose for local development

---

### 🔹 CI/CD Pipeline:
- Use GitHub Actions or Jenkins

Pipeline stages:
1. Install dependencies
2. Run unit tests
3. Build services
4. Build Docker images
5. Push images to DockerHub
6. Deploy to Kubernetes cluster

---

### 🔹 Infrastructure as Code:
- Use Terraform to provision:
  - Cloud VM or Kubernetes Cluster (AWS/GCP/Azure)
  - Networking (VPC, subnets)

---

### 🔹 Configuration Management:
- Use Ansible to:
  - Install Docker
  - Configure Kubernetes nodes
  - Set up environment dependencies

---

### 🔹 Deployment:
- Use Kubernetes:
  - Deployments
  - Services
  - Ingress Controller

- Enable:
  - Horizontal Pod Autoscaling
  - Load balancing

---

### 🔹 Reliability & Self-Healing:
- Implement:
  - Liveness probes
  - Readiness probes
- Ensure failed containers restart automatically

---

### 🔹 Monitoring:
- Basic health-check endpoints
- Optional:
  - Prometheus
  - Grafana dashboards

---

## 📂 Output Requirements

Provide:

- Complete folder structure
- Source code for all microservices
- Dockerfiles for all services
- Docker Compose file
- CI/CD pipeline configuration
- Terraform scripts
- Ansible playbooks
- Kubernetes YAML manifests
- Step-by-step commands to run
- Explanation for each component

---

## 🎯 Goal

Build a scalable, production-ready DevOps project with:
- Microservices architecture
- Automated CI/CD pipeline
- Cloud deployment
- Real-time features
- High availability and scalability

This project should be suitable for:
- Internships
- Resume showcase
- Technical interviews

---

## ⚠️ Important Constraints

- Do NOT use monolithic architecture
- Keep services independent
- Use best practices for scalability and maintainability
- Ensure code is modular and clean

---

## 🚀 Final Objective

Deliver a fully working cloud-native car rental platform that demonstrates real-world DevOps practices, scalability, and reliability.