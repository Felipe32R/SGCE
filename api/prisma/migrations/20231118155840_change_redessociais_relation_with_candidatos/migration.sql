/*
  Warnings:

  - You are about to drop the `_CandidatoToRedeSocial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `redes_sociais_candidatos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `candidatoId` to the `redes_sociais` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CandidatoToRedeSocial" DROP CONSTRAINT "_CandidatoToRedeSocial_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidatoToRedeSocial" DROP CONSTRAINT "_CandidatoToRedeSocial_B_fkey";

-- DropForeignKey
ALTER TABLE "redes_sociais_candidatos" DROP CONSTRAINT "redes_sociais_candidatos_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "redes_sociais_candidatos" DROP CONSTRAINT "redes_sociais_candidatos_redeSocialId_fkey";

-- AlterTable
ALTER TABLE "redes_sociais" ADD COLUMN     "candidatoId" UUID NOT NULL;

-- DropTable
DROP TABLE "_CandidatoToRedeSocial";

-- DropTable
DROP TABLE "redes_sociais_candidatos";

-- AddForeignKey
ALTER TABLE "redes_sociais" ADD CONSTRAINT "redes_sociais_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
