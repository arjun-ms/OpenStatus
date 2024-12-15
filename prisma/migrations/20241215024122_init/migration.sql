-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPERATIONAL', 'DEGRADED_PERFORMANCE', 'PARTIAL_OUTAGE', 'MAJOR_OUTAGE');

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'OPERATIONAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
