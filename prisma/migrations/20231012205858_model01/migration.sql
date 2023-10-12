-- CreateTable
CREATE TABLE "Pokemon" (
    "idPokemon" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("idPokemon")
);

-- CreateTable
CREATE TABLE "Type" (
    "idTypes" TEXT NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("idTypes")
);

-- CreateTable
CREATE TABLE "Evolution" (
    "idEvolution" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,
    "evoName1" TEXT NOT NULL,
    "evoName2" TEXT,
    "evoName3" TEXT,

    CONSTRAINT "Evolution_pkey" PRIMARY KEY ("idEvolution")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_idPokemon_key" ON "Pokemon"("idPokemon");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- CreateIndex
CREATE INDEX "Pokemon_typeId_idx" ON "Pokemon"("typeId");

-- CreateIndex
CREATE INDEX "Pokemon_name_idx" ON "Pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_idTypes_key" ON "Type"("idTypes");

-- CreateIndex
CREATE UNIQUE INDEX "Type_typeName_key" ON "Type"("typeName");

-- CreateIndex
CREATE UNIQUE INDEX "Evolution_idEvolution_key" ON "Evolution"("idEvolution");

-- CreateIndex
CREATE INDEX "Evolution_pokemonId_idx" ON "Evolution"("pokemonId");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("idTypes") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evolution" ADD CONSTRAINT "Evolution_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("name") ON DELETE CASCADE ON UPDATE CASCADE;
