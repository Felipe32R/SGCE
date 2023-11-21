/*
  Warnings:

  - You are about to drop the column `metas` on the `campanhas` table. All the data in the column will be lost.
  - You are about to drop the column `propostas` on the `campanhas` table. All the data in the column will be lost.
  - You are about to drop the column `realizacoes` on the `campanhas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "campanhas" DROP CONSTRAINT "campanhas_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "metas" DROP CONSTRAINT "metas_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "propostas" DROP CONSTRAINT "propostas_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "realizacoes" DROP CONSTRAINT "realizacoes_candidatoId_fkey";

-- AlterTable
ALTER TABLE "campanhas" DROP COLUMN "metas",
DROP COLUMN "propostas",
DROP COLUMN "realizacoes";

-- AlterTable
ALTER TABLE "metas" ADD COLUMN     "campanhaId" UUID;

-- AlterTable
ALTER TABLE "propostas" ADD COLUMN     "campanhaId" UUID;

-- AlterTable
ALTER TABLE "realizacoes" ADD COLUMN     "campanhaId" UUID;

-- AddForeignKey
ALTER TABLE "campanhas" ADD CONSTRAINT "campanhas_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "campanhas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realizacoes" ADD CONSTRAINT "realizacoes_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "campanhas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metas" ADD CONSTRAINT "metas_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "campanhas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
