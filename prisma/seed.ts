import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const size1 = await prisma.size.upsert({
    where: { id: 1 },
    update: {
      width: 200,
      height: 200,
    },
    create: {
      width: 200,
      height: 200,
    },
  });
  const size2 = await prisma.size.upsert({
    where: { id: 2 },
    update: {
      width: 200,
      height: 200,
    },
    create: {
      width: 200,
      height: 200,
    },
  });
  const product1 = await prisma.product.upsert({
    where: { name: "Avocado" },
    update: {
      name: "Avocado",
      count: 15,
      weight: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      comments: {
        create: [
          {
            description: "Updated Comment",
            date: new Date(),
          },
        ],
      },
    },
    create: {
      name: "Avocado",
      count: 10,
      weight: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: {
        connect: { id: size1.id },
      },
      comments: {
        create: [
          {
            description: "Great product!",
            date: new Date("2021-08-22T14:00:00Z"),
          },
          {
            description: "Not bad",
            date: new Date("2021-09-22T14:00:00Z"),
          },
        ],
      },
    },
  });
  const product2 = await prisma.product.upsert({
    where: { name: "Blueberry" },
    update: {
      name: "Blueberry",
      count: 6,
      weight: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      comments: {
        create: [
          {
            description: "Updated Comment",
            date: new Date(),
          },
        ],
      },
    },
    create: {
      name: "Blueberry",
      count: 10,
      weight: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: {
        connect: { id: size2.id },
      },
      comments: {
        create: [
          {
            description: "Great product!",
            date: new Date("2021-08-22T14:00:00Z"),
          },
          {
            description: "Not bad",
            date: new Date("2021-09-22T14:00:00Z"),
          },
        ],
      },
    },
  });
  console.log({ product1, product2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
