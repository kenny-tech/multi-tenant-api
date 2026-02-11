Multi-Tenant SaaS Project Management API

OVERVIEW

This project is a multi-tenant backend API built with:

Node.js

TypeScript

Express.js

PostgreSQL

Sequelize ORM

JWT Authentication


Multi-Tenancy Strategy

This system uses a single database with tenant scoping via org_id.

Every tenant-owned table includes:

org_id column

Foreign key constraint

Database index on org_id

All queries are scoped by org_id from the JWT.


Setup Instructions

- git clone <repo-url>
- cd project-folder
- npm install

- Configure environment variables
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=multi_tenant_db
JWT_SECRET=secetkey

- Run database migration (npx sequelize-cli db:migrate)

- Start server (npm run dev)

