import { prisma } from '../lib/prisma';

async function main() {
  console.log('Seeding Prisma Postgres database from restaurant app...');

  const user1 = await prisma.user.upsert({
    where: { email: 'customer@luxebistro.com' },
    update: {},
    create: {
      name: 'Alexander Wright',
      email: 'customer@luxebistro.com',
      role: 'customer',
      points: 450,
      tier: 'Silver',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'admin@luxebistro.com' },
    update: {},
    create: {
      name: 'Julian Vane (Superadmin)',
      email: 'admin@luxebistro.com',
      role: 'admin',
      points: 1250,
      tier: 'Platinum',
      phone: '+1 (555) 999-0000',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80',
    },
  });

  console.log('Restaurant app seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
