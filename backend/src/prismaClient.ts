import { PrismaClient } from '@prisma/client';

// Standard Prisma initialization is more stable for Render/Node.js environments.
// It will automatically use the DATABASE_URL environment variable.
const prisma = new PrismaClient();

export default prisma;
