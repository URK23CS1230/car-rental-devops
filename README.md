# Cloud-Native Car Rental Platform

A production-grade, highly scalable car rental platform demonstrating real-world DevOps practices, microservices architecture, and cloud deployment logic.

## Architecture
- **Frontend**: React (Vite) with Tailwind CSS and Framer Motion for a premium animated aesthetic.
- **API Gateway**: NGINX routing.
- **Auth Service**: Node.js + Express + JWT (MongoDB integration ready).
- **Car Service**: Python FastAPI + SQLAlchemy (SQLite/PostgreSQL ready).
- **Booking Service**: Java Spring Boot + JPA (PostgreSQL ready).
- **DevOps**: Docker, Docker Compose, GitHub Actions, Terraform, Ansible, Kubernetes Manifests.

## Folder Structure
- `/frontend`: React application.
- `/api-gateway`: NGINX reverse proxy.
- `/auth-service`: Node.js Express user authentication service.
- `/car-service`: Python FastAPI car catalog and searching service.
- `/booking-service`: Java Spring Boot reservations service.
- `/k8s`: Kubernetes manifests for deploying the applications with auto-scaling and ingress networking.
- `/terraform`: Terraform scripts to provision cloud native environments (VPC/EKS).
- `/ansible`: Ansible playbooks for server and cluster node configurations.
- `/.github/workflows`: GitHub Actions CI/CD pipelines.

## How to Run Locally
We have provided a unified `docker-compose.yml` to spin up the entire cluster easily for development.

1. Install Docker and docker-compose.
2. Build and spin up the environment:
    ```bash
    docker-compose up --build
    ```
3. Access the premium frontend by navigating to:
    ```
    http://localhost
    ```
4. Access backend APIS via NGINX API Gateway:
    - `http://localhost/api/auth/*`
    - `http://localhost/api/cars/*`
    - `http://localhost/api/bookings/*`
    
## Deployment to Cloud / Kubernetes
The project is fully prepared for cloud deployment:
1. Use `terraform apply` in `/terraform` to provision resources.
2. Use `ansible-playbook` in `/ansible` to install dependencies if manually managing nodes.
3. Deploy to Kubernetes cluster using:
    ```bash
    kubectl apply -f k8s/
    ```

## Notes
- Autoscaling is configured using HPA in the Kubernetes manifests.
- Multi-staging Dockerfiles for the microservices ensures compact lightweight production images.
- Liveness and readiness probes are assigned in the manifesting to guarantee high availability and self-healing.
