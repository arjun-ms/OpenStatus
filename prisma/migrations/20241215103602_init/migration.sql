-- CreateEnum
CREATE TYPE "Method" AS ENUM ('GET', 'POST');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "method" "Method" NOT NULL DEFAULT 'GET';
