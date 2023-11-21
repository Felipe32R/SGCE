/*
  Warnings:

  - You are about to drop the column `candidatoId` on the `metas` table. All the data in the column will be lost.
  - You are about to drop the column `candidatoId` on the `propostas` table. All the data in the column will be lost.
  - You are about to drop the column `candidatoId` on the `realizacoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "metas" DROP COLUMN "candidatoId";

-- AlterTable
ALTER TABLE "propostas" DROP COLUMN "candidatoId";

-- AlterTable
ALTER TABLE "realizacoes" DROP COLUMN "candidatoId";
