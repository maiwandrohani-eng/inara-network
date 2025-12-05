const { PrismaClient } = require('@prisma/client');
(async () => {
  const p = new PrismaClient();
  const r = await p.region.findMany();
  console.log('regions found:', r.map(x => x.slug));
  await p.$disconnect();
})().catch(e => { console.error(e); process.exit(1) });
