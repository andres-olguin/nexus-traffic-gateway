# Nexus-Gateway v2.0 | Enterprise Traffic Orchestrator

Nexus-Gateway es un API Gateway y balanceador de carga de alto rendimiento diseñado para orquestar tráfico en arquitecturas de microservicios. Proporciona resiliencia, seguridad Layer 7, tolerancia a fallos mediante nodos de respaldo (failover) y almacenamiento en caché.

---

## 🏛️ Arquitectura del Sistema

```text
                     ┌───────────────────────────┐
                     │     Cliente / Cliente     │
                     └─────────────┬─────────────┐
                                   │ HTTP (Port 80)
                                   ▼
                     ┌───────────────────────────┐
                     │   Nginx (API Gateway)     │
                     │  - Rate Limiting          │
                     │  - Security Headers       │
                     │  - Least Connections      │
                     └─────────────┬─────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Nexus-Node-01   │      │  Nexus-Node-02   │      │ Nexus-Node-03    │
│   (Port 3001)    │      │   (Port 3002)    │      │ (Port 3003 - BK) │
└────────┬─────────┘      └────────┬─────────┘      └────────┬─────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │   Redis Cache    │
                          │   (Port 6379)    │
                          └──────────────────┘