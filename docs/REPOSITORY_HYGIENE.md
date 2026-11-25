# Repository hygiene — 2026-11-25

Dependencies must be installed from the tracked lockfile (`cd cluster && npm ci`). Docker builds should install dependencies within the image, not copy host node_modules. Preserve Dockerfile, Compose, dashboard, Nginx configuration and load-test script. Before merge, check `docker compose config`, build and run the services on an isolated environment and smoke-test the routes/load balancing. No runtime tests or deployment executed by this cleanup. Original history retained.
