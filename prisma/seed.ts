import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')
  
  // Create Categories
  const menCategory = await prisma.category.create({ data: { name: 'Men' } })
  const womenCategory = await prisma.category.create({ data: { name: 'Women' } })
  const bridalCategory = await prisma.category.create({ data: { name: 'Bridal' } })
  const kidsCategory = await prisma.category.create({ data: { name: 'Kids' } })

  // Create Admin User
  await prisma.user.upsert({
    where: { email: 'admin@salon.com' },
    update: {},
    create: {
      email: 'admin@salon.com',
      name: 'Admin',
      role: 'ADMIN',
    },
  })

  // Create Services
  await prisma.service.createMany({
    data: [
      { name: 'Men Classic Haircut', description: 'Classic scissors cut', price: 499, duration: 30 },
      { name: 'Beard Trim', description: 'Beard shaping and trim', price: 299, duration: 20 },
      { name: 'Women Layered Cut', description: 'Layered haircut with blow dry', price: 1299, duration: 45 },
      { name: 'Bridal Makeup', description: 'Complete bridal makeup package', price: 15000, duration: 120 },
      { name: 'Hair Spa', description: 'Relaxing hair spa treatment', price: 1499, duration: 60 },
      { name: 'Facial', description: 'Deep cleansing facial', price: 999, duration: 45 },
    ]
  })

  // Create Hairstyles
  await prisma.hairstyle.createMany({
    data: [
      { name: 'Modern Pompadour', description: 'Classic men’s cut', imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop', categoryId: menCategory.id },
      { name: 'Long Layers', description: 'Beautiful long layers', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&auto=format&fit=crop', categoryId: womenCategory.id },
      { name: 'Bridal Updo', description: 'Elegant updo for your special day', imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop', categoryId: bridalCategory.id },
    ]
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
