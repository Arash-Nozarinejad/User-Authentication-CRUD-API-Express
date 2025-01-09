import prisma from './prisma';

export async function testConnection() {
    try {
        console.log(' Database connection successful');
    } catch(error) {
        console.error('Database connection failed: ', error);
        process.exit(1);
    }
}