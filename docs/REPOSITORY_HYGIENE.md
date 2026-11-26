# Repository hygiene — 2026-11-25

Dependencies must be installed from the tracked lockfile (`cd cluster && npm ci`). Docker builds should install dependencies within the image, not copy host node_modules. Preserve Dockerfile, Compose, dashboard, Nginx configuration and load-test script. Before merge, check `docker compose config`, build and run the services on an isolated environment and smoke-test the routes/load balancing. No runtime tests or deployment executed by this cleanup. Original history retained.

## Manifest alignment
The previous package.json referred to a different backend and server.js although the tracked lockfile describes the gateway and Docker starts app.js. The manifest now matches the lockfile's root package and Express dependency; `npm start` points to `app.js`. Docker uses `npm ci`. No credentials or application routes were changed. Credential-like literals in existing code should be reviewed separately and rotated if real; do not use the demo key in production.
