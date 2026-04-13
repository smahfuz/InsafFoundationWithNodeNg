import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

// Initialize the driver adapter
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Prisma v7 with driver adapter
const prisma = new PrismaClient({ adapter });

// Simple connection check
async function testConnection() {
  try {
    const dbName = connectionString.includes('@') ? connectionString.split('@')[1] : 'Local DB';
    console.log(`Testing database connection to: ${dbName.split('/')[0]}...`);
    await prisma.$connect();
    console.log('✅ Successfully connected to the database.');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    console.error('Check your DATABASE_URL in environment variables.');
  }
}

testConnection();

export default prisma;
