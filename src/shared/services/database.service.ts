import { prisma } from "../config/database";

export const databaseService = {
  prisma,

  transaction: prisma.$transaction.bind(prisma),
};