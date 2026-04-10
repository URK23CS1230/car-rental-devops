#!/usr/bin/env bash
# =============================================================================
# check-and-fix.sh — Diagnose pods and get public URL
# Usage: ./check-and-fix.sh
# =============================================================================

echo ""
echo "═══════════════════════════════════════════════"
echo " Pod Status"
echo "═══════════════════════════════════════════════"
kubectl get pods -n car-rental -o wide

echo ""
echo "═══════════════════════════════════════════════"
echo " Services"
echo "═══════════════════════════════════════════════"
kubectl get svc -n car-rental

echo ""
echo "═══════════════════════════════════════════════"
echo " Frontend Rollout Status"
echo "═══════════════════════════════════════════════"
kubectl rollout status deployment/frontend -n car-rental --timeout=300s || true

echo ""
echo "═══════════════════════════════════════════════"
echo " Crash / Error Pods - describe"
echo "═══════════════════════════════════════════════"
# Describe any pods not in Running state
kubectl get pods -n car-rental --no-headers | \
  grep -v "Running" | \
  awk '{print $1}' | \
  xargs -I{} kubectl describe pod {} -n car-rental 2>/dev/null | \
  grep -A5 "Warning\|Error\|Back-off\|reason:" || echo "  No error events found."

echo ""
echo "═══════════════════════════════════════════════"
echo " Public URL (LoadBalancer)"
echo "═══════════════════════════════════════════════"
EXTERNAL=$(kubectl get svc frontend -n car-rental -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || true)
if [[ -n "$EXTERNAL" ]]; then
  echo "  🌍 http://$EXTERNAL"
else
  echo "  ⏳ ELB still provisioning (takes 1-3 min on AWS)"
  echo "     Retry: kubectl get svc frontend -n car-rental"
fi
