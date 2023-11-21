/*
  Warnings:

  - You are about to drop the column `candidatoId` on the `redes_sociais` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidatoId]` on the table `campanhas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "redes_sociais" DROP CONSTRAINT "redes_sociais_candidatoId_fkey";

-- AlterTable
ALTER TABLE "redes_sociais" DROP COLUMN "candidatoId";

-- CreateTable
CREATE TABLE "redes_sociais_candidatos" (
    "id" UUID NOT NULL,
    "candidatoId" UUID NOT NULL,
    "redeSocialId" UUID NOT NULL,

    CONSTRAINT "redes_sociais_candidatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propostas" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "candidatoId" UUID NOT NULL,

    CONSTRAINT "propostas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realizacoes" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "candidatoId" UUID NOT NULL,

    CONSTRAINT "realizacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metas" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "candidatoId" UUID NOT NULL,

    CONSTRAINT "metas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CandidatoToRedeSocial" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CandidatoToRedeSocial_AB_unique" ON "_CandidatoToRedeSocial"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidatoToRedeSocial_B_index" ON "_CandidatoToRedeSocial"("B");

-- CreateIndex
CREATE UNIQUE INDEX "campanhas_candidatoId_key" ON "campanhas"("candidatoId");

-- AddForeignKey
ALTER TABLE "redes_sociais_candidatos" ADD CONSTRAINT "redes_sociais_candidatos_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redes_sociais_candidatos" ADD CONSTRAINT "redes_sociais_candidatos_redeSocialId_fkey" FOREIGN KEY ("redeSocialId") REFERENCES "redes_sociais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realizacoes" ADD CONSTRAINT "realizacoes_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metas" ADD CONSTRAINT "metas_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidatoToRedeSocial" ADD CONSTRAINT "_CandidatoToRedeSocial_A_fkey" FOREIGN KEY ("A") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidatoToRedeSocial" ADD CONSTRAINT "_CandidatoToRedeSocial_B_fkey" FOREIGN KEY ("B") REFERENCES "redes_sociais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
