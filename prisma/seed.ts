import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'maiwand@inara.org' }
  })

  if (existingAdmin) {
    // Update existing admin
    const hashedPassword = await bcrypt.hash('maiwand', 10)
    
    const admin = await prisma.user.update({
      where: { email: 'maiwand@inara.org' },
      data: {
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        memberType: 'CORE',
        membershipTier: 'CORE',
        verified: true,
        membershipStartDate: new Date(),
      }
    })
    
    console.log('✅ Updated admin user:', admin.email)
    console.log('📧 Email: maiwand@inara.org')
    console.log('🔑 Password: maiwand')
    console.log('👑 Role: SUPER_ADMIN')
    return
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('maiwand', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'maiwand@inara.org',
      password: hashedPassword,
      name: 'Maiwand',
      role: 'SUPER_ADMIN',
      memberType: 'CORE',
      membershipTier: 'CORE',
      verified: true,
      membershipStartDate: new Date(),
    }
  })

  console.log('✅ Created admin user:', admin.email)
  console.log('📧 Email: maiwand@inara.org')
  console.log('🔑 Password: maiwand')
  console.log('👑 Role: SUPER_ADMIN')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
