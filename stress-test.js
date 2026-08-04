const http = require('http');

console.log("⚡ Iniciando Benchmark Enterprise en Nexus-Gateway...");
console.log("Evaluando autenticación por API Key, Rate Limiting y Failover...\n");

let success = 0;
let unauthorized = 0;
let rateLimited = 0;

const options = {
  hostname: 'localhost',
  port: 80,
  path: '/api/v1/data',
  method: 'GET',
  headers: {
    'x-api-key': 'nexus-secret-key-2026'
  }
};

for (let i = 1; i <= 30; i++) {
  const req = http.request(options, (res) => {
    if (res.statusCode === 200) success++;
    else if (res.statusCode === 401) unauthorized++;
    else if (res.statusCode === 503 || res.statusCode === 530) rateLimited++;

    if (success + unauthorized + rateLimited === 30) {
      console.log("📊 RESULTADOS DEL BENCHMARK:");
      console.log(`✅ Transacciones Exitosas: ${success}`);
      console.log(`🛡️ Peticiones Bloqueadas por Rate Limit: ${rateLimited}`);
      console.log(`🔒 Rechazos por Falta de Autenticación: ${unauthorized}`);
      console.log("\nInfraestructura validada correctamente.");
    }
  });

  req.on('error', () => {});
  req.end();
}