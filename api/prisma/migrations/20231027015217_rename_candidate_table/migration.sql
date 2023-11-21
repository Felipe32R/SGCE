/*
  Warnings:

  - You are about to drop the `candidates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_cargoId_fkey";

-- DropTable
DROP TABLE "candidates";

-- CreateTable
CREATE TABLE "candidatos" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "partido" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargoId" UUID NOT NULL,

    CONSTRAINT "candidatos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidatos_email_key" ON "candidatos"("email");

-- AddForeignKey
ALTER TABLE "candidatos" ADD CONSTRAINT "candidatos_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
