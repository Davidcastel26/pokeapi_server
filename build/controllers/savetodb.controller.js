"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainsPokemons = exports.typePokemons = exports.getPokemons = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const prismadb_1 = __importDefault(require("../models/prismadb"));
dotenv_1.default.config();
const apilinkPokemon = process.env.URL_POKEMON_API || 'default';
const apilinkType = process.env.URL_POKETYPE_ || 'default';
const apiChainPoke = process.env.URL_POKE_CHAIN || 'default';
const getPokemons = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemonsData = yield axios_1.default.get(apilinkPokemon);
        const results = pokemonsData.data.results;
        const urlsPokemon = results.map((e) => e.url);
        // console.log(results)
        for (const u of urlsPokemon) {
            const getPokemonDetail = yield axios_1.default.get(u);
            const dataByPokemon = getPokemonDetail.data;
            const { id, name, types } = dataByPokemon;
            const typeNames = types.map(e => e.type.name);
            const findTypePokemon = yield prismadb_1.default.type.findMany({ where: {
                    typeName: {
                        in: typeNames
                    },
                }, select: { idTypes: true } });
            const typeIds = findTypePokemon.map((type) => type.idTypes);
            if (findTypePokemon) {
                yield prismadb_1.default.pokemon.create({
                    data: {
                        idPokemon: id.toString(),
                        name: name,
                        typeId: typeIds[0]
                    },
                });
            }
        }
        res.json({ msg: 'looking' });
    }
    catch (error) {
        next(error);
    }
});
exports.getPokemons = getPokemons;
const typePokemons = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typesPokemon = yield axios_1.default.get(apilinkType);
        const resultType = typesPokemon.data.results;
        const urlType = resultType.map((e) => e.url);
        for (const tp of urlType) {
            const getTypeDetail = yield axios_1.default.get(tp);
            const dataType = getTypeDetail.data;
            const { id, name } = dataType;
            // console.table({id,name})
            yield prismadb_1.default.type.create({
                data: {
                    idTypes: id.toString(),
                    typeName: name,
                }
            });
        }
        res.json({ msg: 'looking & saving types' });
    }
    catch (error) {
        next(error);
    }
});
exports.typePokemons = typePokemons;
const chainsPokemons = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typesPokemon = yield axios_1.default.get(apiChainPoke);
        const resultType = typesPokemon.data.results;
        const urlChain = resultType.map((e) => e.url);
        for (const ch of urlChain) {
            const blockChain = [];
            const getTypeDetail = yield axios_1.default.get(ch);
            const dataType = getTypeDetail.data;
            const { chain } = dataType;
            const firstEvolution = blockChain.push(chain.species.name);
            if (chain.evolves_to && chain.evolves_to.length > 0) {
                chain.evolves_to.forEach((e) => {
                    if (e === null)
                        return;
                    blockChain.push(e.species.name);
                    if (e.evolves_to.length > 0) {
                        e.evolves_to.forEach(e => blockChain.push(e.species.name));
                    }
                });
            }
            const findChainPokemon = yield prismadb_1.default.pokemon.findFirst({
                where: {
                    name: blockChain[0]
                },
            });
            if (findChainPokemon && findChainPokemon.name !== null) {
                yield prismadb_1.default.evolution.create({
                    data: {
                        pokemonId: findChainPokemon.name,
                        evoName1: blockChain[0],
                        evoName2: blockChain[1],
                        evoName3: blockChain[2]
                    },
                });
            }
        }
        res.json({ msg: 'looking' });
    }
    catch (error) {
        next(error);
    }
});
exports.chainsPokemons = chainsPokemons;
//# sourceMappingURL=savetodb.controller.js.map