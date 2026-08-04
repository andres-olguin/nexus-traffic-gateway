const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
const NODE_ID = process.env.NODE_ID || `Nexus-Node-${PORT}`;

app.use(express.json());

// Permite CORS para que el dashboard web pueda consultar los nodos directamente
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware de API Key Security
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (req.path.startsWith('/api/v1/') && apiKey !== 'nexus-secret-key-2026') {
    return res.status(401).json({ error: 'UNAUTHORIZED', message: 'API Key inválida o ausente' });
  }
  next();
});

// Metrics & Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    nodeId: NODE_ID,
    port: PORT,
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`
  });
});

// Endpoint optimizado con simulación de caché
app.get('/api/v1/data', (req, res) => {
  const isCached = Math.random() > 0.4;
  res.status(200).json({
    status: 'SUCCESS',
    message: 'Data processed through Nexus High-Availability Cluster',
    servedBy: NODE_ID,
    cacheHit: isCached,
    latency: isCached ? '1ms (Redis Cache)' : `${Math.floor(Math.random() * 15 + 10)}ms (Database Query)`
  });
});

app.listen(PORT, () => {
  console.log(`[Nexus Engine] ${NODE_ID} listening on port ${PORT}`);
});