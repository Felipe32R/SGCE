/*
  Warnings:

  - Added the required column `cargoId` to the `candidates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "cargoId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "cargos" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "periodo" INTEGER NOT NULL,

    CONSTRAINT "cargos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campanhas" (
    "id" UUID NOT NULL,
    "biografia" TEXT NOT NULL,
    "propostas" TEXT NOT NULL,
    "realizacoes" INTEGER NOT NULL,
    "apoios" TEXT NOT NULL,
    "metas" TEXT NOT NULL,
    "candidatoId" UUID NOT NULL,

    CONSTRAINT "campanhas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redes_sociais" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "redes_sociais_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
