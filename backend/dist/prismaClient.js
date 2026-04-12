"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Standard Prisma initialization is more stable for Render/Node.js environments.
// It will automatically use the DATABASE_URL environment variable.
const prisma = new client_1.PrismaClient();
exports.default = prisma;
