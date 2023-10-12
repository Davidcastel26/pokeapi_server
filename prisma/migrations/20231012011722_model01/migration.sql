-- DropForeignKey
ALTER TABLE "Evolution" DROP CONSTRAINT "Evolution_pokemonId_fkey";

-- AddForeignKey
ALTER TABLE "Evolution" ADD CONSTRAINT "Evolution_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("name") ON DELETE CASCADE ON UPDATE CASCADE;
