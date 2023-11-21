-- DropForeignKey
ALTER TABLE "campanhas" DROP CONSTRAINT "campanhas_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "redes_sociais" DROP CONSTRAINT "redes_sociais_candidatoId_fkey";

-- AddForeignKey
ALTER TABLE "campanhas" ADD CONSTRAINT "campanhas_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redes_sociais" ADD CONSTRAINT "redes_sociais_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
