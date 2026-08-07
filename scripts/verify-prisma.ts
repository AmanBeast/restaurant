import { prisma } from '../lib/prisma';

async function main() {
  const usersCount = await prisma.user.count();
  console.log(`Found ${usersCount} users in shared Prisma Postgres database.`);
  console.log('✅ Connected.');
}

main()
  .catch((e) => {
    console.error('Verification Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
