import { PrismaClient } from '@prisma/client';

// Prisma v7 works best with an explicit options object in some environments.
const prisma = new PrismaClient({});

export default prisma;
