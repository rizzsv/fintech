/*
  Warnings:

  - You are about to drop the column `user_id` on the `wallets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `wallets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,currency]` on the table `wallets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_user_id_fkey";

-- DropIndex
DROP INDEX "idx_wallets_user_id";

-- DropIndex
DROP INDEX "wallets_user_id_currency_key";

-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "wallets_userId_key" ON "wallets"("userId");

-- CreateIndex
CREATE INDEX "idx_wallets_user_id" ON "wallets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_userId_currency_key" ON "wallets"("userId", "currency");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
