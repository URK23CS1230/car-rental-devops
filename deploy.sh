#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Build, push Docker images to DockerHub, and deploy to EKS
# Usage: ./deploy.sh <DOCKERHUB_USERNAME>
# =============================================================================
set -euo pipefail

DOCKER_USER="${1:-}"

if [[ -z "$DOCKER_USER" ]]; then
  echo "❌ Error: provide your DockerHub username"
  echo "   Usage: ./deploy.sh <your_dockerhub_username>"
  exit 1
fi

SERVICES=("frontend" "auth-service" "car-service" "booking-service")
IMAGE_NAMES=("frontend" "auth-service" "car-service" "booking-service")
BUILD_DIRS=("frontend" "auth-service" "car-service" "booking-service")

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   Car Rental — DockerHub Deploy Script       ║"
echo "╠══════════════════════════════════════════════╣"
echo "║   DockerHub User : $DOCKER_USER"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── Step 1: Docker Login ─────────────────────────────────────────────────────
echo "🔐 Step 1: Login to DockerHub..."
docker login -u "$DOCKER_USER"
echo ""

# ── Step 2: Build & Push All Images ──────────────────────────────────────────
echo "🏗️  Step 2: Building and pushing Docker images..."
for i in "${!SERVICES[@]}"; do
  SVC="${SERVICES[$i]}"
  IMG="${IMAGE_NAMES[$i]}"
  DIR="${BUILD_DIRS[$i]}"
  FULL_TAG="$DOCKER_USER/$IMG:latest"

  echo ""
  echo "  ▶ Building: $FULL_TAG"
  docker build -t "$FULL_TAG" "./$DIR"

  echo "  ▶ Pushing:  $FULL_TAG"
  docker push "$FULL_TAG"
  echo "  ✅ Done: $FULL_TAG"
done
echo ""

# ── Step 3: Patch YAML files with real DockerHub username ────────────────────
echo "📝 Step 3: Injecting DockerHub username into k8s manifests..."
for YAML in k8s/auth-service.yaml k8s/car-service.yaml k8s/booking-service.yaml k8s/frontend.yaml; do
  sed -i.bak "s|DOCKERHUB_USERNAME|$DOCKER_USER|g" "$YAML"
  rm -f "${YAML}.bak"
  echo "  ✅ Patched: $YAML"
done
echo ""

# ── Step 4: Apply to Kubernetes ───────────────────────────────────────────────
echo "🚀 Step 4: Applying manifests to Kubernetes (EKS)..."
kubectl apply -f k8s/
echo ""

# ── Step 5: Restart Deployments ──────────────────────────────────────────────
echo "♻️  Step 5: Rolling restart to force image re-pull..."
kubectl rollout restart deployment/frontend       -n car-rental
kubectl rollout restart deployment/auth-service   -n car-rental
kubectl rollout restart deployment/car-service    -n car-rental
kubectl rollout restart deployment/booking-service -n car-rental
echo ""

# ── Step 6: Wait for rollout ─────────────────────────────────────────────────
echo "⏳ Step 6: Waiting for rollouts to complete..."
kubectl rollout status deployment/frontend        -n car-rental --timeout=180s
kubectl rollout status deployment/auth-service    -n car-rental --timeout=180s
kubectl rollout status deployment/car-service     -n car-rental --timeout=180s
kubectl rollout status deployment/booking-service -n car-rental --timeout=300s
echo ""

# ── Step 7: Get public URL ───────────────────────────────────────────────────
echo "🌐 Step 7: Fetching frontend public URL (LoadBalancer)..."
echo "   Waiting up to 90s for AWS to provision ELB..."
for i in $(seq 1 30); do
  EXTERNAL_IP=$(kubectl get svc frontend -n car-rental -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || true)
  if [[ -n "$EXTERNAL_IP" ]]; then
    break
  fi
  sleep 3
done

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║               ✅  DEPLOYMENT COMPLETE                        ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo ""
kubectl get pods -n car-rental
echo ""
if [[ -n "${EXTERNAL_IP:-}" ]]; then
  echo "  🌍 Public URL: http://$EXTERNAL_IP"
else
  echo "  ⏳ ELB still provisioning. Run this to get it:"
  echo "     kubectl get svc frontend -n car-rental"
  echo "     (check EXTERNAL-IP column)"
fi
echo "╚══════════════════════════════════════════════════════════════╝"
