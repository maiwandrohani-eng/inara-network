import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function resetDatabase() {
  // Truncate all public tables to get a clean state
  await prisma.$executeRawUnsafe(`DO $$ DECLARE r RECORD; BEGIN FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename NOT LIKE 'pg_%' AND tablename NOT LIKE 'sql_%') LOOP EXECUTE 'TRUNCATE TABLE "' || r.tablename || '" RESTART IDENTITY CASCADE'; END LOOP; END $$;`)
}

export async function seedRegion({ name = 'Test Region', slug = 'test-region', country = 'Testland' } = {}) {
  return prisma.region.create({
    data: {
      name,
      slug,
      countries: [country],
      active: true,
    },
  })
}

export async function disconnect() {
  await prisma.$disconnect()
}
