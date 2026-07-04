/*
  Warnings:

  - The values [COMPLETED] on the enum `transaction_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "transaction_status_new" AS ENUM ('CREATED', 'PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REVERSED');
ALTER TABLE "public"."transactions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "transactions" ALTER COLUMN "status" TYPE "transaction_status_new" USING ("status"::text::"transaction_status_new");
ALTER TABLE "transaction_logs" ALTER COLUMN "status_before" TYPE "transaction_status_new" USING ("status_before"::text::"transaction_status_new");
ALTER TABLE "transaction_logs" ALTER COLUMN "status_after" TYPE "transaction_status_new" USING ("status_after"::text::"transaction_status_new");
ALTER TYPE "transaction_status" RENAME TO "transaction_status_old";
ALTER TYPE "transaction_status_new" RENAME TO "transaction_status";
DROP TYPE "public"."transaction_status_old";
ALTER TABLE "transactions" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
