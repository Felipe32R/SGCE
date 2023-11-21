/*
  Warnings:

  - You are about to drop the column `periodo_anos` on the `cargos` table. All the data in the column will be lost.
  - Added the required column `data_fim` to the `cargos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_inicio` to the `cargos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campanhas" ALTER COLUMN "realizacoes" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "cargos" DROP COLUMN "periodo_anos",
ADD COLUMN     "data_fim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL;
