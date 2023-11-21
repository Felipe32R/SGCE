/*
  Warnings:

  - You are about to drop the column `periodo` on the `cargos` table. All the data in the column will be lost.
  - Added the required column `cidade` to the `cargos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `cargos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio` to the `cargos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo_anos` to the `cargos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cargos" DROP COLUMN "periodo",
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "municipio" TEXT NOT NULL,
ADD COLUMN     "periodo_anos" INTEGER NOT NULL;
