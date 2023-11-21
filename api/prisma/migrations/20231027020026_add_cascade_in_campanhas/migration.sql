-- AddForeignKey
ALTER TABLE "campanhas" ADD CONSTRAINT "campanhas_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
