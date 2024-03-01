# Nest.js tp
It's a simple Nestjs REST API with authentication, rate-limiter and more...

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Docker installed

## Getting Started

### Installation

1. Clone the repository using ssh:

   ```bash
   git clone git@github.com:aymene01/aymene-delegation-service.git
   cd aymene-delegation-service
   ```
   
2. Set up the environment:
   ```bash
   docker compose up -d
   ```
   
3. Access the container:
   ```bash
   docker compose exec app sh
   ```
   
4. Run the following commands inside the container to initialize the database and start the API:
   ```bash
   pnpm prisma db push
   pnpm dev
   ```
