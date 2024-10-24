import { PrismaClient } from "@prisma/client";

const PrismaSingleton = global as unknown as {
  prisma: PrismaClient;
};

export const prisma = PrismaSingleton.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  PrismaSingleton.prisma = prisma;
}
