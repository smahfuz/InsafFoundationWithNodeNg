import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Prisma v7 requires a driver adapter — using @prisma/adapter-pg for PostgreSQL
const pool = new Pool({
  connectionString: process.env['DATABASE_URL'],
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
