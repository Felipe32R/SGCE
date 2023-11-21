/*
  Warnings:

  - Added the required column `candidatoId` to the `redes_sociais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "redes_sociais" ADD COLUMN     "candidatoId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "redes_sociais" ADD CONSTRAINT "redes_sociais_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
