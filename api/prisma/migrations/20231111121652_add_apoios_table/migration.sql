/*
  Warnings:

  - You are about to drop the column `apoios` on the `campanhas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "campanhas" DROP COLUMN "apoios";

-- CreateTable
CREATE TABLE "apoios" (
    "id" UUID NOT NULL,
    "candidato" TEXT NOT NULL,
    "partido" TEXT NOT NULL,
    "campanhaId" UUID,

    CONSTRAINT "apoios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "apoios" ADD CONSTRAINT "apoios_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "campanhas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
