provider "aws" {
  region = "us-east-1"
}

# VPC setup
resource "aws_vpc" "devops_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "devops-car-rental-vpc"
  }
}

# Subnet
resource "aws_subnet" "public_subnet" {
  vpc_id     = aws_vpc.devops_vpc.id
  cidr_block = "10.0.1.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "devops-public-subnet"
  }
}

# Example EKS Cluster (minimal boilerplate for cloud native project)
resource "aws_eks_cluster" "car_rental_cluster" {
  name     = "car-rental-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = [aws_subnet.public_subnet.id]
  }
}

# Dummy IAM Role for EKS
resource "aws_iam_role" "eks_cluster_role" {
  name = "eks-cluster-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      }
    ]
  })
}
